import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, LogOut, Loader2, X, Image as ImageIcon, 
  Check, ChevronRight, RefreshCw, AlertCircle, Sparkles, Edit3,
  UploadCloud, ArrowLeft, Folder, HardDrive, CheckCircle2
} from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, setDoc, serverTimestamp, onSnapshot, DocumentData } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage, handleFirestoreError, OperationType, firebaseConfig } from '../firebase';
import { Project, Category } from '../types';
import { projects as defaultProjects } from '../data';
import { uploadProjectImagesToDrive, getDriveImageUrl, handleDriveImageError, deleteDriveFileByUrl } from '../lib/googleDrive';

// The verified admin email who has permission to update the portfolio
const ADMIN_EMAIL = "andreluiz1902@gmail.com";

interface AdminPanelProps {
  onAdminStateChange: (isAdmin: boolean) => void;
  activeProjectToEdit: Project | null;
  onCloseEdit: () => void;
}

export function AdminPanel({ onAdminStateChange, activeProjectToEdit, onCloseEdit }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  // Real-time synced projects list
  const [projectsList, setProjectsList] = useState<Project[]>(defaultProjects);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Edit / Form States
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<Category>('UI/UX Design');
  const [editDescription, setEditDescription] = useState("");
  const [editGallery, setEditGallery] = useState<string[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Manual File Selection / Drag-Drop States (Main Cover Image)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery Files & Upload States
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryFilePreviews, setGalleryFilePreviews] = useState<string[]>([]);
  const [removedGalleryUrls, setRemovedGalleryUrls] = useState<string[]>([]);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Upload and Sync States
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [driveToken, setDriveToken] = useState<string | null>(() => {
    return sessionStorage.getItem('drive_access_token');
  });

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const isVerifiedAdmin = !!(
        currentUser && 
        currentUser.email === ADMIN_EMAIL && 
        currentUser.emailVerified
      );
      setIsAdmin(isVerifiedAdmin);
      onAdminStateChange(isVerifiedAdmin);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, [onAdminStateChange]);

  // Sync projects list from Firestore dynamically
  useEffect(() => {
    setLoadingProjects(true);
    const projectsCol = collection(db, 'projects');
    const unsubscribe = onSnapshot(projectsCol, (snapshot) => {
      const dbProjects: Record<string, DocumentData> = {};
      snapshot.forEach((doc) => {
        dbProjects[doc.id] = doc.data();
      });

      const merged = defaultProjects.map((proj) => {
        if (dbProjects[proj.id]) {
          return {
            ...proj,
            ...dbProjects[proj.id],
            imageUrl: dbProjects[proj.id].imageUrl || proj.imageUrl,
            gallery: dbProjects[proj.id].gallery || proj.gallery || [dbProjects[proj.id].imageUrl || proj.imageUrl],
          } as Project;
        }
        return {
          ...proj,
          gallery: proj.gallery || [proj.imageUrl],
        };
      });
      setProjectsList(merged);
      setLoadingProjects(false);
    }, (error) => {
      console.warn("Aviso de sincronização Firestore no AdminPanel:", error);
      setLoadingProjects(false);
    });

    return () => unsubscribe();
  }, []);

  // Update form fields when active project to edit changes
  useEffect(() => {
    if (activeProjectToEdit) {
      setCurrentProject(activeProjectToEdit);
      setEditTitle(activeProjectToEdit.title);
      setEditCategory(activeProjectToEdit.category);
      setEditDescription(activeProjectToEdit.description || "");
      const existingGal = activeProjectToEdit.gallery && activeProjectToEdit.gallery.length > 0 
        ? activeProjectToEdit.gallery 
        : [activeProjectToEdit.imageUrl];
      setEditGallery(existingGal);
      setSelectedFile(null);
      setPreviewUrl(null);
      setGalleryFiles([]);
      setGalleryFilePreviews([]);
      setRemovedGalleryUrls([]);
      setCustomUrlInput("");
      setIsPanelOpen(true);
    }
  }, [activeProjectToEdit]);

  // When setting a currentProject manually from list
  const handleSelectProjectToEdit = (proj: Project) => {
    setCurrentProject(proj);
    setEditTitle(proj.title);
    setEditCategory(proj.category);
    setEditDescription(proj.description || "");
    const existingGal = proj.gallery && proj.gallery.length > 0 ? proj.gallery : [proj.imageUrl];
    setEditGallery(existingGal);
    setSelectedFile(null);
    setPreviewUrl(null);
    setGalleryFiles([]);
    setGalleryFilePreviews([]);
    setRemovedGalleryUrls([]);
    setCustomUrlInput("");
  };

  const handleAddGalleryFiles = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    const previews: string[] = [];
    let skippedCount = 0;

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const isKnownExtension = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'bmp', 'tiff', 'svg'].includes(ext);
      const isImageMime = file.type ? file.type.startsWith('image/') : false;
      const isImage = isImageMime || isKnownExtension;

      // Support images up to 30MB
      if (isImage && file.size <= 30 * 1024 * 1024) {
        validFiles.push(file);
        previews.push(URL.createObjectURL(file));
      } else {
        skippedCount++;
      }
    });

    if (skippedCount > 0) {
      setErrorText(`${skippedCount} arquivo(s) foram ignorados por não serem imagens válidas ou excederem 30MB.`);
    } else {
      setErrorText(null);
    }

    if (validFiles.length > 0) {
      setGalleryFiles(prev => [...prev, ...validFiles]);
      setGalleryFilePreviews(prev => [...prev, ...previews]);
    }
  };

  const handleRemoveExistingGalleryImage = (indexToRemove: number) => {
    const urlToRemove = editGallery[indexToRemove];
    if (urlToRemove) {
      setRemovedGalleryUrls(prev => [...prev, urlToRemove]);
    }
    setEditGallery(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewGalleryFile = (indexToRemove: number) => {
    setGalleryFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setGalleryFilePreviews(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddUrlToGallery = () => {
    if (!customUrlInput.trim()) return;
    setEditGallery(prev => [...prev, customUrlInput.trim()]);
    setCustomUrlInput("");
  };

  const handleSetMainCoverImage = (url: string) => {
    if (currentProject) {
      setCurrentProject({ ...currentProject, imageUrl: url });
      setPreviewUrl(url);
      setSelectedFile(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsAuthLoading(true);
      setErrorText(null);
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/drive');
      provider.addScope('https://www.googleapis.com/auth/drive.file');
      
      // Forces account selection
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, provider);
      
      // Validate logged-in email
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setErrorText(`Acesso negado. Apenas o e-mail ${ADMIN_EMAIL} possui privilégios de administrador.`);
        setIsAuthLoading(false);
        return;
      }

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setDriveToken(credential.accessToken);
        sessionStorage.setItem('drive_access_token', credential.accessToken);
      }
    } catch (error: any) {
      console.error("Login erro:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorText("O pop-up de login foi bloqueado ou fechado. Se a janela não abriu, tente abrir este aplicativo em uma NOVA GUIA e tente novamente (navegadores costumam bloquear pop-ups na janela de visualização).");
      } else {
        setErrorText(error.message || "Ocorreu um erro ao tentar realizar o login.");
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDriveToken(null);
      sessionStorage.removeItem('drive_access_token');
      setEditTitle("");
      setEditDescription("");
      setCurrentProject(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      onCloseEdit();
    } catch (error) {
      console.error("Logout erro:", error);
    }
  };

  // Drag over/enter event
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  // Drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  // File change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelected(file);
      e.target.value = '';
    }
  };

  const handleFileSelected = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isKnownExtension = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic', 'heif', 'bmp', 'tiff', 'svg'].includes(ext);
    const isImageMime = file.type ? file.type.startsWith('image/') : false;
    const isImage = isImageMime || isKnownExtension;

    if (!isImage) {
      setErrorText("Por favor, selecione apenas arquivos de imagem.");
      return;
    }
    // Limit to 30MB
    if (file.size > 30 * 1024 * 1024) {
      setErrorText("A imagem excede o tamanho máximo permitido de 30MB.");
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setErrorText(null);
  };

  // Upload new image to Google Drive & Storage and update metadata in Firestore
  const handleSaveProject = async () => {
    if (!currentProject) return;
    
    setIsSyncing(true);
    setUploadStatus("Iniciando publicação segura...");
    setErrorText(null);

    const projectId = currentProject.id;
    let finalImageUrl = currentProject.imageUrl;
    const uploadedGalleryUrls: string[] = [];
    let drivePathInfo = "";

    try {
      // Check if we have files to upload or files to delete
      const hasFilesToUpload = !!selectedFile || galleryFiles.length > 0;
      const hasFilesToDelete = removedGalleryUrls.length > 0;

      let activeDriveToken = driveToken;

      // 1. Process Google Drive deletions & uploads if applicable
      if (hasFilesToUpload || hasFilesToDelete) {
        if (!activeDriveToken) {
          // Attempt to authenticate Google Drive scope
          setUploadStatus("Solicitando permissão do Google Drive...");
          try {
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/drive');
            provider.addScope('https://www.googleapis.com/auth/drive.file');
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential?.accessToken) {
              activeDriveToken = credential.accessToken;
              setDriveToken(activeDriveToken);
              sessionStorage.setItem('drive_access_token', activeDriveToken);
            }
          } catch (driveAuthErr) {
            console.warn("Autenticação do Drive cancelada ou falhou, mantendo alteração local:", driveAuthErr);
          }
        }

        if (activeDriveToken) {
          // 1a. Delete removed images from Google Drive
          if (hasFilesToDelete) {
            setUploadStatus(`Excluindo ${removedGalleryUrls.length} foto(s) do Google Drive...`);
            for (const removedUrl of removedGalleryUrls) {
              try {
                await deleteDriveFileByUrl(activeDriveToken, removedUrl);
              } catch (delErr) {
                console.warn(`Aviso ao apagar imagem do Google Drive (${removedUrl}):`, delErr);
              }
            }
          }

          // 1b. Upload new images to Google Drive
          if (hasFilesToUpload) {
            try {
              setUploadStatus("Organizando pastas e enviando para o Google Drive...");
              const driveUploadResult = await uploadProjectImagesToDrive(
                activeDriveToken,
                editTitle || currentProject.title,
                selectedFile,
                galleryFiles,
                (statusMsg) => setUploadStatus(statusMsg)
              );

              drivePathInfo = driveUploadResult.folderName;

              if (driveUploadResult.coverResult) {
                finalImageUrl = driveUploadResult.coverResult.directUrl;
              }

              if (driveUploadResult.galleryResults.length > 0) {
                driveUploadResult.galleryResults.forEach(g => uploadedGalleryUrls.push(g.directUrl));
              }
            } catch (driveErr: any) {
              console.error("Erro no upload do Google Drive:", driveErr);
              setUploadStatus("Não foi possível enviar para o Google Drive. Continuando com o Firebase Storage...");
            }
          }
        }
      }

      // 2. Upload any remaining/failed files to Firebase Storage as dual-backup/fallback
      if (selectedFile && finalImageUrl === currentProject.imageUrl) {
        setUploadStatus("Enviando capa do projeto ao Firebase Storage...");
        const ext = selectedFile.name.split('.').pop() || 'jpg';
        const storageRef = ref(storage, `portfolio-images/project-${projectId}-${Date.now()}.${ext}`);
        
        const uploadResult = await uploadBytes(storageRef, selectedFile, {
          contentType: selectedFile.type || 'image/jpeg',
          customMetadata: {
            uploadedBy: user?.uid || "admin",
          }
        });

        finalImageUrl = await getDownloadURL(uploadResult.ref);
      }

      // Check if any gallery files still need upload to Firebase Storage
      const missingCount = galleryFiles.length - uploadedGalleryUrls.length;
      if (missingCount > 0) {
        setUploadStatus(`Enviando mídias complementares (${missingCount} foto(s)) ao Firebase Storage...`);
        const startingIndex = uploadedGalleryUrls.length;
        for (let i = startingIndex; i < galleryFiles.length; i++) {
          const file = galleryFiles[i];
          try {
            const ext = file.name.split('.').pop() || 'jpg';
            const galRef = ref(storage, `portfolio-images/gallery-${projectId}-${Date.now()}-${i}.${ext}`);
            
            const galUpload = await uploadBytes(galRef, file, {
              contentType: file.type || 'image/jpeg',
              customMetadata: {
                uploadedBy: user?.uid || "admin",
              }
            });
            const galUrl = await getDownloadURL(galUpload.ref);
            uploadedGalleryUrls.push(galUrl);
          } catch (fbErr) {
            console.error(`Erro ao enviar foto complementar ${file.name} ao Firebase:`, fbErr);
          }
        }
      }

      // Compile final gallery array (existing gallery URLs + newly uploaded URLs)
      let compiledGallery = [...editGallery, ...uploadedGalleryUrls];
      if (compiledGallery.length === 0) {
        compiledGallery = [finalImageUrl];
      } else if (!compiledGallery.includes(finalImageUrl)) {
        compiledGallery.unshift(finalImageUrl);
      }

      // 3. Update Firestore document values
      setUploadStatus("Gravando configurações e galeria no banco de dados...");
      const patchData = {
        id: projectId,
        title: editTitle,
        category: editCategory,
        imageUrl: finalImageUrl,
        description: editDescription,
        gallery: compiledGallery,
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || "admin",
        fromPhotos: true // Sets customized status badge
      };

      const docPath = `projects/${projectId}`;
      try {
        await setDoc(doc(db, 'projects', projectId), patchData);
      } catch (firestoreError) {
        handleFirestoreError(firestoreError, OperationType.WRITE, docPath);
      }

      const successMsg = drivePathInfo
        ? `Salvo com sucesso! Imagens no Google Drive: ${drivePathInfo}`
        : "Concluído com sucesso!";
      setUploadStatus(successMsg);

      setTimeout(() => {
        setUploadStatus(null);
        setIsSyncing(false);
        // Reset state
        setCurrentProject(null);
        setSelectedFile(null);
        setPreviewUrl(null);
        setGalleryFiles([]);
        setGalleryFilePreviews([]);
        setRemovedGalleryUrls([]);
        setEditGallery([]);
        onCloseEdit();
      }, 2000);

    } catch (err: any) {
      console.error("Critical save/upload failure:", err);
      setErrorText(err.message || "Tivemos um problema ao salvar as informações do trabalho. Tente novamente.");
      setUploadStatus(null);
      setIsSyncing(false);
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const panelVariants = {
    hidden: { 
      x: isMobile ? 0 : '100%', 
      y: isMobile ? '100%' : 0 
    },
    visible: { 
      x: 0, 
      y: 0,
      transition: { type: 'spring', damping: 28, stiffness: 220 }
    },
    exit: { 
      x: isMobile ? 0 : '100%', 
      y: isMobile ? '100%' : 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <>
      {/* Hidden floating control - triggered programmatically by the Liquid Glass Dock */}
      <div className="sr-only">
        <button
          id="btn-admin-panel"
          onClick={() => {
            setIsPanelOpen(!isPanelOpen);
            if (activeProjectToEdit && isPanelOpen) onCloseEdit();
          }}
        >
          Trigger Panel
        </button>
      </div>

      {/* Admin Panel Drawer (iOS bottom sheet on mobile, slide-over on macOS/Desktop) */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            id="admin-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-end"
          >
            {/* Click outside to close drawer, unless saving */}
            <div 
              id="admin-backdrop-overlay"
              className="absolute inset-0" 
              onClick={() => { if (!isSyncing) { setIsPanelOpen(false); setCurrentProject(null); onCloseEdit(); } }} 
            />

            <motion.div
              id="admin-panel-drawer"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full md:max-w-md h-[90vh] md:h-full bg-[#0d0e12]/95 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/10 flex flex-col items-stretch shadow-2xl z-20 rounded-t-3xl md:rounded-t-none md:rounded-l-3xl overflow-hidden self-end md:self-auto"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#13151b]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  {currentProject ? (
                    <button
                      onClick={() => {
                        setCurrentProject(null);
                        onCloseEdit();
                      }}
                      className="p-1 px-2 -ml-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors flex items-center gap-1 text-xs uppercase"
                    >
                      <ArrowLeft size={16} />
                      <span>Voltar</span>
                    </button>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                        <Sparkles size={16} className={isAdmin ? "text-emerald-400" : "text-amber-400"} />
                      </div>
                      <div>
                        <h2 className="font-display font-light text-base tracking-tight text-white uppercase">
                          Painel do Autor
                        </h2>
                        <p className="text-[9px] text-white/40 tracking-wider uppercase">Controles do Portfolio</p>
                      </div>
                    </>
                  )}
                </div>
                
                <button
                  disabled={isSyncing}
                  onClick={() => { setIsPanelOpen(false); setCurrentProject(null); onCloseEdit(); }}
                  className="p-1.5 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Error messages */}
              {errorText && (
                <div id="admin-error-box" className="mx-6 mt-4 p-4 rounded-2xl bg-red-950/40 border border-red-500/20 flex gap-3 items-start animate-shake">
                  <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-red-300">Ops, tivemos um erro:</p>
                    <p className="text-[11px] text-red-200/80 leading-relaxed font-light mt-1 max-h-32 overflow-y-auto">{errorText}</p>
                  </div>
                </div>
              )}

              {/* Content area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                {!isAdmin ? (
                  /* Login Panel */
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-6">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-2">
                      <Lock size={30} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-light text-[#f0f0f0] uppercase tracking-wide">
                        Área Restrita ao Autor
                      </h3>
                      <p className="text-xs text-white/50 font-light leading-relaxed max-w-sm mt-2">
                        Se você é o André, conecte sua conta Google para gerenciar seus projetos e fazer uploads de novas imagens manualmente com autonomia.
                      </p>
                    </div>

                    <button
                      onClick={handleGoogleLogin}
                      disabled={isAuthLoading}
                      className="w-full max-w-xs h-12 flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 font-medium rounded-full text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      {isAuthLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.63-1.04-1.37-1.18-2.09z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.85 2.98c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                          Identificar-se com o Google
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Admin Panel Workspace */
                  <div className="flex flex-col gap-6">
                    {/* User info bar */}
                    <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || ""} className="w-9 h-9 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-xs">A</div>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-white">{user?.displayName || "André Luiz"}</p>
                            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                              Administrador Conectado
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="p-2 ml-4 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                          title="Desconectar"
                        >
                          <LogOut size={16} />
                        </button>
                      </div>

                      {driveToken ? (
                        <div className="mt-1 text-[10px] text-blue-300/90 bg-blue-500/10 border border-blue-500/20 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                          <HardDrive size={13} className="text-blue-400 shrink-0" />
                          <span>Google Drive Ativo — Fotos enviadas para pastas do projeto</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleGoogleLogin}
                          className="mt-1 text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 transition-colors w-full"
                        >
                          <HardDrive size={13} className="text-amber-400 shrink-0" />
                          <span>Conectar Google Drive para organizar uploads em pastas</span>
                        </button>
                      )}
                    </div>

                    {!currentProject ? (
                      /* Projects Overview list */
                      <div className="flex flex-col gap-4">
                        <div className="border-b border-white/5 pb-2">
                          <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                            Selecione um Trabalho para Editar
                          </h3>
                        </div>

                        {loadingProjects ? (
                          <div className="py-12 flex flex-col items-center justify-center gap-2 text-white/40 text-xs">
                            <Loader2 size={24} className="animate-spin" />
                            Carregando trabalhos...
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {projectsList.map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleSelectProjectToEdit(project)}
                                className="w-full p-3 rounded-2xl bg-[#12141c]/50 hover:bg-[#161822] border border-white/5 hover:border-white/10 text-left transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black">
                                    <img 
                                      referrerPolicy="no-referrer"
                                      src={getDriveImageUrl(project.imageUrl)} 
                                      onError={(e) => handleDriveImageError(e, project.imageUrl)}
                                      alt={project.title} 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-medium text-white truncate max-w-[200px]">{project.title}</h4>
                                    <p className="text-[9px] text-[#a5b4fc] uppercase tracking-wider mt-0.5">{project.category}</p>
                                  </div>
                                </div>
                                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
                                  <ChevronRight size={14} />
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Project Editing Form (Dynamic overrides) */
                      <div className="flex flex-col gap-5">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentProject(null);
                            onCloseEdit();
                          }}
                          className="flex items-center gap-1.5 text-[10px] text-white/50 hover:text-white uppercase tracking-wider transition-colors self-start cursor-pointer"
                        >
                          <ArrowLeft size={13} />
                          <span>Voltar para Lista de Trabalhos</span>
                        </button>

                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                            <img 
                              referrerPolicy="no-referrer"
                              src={previewUrl || getDriveImageUrl(currentProject.imageUrl)} 
                              onError={(e) => handleDriveImageError(e, previewUrl || currentProject.imageUrl)}
                              alt="Preview" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-[#a5b4fc] block">Trabalho sob edição</span>
                            <h4 className="text-xs font-semibold text-white truncate max-w-[240px]">{currentProject.title}</h4>
                          </div>
                        </div>

                        {/* Text fields */}
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Título do Trabalho</label>
                            <input 
                              type="text" 
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Indique o título do projeto"
                              className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Categoria</label>
                            <select 
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value as Category)}
                              className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                            >
                              <option value="UI/UX Design" className="bg-[#0e1015] text-white">UI/UX Design</option>
                              <option value="Identidade Visual" className="bg-[#0e1015] text-white">Identidade Visual</option>
                              <option value="Social Media" className="bg-[#0e1015] text-white">Social Media</option>
                              <option value="Peças Gráficas" className="bg-[#0e1015] text-white">Peças Gráficas</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] uppercase text-white/50 tracking-wider font-semibold">Descrição do Trabalho</label>
                            <textarea 
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Descreva brevemente o projeto ou soluções desenvolvidas..."
                              className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all resize-none font-light leading-relaxed"
                            />
                          </div>

                          {/* Main Cover Image Drag & Drop Area */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase text-white/50 tracking-wider font-semibold flex items-center justify-between">
                              <span>Substituir Imagem de Capa Principal</span>
                              {previewUrl && <span className="text-[9px] text-emerald-400">Nova capa selecionada</span>}
                            </label>
                            <div 
                              onDragEnter={handleDrag}
                              onDragOver={handleDrag}
                              onDragLeave={handleDrag}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                              className={`border border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 relative flex flex-col items-center justify-center gap-2 ${
                                isDragActive 
                                  ? 'border-indigo-400 bg-indigo-500/15 scale-[0.99]' 
                                  : previewUrl 
                                    ? 'border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10' 
                                    : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <input 
                                type="file" 
                                ref={fileInputRef} 
                                accept="image/*,.heic,.heif,.webp,.png,.jpg,.jpeg,.gif,.bmp,.svg" 
                                onChange={handleFileChange} 
                                className="hidden" 
                              />
                              {previewUrl ? (
                                <div className="relative group w-full h-28 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                  <img src={previewUrl} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[9px] text-white uppercase font-bold tracking-wider">Trocar Capa</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 border border-white/10 shrink-0">
                                    <UploadCloud size={16} className="text-white/60" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-xs text-white uppercase tracking-wider font-semibold">Escolher nova imagem de capa</p>
                                    <p className="text-[9px] text-white/40 font-light">Arraste ou clique para selecionar arquivo</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Full Interactive Multi-Image Gallery Manager */}
                          <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] uppercase text-indigo-300 tracking-wider font-semibold flex items-center gap-1.5">
                                <ImageIcon size={13} />
                                <span>Galeria de Fotos do Case ({editGallery.length + galleryFiles.length} imagens)</span>
                              </label>
                            </div>

                            <p className="text-[10px] text-white/40 font-light leading-snug">
                              Adicione fotos adicionais do trabalho para exibir uma galeria de imagens interativa dentro do modal do case study.
                            </p>

                            {/* Existing Gallery Images Grid */}
                            {editGallery.length > 0 && (
                              <div className="space-y-1.5">
                                <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Fotos Atuais na Galeria:</span>
                                <div className="grid grid-cols-3 gap-2">
                                  {editGallery.map((imgUrl, gIdx) => (
                                    <div key={gIdx} className="relative group rounded-xl overflow-hidden border border-white/10 h-20 bg-black">
                                      <img 
                                        referrerPolicy="no-referrer"
                                        src={getDriveImageUrl(imgUrl)} 
                                        onError={(e) => handleDriveImageError(e, imgUrl)}
                                        alt={`Galeria ${gIdx + 1}`} 
                                        className="w-full h-full object-cover" 
                                      />
                                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 gap-1">
                                        <button
                                          type="button"
                                          onClick={() => handleSetMainCoverImage(imgUrl)}
                                          className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold"
                                        >
                                          Usar como Capa
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveExistingGalleryImage(gIdx)}
                                          className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold"
                                        >
                                          Excluir
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Newly Selected Local Files Grid */}
                            {galleryFilePreviews.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-mono">Novas Imagens para Enviar ({galleryFilePreviews.length}):</span>
                                <div className="grid grid-cols-3 gap-2">
                                  {galleryFilePreviews.map((preview, pIdx) => (
                                    <div key={pIdx} className="relative group rounded-xl overflow-hidden border border-emerald-500/30 h-20 bg-black">
                                      <img src={preview} alt={`Nova ${pIdx + 1}`} className="w-full h-full object-cover" />
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveNewGalleryFile(pIdx)}
                                        className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all"
                                        title="Remover"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Add More Gallery Images Action Buttons */}
                            <div className="flex flex-col gap-2 pt-1">
                              <input 
                                type="file" 
                                ref={galleryFileInputRef} 
                                accept="image/*,.heic,.heif,.webp,.png,.jpg,.jpeg,.gif,.bmp,.svg" 
                                multiple 
                                onChange={(e) => {
                                  if (e.target.files) {
                                    handleAddGalleryFiles(e.target.files);
                                    e.target.value = '';
                                  }
                                }} 
                                className="hidden" 
                              />

                              <button
                                type="button"
                                onClick={() => galleryFileInputRef.current?.click()}
                                className="w-full h-10 border border-dashed border-indigo-500/40 hover:border-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-200 text-xs font-semibold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >
                                <UploadCloud size={16} />
                                <span>+ Adicionar Fotos do Dispositivo</span>
                              </button>

                              {/* Paste Image URL Fallback */}
                              <div className="flex gap-1.5 items-center mt-1">
                                <input 
                                  type="text" 
                                  value={customUrlInput}
                                  onChange={(e) => setCustomUrlInput(e.target.value)}
                                  placeholder="Ou cole a URL da imagem aqui..."
                                  className="flex-1 h-9 bg-white/5 border border-white/10 rounded-lg px-3 text-[11px] text-white focus:outline-none focus:border-indigo-500/50"
                                />
                                <button
                                  type="button"
                                  onClick={handleAddUrlToGallery}
                                  disabled={!customUrlInput.trim()}
                                  className="h-9 px-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold uppercase tracking-wider rounded-lg transition-all disabled:opacity-40"
                                >
                                  Adicionar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form actions */}
                        <div className="flex gap-3 pt-4 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentProject(null);
                              onCloseEdit();
                            }}
                            className="flex-1 h-11 rounded-full border border-white/10 hover:bg-white/5 text-xs text-white font-medium uppercase tracking-wider transition-colors"
                          >
                            Cancelar
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleSaveProject}
                            disabled={!editTitle.trim() || isSyncing}
                            className="flex-1 h-11 rounded-full bg-white hover:bg-white/90 text-black text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <span>Salvar</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Loader overlay for upload and synchronization */}
              <AnimatePresence>
                {isSyncing && (
                  <motion.div
                    id="admin-syncing-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30"
                  >
                    <div className="relative mb-5 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 flex items-center justify-center animate-spin border-t-indigo-500" />
                      <div className="absolute w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <RefreshCw size={16} className="text-[#a5b4fc] animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-medium text-white tracking-widest uppercase">
                        Salvando Trabalho
                      </h4>
                      <p className="text-xs text-[#a5b4fc] italic font-light mt-1.5 min-h-[16px]">
                        {uploadStatus || "Gravando..."}
                      </p>
                      <p className="text-[10px] text-white/30 max-w-xs mt-4 leading-relaxed font-light">
                        Suas mídias e informações estão sendo retransmitidas com segurança para as fontes de dados persistentes do Firebase.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


