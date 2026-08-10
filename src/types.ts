export type Category = 'UI/UX Design' | 'Identidade Visual' | 'Social Media' | 'Peças Gráficas';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  imageUrl: string;
  description?: string;
  fullDescription?: string;
  highlights?: string[];
  tags?: string[];
  badge?: string;
  link?: string;
  uxCallout?: string;
  gallery?: string[];
  fromPhotos?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any; // using any for Lucide icon component reference
}
