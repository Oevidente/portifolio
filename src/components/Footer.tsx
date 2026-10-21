import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="w-full max-w-[1024px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center border-t border-white/10 gap-6 mt-16 mb-20">
      <div className="flex items-center gap-6">
        <a 
          href="https://www.instagram.com/oevidente" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          {t('footer_instagram')}
        </a>
        <span className="text-white/20 text-xs" aria-hidden="true">·</span>
        <a 
          href="mailto:andreluiz1902@gmail.com" 
          className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          {t('footer_email')}
        </a>
        <span className="text-white/20 text-xs" aria-hidden="true">·</span>
        <a 
          href="https://wa.me/5581993501305" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          {t('footer_whatsapp')}
        </a>
      </div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center md:text-right">
        <span>{t('footer_rights', { year: new Date().getFullYear() })}</span>
      </div>
    </footer>
  );
}

