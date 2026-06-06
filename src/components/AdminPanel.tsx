import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Unlock, LogOut, Loader2, X, Image as ImageIcon, 
  Folder, Check, ChevronRight, RefreshCw, AlertCircle, Sparkles, Edit3
} from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage, handleFirestoreError, OperationType, firebaseConfig } from '../firebase';
import { Project } from '../types';

// The verified admin email who has permission to update the portfolio
const ADMIN_EMAIL = "andreluiz1902@gmail.com";

interface GooglePhotoAlbum {
  id: string;
  title: string;
  mediaItemsCount?: string;
  coverPhotoBaseUrl?: string;
}

interface GooglePhotoItem {
  id: string;
  baseUrl: string;
  filename: string;
  mimeType: string;
}

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
  
  // Google Photos States
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem('google_photos_token');
  });
  const [albums, setAlbums] = useState<GooglePhotoAlbum[]>([]);
  const [photos, setPhotos] = useState<GooglePhotoItem[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  
  // Upload and Sync States
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchPageToken, setSearchPageToken] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

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
      
      if (!currentUser) {
        setAccessToken(null);
        sessionStorage.removeItem('google_photos_token');
      }
    });
    return () => unsubscribe();
  }, [onAdminStateChange]);

  // If we have an active token, let's load general albums
  useEffect(() => {
    if (isAdmin && accessToken && isPanelOpen) {
      fetchAlbums();
    }
  }, [isAdmin, accessToken, isPanelOpen]);

  // If a project is selected to edit, automatically show selector panel
  useEffect(() => {
    if (activeProjectToEdit) {
      setIsPanelOpen(true);
      if (isAdmin && !accessToken) {
        setErrorText("Conecte primeiro ao seu Google Fotos para poder mudar a imagem.");
      }
    }
  }, [activeProjectToEdit, isAdmin, accessToken]);

  const handleGoogleLogin = async () => {
    try {
      setIsAuthLoading(true);
      setErrorText(null);
      const provider = new GoogleAuthProvider();
      
      // Request readonly permissions for Google Photos
      provider.addScope('https://www.googleapis.com/auth/photoslibrary.readonly');
      
      // Forces account choosing to ensure the user grants Google Photos permissions
      provider.setCustomParameters({
        prompt: 'select_account consent'
      });

      const result = await signInWithPopup(auth, provider);
      
      // Validate logged-in email
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        setErrorText(`Acesso negado. Apenas o e-mail ${ADMIN_EMAIL} possui privilégios de administrador.`);
        setIsAuthLoading(false);
        return;
      }

      // Extract credentials
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (token) {
        setAccessToken(token);
        sessionStorage.setItem('google_photos_token', token);
      } else {
        setErrorText("Não foi possível adquirir a chave de acesso do seu Google Fotos. Tente realizar o login novamente.");
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
      setAccessToken(null);
      setAlbums([]);
      setPhotos([]);
      setSelectedAlbumId(null);
      sessionStorage.removeItem('google_photos_token');
      onCloseEdit();
    } catch (error) {
      console.error("Logout erro:", error);
    }
  };

  const fetchAlbums = async () => {
    if (!accessToken) return;
    setIsLoadingAlbums(true);
    setErrorText(null);
    try {
      const url = `https://photoslibrary.googleapis.com/v1/albums?pageSize=50`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        setAccessToken(null);
        sessionStorage.removeItem('google_photos_token');
        setErrorText("Sua sessão do Google expirou. Reconecte seu e-mail para atualizar a galeria.");
        return;
      }

      if (!response.ok) {
        let errorDetail = "";
        try {
          const errJson = await response.json();
          errorDetail = errJson?.error?.message || JSON.stringify(errJson);
        } catch (e) {
          try {
            errorDetail = await response.text();
          } catch (e2) {}
        }
        
        if (response.status === 403 || errorDetail.includes("insufficient authentication scopes") || errorDetail.includes("insufficient_scope")) {
          setAccessToken(null);
          sessionStorage.removeItem('google_photos_token');
          throw new Error("Permissão negada para ler o Google Fotos. Você DEVE marcar a caixa de seleção concedendo permissão ao Google Fotos durante o login.");
        }
        
        throw new Error(errorDetail || `Status code: ${response.status}`);
      }

      const data = await response.json();
      setAlbums(data.albums || []);
    } catch (err: any) {
      console.error("Failed to fetch Google Photos albums:", err);
      setErrorText(err.message || "Erro ao obter álbuns. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoadingAlbums(false);
    }
  };

  const fetchPhotosFromAlbum = async (albumId: string | null = null, pageToken: string | null = null) => {
    if (!accessToken) return;
    setIsLoadingPhotos(true);
    setErrorText(null);
    
    try {
      let url = `https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=60`;
      let options: RequestInit = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (albumId) {
        url = `https://photoslibrary.googleapis.com/v1/mediaItems:search`;
        options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            albumId,
            pageSize: 60,
            pageToken: pageToken || undefined,
          }),
        };
      } else if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      const response = await fetch(url, options);
      
      if (response.status === 401) {
        setAccessToken(null);
        sessionStorage.removeItem('google_photos_token');
        setErrorText("Sua sessão do Google expirou. Reconecte seu e-mail para atualizar a galeria.");
        return;
      }

      if (!response.ok) {
        let errorDetail = "";
        try {
          const errJson = await response.json();
          errorDetail = errJson?.error?.message || JSON.stringify(errJson);
        } catch (e) {
          try {
            errorDetail = await response.text();
          } catch (e2) {}
        }
        
        if (response.status === 403 || errorDetail.includes("insufficient authentication scopes") || errorDetail.includes("insufficient_scope")) {
          setAccessToken(null);
          sessionStorage.removeItem('google_photos_token');
          throw new Error("Permissão negada para ler o Google Fotos. Você DEVE marcar a caixa de seleção concedendo permissão ao Google Fotos durante o login.");
        }
        
        throw new Error(errorDetail || `Status code: ${response.status}`);
      }

      const data = await response.json();
      const newItems: GooglePhotoItem[] = data.mediaItems || [];

      if (pageToken) {
        setPhotos(prev => [...prev, ...newItems]);
      } else {
        setPhotos(newItems);
      }
      setSearchPageToken(data.nextPageToken || null);
    } catch (err: any) {
      console.error("Failed to fetch Google Photos items:", err);
      setErrorText(err.message || "Erro ao listar fotos. Certifique-se de que os escopos corretos do Google Fotos foram aceitos.");
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  const handleSelectAlbum = (albumId: string | null) => {
    setSelectedAlbumId(albumId);
    setPhotos([]);
    setSearchPageToken(null);
    fetchPhotosFromAlbum(albumId);
  };

  // The critical logic: Proxy and download image, upload to Storage, register in Firestore!
  const handleSelectPhoto = async (photo: GooglePhotoItem) => {
    if (!activeProjectToEdit) return;
    
    setIsSyncing(true);
    setUploadStatus("Iniciando transferência segura...");
    setErrorText(null);

    const projectId = activeProjectToEdit.id;
    // We add =w1600 to fetch high-res, optimized photos
    const highResUrl = `${photo.baseUrl}=w1600`;

    try {
      // 1. Fetch details server-side via Proxy to bypass CORS limitation
      setUploadStatus("Sincronizando com o servidor (by-pass CORS)...");
      const proxyUrl = `/api/proxy-photo?url=${encodeURIComponent(highResUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Falha no proxy da imagem. Código status: ${response.status}`);
      }

      // 2. Read bytes and convert to Blob
      setUploadStatus("Processando arquivo binário...");
      const blob = await response.blob();

      // 3. Upload to Firebase Storage
      setUploadStatus("Enviando imagem ao Firebase Storage do projeto...");
      const storageRef = ref(storage, `portfolio-images/project-${projectId}-${Date.now()}.jpg`);
      
      const uploadResult = await uploadBytes(storageRef, blob, {
        contentType: "image/jpeg",
        customMetadata: {
          googlePhotoId: photo.id,
          uploadedBy: user?.uid || "admin",
        }
      });

      // 4. Get secure reference URL
      setUploadStatus("Coletando URL de distribuição permanente...");
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      // 5. Update Firestore database schema
      setUploadStatus("Salvando configurações no banco de dados...");
      const patchData = {
        id: projectId,
        title: activeProjectToEdit.title,
        category: activeProjectToEdit.category,
        imageUrl: downloadUrl,
        description: activeProjectToEdit.description || "",
        updatedAt: serverTimestamp(),
        updatedBy: user?.uid || "admin",
        fromPhotos: true
      };

      const docPath = `projects/${projectId}`;
      try {
        await setDoc(doc(db, 'projects', projectId), patchData);
      } catch (firestoreError) {
        handleFirestoreError(firestoreError, OperationType.WRITE, docPath);
      }

      setUploadStatus("Concluído com sucesso!");
      setTimeout(() => {
        setUploadStatus(null);
        setIsSyncing(false);
        onCloseEdit();
      }, 1500);

    } catch (err: any) {
      console.error("Critical upload / sync failure:", err);
      setErrorText(err.message || "Tivemos um problema ao processar seu arquivo do Google Fotos. Reconecte ou tente uma imagem diferente.");
      setUploadStatus(null);
      setIsSyncing(false);
    }
  };

  return (
    <>
      {/* Floating control in footer */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={`h-12 w-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-2xl ${
            isAdmin 
              ? 'bg-[#1e293b]/90 border-emerald-500/30 text-emerald-400 backdrop-blur-md hover:scale-105' 
              : 'bg-[#111] border-white/10 text-white/40 hover:text-white hover:border-white/20'
          }`}
          title={isAdmin ? "Painel do Portfólio (Administrador Conectado)" : "Acesso de Administrador"}
        >
          {isAdmin ? <Unlock size={20} className="animate-pulse" /> : <Lock size={18} />}
        </button>
      </div>

      {/* Admin Panel Sheet (iOS/macOS dark style overlay) */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-end"
          >
            {/* Click outside to close sheet, unless syncing */}
            <div 
              className="absolute inset-0" 
              onClick={() => { if (!isSyncing) { setIsPanelOpen(false); onCloseEdit(); } }} 
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-full bg-[#0d0e12] border-l border-white/10 flex flex-col items-stretch shadow-2xl z-20 pointer-events-auto"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#13151b]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                    <Sparkles size={16} className={isAdmin ? "text-emerald-400" : "text-amber-400"} />
                  </div>
                  <div>
                    <h2 className="font-display font-light text-base tracking-tight text-white uppercase">
                      Espaço do Designer
                    </h2>
                    <p className="text-[9px] text-white/40 tracking-wider uppercase">Controles do Portfolio</p>
                  </div>
                </div>
                
                <button
                  disabled={isSyncing}
                  onClick={() => { setIsPanelOpen(false); onCloseEdit(); }}
                  className="p-1.5 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Error indicator */}
              {errorText && (() => {
                const isApiDisabled = errorText.toLowerCase().includes("photoslibrary.googleapis.com has not been used") || 
                  errorText.toLowerCase().includes("disabled") ||
                  errorText.toLowerCase().includes("not been used") ||
                  errorText.toLowerCase().includes("api") ||
                  errorText.toLowerCase().includes("forbidden");
                
                return (
                  <div className="mx-6 mt-4 p-4 rounded-xl bg-red-950/40 border border-red-500/20 flex flex-col gap-3">
                    <div className="flex gap-3 items-start">
                      <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={16} />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-red-300">Mensagem do Google Photos:</p>
                        <p className="text-[11px] text-red-200/80 leading-relaxed font-light mt-1 max-h-32 overflow-y-auto">{errorText}</p>
                      </div>
                    </div>
                    {isApiDisabled && (
                      <div className="pt-2 border-t border-red-500/10 flex flex-col gap-2">
                        <p className="text-[10px] text-amber-300/90 leading-normal">
                          💡 <strong>Ação Necessária:</strong> A API "Google Photos Library API" precisa ser ativada no seu console Google Cloud para que você possa ler seus álbuns de fotos. (Se você já ativou as credenciais e recriou o projeto, simplesmente saia e conecte novamente à sua conta do Google!)
                        </p>
                        <a 
                          href={`https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com?project=${firebaseConfig.projectId}`}
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white rounded-lg text-[10px] uppercase font-bold tracking-wider text-center transition-all inline-flex items-center justify-center gap-1.5 shadow"
                        >
                          <Sparkles size={11} /> ATIVAR API DO GOOGLE PHOTOS NO CONSOLE
                        </a>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Main Content Pane */}
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
                        Se você é o André, conecte sua conta Google para gerenciar seus projetos e sincronizar imagens diretamente de seus álbuns.
                      </p>
                    </div>

                    <button
                      onClick={handleGoogleLogin}
                      disabled={isAuthLoading}
                      className="w-full max-w-xs h-12 flex items-center justify-center gap-3 bg-white text-black hover:bg-white/90 font-medium rounded-full text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                          Conectar Google Photos
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* Admin Panel Content */
                  <div className="flex flex-col gap-6">
                    {/* User profile bar */}
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        {user?.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || ""} className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center font-bold text-white text-sm">AL</div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-white">{user?.displayName || "Administrador"}</p>
                          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                            Sincronizado
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

                    {/* Active work indicator */}
                    {activeProjectToEdit ? (
                      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10 relative shrink-0">
                            <img src={activeProjectToEdit.imageUrl} alt={activeProjectToEdit.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-[#a5b4fc] block">Substituindo Imagem em:</span>
                            <h4 className="text-xs font-medium text-white truncate max-w-[280px]">{activeProjectToEdit.title}</h4>
                            <span className="text-[9px] text-white/40 uppercase">{activeProjectToEdit.category}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                        <p className="text-xs text-white/50 font-light">
                          Selecione um dos trabalhos do seu site para re-definir a imagem a partir do seu Google Fotos.
                        </p>
                      </div>
                    )}

                    {/* Albums and Photos grid */}
                    {accessToken && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <h3 className="text-xs uppercase tracking-widest text-white/70 font-semibold flex items-center gap-2">
                            {selectedAlbumId ? <ImageIcon size={14} /> : <Folder size={14} />}
                            {selectedAlbumId ? "Imagens Disponíveis" : "Seus Álbuns"}
                          </h3>

                          {selectedAlbumId && (
                            <button
                              onClick={() => handleSelectAlbum(null)}
                              className="text-[10px] uppercase text-[#a5b4fc] hover:text-white transition-colors"
                            >
                              Voltar aos Álbuns
                            </button>
                          )}
                        </div>

                        {/* Albums List */}
                        {!selectedAlbumId && (
                          <div className="flex flex-col gap-2">
                            {isLoadingAlbums ? (
                              <div className="py-12 flex flex-col items-center justify-center gap-2 text-white/50 text-xs">
                                <Loader2 size={24} className="animate-spin text-white/70" />
                                Carregando álbuns...
                              </div>
                            ) : albums.length === 0 ? (
                              <div className="py-12 text-center text-xs text-white/40 font-light flex flex-col items-center justify-center gap-3">
                                <p>Nenhum álbum encontrado no seu Google Fotos.</p>
                                <button onClick={fetchAlbums} className="px-3 py-1.5 rounded-full border border-white/10 text-white/80 hover:bg-white/5 flex items-center gap-1 text-[10px]">
                                  <RefreshCw size={10} /> Atualizar
                                </button>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-3">
                                {/* Bibliote Geral block */}
                                <div
                                  onClick={() => handleSelectAlbum(null)}
                                  className="p-3 rounded-xl border border-dashed border-white/10 hover:border-white/30 bg-[#161822]/40 text-left cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between h-24"
                                >
                                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/80">
                                    <ImageIcon size={14} />
                                  </div>
                                  <div>
                                    <h4 className="text-[11px] font-medium text-white truncate">Geral</h4>
                                    <p className="text-[8px] tracking-wider text-white/40 uppercase">Geral Library (Tudo)</p>
                                  </div>
                                </div>

                                {albums.map((album) => (
                                  <div
                                    key={album.id}
                                    onClick={() => handleSelectAlbum(album.id)}
                                    className="p-3 rounded-xl border border-white/5 hover:border-white/20 bg-[#12141c] text-left cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between h-24 "
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-[#a5b4fc]">
                                        <Folder size={14} />
                                      </div>
                                      <span className="text-[8px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full font-mono">
                                        {album.mediaItemsCount || 0}
                                      </span>
                                    </div>
                                    <div>
                                      <h4 className="text-[11px] font-medium text-white truncate max-w-full" title={album.title}>
                                        {album.title}
                                      </h4>
                                      <p className="text-[8px] tracking-wider text-white/40 uppercase">Álbum do Google</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Photos Grid inside selected album or general */}
                        {selectedAlbumId !== undefined && (
                          <div className="flex flex-col gap-4">
                            {isLoadingPhotos && photos.length === 0 ? (
                              <div className="py-12 flex flex-col items-center justify-center gap-2 text-white/50 text-xs">
                                <Loader2 size={24} className="animate-spin text-white/70" />
                                Buscando fotos do Google...
                              </div>
                            ) : photos.length === 0 ? (
                              <div className="py-12 text-center text-xs text-white/40 font-light">
                                Nenhuma foto encontrada neste diretório/álbum.
                              </div>
                            ) : (
                              <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-3 gap-2">
                                  {photos.map((photo) => (
                                    <div
                                      key={photo.id}
                                      onClick={() => { if (!isSyncing && activeProjectToEdit) handleSelectPhoto(photo); }}
                                      className={`aspect-square relative rounded-lg overflow-hidden border bg-black/40 cursor-pointer transition-all ${
                                        isSyncing 
                                          ? 'opacity-40 cursor-not-allowed border-transparent' 
                                          : 'border-white/5 hover:border-white/30 hover:scale-[1.03]'
                                      }`}
                                    >
                                      {/* Thumbnail */}
                                      <img
                                        src={`${photo.baseUrl}=w150-h150-c`}
                                        alt={photo.filename}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                                    </div>
                                  ))}
                                </div>

                                {/* Load More photos */}
                                {searchPageToken && !isLoadingPhotos && (
                                  <button
                                    onClick={() => fetchPhotosFromAlbum(selectedAlbumId, searchPageToken)}
                                    className="py-2.5 rounded-xl border border-white/5 bg-[#12141c] hover:bg-white/5 text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors font-medium text-center"
                                  >
                                    Carregar Mais Fotos
                                  </button>
                                )}

                                {isLoadingPhotos && (
                                  <div className="py-4 text-center text-white/40 text-[10px] italic flex items-center justify-center gap-2">
                                    <Loader2 size={12} className="animate-spin" /> Carregando mais...
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status / Sync Overlay */}
              <AnimatePresence>
                {isSyncing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30"
                  >
                    <div className="relative mb-5 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 flex items-center justify-center animate-spin border-t-indigo-500" />
                      <div className="absolute w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <RefreshCw size={16} className="text-[#a5b4fc] animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-medium text-white tracking-widest uppercase">
                        Sincronizando Imagem
                      </h4>
                      <p className="text-xs text-[#a5b4fc] italic font-light mt-1.5">
                        {uploadStatus || "Carregando..."}
                      </p>
                      <p className="text-[10px] text-white/30 max-w-xs mt-4 leading-relaxed font-light">
                        Isso pode levar alguns segundos enquanto baixamos os bytes do Google Photos e escrevemos de forma segura no Firebase Storage.
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

