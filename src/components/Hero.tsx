import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 pt-32 max-w-[1024px] mx-auto">
      <div className="w-full relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
        <div className="max-w-2xl">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="mb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">— Status</span>
            <span className="text-white text-xs border border-white/10 px-3 py-1 rounded-sm bg-[#111]">Disponível para projetos</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tighter uppercase text-[#f0f0f0] leading-[1.0]"
          >
            Visual Design <br />
            <span className="text-white/30">&</span> Experiências
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-sm md:text-base text-white/60 max-w-xl font-light leading-relaxed"
          >
            Sou André Luiz Alves, criador de interfaces, identidades visuais e projetos gráficos. Combinando estética refinada e pragmatismo para elevar negócios.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-8 md:mt-0"
        >
          <a href="#trabalhos" className="w-full sm:w-auto px-8 py-4 bg-[#f0f0f0] text-black rounded-sm text-[11px] uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 group">
            Ver Trabalhos
            <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
      
      {/* Bento-like visual break */}
      <div className="mt-16 w-full h-[1px] bg-white/10" />
    </section>
  );
}
