import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data';
import { Category, Project } from '../types';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { getDriveImageUrl, handleDriveImageError } from '../lib/googleDrive';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Edit3, Sparkles, Image, Filter, ArrowUpRight, CheckCircle2, X, Tag, 
  Lightbulb, Layers, ChevronLeft, ChevronRight, Maximize2
} from 'lucide-react';

const categories: (Category | 'Todos')[] = ['Todos', 'UI/UX Design', 'Identidade Visual', 'Social Media', 'Peças Gráficas'];

interface ProjectsProps {
  isAdmin: boolean;
  onSelectProjectToEdit: (project: Project) => void;
}

export function Projects({ isAdmin, onSelectProjectToEdit }: ProjectsProps) {
  const { lang, t, getProject, getCategoryName } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [customProjects, setCustomProjects] = useState<(Project & { fromPhotos?: boolean })[]>(() => 
    defaultProjects.map(proj => ({ ...proj, fromPhotos: false }))
  );
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<(Project & { fromPhotos?: boolean }) | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Dynamic overlay: Fetch Firestore data and merge with local defaults
  useEffect(() => {
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
            fromPhotos: true,
          } as Project & { fromPhotos?: boolean };
        }
        return { 
          ...proj, 
          gallery: proj.gallery || [proj.imageUrl],
          fromPhotos: false 
        };
      });
      setCustomProjects(merged);
    }, (error) => {
      console.warn("Aviso de sincronização Firestore (usando acervo nativo):", error);
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, []);

  // Reset active gallery index when opening a new case study
  useEffect(() => {
    setActiveGalleryIndex(0);
    setIsLightboxOpen(false);
  }, [selectedCaseStudy?.id]);

  const filteredProjects = activeCategory === 'Todos' 
    ? customProjects 
    : customProjects.filter(p => p.category === activeCategory);

  const { eyebrow, title: categoryTitle } = (() => {
    if (lang === 'en') {
      switch (activeCategory) {
        case 'Todos':
          return { eyebrow: 'Selected Work', title: 'All Work' };
        case 'UI/UX Design':
          return { eyebrow: 'Selected UI/UX Work', title: 'UI/UX Design' };
        case 'Identidade Visual':
          return { eyebrow: 'Selected Brand Identity', title: 'Brand Identity' };
        case 'Social Media':
          return { eyebrow: 'Selected Digital Content', title: 'Social Media' };
        case 'Peças Gráficas':
          return { eyebrow: 'Selected Graphic Design', title: 'Print & Graphic Design' };
        default:
          return { eyebrow: `Selected ${getCategoryName(activeCategory)}`, title: getCategoryName(activeCategory) };
      }
    }
    switch (activeCategory) {
      case 'Todos':
        return { eyebrow: 'Trabalhos Selecionados', title: 'Todos os Trabalhos' };
      case 'UI/UX Design':
        return { eyebrow: 'Trabalhos de UI/UX Selecionados', title: 'UI/UX Design' };
      case 'Identidade Visual':
        return { eyebrow: 'Branding & Identidade Selecionados', title: 'Identidade Visual' };
      case 'Social Media':
        return { eyebrow: 'Conteúdo Digital Selecionado', title: 'Social Media' };
      case 'Peças Gráficas':
        return { eyebrow: 'Design Gráfico Selecionado', title: 'Peças Gráficas' };
      default:
        return { eyebrow: `Trabalhos de ${activeCategory} Selecionados`, title: activeCategory };
    }
  })();


  const getColSpanClass = (index: number) => {
    const patternIndex = index % 7;
    switch (patternIndex) {
      case 0:
        return 'md:col-span-6 min-h-[380px]'; // Row 1 (2 items): 50%
      case 1:
        return 'md:col-span-6 min-h-[380px]'; // Row 1 (2 items): 50%
      case 2:
        return 'md:col-span-12 min-h-[420px]'; // Row 2 (1 big full-width item): 100%
      case 3:
        return 'md:col-span-4 min-h-[360px]'; // Row 3 (3 items): 33%
      case 4:
        return 'md:col-span-4 min-h-[360px]'; // Row 3 (3 items): 33%
      case 5:
        return 'md:col-span-4 min-h-[360px]'; // Row 3 (3 items): 33%
      case 6:
        return 'md:col-span-7 min-h-[380px]'; // Row 4 (2 asymmetric items): 58%
      default:
        return 'md:col-span-5 min-h-[380px]'; // Row 4 (2 asymmetric items): 42%
    }
  };

  // Helper to compute active gallery images list
  const currentGallery = selectedCaseStudy 
    ? (selectedCaseStudy.gallery && selectedCaseStudy.gallery.length > 0 
        ? selectedCaseStudy.gallery 
        : [selectedCaseStudy.imageUrl]) 
    : [];

  const activeImage = currentGallery[activeGalleryIndex] || selectedCaseStudy?.imageUrl || '';

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveGalleryIndex(prev => (prev === 0 ? currentGallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveGalleryIndex(prev => (prev === currentGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="trabalhos" className="py-24 px-6 w-full max-w-[1024px] mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="shrink-0"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-[#f0f0f0] whitespace-nowrap">
            {categoryTitle}
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-start md:justify-end w-full md:flex-1"
        >
          {/* Minimal Glass Segmented Control Container - Expandido para a esquerda sem necessidade de rolagem */}
          <div className="minimal-glass rounded-full p-1.5 flex items-center gap-1 w-full md:w-auto max-w-full shadow-2xl relative">
            
            {/* Categorias sem rolagem, encaixadas com precisão */}
            <div className="flex items-center gap-1 overflow-x-auto md:overflow-visible no-scrollbar px-1 py-0.5 flex-nowrap w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-3 sm:px-3.5 h-8 flex items-center justify-center text-[10px] uppercase tracking-wider font-semibold rounded-full cursor-pointer select-none transition-all duration-300 shrink-0 whitespace-nowrap ${
                      isActive ? 'text-white font-bold' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        className="absolute inset-0 minimal-glass-active rounded-full -z-10"
                      />
                    )}
                    <span className="relative z-10">{getCategoryName(cat)}</span>
                  </button>
                );
              })}
            </div>

            <button 
              className="flex items-center justify-center w-8 h-8 rounded-full minimal-glass-subtle hover:bg-white/[0.08] active:scale-95 text-white/50 hover:text-white shrink-0 transition-all cursor-pointer ml-1"
              title={t('projects_filter_label')}
              onClick={() => {
                const el = document.getElementById('trabalhos-list');
                if (el) {
                  el.style.opacity = '0.5';
                  setTimeout(() => el.style.opacity = '1', 200);
                }
              }}
            >
              <Filter size={13} />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div id="trabalhos-list" layout className="grid grid-cols-1 md:grid-cols-12 gap-5 transition-opacity duration-300">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((rawProject, idx) => {
            const project = getProject(rawProject);
            const colSpanClass = getColSpanClass(idx);
            const projectGalleryCount = project.gallery?.length || 1;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedCaseStudy(rawProject)}
                className={`${colSpanClass} group relative overflow-hidden minimal-glass minimal-glass-interactive rounded-2xl flex flex-col cursor-pointer`}
              >
                {/* Admin quick edit button */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProjectToEdit(rawProject);
                    }}
                    className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 minimal-glass-active hover:bg-white/20 active:scale-95 text-white text-[9px] uppercase tracking-wider font-semibold rounded-lg shadow-xl transition-all cursor-pointer"
                    title={lang === 'en' ? 'Change Image / Gallery' : 'Mudar Imagem / Galeria'}
                  >
                    <Edit3 size={11} />
                    <span>{lang === 'en' ? 'Change Image / Gallery' : 'Mudar Imagem / Galeria'}</span>
                  </button>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/95 z-10" />
                <img 
                  referrerPolicy="no-referrer"
                  src={getDriveImageUrl(project.imageUrl)} 
                  onError={(e) => handleDriveImageError(e, project.imageUrl)}
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                
                <div className="relative z-20 flex flex-col justify-between h-full p-6 md:p-8 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/80 font-medium block minimal-glass-subtle px-3 py-1 rounded-full">
                        {project.badge || getCategoryName(project.category)}
                      </span>
                      {projectGalleryCount > 1 && (
                        <span className="text-[9px] font-medium text-white/70 minimal-glass-subtle px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Image size={10} /> {lang === 'en' ? 'Gallery' : 'Galeria'} ({projectGalleryCount})
                        </span>
                      )}
                      {project.fromPhotos && (
                        <span className="text-[8px] font-semibold text-emerald-300 minimal-glass-subtle px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                          <Sparkles size={10} /> {lang === 'en' ? 'Customized' : 'Customizada'}
                        </span>
                      )}
                    </div>
                    
                    <div className="w-8 h-8 rounded-full minimal-glass-subtle flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all shrink-0">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    {project.subtitle && (
                      <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">
                        {project.subtitle}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-light tracking-tight uppercase text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="mt-2 text-xs text-white/60 font-light leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] minimal-glass-subtle text-white/50 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>


      {/* Interactive Case Study Detail Modal with Full Image Gallery */}
      <AnimatePresence>
        {selectedCaseStudy && (() => {
          const caseStudy = getProject(selectedCaseStudy);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
              onClick={() => setSelectedCaseStudy(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl minimal-glass rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
              >
                {/* Modal Banner / Main Active Image Showcase */}
                <div className="relative h-72 md:h-96 w-full overflow-hidden bg-black/60 shrink-0 group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      referrerPolicy="no-referrer"
                      src={getDriveImageUrl(activeImage)} 
                      onError={(e) => handleDriveImageError(e, activeImage)}
                      alt={`${caseStudy.title} - ${lang === 'en' ? 'Image' : 'Imagem'} ${activeGalleryIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setIsLightboxOpen(true)}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-transparent to-black/60 pointer-events-none" />
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedCaseStudy(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full minimal-glass-subtle hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20"
                    aria-label={t('projects_close_modal')}
                  >
                    <X size={18} />
                  </button>

                  {/* Lightbox Expand Trigger */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full minimal-glass-subtle hover:bg-white/20 text-white text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer z-20"
                  >
                    <Maximize2 size={12} />
                    <span>{lang === 'en' ? 'Expand' : 'Expandir'} ({activeGalleryIndex + 1}/{currentGallery.length})</span>
                  </button>

                  {/* Gallery Navigation Arrows (if >1 image) */}
                  {currentGallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full minimal-glass-subtle hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                        title={lang === 'en' ? 'Previous Image' : 'Imagem Anterior'}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full minimal-glass-subtle hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105 active:scale-95"
                        title={lang === 'en' ? 'Next Image' : 'Próxima Imagem'}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Badge Overlay */}
                  <div className="absolute bottom-4 left-6 md:left-8 z-10 flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-white/90 font-medium minimal-glass-subtle px-3 py-1 rounded-full">
                      {caseStudy.badge || getCategoryName(caseStudy.category)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 minimal-glass-subtle px-3 py-1 rounded-full">
                      {getCategoryName(caseStudy.category)}
                    </span>
                  </div>
                </div>

                {/* Gallery Thumbnails Strip */}
                {currentGallery.length > 1 && (
                  <div className="minimal-glass-subtle border-y border-white/10 px-6 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
                    <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                      <Image size={13} className="text-white/70" />
                      <span>{lang === 'en' ? 'Gallery' : 'Galeria'} ({currentGallery.length})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentGallery.map((imgUrl, imgIdx) => {
                        const isSelected = imgIdx === activeGalleryIndex;
                        return (
                          <button
                            key={imgIdx}
                            onClick={() => setActiveGalleryIndex(imgIdx)}
                            className={`relative w-16 h-12 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                              isSelected 
                                ? 'border-white/80 ring-2 ring-white/20 scale-105 opacity-100' 
                                : 'border-white/10 hover:border-white/30 opacity-50 hover:opacity-80'
                            }`}
                          >
                            <img 
                              referrerPolicy="no-referrer"
                              src={getDriveImageUrl(imgUrl)} 
                              onError={(e) => handleDriveImageError(e, imgUrl)}
                              alt={`Thumb ${imgIdx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  <div>
                    {caseStudy.subtitle && (
                      <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
                        {caseStudy.subtitle}
                      </p>
                    )}
                    <h2 className="text-2xl md:text-3xl font-light uppercase tracking-tight text-white">
                      {caseStudy.title}
                    </h2>
                    <p className="mt-3 text-sm text-white/70 font-light leading-relaxed">
                      {caseStudy.fullDescription || caseStudy.description}
                    </p>
                  </div>

                  {/* Dedicated UX Callout (Highlighting UX decisions) */}
                  {caseStudy.uxCallout && (
                    <div className="p-4 rounded-2xl minimal-glass-subtle flex gap-3 items-start">
                      <Lightbulb className="text-white/80 shrink-0 mt-0.5" size={18} />
                      <div className="text-xs text-white/90 leading-relaxed font-light">
                        <strong className="text-white font-semibold block mb-0.5 uppercase tracking-wider text-[10px]">
                          {lang === 'en' ? 'UX Rationale & Focused Usability' : 'Diferencial de UX & Usabilidade Focada'}
                        </strong>
                        {caseStudy.uxCallout}
                      </div>
                    </div>
                  )}

                  {/* Key Features & Highlights */}
                  {caseStudy.highlights && caseStudy.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <Layers size={14} className="text-white/70" />
                        <span>{lang === 'en' ? 'Features & Developed Solutions' : 'Funcionalidades & Soluções Desenvolvidas'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {caseStudy.highlights.map((item, hIdx) => (
                          <div key={hIdx} className="p-3.5 rounded-xl minimal-glass-subtle flex gap-2.5 items-start">
                            <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-white/80 font-light leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {caseStudy.tags && caseStudy.tags.length > 0 && (
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <Tag size={13} className="text-white/40" />
                      <span className="text-[10px] uppercase text-white/40 tracking-wider">Tags:</span>
                      {caseStudy.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] minimal-glass-subtle text-white/70 px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action footer */}
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-3">
                    {isAdmin && (
                      <button
                        onClick={() => {
                          const proj = selectedCaseStudy;
                          setSelectedCaseStudy(null);
                          onSelectProjectToEdit(proj);
                        }}
                        className="px-4 py-2 minimal-glass-active hover:bg-white/20 text-white rounded-xl text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Edit3 size={14} />
                        <span>{lang === 'en' ? 'Edit in Admin Panel' : 'Editar Fotos e Galeria no Painel'}</span>
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCaseStudy(null)}
                      className="ml-auto px-6 py-2.5 minimal-glass-button rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      {lang === 'en' ? 'Close Case Study' : 'Fechar Case'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Lightbox Fullscreen Viewer Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedCaseStudy && (() => {
          const caseStudy = getProject(selectedCaseStudy);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-between p-4 md:p-8"
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Top Bar */}
              <div className="w-full max-w-6xl flex justify-between items-center text-white z-20">
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-white">{caseStudy.title}</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">
                    {lang === 'en' ? 'Image' : 'Imagem'} {activeGalleryIndex + 1} {lang === 'en' ? 'of' : 'de'} {currentGallery.length}
                  </p>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full minimal-glass-subtle hover:bg-white/20 text-white transition-all cursor-pointer"
                  aria-label={t('projects_close_modal')}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Lightbox Image */}
              <div 
                className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  referrerPolicy="no-referrer"
                  src={getDriveImageUrl(activeImage)} 
                  onError={(e) => handleDriveImageError(e, activeImage)}
                  alt="Fullscreen View" 
                  className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl"
                />

                {currentGallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full minimal-glass-subtle hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title={lang === 'en' ? 'Previous Image' : 'Imagem Anterior'}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full minimal-glass-subtle hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title={lang === 'en' ? 'Next Image' : 'Próxima Imagem'}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Thumbnails Bottom Bar */}
              {currentGallery.length > 1 && (
                <div 
                  className="w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-2.5 px-4 minimal-glass rounded-2xl z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentGallery.map((imgUrl, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setActiveGalleryIndex(imgIdx)}
                      className={`w-14 h-10 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                        imgIdx === activeGalleryIndex ? 'border-indigo-400 ring-2 ring-indigo-500/50 scale-105' : 'border-white/10 opacity-40 hover:opacity-80'
                      }`}
                    >
                      <img 
                        referrerPolicy="no-referrer" 
                        src={getDriveImageUrl(imgUrl)} 
                        onError={(e) => handleDriveImageError(e, imgUrl)}
                        alt={`Thumb ${imgIdx}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
}


