import { Layout, Gamepad2, Share2, Palette, Printer } from 'lucide-react';
import { Project, Service } from './types';

// ============================================================================
// DADOS DO PORTFÓLIO
// ============================================================================

export const services: Service[] = [
  {
    id: 'landing-pages',
    title: 'Landing Pages & Sites',
    description: 'Desenvolvimento visual e estruturação de páginas modernas, responsivas e focadas na conversão e apresentação de ecossistemas.',
    icon: Layout,
  },
  {
    id: 'game-art',
    title: 'Capas de Jogos & Miniaturas (.webp)',
    description: 'Criação e otimização de mídias de alta performance para plataformas digitais e acervos de iGaming.',
    icon: Gamepad2,
  },
  {
    id: 'social-media',
    title: 'Mídias Sociais',
    description: 'Design estratégico e peças de alto impacto visual para redes sociais, fortalecendo a presença digital.',
    icon: Share2,
  },
  {
    id: 'id-visual',
    title: 'Identidade Visual & Branding',
    description: 'Criação de marcas, manuais de aplicação, tipografia e diretrizes estéticas marcantes para o negócio.',
    icon: Palette,
  },
  {
    id: 'impressos',
    title: 'Peças Gráficas & Impressos',
    description: 'Materiais institucionais, apresentações de alto padrão, embalagens e materiais promocionais impressos.',
    icon: Printer,
  }
];

