import { motion } from 'motion/react';
import { services } from '../data';
import { useLanguage } from '../i18n/LanguageContext';

export function Services() {
  const { t, getService } = useLanguage();

  return (
    <section id="servicos" className="py-24 px-6 w-full max-w-[1024px] mx-auto">
      <div className="w-full">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-8 border-b border-white/10 pb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">
            {t('services_kicker')}
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-[#f0f0f0]">
            {t('services_title')}
          </h2>
        </motion.div>

        {/* Bento grid approach for services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {services.map((rawService, idx) => {
            const service = getService(rawService);
            const Icon = service.icon;
            // 5 items: Row 1 has 2 items (col-span-7, col-span-5), Row 2 has 3 items (col-span-4 each)
            let colSpan = "md:col-span-4";
            if (idx === 0) colSpan = "md:col-span-7";
            else if (idx === 1) colSpan = "md:col-span-5";
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`${colSpan} minimal-glass minimal-glass-interactive p-8 flex flex-col justify-between rounded-2xl group relative overflow-hidden`}
              >
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 minimal-glass-subtle rounded-xl flex items-center justify-center text-white/80 mb-6 group-hover:bg-white group-hover:text-black transition-all">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1 block font-medium">
                    {service.title}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed font-light mt-2">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

