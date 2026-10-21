import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

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
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
              {t('hero_status_kicker')}
            </span>
            <div className="minimal-glass px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{t('hero_status_available')}</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tighter uppercase text-[#f0f0f0] leading-[1.0]"
          >
            {t('hero_title_line1')} <br />
            <span className="text-white/30">{t('hero_title_amp')}</span> {t('hero_title_line2')}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-sm md:text-base text-white/60 max-w-xl font-light leading-relaxed"
          >
            {t('hero_bio')}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-8 md:mt-0"
        >
          <a href="#trabalhos" className="w-full sm:w-auto px-7 py-3.5 minimal-glass-button rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 group">
            {t('hero_cta')}
            <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
      
      {/* Bento-like visual break */}
      <div className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

