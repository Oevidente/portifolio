import { motion } from 'motion/react';
import { services } from '../data';

export function Services() {
  return (
    <section id="servicos" className="py-24 px-6 w-full max-w-[1024px] mx-auto">
      <div className="w-full">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-8 border-b border-white/10 pb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">Especialidades</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-[#f0f0f0]">
            Expertise
          </h2>
        </motion.div>

        {/* Bento grid approach for services */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {services.map((service, idx) => {
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
                className={`${colSpan} bg-[#111319] border border-white/10 hover:border-white/25 p-8 flex flex-col justify-between rounded-xl transition-all duration-300 group relative overflow-hidden`}
              >
                {idx === 0 && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />}
                
                <div className="relative z-10 w-full">
                  <div className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center text-white/80 mb-6 group-hover:bg-white group-hover:text-black transition-all">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-300 mb-1 block">
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
