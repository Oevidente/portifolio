import { Category } from '../types';

export interface ProjectTranslation {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  fullDescription?: string;
  highlights?: string[];
  tags?: string[];
  uxCallout?: string;
}

export interface ServiceTranslation {
  title: string;
  description: string;
}

export interface ClientTranslation {
  name: string;
  description: string;
  badge: string;
}

export interface AdditionalClientTranslation {
  name: string;
  segment: string;
}

export const servicesTranslations: Record<string, { pt: ServiceTranslation; en: ServiceTranslation }> = {
  'landing-pages': {
    pt: {
      title: 'Landing Pages & Sites',
      description: 'Desenvolvimento visual e estruturação de páginas modernas, responsivas e focadas na conversão e apresentação de ecossistemas.'
    },
    en: {
      title: 'Landing Pages & Websites',
      description: 'Visual design and structuring of modern, responsive web pages engineered for conversion and polished ecosystem presentation.'
    }
  },
  'game-art': {
    pt: {
      title: 'Capas de Jogos & Miniaturas (.webp)',
      description: 'Criação e otimização de mídias de alta performance para plataformas digitais e acervos de iGaming.'
    },
    en: {
      title: 'Game Covers & Thumbnails (.webp)',
      description: 'Crafting and optimization of high-performance media assets for digital gaming platforms and iGaming libraries.'
    }
  },
  'social-media': {
    pt: {
      title: 'Mídias Sociais',
      description: 'Design estratégico e peças de alto impacto visual para redes sociais, fortalecendo a presença digital.'
    },
    en: {
      title: 'Social Media',
      description: 'Strategic art direction and high-impact visual collateral for social networks, strengthening brand presence.'
    }
  },
  'id-visual': {
    pt: {
      title: 'Identidade Visual & Branding',
      description: 'Criação de marcas, manuais de aplicação, tipografia e diretrizes estéticas marcantes para o negócio.'
    },
    en: {
      title: 'Visual Identity & Branding',
      description: 'Authorial hallmarks, comprehensive brand books, typography systems, and distinctive aesthetic guidelines.'
    }
  },
  'impressos': {
    pt: {
      title: 'Peças Gráficas & Impressos',
      description: 'Materiais institucionais, apresentações de alto padrão, embalagens e materiais promocionais impressos.'
    },
    en: {
      title: 'Print & Graphic Collateral',
      description: 'Institutional materials, high-end editorial presentations, packaging design, and promotional print media.'
    }
  }
};

