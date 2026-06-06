export type Category = 'UI/UX Design' | 'Identidade Visual' | 'Social Media' | 'Peças Gráficas';

export interface Project {
  id: string;
  title: string;
  category: Category;
  imageUrl: string;
  description?: string;
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any; // using any for Lucide icon component reference
}
