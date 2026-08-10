// Google Drive API helper utility for uploading and organizing portfolio images

/**
 * Find or create a folder in Google Drive by name
 */
export async function getOrCreateDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<string> {
  const sanitizeName = folderName.replace(/'/g, "\\'");
  let query = `name = '${sanitizeName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  if (parentFolderId) {
    query += ` and '${parentFolderId}' in parents`;
  }

  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&spaces=drive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!searchRes.ok) {
      const errJson = await searchRes.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Erro ao buscar pasta no Google Drive (${searchRes.status})`);
    }

    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }

    // Folder does not exist, create it
    const createBody: { name: string; mimeType: string; parents?: string[] } = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };
    if (parentFolderId) {
      createBody.parents = [parentFolderId];
    }

    const createRes = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createBody),
    });

    if (!createRes.ok) {
      const errJson = await createRes.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Erro ao criar pasta no Google Drive (${createRes.status})`);
    }

    const createdData = await createRes.json();
    return createdData.id;
  } catch (error) {
    console.error('getOrCreateDriveFolder error:', error);
    throw error;
  }
}

/**
 * Delete a file from Google Drive using its file URL or ID
 */
export async function deleteDriveFileByUrl(accessToken: string, fileUrlOrId: string): Promise<boolean> {
  const fileId = extractDriveFileId(fileUrlOrId);
  if (!fileId) return false;

  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok || res.status === 404) {
      console.log(`Arquivo do Google Drive ${fileId} excluído com sucesso (ou já removido).`);
      return true;
    }
    const err = await res.json().catch(() => ({}));
    console.warn('Aviso ao excluir arquivo do Google Drive:', err);
    return false;
  } catch (err) {
    console.warn('Erro ao excluir arquivo do Google Drive:', err);
    return false;
  }
}

/**
 * Make a Google Drive file publicly viewable so it can be rendered on web pages
 */
export async function makeDriveFilePublic(accessToken: string, fileId: string): Promise<void> {
  try {
    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions?supportsAllDrives=true&sendNotificationEmail=false`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('Google Drive permission warning:', err);
    }
  } catch (err) {
    console.warn('Could not set public permission on Drive file:', err);
  }
}

/**
 * Extracts Google Drive File ID from various link formats or raw ID strings
 */
export function extractDriveFileId(url: string | undefined | null): string | null {
  if (!url) return null;

  // Format: https://drive.google.com/file/d/1A2b3C.../view or https://lh3.googleusercontent.com/d/1A2b3C...
  const dPathMatch = url.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  if (dPathMatch && dPathMatch[1]) {
    return dPathMatch[1].split('=')[0];
  }

  // Format: https://drive.google.com/uc?id=1A2b3C... or export=view&id=1A2b3C...
  // Format: https://drive.google.com/open?id=1A2b3C...
  // Format: https://drive.google.com/thumbnail?id=1A2b3C...
  const idQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
  if (idQueryMatch && idQueryMatch[1]) {
    return idQueryMatch[1];
  }

  // If string itself is a raw Drive ID (25 to 50 characters)
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Normalizes any image URL (including Google Drive share links, view links, lh3 links, or raw IDs)
 * into a high-resolution direct image URL that loads reliably in <img> tags.
 */
export function getDriveImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  const fileId = extractDriveFileId(url);
  if (fileId) {
    // Official high-res Drive thumbnail CDN endpoint (renders directly in <img> tags)
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }

  return url;
}

/**
 * Handle image loading fallback if Google Drive primary URL fails to load
 */
export function handleDriveImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, originalUrl: string) {
  const img = e.currentTarget;
  const fileId = extractDriveFileId(originalUrl || img.src);

  if (fileId) {
    const currentSrc = img.src;

    // If thumbnail failed, try lh3 direct link with size
    if (currentSrc.includes('drive.google.com/thumbnail')) {
      img.src = `https://lh3.googleusercontent.com/d/${fileId}=s2000`;
      return;
    }

    // If lh3 failed, try uc export
    if (currentSrc.includes('lh3.googleusercontent.com')) {
      img.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
      return;
    }
  }
}

