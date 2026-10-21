import { motion } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-center"
    >
      <div className="w-full max-w-5xl minimal-glass rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg tracking-tight text-white hover:text-white/90 transition-colors whitespace-nowrap shrink-0">
          André Luiz
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#trabalhos" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t('nav_works')}</a>
          <a href="#servicos" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t('nav_specialties')}</a>
          <a href="#sobre" className="hover:text-white transition-colors whitespace-nowrap shrink-0">{t('nav_about')}</a>
          <a href="#contato" className="minimal-glass-button px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0">
            {t('nav_contact')}
          </a>

          {/* Minimalist Liquid Glass Language Switcher */}
          <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all ${
                lang === 'pt'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="Português (Brasil)"
              title="Português (Brasil)"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all ${
                lang === 'en'
                  ? 'bg-white text-black shadow-sm font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label="English (Global)"
              title="English (Global)"
            >
              EN
            </button>
          </div>
        </nav>

        {/* Mobile Actions: Language Switcher + Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                lang === 'pt'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/60'
              }`}
              aria-label="Português"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/60'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button 
            className="p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('nav_close_menu') : t('nav_open_menu')}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute top-[76px] left-4 right-4 minimal-glass rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-2xl"
        >
          <a href="#trabalhos" onClick={() => setIsOpen(false)} className="text-base font-medium text-white/80 hover:text-white transition-colors py-1">
            {t('nav_works')}
          </a>
          <a href="#servicos" onClick={() => setIsOpen(false)} className="text-base font-medium text-white/80 hover:text-white transition-colors py-1">
            {t('nav_specialties')}
          </a>
          <a href="#sobre" onClick={() => setIsOpen(false)} className="text-base font-medium text-white/80 hover:text-white transition-colors py-1">
            {t('nav_about')}
          </a>
          <a href="#contato" onClick={() => setIsOpen(false)} className="minimal-glass-button px-4 py-3 rounded-xl text-center mt-2 uppercase tracking-widest text-xs font-bold">
            {t('nav_contact')}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

