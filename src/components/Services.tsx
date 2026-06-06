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

        {/* Bento grid approach for services: col-span mixtures */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-none md:grid-rows-2 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const colSpan = idx === 0 ? "md:col-span-8" : idx === 1 ? "md:col-span-4" : idx === 2 ? "md:col-span-5" : "md:col-span-7";
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`${colSpan} bg-[#111] border border-white/5 p-8 flex flex-col ${idx === 2 ? 'items-center text-center justify-center' : 'justify-between'} rounded-sm hover:border-white/20 transition-colors group relative overflow-hidden`}
              >
                {idx === 0 && <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent pointer-events-none" />}
                
                <div className={`relative z-10 w-full ${idx === 2 ? 'flex flex-col items-center' : ''}`}>
                  <div className={`w-12 h-12 border border-white/10 flex items-center justify-center text-white/80 mb-6 group-hover:bg-white group-hover:text-black transition-colors ${idx === 2 ? 'rotate-45' : 'rounded-sm'}`}>
                    <div className={idx === 2 ? '-rotate-45' : ''}>
                       <Icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2 block">{service.title}</span>
                  <p className="text-sm text-white/60 leading-relaxed font-light mt-2 italic">
                    "{service.description}"
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