export const projects: Project[] = [
  {
    id: 'fazenda',
    title: 'Gerenciador de Fazenda',
    subtitle: 'ERP Agrícola Completo & Gestão de Safra',
    category: 'UI/UX Design',
    badge: 'AgroTech & ERP',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Facilitando a vida de quem gerencia, reunindo em um só lugar todas as informações de plantio, safra, previsão do tempo, animais, máquinas, financeiro, logística de entregas e anotações estilo Obsidian.',
    fullDescription: 'Plataforma unificada desenvolvida para simplificar a rotina do produtor e gestor rural. O sistema centraliza decisões operacionais e financeiras através de um painel responsivo, intuitivo e com foco em alta eficiência no campo.',
    highlights: [
      'Plantio, Safra e Previsão do Tempo com telemetria em tempo real',
      'Controle de Animais (cadastro, filhotes, alimentação e histórico de saúde)',
      'Gestão de Máquinas (cadastro de frota, manutenção preventiva e lista de compras)',
      'Módulo Financeiro (diárias da semana, notas fiscais, caixa e vendas)',
      'Logística de entregas e escoamento da produção',
      'Anotações hipervinculadas estilo Obsidian para registro rápido no campo'
    ],
    tags: ['AgroTech', 'ERP', 'Dashboard', 'Obsidian Notes', 'Mobile First'],
    uxCallout: 'Interface otimizada para uso no campo, com alta legibilidade sob luz solar direta, botões de toque amplo e fluxos simplificados sem menus profundos.'
  },
  {
    id: 'thumbsync',
    title: 'ThumbSync',
    subtitle: 'Gestão Centralizada de Acervos & Artes para iGaming',
    category: 'UI/UX Design',
    badge: 'Plataforma iGaming',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Solução unificada para solicitação, catalogação e download de miniaturas (.webp) para iGaming. O solicitante lista o jogo e provedor, o designer valida/sobe no Drive, e o site libera o download direto em WebP/PNG ou marca como "Não Encontrado".',
    fullDescription: 'Plataforma unificada desenvolvida para eliminar o atrito entre equipes de operações de iGaming e designers. O solicitante registra a demanda de miniatura indicando o provedor e a prioridade no mesmo mural onde acompanha a evolução. O designer processa o arquivo no Google Drive e o sistema atualiza o status automaticamente para conclusão (liberando o download direto) ou sinaliza como "Não Encontrado" caso os assets não existam na internet.',
    highlights: [
      'Mural Único de Solicitações & Status: O usuário cadastra a demanda do jogo/provedor e acompanha a conclusão no mesmo lugar',
      'Download Direto de Miniaturas em WebP: Acesso rápido e otimizado para baixar as thumbnails prontas direto no site',
      'Cópia em 1 Clique: Botão para copiar o nome exato do jogo e opções de cópia nos formatos WebP e PNG',
      'Gestão de Prioridades & Exclusão: Definição clara do nível de urgência de cada demanda e opção para editar ou excluir itens',
      'Marcação de "Não Encontrado": O designer pode sinalizar quando os assets do jogo não forem localizados na internet',
      'Sincronização com Google Drive: O designer envia os arquivos no Drive e o site atualiza o status para concluído automaticamente'
    ],
    tags: ['iGaming', 'Thumbnails', 'WebP & PNG', 'Google Drive Sync', 'Mural de Demandas', 'Priorização'],
    uxCallout: 'SINALIZAÇÃO EXPLÍCITA E NAVEGAÇÃO SIMPLIFICADA: Painel unificado onde o solicitante faz o pedido e acompanha o status no mesmo local. Inclui download direto em WebP, cópia rápida de nomes/formatos, priorização clara e tratamento transparente para demandas não encontradas na web.'
  },
  {
    id: 'eventos',
    title: 'Gerenciador de Propostas & Curadoria de Eventos',
    subtitle: 'Orçamentos Personalizados & Curadoria de Alto Padrão',
    category: 'UI/UX Design',
    badge: 'Luxury Events',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Facilitando a vida de quem gerencia assessorias e cerimoniais de alto padrão, reunindo orçamentos personalizados para casamentos, acervo de referências, curadoria por categoria e geração de links para noivos.',
    fullDescription: 'Ecossistema completo para assessores de casamentos e cerimoniais de alto padrão. O sistema automatiza a formação de orçamentos sofisticados enquanto oferece uma área de curadoria visual encantadora para os noivos aprovarem propostas.',
    highlights: [
      'Montagem de orçamentos altamente personalizados para casamentos de luxo',
      'Gestão de acervo visual de referências por estilo e paleta de cores',
      'Curadoria detalhada por categoria (assessoria, foto e filme, decoração, alta gastronomia)',
      'Upload e associação de imagens para capas e galerias conceituais',
      'Geração instantânea de links exclusivos com apresentação interativa para o casal',
      'Cálculo automatizado do investimento total e área de aprovação direta para os noivos'
    ],
    tags: ['Eventos de Luxo', 'Curadoria Visual', 'Propostas Comerciais', 'Casamentos', 'Design System'],
    uxCallout: 'Proposta interativa visual com cálculo dinâmico de orçamento e navegação fluida estilo moodboard de alta gastronomia e decoração.'
  },
  {
    id: 'assinaturas',
    title: 'Gerenciador de Assinaturas',
    subtitle: 'Gestão Transparente de Cobranças e Grupos',
    category: 'UI/UX Design',
    badge: 'Fintech & Organização',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Eliminando a confusão de cobrar e pagar assinaturas em grupo, reunindo em um painel transparente quem deve quanto, qual o dia do vencimento e o status de cada parcela do mês.',
    fullDescription: 'Plataforma desenhada para eliminar o atrito nas cobranças recorrentes entre amigos e famílias. Com transparência total de saldo, status visual de parcelas e liquidação simplificada em apenas um toque.',
    highlights: [
      'Criação de grupos personalizados para divisão de streaming, softwares e serviços',
      'Filtro por perfil para visualização dedicada apenas aos pagamentos pendentes do próprio usuário',
      'Alternância dinâmica de telas (resumo individual x visão consolidada do grupo)',
      'Acesso à planilha anual completa e histórico financeiro organized',
      'Marcação de parcelas como pagas com 1 clique e feedback instantâneo',
      'Alertas automáticos de vencimento via notificação push no celular',
      'Sincronização bidirecional e automática com a planilha do Google'
    ],
    tags: ['Fintech', 'Google Sheets Integration', 'Push Notifications', 'Gestão Financeira'],
    uxCallout: 'Fluxo visual de pagamento em 1 clique com confirmação clara, eliminando planilhas complexas para o usuário final.'
  },
  {
    id: 'fala-ou-paga',
    title: 'Fala ou Paga (Game Edition +18)',
    subtitle: 'Party Game Digital com Troca Automatizada & Efeitos Sonoros',
    category: 'UI/UX Design',
    badge: 'Party Game Digital',
    imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Otimizando e modernizando a experiência de party games adultos para casais e grupos de amigos. Partidas dinâmicas sem necessidade de baralhos físicos, cartas interativas e som ambiente.',
    fullDescription: 'Reinvenção digital das partidas de jogos de cartas para grupos de amigos e casais. O app substitui baralhos físicos por uma interface vibrante, cheia de respostas táteis, rotação automática de rodadas e temas escuro e claro.',
    highlights: [
      'Cadastro e gerenciamento simples de jogadores com troca automática de vez',
      'Seleção aleatória inteligente de perguntas picantes e desafios de punição',
      'Galeria completa para consulta e pré-visualização de todas as cartas do catálogo',
      'Efeitos sonoros táticos e háticos (compra, revelação de cartas e cliques)',
      'Suporte completo a modo Tela Cheia em dispositivos móveis (iOS e Android)',
      'Visualização adaptativa nos modos Claro e Escuro para qualquer iluminação',
      'Manual interativo de regras integrado à partida'
    ],
    tags: ['Game UX', 'Mobile First', 'Dark & Light Mode', 'Sound FX', 'Party Game'],
    uxCallout: 'Experiência imersiva em tela cheia com feedback tátil e sonoro que substitui completamente a necessidade de baralhos de papel.'
  },
  {
    id: 'barbos-burguer',
    title: 'Barbos Burguer',
    subtitle: 'Presença Digital & Sistema Intuitivo de Pedidos',
    category: 'UI/UX Design',
    badge: 'Gastronomia Artesanal',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Elevando a experiência da hamburgueria artesanal com presença digital de alta performance, cardápio interativo, personalização completa de hambúrgueres e pedidos direto no WhatsApp.',
    fullDescription: 'Solução web completa desenvolvida para transmitir o conceito e sabor artesanal da marca Barbos Burguer. Proporciona um fluxo de pedido rápido e convidativo com montagem personalizada do hambúrguer e checkout direto no WhatsApp.',
    highlights: [
      'Cardápio digital artesanal com fotografias em altíssima resolução',
      'Personalização completa de hambúrgueres (ponto da carne, adicionais extras e remoção de ingredientes)',
      'Galeria de promoções da semana e combos artesanais exclusivos',
      'Mapas interativos com geolocalização e raio de entrega em Recife',
      'Canal direto de atendimento e calculadora de taxa de entrega por endereço',
      'Redirecionamento automatizado do pedido formatado com dados do cliente para o WhatsApp'
    ],
    tags: ['E-Commerce', 'Delivery UI', 'WhatsApp Integration', 'Interactive Maps', 'Recife'],
    uxCallout: 'Montador intuitivo de hambúrguer com preview de ingredientes e envio direto para o WhatsApp já pré-formatado.'
  },
  {
    id: 'programacao-sem-pantim',
    title: 'Programação Sem Pantim',
    subtitle: 'Landing Page & Ecossistema de Comunidade Tech',
    category: 'UI/UX Design',
    badge: 'Comunidade Tech',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Landing page moderna e intuitiva voltada para a expansão de uma comunidade tech, captação de leads, destaque para mentores, player de vídeos do YouTube e conexões com GitHub.',
    fullDescription: 'Portal de entrada da comunidade tech "Programação Sem Pantim". A página conecta novos talentos a desenvolvedores experientes através de um layout limpo, captura eficiente de e-mails e integração de conteúdo audiovisual.',
    highlights: [
      'Estrutura responsiva para captura de contatos e geração de leads (newsletter)',
      'Seção de destaque para a equipe técnica, instrutores e mentores da comunidade',
      'Canal direto de contato e FAQ interativo para sanar dúvidas rapidamente',
      'Área central multimídia com player integrado para vídeos do YouTube',
      'Conexão direta com os repositórios oficiais no GitHub e redes sociais'
    ],
    tags: ['Landing Page', 'Lead Generation', 'Tech Community', 'YouTube Embed', 'GitHub'],
    uxCallout: 'Design focado em alta taxa de conversão para novos membros, com navegação acessível e visualização clara do ecossistema.'
  },
  {
    id: 'casa-de-praia-dai-costa',
    title: 'Casa de Praia Dai Costa',
    subtitle: 'Identidade Visual & Branding Praiano',
    category: 'Identidade Visual',
    badge: 'Branding & Identidade',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Projeto de identidade visual desenvolvido com restrições orçamentárias (budget), equilibrando o requisito do briefing (coqueiro e casa) com uma estética leve, cores quentes do litoral e o contraste refrescante do mar. Aprovado de primeira.',
    fullDescription: 'Projeto de marca para a Casa de Praia Dai Costa, onde a otimização de custos exigiu uma estratégia inteligente de simplificação de formas e padrões visuais sem abrir mão do rigor técnico. O briefing exigia explicitamente a combinação de coqueiro e casa, atendida através de uma síntese geométrica elegante que harmoniza o calor do litoral e a refrescância do oceano.',
    highlights: [
      'Estratégia de simplificação de formas para adequação perfeita ao budget do projeto',
      'Integração harmoniosa dos requisitos do briefing (símbolos de coqueiro e casa)',
      'Paleta de cores em alto contraste equilibrando o calor praiano e o frescor marítimo',
      'Manual de marca funcional com diretrizes simplificadas de aplicação',
      'Aprovação imediata de primeira pelo cliente com satisfação total'
    ],
    tags: ['Identidade Visual', 'Branding', 'Logotipo', 'Budget-Friendly', 'Design Tropical'],
    uxCallout: 'Síntese visual precisa que atendeu 100% das exigências do briefing com soluções de custo otimizado sem perder a sofisticação.'
  },
  {
    id: 'deibiane-sampaio',
    title: 'Deibiane Sampaio',
    subtitle: 'Identidade Visual para Consultoria Materna & Cuidado',
    category: 'Identidade Visual',
    badge: 'Saúde & Maternidade',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Identidade visual delicada e acolhedora desenvolvida a partir do requisito de integrar a figura da mulher grávida no logotipo. Paleta suave em tons de branco, bege e verde para transmitir cuidado, serenidade e aconchego. Aprovado de primeira.',
    fullDescription: 'Projeto de marca pessoal para Deibiane Sampaio. A única exigência estrutural da cliente era a presença da silhueta de uma gestante no logotipo. A solução de design traduziu esse pedido em traços fluidos e orgânicos, combinados com uma paleta cromática confortável e tátil em tons de branco, bege e verde, estabelecendo um sentimento imediato de proteção e acolhimento.',
    highlights: [
      'Ilustração fluida e minimalista da figura gestante integrada à tipografia',
      'Sensação de aconchego e acolhimento estruturada através do design sensorial',
      'Paleta cromática tátil em tons neutros e suaves (branco, bege e verde suave)',
      'Aplicações para redes sociais, cartões institucionais e materiais de atendimento',
      'Aprovação de primeira com alinhamento total à visão da cliente'
    ],
    tags: ['Identidade Visual', 'Maternidade', 'Branding Sensorial', 'Design Acolhedor', 'Logotipo'],
    uxCallout: 'Composição de marca focada em conectar emocionalmente com mães e famílias através de tons calmos e traços orgânicos.'
  },
  {
    id: 'apdesign',
    title: 'Apdesign',
    subtitle: 'Identidade Visual & Branding Institucional',
    category: 'Identidade Visual',
    badge: 'Estúdio de Design',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542744094-3a31216994ef?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Identidade visual da marca própria criada em parceria colaborativa a partir das iniciais dos sócios André e Paulo. Proposta vibrante e sofisticada que une elegância, dinamismo e energia contagiante no desenho do logotipo e nas cores.',
    fullDescription: 'Projeto de marca para o estúdio AP Design, co-fundado por André e Paulo. A meta era criar um símbolo marcante que unisse o rigor do design técnico com a empolgação de uma consultoria jovem e arrojada. O monograma integra as iniciais A e P em um desenho geométrico contínuo e equilibrado, complementado por uma paleta vibrante que transmite dinamismo e alta sofisticação.',
    highlights: [
      'Símbolo autoral integrando as iniciais dos sócios (André e Paulo) com desenho geométrico contínuo',
      'Linguagem visual que equilibra sofisticação institucional e energia vibrante',
      'Desenho de sistema de marca aplicável a vinhetas animadas, redes sociais e papelaria',
      'Manual de identidade com guia completo de cores, tipografia e grids',
      'Proposta focada no posicionamento de mercado de estúdio criativo versátil'
    ],
    tags: ['Identidade Visual', 'Branding Institucional', 'Monograma', 'Design Studio', 'Design de Marca'],
    uxCallout: 'Construção geométrica contínua que une elegância, movimento e vibração nas aplicações físicas e digitais.'
  },
  {
    id: 'barbos-burguer-branding',
    title: 'Barbos Burguer',
    subtitle: 'Branding, Naming & Identidade Visual',
    category: 'Identidade Visual',
    badge: 'Gastronomia Artesanal',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Identidade visual marcante para hamburgueria artesanal, posicionada para competir lado a lado com grandes redes consolidadas. Linguagem jovem e autêntica que carrega a força do sobrenome "Barbosa".',
    fullDescription: 'Projeto de branding e posicionamento para a hamburgueria artesanal Barbos Burguer. O desafio foi erguer uma marca forte, reconhecível e com apelo visual equivalente às grandes franquias do setor, sem perder a essência do produto feito à mão. A identidade carrega a tradição e o peso do sobrenome "Barbosa", adaptado para um naming curto e marcante.',
    highlights: [
      'Estruturação de naming e marca baseada na tradição do sobrenome "Barbosa"',
      'Posicionamento visual competitivo em pé de igualdade com grandes marcas consolidadas',
      'Apelo gráfico jovem, marcante e instantaneamente reconhecível nas embalagens e redes',
      'Desenvolvimento de aplicações para cardápios, embalagens térmicas, fardamento e papelaria',
      'Manual de marca com paleta apetitosa e diretrizes para fotografia gastronômica'
    ],
    tags: ['Identidade Visual', 'Gastronomia', 'Branding', 'Naming', 'Embalagens'],
    uxCallout: 'Identidade visual de alto impacto focada em apetite, apelo jovem e fácil reconhecimento de marca em embalagens e canais digitais.'
  },
  {
    id: 'barbos-burguer-social',
    title: 'Barbos Burguer',
    subtitle: 'Social Media & Direção de Arte',
    category: 'Social Media',
    badge: 'Social Media & Fotografia',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Construção de apelo visual robusto para hamburgueria artesanal no nível das grandes redes de fast-food. Execução completa com fotografia profissional de produtos, iluminação dedicada e composição de alimentos.',
    fullDescription: 'Estratégia de social media e direção de arte para a Barbos Burguer. O objetivo foi criar uma presença digital marcante e apetitosa, com peças exclusivas alinhadas à identidade gráfica da marca e ensaios fotográficos profissionais com câmera, iluminação de estúdio e rebatedores para destacar a suculência e os detalhes de cada hambúrguer.',
    highlights: [
      'Direção de arte e construção de feed com alto apelo estético para fast-food artesanal',
      'Sessão de fotografia profissional de produtos usando iluminação dedicada e rebatedores',
      'Criação de templates e peças exclusivas integrando elementos e paleta da marca',
      'Aumento do desejo de consumo e engajamento orgânico nas redes sociais',
      'Aplicações para campanhas promocionais, lançamentos de pratos e stories diários'
    ],
    tags: ['Social Media', 'Direção de Arte', 'Fotografia de Gastronomia', 'Fast Food', 'Engajamento'],
    uxCallout: 'Fotografia gastronômica profissional e paleta em alto contraste direcionadas a despertar desejo imediato nos canais digitais.'
  },
  {
    id: 'femina-salutem-social',
    title: 'Femina Salutem',
    subtitle: 'Gestão de Conteúdo & Saúde da Mulher',
    category: 'Social Media',
    badge: 'Saúde Materna',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Comunicação humanizada e acolhedora voltada à saúde da mulher e maternidade. Design leve focado em conteúdos educativos sobre amamentação, pós-parto, laserterapia e datas comemorativas.',
    fullDescription: 'Estratégia de conteúdo e design para a Femina Salutem (Consultoria em Amamentação, Pós-Parto, Laserterapia e Tapping). O projeto busca transmitir segurança, delicadeza e sensibilidade, organizando orientações médicas e técnicas em carrosséis explicativos e peças humanizadas para mães e famílias.',
    highlights: [
      'Criação de carrosséis e posts educativos sobre amamentação e pós-parto',
      'Design humanizado com paleta acolhedora que transmite empatia e autoridade técnica',
      'Peças comemorativas para datas institucionais e conscientização sobre saúde feminina',
      'Organização clara de informações complexas para fácil leitura e salvamentos no Instagram',
      'Padronização de destaques, capa de reels e templates para comunicação contínua'
    ],
    tags: ['Social Media', 'Saúde da Mulher', 'Conteúdo Educativo', 'Acolhimento', 'Design Humanizado'],
    uxCallout: 'Organização visual que traduz conceitos médicos em conteúdos acessíveis, promovendo acolhimento e alta taxa de salvamento.'
  },
  {
    id: 'humanas-integradas-social',
    title: 'Humanas Integradas',
    subtitle: 'Marketing Educacional & Campanhas de Performance',
    category: 'Social Media',
    badge: 'Marketing Educacional',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Comunicação estratégica para cursinho pré-vestibular voltada ao Enem e vestibulares regionais. Destaque para aprovações, turmas presenciais/online e campanhas de matrículas.',
    fullDescription: 'Direção de arte e social media para o cursinho Humanas Integradas. Foco na criação de campanhas de alta conversão para processos seletivos, peças vibrantes de aprovação de alunos nas universidades mais concorridas e divulgação contínua dos diferenciais do ecossistema de ensino.',
    highlights: [
      'Campanhas visuais de impacto para atração de alunos no presencial e online',
      'Design de comemoração de aprovações com alto engajamento dos estudantes e famílias',
      'Estruturação de conteúdos informativos com dicas de estudo, simulados e cronogramas',
      'Padronização da identidade visual do cursinho em todas as redes sociais',
      'Criação de materiais para stories, feed e anúncios patrocinados (Ads)'
    ],
    tags: ['Social Media', 'Marketing Educacional', 'Enem & Vestibulares', 'Campanhas', 'Performance'],
    uxCallout: 'Grid dinâmico e vibrante projetado para gerar identificação com estudantes pré-vestibulandos e transmitir alto índice de aprovação.'
  },
  {
    id: 'down-up-social',
    title: 'Down Up',
    subtitle: 'Causa Social & Conscientização',
    category: 'Social Media',
    badge: 'Inclusão & Causa Social',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Linguagem acessível, alegre e inclusiva promovendo ações voltadas a pessoas com Síndrome de Down. Conteúdos informativos, convites para eventos institucionais e divulgação de etapas do projeto.',
    fullDescription: 'Estratégia de comunicação visual para a iniciativa social Down Up. O projeto foca em desmistificar conceitos, promover a inclusão e divulgar eventos e etapas institucionais através de um design vibrante, acessível e profundamente humano.',
    highlights: [
      'Design inclusivo e acessível para engajamento e conscientização social',
      'Criação de convites visuais para eventos institucionais e encontros da comunidade',
      'Infográficos educativos desmistificando a Síndrome de Down com dados e afeto',
      'Comunicação de conquistas, etapas do projeto e campanhas comemorativas',
      'Identidade vibrante que fortalece a presença da causa nas redes sociais'
    ],
    tags: ['Social Media', 'Causa Social', 'Inclusão', 'Conscientização', 'Design Humano'],
    uxCallout: 'Hierarquia clara e paleta alegre projetadas para facilitar o compartilhamento e engajar o público na causa social.'
  },
  {
    id: 'ens-educandario-social',
    title: 'ENS — Educandário Nivaldo da Silva',
    subtitle: 'Comunicação Escolar & Captação',
    category: 'Social Media',
    badge: 'Educação Infantil & Fundamental',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Fortalecimento da autoridade institucional e captação de novos alunos para escola. Design pedagógico, informativo e afetuoso para divulgação da rotina escolar e matrículas abertas.',
    fullDescription: 'Gestão visual e peças de social media para o Educandário Nivaldo da Silva (ENS). O projeto transmite a segurança, os valores e o ambiente acolhedor da escola para pais e responsáveis, combinando momentos do dia a dia escolar com campanhas estratégicas de matrículas.',
    highlights: [
      'Campanhas de Matrículas Abertas com forte apelo institucional para captação de alunos',
      'Postagens pedagógicas mostrando atividades práticas e a rotina do ambiente escolar',
      'Comunicação direta com a comunidade escolar sobre eventos, avisos e feriados',
      'Visual limpo e organized transmitindo confiança, tradição e cuidado',
      'Design otimizado para fácil leitura em telas de smartphones de pais e responsáveis'
    ],
    tags: ['Social Media', 'Comunicação Escolar', 'Captação de Alunos', 'Educação', 'Institucional'],
    uxCallout: 'Design institucional que transmite afeto e segurança, alinhando captação de alunos com transparência pedagógica.'
  },
  {
    id: 'uninassau-tamandare-social',
    title: 'Uninassau (Polo Tamandaré)',
    subtitle: 'Ensino Superior & Presença Regional',
    category: 'Social Media',
    badge: 'Ensino Superior',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Divulgação de cursos de graduação e pós-graduação no polo local. Campanhas de vestibulares, comunicados acadêmicos e fortalecimento da marca universitária na região.',
    fullDescription: 'Produção de peças de comunicação para o polo da Uninassau em Tamandaré. A estratégia visa engajar jovens e profissionais da região, promovendo cursos superiores, bolsas de estudo e eventos acadêmicos com o padrão de qualidade do grupo educacional.',
    highlights: [
      'Campanhas de Vestibular, Prova de Bolsas e Matrículas em cursos EAD e presenciais',
      'Comunicados acadêmicos e avisos de prazos organizados de forma clara e objetiva',
      'Peças regionais conectando a universidade à comunidade local de Tamandaré',
      'Divulgação de novos cursos, oficinas e atividades de extensão',
      'Adequação contínua do guia de marca nacional da instituição para o polo regional'
    ],
    tags: ['Social Media', 'Ensino Superior', 'Campanhas Regionais', 'Vestibular', 'Comunicação'],
    uxCallout: 'Direcionamento estético focado em conversão e clareza informativa para prazos acadêmicos e matrículas.'
  },
  {
    id: 'jennifer-eleuterio-social',
    title: 'Jennifer Eleutério',
    subtitle: 'Saúde, Movimento & Performance Esportiva',
    category: 'Social Media',
    badge: 'Saúde & Esporte',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Construção de autoridade para profissional especialista em dor e movimento. Conteúdos para feed/stories sobre musculação, prática esportiva e cobertura visual de corridas de rua (pódios e participantes).',
    fullDescription: 'Estratégia visual e social media para Jennifer Eleutério, especialista em dor, reabilitação e movimento. A comunicação combina conhecimento científico acessível com o dinamismo do esporte, cobrindo provas de corrida de rua, celebração de pódios e dicas práticas de treino e prevenção de lesões.',
    highlights: [
      'Conteúdos técnicos simplificados sobre prevenção de dores, biomecânica e musculação',
      'Cobertura visual de eventos esportivos e corridas de rua com destaque para conquistas',
      'Templates modernos e dinâmicos para Feed e Stories com alto índice de interação',
      'Fortalecimento de autoridade profissional e atração de novos alunos para consultoria',
      'Peças motivacionais e informativas para promoção do estilo de vida saudável'
    ],
    tags: ['Social Media', 'Saúde & Movimento', 'Corrida de Rua', 'Educação Física', 'Personal Trainer'],
    uxCallout: 'Estética enérgica e técnica que une a emoção do esporte ao rigor do tratamento e movimento corporal.'
  },
  {
    id: 'deibiane-sampaio-social',
    title: 'Deibiane Sampaio',
    subtitle: 'Enfermagem Obstétrica, Maternidade & Doulagem',
    category: 'Social Media',
    badge: 'Maternidade & Doulagem',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Comunicação afetuosa, técnica e acolhedora voltada ao universo da gestação, parto humanizado e pós-parto. Materiais educativos para consultoria materna e datas comemorativas.',
    fullDescription: 'Design de conteúdo para redes sociais focado em Enfermagem Obstétrica, Maternidade e Doulagem. O projeto traduz temas como preparação para o parto, amamentação, cuidados com o recém-nascido e apoio emocional em peças visuais delicadas, respeitosas e altamente informativas.',
    highlights: [
      'Posts educativos sobre parto humanizado, etapas da gestação e amamentação',
      'Linguagem acolhedora que cria laço de confiança com gestantes e puérperas',
      'Desenvolvimento de carrosséis ricos em detalhes práticos para o dia a day da mãe',
      'Identidade alinhada ao posicionamento de cuidado técnico com sensibilidade humana',
      'Peças institucionais e comemorativas para apoio contínuo à família'
    ],
    tags: ['Social Media', 'Enfermagem Obstétrica', 'Parto Humanizado', 'Doulagem', 'Maternidade'],
    uxCallout: 'Design afetuoso e seguro que orienta mães em momentos decisivos da gestação com clareza visual.'
  }
];
