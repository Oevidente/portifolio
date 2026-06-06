import { PenTool, Smartphone, MonitorPlay, Layers } from 'lucide-react';
import { Project, Service } from './types';

// ============================================================================
// DADOS DO PORTFÓLIO
// Para adicionar um novo trabalho, basta copiar um bloco de projeto e colar abaixo,
// alterando as informações e o link da imagem (imageUrl).
// ============================================================================

export const services: Service[] = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Interfaces intuitivas e focadas na experiência do usuário para apps e web, seguindo as diretrizes mais modernas (Spatial/iOS).',
    icon: Smartphone,
  },
  {
    id: 'id-visual',
    title: 'Identidade Visual',
    description: 'Criação de logotipos, tipografia e manuais de marca que transmitem a essência e os valores do seu negócio.',
    icon: PenTool,
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'Design estratégico para redes sociais, criando conexões reais e aumentando o engajamento com peças de alto impacto.',
    icon: MonitorPlay,
  },
  {
    id: 'grafico',
    title: 'Peças Gráficas',
    description: 'Materiais institucionais, apresentações comerciais, embalagens e impressos de alta qualidade visual.',
    icon: Layers,
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Fintech App - Experiência de Pagamentos',
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1616077168079-7e090ce23f42?q=80&w=1600&auto=format&fit=crop',
    description: 'Redesign completo da jornada de pagamento, com foco em facilidade e feedback tátil (Mobile First).',
  },
  {
    id: '2',
    title: 'Lumina - Rebranding Institucional',
    category: 'Identidade Visual',
    imageUrl: 'https://images.unsplash.com/photo-1636955840493-f43a080ea1c0?q=80&w=1600&auto=format&fit=crop',
    description: 'Construção da nova marca de uma startup de IA, incluindo manual de marca e aplicações.',
  },
  {
    id: '3',
    title: 'Campanha Black Friday - E-commerce',
    category: 'Social Media',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop',
    description: 'Série de banners e vídeos curtos focados em conversão agressiva e alto contraste.',
  },
  {
    id: '4',
    title: 'Sistema de Design Interno',
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1600&auto=format&fit=crop',
    description: 'Padronização visual e componentes reutilizáveis baseados no design system da Apple para uma health-tech.',
  },
  {
    id: '5',
    title: 'Embalagens - Linha Orgânica',
    category: 'Peças Gráficas',
    imageUrl: 'https://images.unsplash.com/photo-1605370216717-d7d8e68cf6dc?q=80&w=1600&auto=format&fit=crop',
    description: 'Design de embalagem focado em sustentabilidade e minimalismo.',
  },
  {
    id: '6',
    title: 'Postagens Educacionais - Investimentos',
    category: 'Social Media',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-24638ea0b5b3?q=80&w=1600&auto=format&fit=crop',
    description: 'Carrosséis interativos e explicativos sobre fundos de investimento para o Instagram.',
  }
];
