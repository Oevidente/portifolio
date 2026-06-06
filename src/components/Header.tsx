import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-center"
    >
      <div className="w-full max-w-5xl glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-glass">
        <a href="#" className="font-display font-bold text-lg tracking-tight text-white">
          André Luiz
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#trabalhos" className="hover:text-white transition-colors">Trabalhos</a>
          <a href="#servicos" className="hover:text-white transition-colors">Especialidades</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre mim</a>
          <a href="#contato" className="px-4 py-2 bg-white text-black rounded-full hover:bg-white/90 hover:scale-105 transition-transform font-semibold text-xs uppercase tracking-wider">
            Entrar em contato
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[80px] left-4 right-4 glass-panel rounded-3xl p-6 flex flex-col gap-4 md:hidden shadow-2xl"
        >
          <a href="#trabalhos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Trabalhos</a>
          <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Especialidades</a>
          <a href="#sobre" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">Sobre mim</a>
          <a href="#contato" onClick={() => setIsOpen(false)} className="text-lg font-medium px-4 py-3 bg-white text-black rounded-xl text-center mt-2 uppercase tracking-widest text-xs font-bold">
            Entrar em contato
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