export const projectsTranslations: Record<string, { pt?: ProjectTranslation; en: ProjectTranslation }> = {
  'fazenda': {
    en: {
      title: 'Farm Manager',
      subtitle: 'Complete Agricultural ERP & Harvest Management',
      badge: 'AgroTech & ERP',
      description: 'Simplifying farm administration by centralizing planting schedules, crop harvests, real-time weather forecasts, livestock tracking, machinery fleets, finances, delivery logistics, and Obsidian-style notes into a single interface.',
      fullDescription: 'A unified platform crafted to streamline the daily operations of rural producers and farm managers. The system consolidates operational and financial decisions through a responsive, intuitive dashboard focused on maximum field efficiency.',
      highlights: [
        'Planting, Harvest & Weather Forecast with real-time telemetry',
        'Livestock Tracking (registration, offspring, feeding, and medical history)',
        'Machinery Fleet Management (fleet registry, preventive maintenance, purchase orders)',
        'Financial Module (weekly wages, invoices, cash flow, and sales reports)',
        'Delivery logistics and agricultural product distribution',
        'Obsidian-style hyperlinked markdown notes for fast on-field documentation'
      ],
      tags: ['AgroTech', 'ERP', 'Dashboard', 'Obsidian Notes', 'Mobile First'],
      uxCallout: 'Field-optimized interface featuring high readability under direct sunlight, generous touch targets, and flattened user flows without deep nested menus.'
    }
  },
  'thumbsync': {
    en: {
      title: 'ThumbSync',
      subtitle: 'Centralized Asset & Art Management for iGaming',
      badge: 'iGaming Platform',
      description: 'Unified solution for requesting, cataloging, and downloading iGaming thumbnails (.webp). Requesters submit game and provider demands, the designer validates and uploads to Drive, and the site enables direct WebP/PNG downloads or flags missing assets as "Not Found".',
      fullDescription: 'A unified platform built to eliminate friction between iGaming operations teams and creative designers. Requesters log thumbnail demands specifying provider and priority in the same dashboard where they track progress. Designers process assets in Google Drive and the system updates statuses automatically to completed (enabling direct download) or marks them as "Not Found" if assets are unavailable online.',
      highlights: [
        'Single Request & Status Wall: Users register game/provider demands and monitor completion in one place',
        'Direct WebP Thumbnail Downloads: Fast, optimized access to download ready thumbnails right from the site',
        '1-Click Copy: Quick copy button for exact game names and copy options in WebP and PNG formats',
        'Priority & Demand Management: Clear urgency levels for each request with options to edit or remove items',
        '"Not Found" Flagging: Designers can explicitly flag demands when assets cannot be sourced online',
        'Google Drive Synchronization: Files uploaded to Drive automatically reflect completed status in real time'
      ],
      tags: ['iGaming', 'Thumbnails', 'WebP & PNG', 'Google Drive Sync', 'Demand Wall', 'Prioritization'],
      uxCallout: 'EXPLICIT STATUSING AND STREAMLINED FLOW: Unified dashboard where users request and track progress in place. Includes direct WebP downloads, quick name/format copying, clear prioritization, and transparent handling of missing assets.'
    }
  },
  'eventos': {
    en: {
      title: 'Event Proposal & Luxury Curating Manager',
      subtitle: 'Custom Budgets & High-End Wedding Curation',
      badge: 'Luxury Events',
      description: 'Empowering luxury wedding planners and high-end ceremony coordinators by centralizing personalized budgets, visual reference archives, category-based curation, and interactive presentation links for couples.',
      fullDescription: 'A complete ecosystem for high-end wedding planners and ceremonial coordinators. The system automates sophisticated quote generation while providing an enchanting visual curation showcase for couples to review and approve proposals.',
      highlights: [
        'Custom-tailored quote builder for luxury weddings and galas',
        'Visual reference management organized by design style and color palette',
        'Detailed curation by vendor category (planning, photo & film, decor, haute cuisine)',
        'Image uploads and pairing for conceptual moodboards and cover showcases',
        'Instant generation of exclusive interactive presentation links for couples',
        'Automated total investment calculation and direct approval portal for clients'
      ],
      tags: ['Luxury Events', 'Visual Curation', 'Commercial Proposals', 'Weddings', 'Design System'],
      uxCallout: 'Interactive visual proposal featuring dynamic budget calculations and fluid moodboard navigation inspired by haute cuisine and luxury decor.'
    }
  },
  'assinaturas': {
    en: {
      title: 'Subscription Manager',
      subtitle: 'Transparent Group Billing & Expense Splitting',
      badge: 'Fintech & Organization',
      description: 'Eliminating the friction of collecting and paying group subscriptions by providing a clear dashboard showing who owes what, exact due dates, and real-time payment statuses for every monthly share.',
      fullDescription: 'A platform designed to remove awkwardness and friction from recurring expense sharing among friends and families. Featuring complete balance transparency, visual installment tracking, and one-tap payment reconciliations.',
      highlights: [
        'Custom group creation for splitting streaming, software licenses, and utility bills',
        'Profile filter providing a dedicated view focused solely on the user’s pending shares',
        'Dynamic view toggle (individual balance summary vs. consolidated group overview)',
        'Access to comprehensive annual spreadsheets and organized financial history',
        '1-click installment settlement with instant visual feedback',
        'Automated due date reminders via mobile push notifications',
        'Bidirectional and automatic synchronization with Google Sheets'
      ],
      tags: ['Fintech', 'Google Sheets Integration', 'Push Notifications', 'Financial Management'],
      uxCallout: '1-click visual payment reconciliation flow with unambiguous confirmations, removing complex spreadsheets for everyday users.'
    }
  },
  'fala-ou-paga': {
    en: {
      title: 'Speak or Pay (Party Game Edition +18)',
      subtitle: 'Digital Party Game with Automated Turns & Sound FX',
      badge: 'Digital Party Game',
      description: 'Modernizing the adult party game experience for couples and groups of friends. Dynamic matches without physical cards, interactive card decks, and immersive ambient audio effects.',
      fullDescription: 'A digital reinvention of tabletop party card games for social gatherings and couples. Replaces paper decks with a vibrant, tactile interface featuring automated turn rotation, card drawing animations, and dark/light mode versatility.',
      highlights: [
        'Effortless player onboarding and turn management with automated round progression',
        'Smart randomized selection of spicy questions and penalty challenges',
        'Full catalog gallery for previewing and inspecting cards across categories',
        'Tactile and haptic sound effects (drawing cards, flipping, and click interactions)',
        'Complete Fullscreen Mode support on mobile devices (iOS and Android)',
        'Adaptive visual themes in Dark and Light mode for any ambient lighting',
        'Interactive in-game rulebook accessible during live matches'
      ],
      tags: ['Game UX', 'Mobile First', 'Dark & Light Mode', 'Sound FX', 'Party Game'],
      uxCallout: 'Immersive fullscreen experience with haptic and audio feedback that completely supersedes the need for physical paper decks.'
    }
  },
  'barbos-burguer': {
    en: {
      title: 'Barbos Burguer',
      subtitle: 'Digital Presence & Intuitive Ordering System',
      badge: 'Artisanal Gastronomy',
      description: 'Elevating the artisanal burger bar experience with high-performance digital presence, interactive menu, granular burger customization, and direct WhatsApp checkout.',
      fullDescription: 'A full web solution crafted to communicate the flavor and artisanal heritage of Barbos Burguer. Delivers an inviting and rapid ordering flow with custom burger building and seamless WhatsApp cart dispatch.',
      highlights: [
        'Artisanal digital menu with ultra-high resolution photography',
        'Granular burger customizer (meat doneness, extra toppings, ingredient removals)',
        'Weekly specials gallery and exclusive craft combos',
        'Interactive delivery radius map with geolocation coverage in Recife',
        'Direct customer support channel and automated delivery fee calculator by address',
        'Automated dispatch of formatted order details directly into WhatsApp'
      ],
      tags: ['E-Commerce', 'Delivery UI', 'WhatsApp Integration', 'Interactive Maps', 'Recife'],
      uxCallout: 'Intuitive burger customizer with live ingredient preview and pre-formatted order dispatch to WhatsApp.'
    }
  },
  'programacao-sem-pantim': {
    en: {
      title: 'Programação Sem Pantim',
      subtitle: 'Landing Page & Tech Community Ecosystem',
      badge: 'Tech Community',
      description: 'Modern, high-conversion landing page designed for a tech community: lead generation, mentor spotlights, integrated YouTube player, and direct GitHub links.',
      fullDescription: 'The official digital front door for the "Programação Sem Pantim" tech community. Connecting aspiring talent with veteran software developers through a clean layout, effective newsletter signup, and rich audiovisual integration.',
      highlights: [
        'Responsive lead capture and newsletter subscription architecture',
        'Spotlight section celebrating core technical mentors and community instructors',
        'Direct inquiry channel and interactive FAQ for rapid onboarding',
        'Integrated multimedia center featuring embedded YouTube community video player',
        'Direct connectivity to official GitHub repositories and social channels'
      ],
      tags: ['Landing Page', 'Lead Generation', 'Tech Community', 'YouTube Embed', 'GitHub'],
      uxCallout: 'High-conversion community onboarding design with accessible navigation and transparent ecosystem overview.'
    }
  },
  'casa-de-praia-dai-costa': {
    en: {
      title: 'Casa de Praia Dai Costa',
      subtitle: 'Visual Identity & Coastal Branding',
      badge: 'Branding & Identity',
      description: 'Visual identity project crafted within lean budget constraints, synthesizing client requirements (coconut palm and beach house) with coastal warmth and crisp ocean contrast. Approved on first presentation.',
      fullDescription: 'Brand identity project for Casa de Praia Dai Costa, where cost optimization required a disciplined simplification of geometric forms without sacrificing design rigor. Meeting the explicit brief combining a palm tree and beach house with refined coastal color harmony.',
      highlights: [
        'Form simplification strategy tailored to maximize project budget efficiency',
        'Harmonious integration of brief requirements (palm tree and house iconography)',
        'High-contrast color palette balancing tropical beach heat with crisp ocean freshness',
        'Functional brand manual with simplified guidelines for signage and print collateral',
        'Immediate approval upon first client pitch with total satisfaction'
      ],
      tags: ['Visual Identity', 'Branding', 'Logotype', 'Budget-Friendly', 'Tropical Design'],
      uxCallout: 'Precise visual synthesis achieving 100% of brief criteria with cost-effective solutions maintaining refined sophistication.'
    }
  },
  'deibiane-sampaio': {
    en: {
      title: 'Deibiane Sampaio',
      subtitle: 'Visual Identity for Maternal Care & Consulting',
      badge: 'Health & Maternity',
      description: 'Delicate and comforting visual identity crafted around the requirement of incorporating a pregnant mother’s silhouette into the logo. Soft palette in white, beige, and sage green to convey serenity, protection, and warmth. Approved on first pitch.',
      fullDescription: 'Personal branding project for Deibiane Sampaio. The client’s core requirement was the presence of a mother’s pregnant silhouette in the logotype. The design translated this into fluid organic lines paired with a soothing, tactile color palette in white, warm beige, and sage green, instilling immediate feelings of reassurance and tenderness.',
      highlights: [
        'Fluid and minimalist pregnant figure illustration seamlessly paired with typography',
        'Tactile, comforting ambiance structured through sensory design principles',
        'Soft neutral color palette (cream white, warm sand beige, and gentle sage green)',
        'Collateral templates for social media, physical business cards, and care kits',
        'First-round approval in complete harmony with the client’s vision'
      ],
      tags: ['Visual Identity', 'Maternity', 'Sensory Branding', 'Nurturing Design', 'Logotype'],
      uxCallout: 'Brand composition engineered to establish an emotional connection with mothers and families through soothing tones and organic forms.'
    }
  },
  'apdesign': {
    en: {
      title: 'Apdesign',
      subtitle: 'Visual Identity & Institutional Branding',
      badge: 'Design Studio',
      description: 'Design studio visual identity created as a collaborative partnership combining founders André and Paulo’s initials. A vibrant, sophisticated proposal uniting elegance, dynamism, and contagious creative energy.',
      fullDescription: 'Brand project for AP Design studio, co-founded by André and Paulo. The objective was to forge a memorable hallmark uniting technical design rigor with the boldness of a modern creative consultancy. The monogram unites initials A and P into a continuous geometric ribbon complemented by a vibrant palette conveying dynamic momentum.',
      highlights: [
        'Authorial geometric monogram intertwining founders’ initials (André and Paulo)',
        'Visual language balancing corporate sophistication with vibrant creative energy',
        'Modular brand design adaptable to animated motion bumpers, print, and social media',
        'Comprehensive identity manual covering color systems, typography scale, and layout grids',
        'Strategic positioning focused on establishing a versatile creative studio'
      ],
      tags: ['Visual Identity', 'Institutional Branding', 'Monogram', 'Design Studio', 'Brand Design'],
      uxCallout: 'Continuous geometric ribbon construction connecting elegance, movement, and graphic power across physical and digital media.'
    }
  },
  'barbos-burguer-branding': {
    en: {
      title: 'Barbos Burguer',
      subtitle: 'Branding, Naming & Visual Identity',
      badge: 'Artisanal Gastronomy',
      description: 'Bold visual identity for an artisanal burger bar positioned to compete head-to-head with major established food chains. Authentic, youthful voice rooted in the heritage of the Barbosa family name.',
      fullDescription: 'Branding and market positioning project for Barbos Burguer. The challenge was building an iconic, recognizable brand with graphic presence rivaling large corporate franchises while preserving handcrafted food authenticity. The identity leverages the legacy of the "Barbosa" surname streamlined into a punchy, memorable moniker.',
      highlights: [
        'Naming and hallmark architecture rooted in the Barbosa family legacy',
        'Competitive visual positioning on equal footing with major food franchises',
        'Punchy, high-appetite graphic presence instantly identifiable on packaging and digital channels',
        'Custom applications for physical menus, thermal packaging, staff uniforms, and stationery',
        'Brand manual with mouth-watering color ratios and culinary photography direction'
      ],
      tags: ['Visual Identity', 'Gastronomy', 'Branding', 'Naming', 'Packaging'],
      uxCallout: 'High-impact visual identity focused on appetite appeal, youthful energy, and immediate brand recognition across packaging and digital apps.'
    }
  },
  'barbos-burguer-social': {
    en: {
      title: 'Barbos Burguer',
      subtitle: 'Social Media & Art Direction',
      badge: 'Social Media & Photography',
      description: 'Cultivating robust visual appeal for craft burgers matching the marketing caliber of major fast-food brands. Comprehensive execution with professional studio product photography, custom lighting, and food styling.',
      fullDescription: 'Social media strategy and art direction for Barbos Burguer. Engineered an appetizing, high-impact digital presence with bespoke graphics aligned to brand guidelines and studio photography featuring dedicated directional lighting and reflectors to accentuate texture, melt, and succulence.',
      highlights: [
        'Art direction and social feed curation with high aesthetic appeal for craft food',
        'Professional studio food photography using dedicated key lighting and reflectors',
        'Custom templates and promotional graphics integrating brand assets and palette',
        'Measurable increase in organic engagement and customer appetite on social channels',
        'Assets for promotional campaigns, new menu rollouts, and daily interactive stories'
      ],
      tags: ['Social Media', 'Art Direction', 'Food Photography', 'Fast Food', 'Engagement'],
      uxCallout: 'Professional culinary photography and high-contrast color palette engineered to trigger immediate food desire on social feeds.'
    }
  },
  'femina-salutem-social': {
    en: {
      title: 'Femina Salutem',
      subtitle: 'Content Management & Women\'s Health',
      badge: 'Maternal Health',
      description: 'Humanized, nurturing communication dedicated to women\'s health and postpartum care. Gentle design focused on educational content around breastfeeding, newborn care, laser therapy, and commemorative health dates.',
      fullDescription: 'Content strategy and visual design for Femina Salutem (Breastfeeding Consultancy, Postpartum Care, Laser Therapy, and Taping). The project conveys reassurance, empathy, and medical authority, distilling complex clinical guidance into educational carousels and supportive posts for mothers.',
      highlights: [
        'Educational carousels and guides on breastfeeding mechanics and postpartum recovery',
        'Human-centered design with comforting palette radiating empathy and technical authority',
        'Institutional campaigns for maternal awareness and women\'s health milestones',
        'Clear information hierarchy optimized for effortless reading and Instagram saves',
        'Standardized story highlights, reels covers, and continuous communication templates'
      ],
      tags: ['Social Media', 'Women\'s Health', 'Educational Content', 'Maternal Care', 'Humanized Design'],
      uxCallout: 'Visual hierarchy translating clinical concepts into accessible, comforting guides, driving exceptional bookmark and share rates.'
    }
  },
  'humanas-integradas-social': {
    en: {
      title: 'Humanas Integradas',
      subtitle: 'Educational Marketing & Performance Campaigns',
      badge: 'Educational Marketing',
      description: 'Strategic communication for university entrance exam prep academy (Enem and regional exams). Celebrating student acceptances, promoting in-person/online cohorts, and running high-conversion enrollment campaigns.',
      fullDescription: 'Art direction and social media management for Humanas Integradas preparatory course. Focused on building high-conversion campaigns for upcoming terms, vibrant acceptance celebration banners across prestigious universities, and continuous promotion of teaching methodology.',
      highlights: [
        'High-impact visual campaigns driving admissions across in-person and online courses',
        'Celebratory acceptance graphics fostering deep student and family engagement',
        'Structured study tips, mock exam countdowns, and schedule announcements',
        'Standardized visual identity and typography across all social platforms',
        'Multi-format assets designed for stories, feeds, and targeted paid performance ads'
      ],
      tags: ['Social Media', 'Educational Marketing', 'College Entrance', 'Ad Campaigns', 'Performance'],
      uxCallout: 'Dynamic, high-energy layout designed to build immediate rapport with pre-college students and communicate strong academic success.'
    }
  },
  'down-up-social': {
    en: {
      title: 'Down Up',
      subtitle: 'Social Cause & Awareness',
      badge: 'Inclusion & Social Cause',
      description: 'Accessible, joyful, and inclusive visual communication advocating for people with Down Syndrome. Educational infographics, institutional event invitations, and celebration of community milestones.',
      fullDescription: 'Visual communication strategy for the Down Up social initiative. The project demystifies misconceptions, champions inclusion, and promotes community gatherings through a vibrant, accessible, and deeply human design language.',
      highlights: [
        'Inclusive, high-contrast visual design optimized for accessibility and social engagement',
        'Visual invitations for community gatherings and institutional events',
        'Educational infographics presenting Down Syndrome facts with empathy and rigor',
        'Announcement of project milestones, community achievements, and celebratory campaigns',
        'Vibrant brand presence strengthening the cause across digital networks'
      ],
      tags: ['Social Media', 'Social Cause', 'Inclusion', 'Awareness', 'Human-Centered Design'],
      uxCallout: 'Clear hierarchy and uplifting palette designed for easy social sharing and broad community mobilization.'
    }
  },
  'ens-educandario-social': {
    en: {
      title: 'ENS — Educandário Nivaldo da Silva',
      subtitle: 'School Communication & Enrollment',
      badge: 'Primary & Middle School Education',
      description: 'Strengthening institutional credibility and driving new student admissions for a regional private school. Pedagogical, informative, and warm visual design showcasing daily learning and open enrollment.',
      fullDescription: 'Visual branding and social media assets for Educandário Nivaldo da Silva (ENS). Communicates safety, core educational values, and a nurturing learning environment to parents and guardians, blending candid school moments with strategic enrollment marketing.',
      highlights: [
        'Open Enrollment campaigns with strong institutional appeal for student acquisition',
        'Pedagogical showcases highlighting hands-on classroom activities and school routines',
        'Direct communication with school families regarding events, holidays, and school notices',
        'Clean, organized layout communicating institutional trust, tradition, and care',
        'Mobile-optimized designs tailored for seamless reading on parents\' smartphones'
      ],
      tags: ['Social Media', 'School Communication', 'Student Enrollment', 'Education', 'Institutional'],
      uxCallout: 'Institutional design radiating warmth and security, pairing student recruitment with educational transparency.'
    }
  },
  'uninassau-tamandare-social': {
    en: {
      title: 'Uninassau (Tamandaré Campus)',
      subtitle: 'Higher Education & Regional Presence',
      badge: 'Higher Education',
      description: 'Promoting undergraduate and postgraduate programs for the regional campus. Entrance exam campaigns, academic notices, and local brand building for one of Brazil\'s leading university groups.',
      fullDescription: 'Creative social media production for the Uninassau university campus in Tamandaré. Aimed at engaging prospective students and regional professionals through academic promotions, scholarship campaigns, and career workshops adhering to national brand standards.',
      highlights: [
        'Admissions, scholarship exams, and enrollment campaigns for online and hybrid degrees',
        'Academic deadlines and institutional notices presented with crisp visual clarity',
        'Locally grounded collateral connecting university opportunities with the Tamandaré community',
        'Promotion of new degree programs, specialized workshops, and community outreach',
        'Continuous adaptation of the university group\'s national brand guidelines for regional channels'
      ],
      tags: ['Social Media', 'Higher Education', 'Regional Campaigns', 'University Admissions', 'Communication'],
      uxCallout: 'Aesthetic direction prioritizing student conversion and informational clarity for academic dates and enrollment deadlines.'
    }
  },
  'jennifer-eleuterio-social': {
    en: {
      title: 'Jennifer Eleutério',
      subtitle: 'Health, Movement & Sports Performance',
      badge: 'Health & Athletic Performance',
      description: 'Building professional authority for a specialist in pain management and movement. Feed and stories content spanning strength training, biomechanics, and live coverage of street running events and podium wins.',
      fullDescription: 'Visual strategy and social media management for Jennifer Eleutério, specialist in movement rehabilitation and athletic performance. Bridges accessible sports science with dynamic athleticism, covering road racing events, celebrating podium finishes, and sharing practical injury prevention guides.',
      highlights: [
        'Technical insights made simple on pain prevention, biomechanics, and strength training',
        'Visual coverage of athletic events and street marathons celebrating client achievements',
        'Dynamic, modern templates for Feeds and Stories driving high community interaction',
        'Strengthened clinical authority driving client acquisition for 1-on-1 consultancy',
        'Motivational and informative content promoting longevity and healthy active lifestyles'
      ],
      tags: ['Social Media', 'Health & Movement', 'Road Running', 'Physical Education', 'Personal Training'],
      uxCallout: 'Energetic, disciplined visual style pairing the passion of competitive athletics with clinical physical rehabilitation.'
    }
  },
  'deibiane-sampaio-social': {
    en: {
      title: 'Deibiane Sampaio',
      subtitle: 'Obstetric Nursing, Maternity & Doula Care',
      badge: 'Maternity & Doula Care',
      description: 'Warm, expert, and comforting communication focused on pregnancy, humanized birth, and postpartum motherhood. Educational resources for maternal consulting and commemorative family milestones.',
      fullDescription: 'Social media content design dedicated to Obstetric Nursing, Humanized Childbirth, and Doula Support. Translates sensitive topics such as labor preparation, newborn care, and maternal emotional wellbeing into delicate, respectful, and highly actionable visual guides.',
      highlights: [
        'Educational carousel guides on humanized birth, stages of labor, and breastfeeding techniques',
        'Comforting voice and imagery cultivating deep trust with expectant and new mothers',
        'Rich practical carousels detailing postpartum care routines for daily peace of mind',
        'Visual identity embodying clinical expertise delivered with tender human compassion',
        'Institutional and milestone designs supporting long-term family wellbeing'
      ],
      tags: ['Social Media', 'Obstetric Nursing', 'Humanized Birth', 'Doula Support', 'Maternity'],
      uxCallout: 'Reassuring, tender design guiding mothers through pivotal maternal decisions with unmatched visual sensitivity.'
    }
  }
};