export interface DriveUploadResult {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink?: string;
  directUrl: string;
}

/**
 * Upload a single file to a specific folder in Google Drive with retry support
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File,
  folderId: string,
  fileNamePrefix: string = '',
  maxRetries = 2
): Promise<DriveUploadResult> {
  const fileName = fileNamePrefix ? `${fileNamePrefix}_${file.name}` : file.name;
  const metadata = {
    name: fileName,
    parents: [folderId],
  };

  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const formData = new FormData();
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', file);

      const res = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Falha no upload para o Google Drive (${res.status})`);
      }

      const fileData = await res.json();
      
      // Make readable so direct link works in site <img> tags
      await makeDriveFilePublic(accessToken, fileData.id);

      const directUrl = `https://drive.google.com/thumbnail?id=${fileData.id}&sz=w2000`;

      return {
        id: fileData.id,
        name: fileData.name,
        webViewLink: fileData.webViewLink || `https://drive.google.com/file/d/${fileData.id}/view`,
        webContentLink: fileData.webContentLink,
        directUrl,
      };
    } catch (err: any) {
      lastError = err;
      console.warn(`Tentativa ${attempt + 1} de upload para o Drive falhou para ${file.name}:`, err);
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error(`Não foi possível enviar o arquivo ${file.name} para o Google Drive`);
}

/**
 * Upload cover and gallery images for a project to Google Drive under organized folders:
 * "Portfólio - Site" / "[Título do Projeto]" / "Capa" & "Galeria"
 */
export async function uploadProjectImagesToDrive(
  accessToken: string,
  projectTitle: string,
  coverFile?: File | null,
  galleryFiles: File[] = [],
  onProgress?: (message: string) => void
): Promise<{
  coverResult?: DriveUploadResult;
  galleryResults: DriveUploadResult[];
  folderName: string;
  failedFiles: File[];
}> {
  if (onProgress) onProgress('Acessando pasta principal "Portfólio - Site" no Google Drive...');

  // 1. Root folder for portfolio
  const rootFolderId = await getOrCreateDriveFolder(accessToken, 'Portfólio - Site');

  // 2. Project subfolder
  const cleanTitle = projectTitle.trim() || 'Projeto Sem Título';
  if (onProgress) onProgress(`Criando/localizando pasta "${cleanTitle}" no Google Drive...`);
  const projectFolderId = await getOrCreateDriveFolder(accessToken, cleanTitle, rootFolderId);

  let coverResult: DriveUploadResult | undefined = undefined;
  const galleryResults: DriveUploadResult[] = [];
  const failedFiles: File[] = [];

  // 3. Upload Cover image if present
  if (coverFile) {
    if (onProgress) onProgress(`Criando pasta "Capa" no Google Drive...`);
    const coverFolderId = await getOrCreateDriveFolder(accessToken, 'Capa Principal', projectFolderId);
    if (onProgress) onProgress(`Enviando imagem de capa para o Google Drive...`);
    try {
      coverResult = await uploadFileToDrive(accessToken, coverFile, coverFolderId, 'Capa');
    } catch (err) {
      console.error(`Erro ao enviar imagem de capa ${coverFile.name} para o Drive:`, err);
      failedFiles.push(coverFile);
    }
  }

  // 4. Upload Gallery images if present
  if (galleryFiles.length > 0) {
    if (onProgress) onProgress(`Criando pasta "Galeria" no Google Drive...`);
    const galleryFolderId = await getOrCreateDriveFolder(accessToken, 'Galeria de Fotos', projectFolderId);

    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];
      if (onProgress) onProgress(`Enviando foto ${i + 1} de ${galleryFiles.length} (${file.name}) para o Google Drive...`);
      try {
        const galRes = await uploadFileToDrive(accessToken, file, galleryFolderId, `Foto_${i + 1}`);
        galleryResults.push(galRes);
      } catch (err) {
        console.error(`Erro ao enviar foto ${file.name} para o Google Drive:`, err);
        failedFiles.push(file);
      }
    }
  }

  return {
    coverResult,
    galleryResults,
    folderName: `Portfólio - Site / ${cleanTitle}`,
    failedFiles,
  };
}
