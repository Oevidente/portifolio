import { motion } from 'motion/react';
import { Compass, GraduationCap, Briefcase, Award, CheckCircle, Sparkles, Building2 } from 'lucide-react';

export function About() {
  const currentDeliverables = [
    'Criar Landing Pages & Sites Responsivos',
    'Criar Artes para Capas de Jogos & Miniaturas (.webp)',
    'Criar Artes para Mídias Sociais & Campanhas',
    'Criar Artes para Impressão & Materiais Promocionais',
    'Criar Artes de Identidade Visual & Branding'
  ];

  const referenceClients = [
    {
      name: 'Primavera Cerimonial',
      description: 'Maior e mais premiado cerimonial de alto padrão de Recife',
      badge: 'Cerimonial & Eventos'
    },
    {
      name: 'Bet da Sorte',
      description: 'Plataforma e ecossistema de jogos online / iGaming',
      badge: 'iGaming'
    },
    {
      name: 'Femina Salutem',
      description: 'Consultoria em Amamentação, Pós-Parto, Laserterapia & Tapping',
      badge: 'Saúde & Bem-Estar'
    }
  ];

  const additionalClients = [
    { name: 'FSI', segment: 'Cursinho Pré-Vestibular' },
    { name: 'Humanas Integradas', segment: 'Cursinho Pré-Vestibular' },
    { name: 'Hiago Dantas', segment: 'Advocacia & Direito' },
    { name: 'Keola França', segment: 'Advocacia & Direito' },
    { name: 'Neo Eletrônica', segment: 'Tecnologia & Eletrônica' },
    { name: 'Dolce Cuisine', segment: 'Gastronomia & Confeitaria' },
    { name: 'Barbos Burguer', segment: 'Gastronomia & Food Service' },
    { name: 'Down Up', segment: 'Causa Social & Inclusão' },
    { name: 'ENS', segment: 'Educação Escolar' },
    { name: 'Uninassau (Tamandaré)', segment: 'Ensino Superior' },
    { name: 'Jennifer Eleutério', segment: 'Saúde & Performance' }
  ];

  return (
    <section id="sobre" className="py-24 px-6 w-full max-w-[1024px] mx-auto">
      <div className="w-full">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 border-b border-white/10 pb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 block">Sobre Mim</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter uppercase text-[#f0f0f0]">
            Trajetória, Clientes & Visão
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Philosophy Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 bg-gradient-to-r from-[#151722] via-[#11131a] to-[#0d0e14] border border-white/10 p-8 md:p-10 rounded-xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 shrink-0">
                <Compass size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-indigo-300 block mb-1">
                  Filosofia & Visão
                </span>
                <p className="text-base md:text-lg text-white/90 font-light leading-relaxed italic">
                  "Boas soluções visuais não apenas comunicam, mas também inspiram e conectam. Acredito que cada projeto deve refletir uma compreensão profunda das necessidades e desejos dos clientes, transformando conceitos em experiências visuais significativas e impactantes."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reference Clients Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-12 bg-[#111319] border border-white/10 p-6 md:p-8 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 block">Marcas & Clientes de Referência</span>
                <h3 className="text-lg font-light uppercase text-white tracking-tight">Projetos & Parcerias</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {referenceClients.map((client, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                  <span className="text-[9px] uppercase font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded border border-indigo-500/30 mb-2 inline-block">
                    {client.badge}
                  </span>
                  <h4 className="text-sm font-medium text-white uppercase tracking-tight">{client.name}</h4>
                  <p className="text-xs text-white/50 font-light mt-1 leading-relaxed">
                    {client.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Other Notable Clients Roster */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider block mb-3">
                Outras Marcas & Clientes Atendidos
              </span>
              <div className="flex flex-wrap gap-2">
                {additionalClients.map((client, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                    <span className="text-xs font-medium text-white/90">{client.name}</span>
                    <span className="text-[9px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                      {client.segment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline - Jornada (Education & Origins) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 bg-[#111319] border border-white/10 p-6 md:p-8 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Formação Tecnológica</span>
                  <h3 className="text-lg font-light uppercase text-white tracking-tight">Jornada Acadêmica</h3>
                </div>
              </div>

              <div className="space-y-6 relative border-l border-white/10 pl-6 ml-3">
                {/* Milestone 2010 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 border border-black" />
                  <span className="text-[10px] font-mono font-semibold text-indigo-300 block mb-1">2010</span>
                  <h4 className="text-sm font-medium text-white">Computação Gráfica — SAGA</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed mt-1">
                    School of Arts, Games and Animation. Imersão inicial nas artes visuais, criação digital e fundamentos gráficos.
                  </p>
                </div>

                {/* Milestone 2014 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 border border-black" />
                  <span className="text-[10px] font-mono font-semibold text-white/50 block mb-1">2014</span>
                  <h4 className="text-sm font-medium text-white">Técnico em Computação Gráfica — IFPE</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed mt-1">
                    Instituto Federal de Pernambuco. Aprofundamento prático em Design, Edição de Vídeo, Fotografia e Modelagem 3D.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline - Experiência Atual (Atuação Freelancer/PJ) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6 bg-[#111319] border border-white/10 p-6 md:p-8 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                  <Briefcase size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Atuação Profissional</span>
                  <h3 className="text-lg font-light uppercase text-white tracking-tight">Experiência & Entregas</h3>
                </div>
              </div>

              <div className="space-y-6 relative border-l border-white/10 pl-6 ml-3">
                {/* Milestone 2017 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 border border-black" />
                  <span className="text-[10px] font-mono font-semibold text-white/50 block mb-1">2017</span>
                  <h4 className="text-sm font-medium text-white">Atuação Freelancer & Co-fundador da AP Design</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed mt-1">
                    Co-fundador ao lado de Paulo José dos Santos Barbosa. Criação de identidades visuais completas, redes sociais, materiais promocionais e vinhetas animadas.
                  </p>
                </div>

                {/* Milestone Atual */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
                  <span className="text-[10px] font-mono font-semibold text-emerald-300 block mb-1">ATUALIDADE</span>
                  <h4 className="text-sm font-medium text-white">Designer Gráfico & Digital (PJ / Freelance)</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed mt-1 mb-3">
                    Atendimento direto a empresas e marcas de referência desenvolvendo soluções visuais completas:
                  </p>
                  <ul className="space-y-1.5">
                    {currentDeliverables.map((item, idx) => (
                      <li key={idx} className="text-[11px] text-white/80 font-light flex items-center gap-2">
                        <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

