import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { projects as defaultProjects } from '../data';
import { Category, Project } from '../types';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Edit3, Sparkles } from 'lucide-react';

const categories: (Category | 'Todos')[] = ['Todos', 'UI/UX Design', 'Identidade Visual', 'Social Media', 'Peças Gráficas'];

interface ProjectsProps {
  isAdmin: boolean;
  onSelectProjectToEdit: (project: Project) => void;
}

export function Projects({ isAdmin, onSelectProjectToEdit }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [customProjects, setCustomProjects] = useState<(Project & { fromPhotos?: boolean })[]>(() => 
    defaultProjects.map(proj => ({ ...proj, fromPhotos: false }))
  );

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
            // Dynamic image URL fallback
            imageUrl: dbProjects[proj.id].imageUrl || proj.imageUrl,
            fromPhotos: true,
          } as Project & { fromPhotos?: boolean };
        }
        return { ...proj, fromPhotos: false };
      });
      setCustomProjects(merged);
    }, (error) => {
      console.error("Erro ao sincronizar portfólio customizado via Firestore:", error);
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = activeCategory === 'Todos' 
    ? customProjects 
    : customProjects.filter(p => p.category === activeCategory);

  return (
    <section id="trabalhos" className="py-24 px-6 w-full max-w-[1024px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">Selected Works</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-[#f0f0f0]">
            Trabalhos
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest text-white/60"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-1 transition-all ${
                activeCategory === cat 
                  ? 'text-white border-b border-white' 
                  : 'hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isLarge = idx % 5 === 0;
            const isMedium = idx % 5 === 1 || idx % 5 === 4;
            let colSpan = "md:col-span-6";
            if (isLarge) colSpan = "md:col-span-12";
            else if (isMedium) colSpan = "md:col-span-7";
            else colSpan = "md:col-span-5";

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className={`${colSpan} group relative overflow-hidden bg-[#111] border border-white/5 rounded-sm flex flex-col min-h-[350px]`}
              >
                {/* Image adjustment trigger for admins */}
                {isAdmin && (
                  <button
                    onClick={() => onSelectProjectToEdit(project)}
                    className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-white text-[9px] uppercase tracking-wider font-semibold rounded-md shadow-xl transition-all border border-white/10"
                    title="Fazer Upload de Nova Imagem"
                  >
                    <Edit3 size={11} />
                    <span>Mudar Imagem</span>
                  </button>
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
                <img 
                  referrerPolicy="no-referrer"
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                
                <div className="relative z-20 flex flex-col justify-between h-full p-8 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 block bg-black/50 backdrop-blur-sm px-3 py-1.5 border border-white/10 rounded-sm">
                        {project.category}
                      </span>
                      {project.fromPhotos && (
                        <span className="text-[8px] font-semibold text-emerald-400 bg-emerald-500/15 backdrop-blur-sm border border-emerald-500/20 px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                          <Sparkles size={10} /> Customizada
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] bg-black/30 backdrop-blur-sm text-white/80">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight uppercase group-hover:text-white transition-colors">{project.title}</h3>
                    {project.description && (
                      <p className="mt-2 text-xs text-white/50 font-light leading-relaxed max-w-lg italic">
                        "{project.description}"
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

