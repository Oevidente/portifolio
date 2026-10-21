import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language } from './types';
import { translations, TranslationKey } from './translations';
import { 
  projectsTranslations, 
  servicesTranslations, 
  categoryTranslations 
} from './projectsTranslations';
import { Project, Service, Category } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  getProject: (project: Project) => Project;
  getService: (service: Service) => Service;
  getCategoryName: (category: Category | 'Todos') => string;
}

const STORAGE_KEY = 'portfolio_lang';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') {
        return saved;
      }
      // Auto-detect browser language: if Portuguese, 'pt', else 'en'
      const browserLang = navigator.language || (navigator as any).userLanguage || '';
      return browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
    } catch {
      return 'pt';
    }
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore local storage restrictions
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'pt' ? 'en' : 'pt');
  }, [lang, setLang]);

  // Synchronize HTML tag lang attribute
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = translations[lang] || translations.pt;
    let text: string = (dict[key] || translations.pt[key] || key) as string;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }
    return text;
  }, [lang]);


  const getProject = useCallback((project: Project): Project => {
    if (lang === 'pt') {
      return project;
    }
    const tr = projectsTranslations[project.id]?.en;
    if (!tr) {
      return project;
    }

    return {
      ...project,
      title: tr.title || project.title,
      subtitle: tr.subtitle !== undefined ? tr.subtitle : project.subtitle,
      badge: tr.badge !== undefined ? tr.badge : project.badge,
      description: tr.description !== undefined ? tr.description : project.description,
      fullDescription: tr.fullDescription !== undefined ? tr.fullDescription : project.fullDescription,
      highlights: tr.highlights || project.highlights,
      tags: tr.tags || project.tags,
      uxCallout: tr.uxCallout !== undefined ? tr.uxCallout : project.uxCallout,
    };
  }, [lang]);

  const getService = useCallback((service: Service): Service => {
    const tr = servicesTranslations[service.id]?.[lang];
    if (!tr) {
      return service;
    }
    return {
      ...service,
      title: tr.title,
      description: tr.description,
    };
  }, [lang]);

  const getCategoryName = useCallback((category: Category | 'Todos'): string => {
    const cat = categoryTranslations[category];
    return cat ? cat[lang] : category;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLang,
    t,
    getProject,
    getService,
    getCategoryName,
  }), [lang, setLang, toggleLang, t, getProject, getService, getCategoryName]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