export const aboutTranslations = {
  deliverables: {
    pt: [
      'Criar Landing Pages & Sites Responsivos',
      'Criar Artes para Capas de Jogos & Miniaturas (.webp)',
      'Criar Artes para Mídias Sociais & Campanhas',
      'Criar Artes para Impressão & Materiais Promocionais',
      'Criar Artes de Identidade Visual & Branding'
    ],
    en: [
      'Craft Responsive Landing Pages & Modern Websites',
      'Design Game Covers & High-Performance Thumbnails (.webp)',
      'Develop Strategic Social Media Visuals & Campaigns',
      'Produce Premium Print Collateral & Marketing Materials',
      'Build Distinctive Brand Identities & Design Systems'
    ]
  },
  referenceClients: {
    pt: [
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
    ],
    en: [
      {
        name: 'Primavera Cerimonial',
        description: 'Largest and most awarded high-end luxury event & ceremonial firm in Recife',
        badge: 'Luxury Events & Ceremonials'
      },
      {
        name: 'Bet da Sorte',
        description: 'Online gaming platform and digital iGaming ecosystem',
        badge: 'iGaming Platform'
      },
      {
        name: 'Femina Salutem',
        description: 'Maternal care consulting in Breastfeeding, Postpartum & Laser Therapy',
        badge: 'Health & Maternal Wellness'
      }
    ]
  },
  additionalClients: {
    pt: [
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
    ],
    en: [
      { name: 'FSI', segment: 'College Prep Academy' },
      { name: 'Humanas Integradas', segment: 'College Prep Academy' },
      { name: 'Hiago Dantas', segment: 'Legal & Law Practice' },
      { name: 'Keola França', segment: 'Legal & Law Practice' },
      { name: 'Neo Eletrônica', segment: 'Technology & Electronics' },
      { name: 'Dolce Cuisine', segment: 'Gastronomy & Pastry' },
      { name: 'Barbos Burguer', segment: 'Gastronomy & Food Service' },
      { name: 'Down Up', segment: 'Social Cause & Inclusion' },
      { name: 'ENS', segment: 'School Education' },
      { name: 'Uninassau (Tamandaré)', segment: 'Higher Education' },
      { name: 'Jennifer Eleutério', segment: 'Health & Athletic Performance' }
    ]
  }
};

export const categoryTranslations: Record<Category | 'Todos', { pt: string; en: string }> = {
  'Todos': { pt: 'Todos', en: 'All' },
  'UI/UX Design': { pt: 'UI/UX Design', en: 'UI/UX Design' },
  'Identidade Visual': { pt: 'Identidade Visual', en: 'Brand Identity' },
  'Social Media': { pt: 'Social Media', en: 'Social Media' },
  'Peças Gráficas': { pt: 'Peças Gráficas', en: 'Print & Graphic Design' }
};
