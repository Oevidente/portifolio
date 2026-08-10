import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Sparkles, Mail, Lock, Unlock, ArrowUp } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

const ADMIN_EMAIL = "andreluiz1902@gmail.com";

interface LiquidGlassDockProps {
  onAdminToggle: () => void;
}

export function LiquidGlassDock({ onAdminToggle }: LiquidGlassDockProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Synced Auth State for active glow
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const isVerified = !!(
        currentUser && 
        currentUser.email === ADMIN_EMAIL && 
        currentUser.emailVerified
      );
      setIsAdmin(isVerified);
    });
    return () => unsubscribe();
  }, []);

  // Scroll detection: Auto hide/show dock based on scroll direction (iOS Safari style)
  // And IntersectionObserver to set active indicator tab
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep visible at topmost, hide floating when scrolling down fast, show when scrolling up
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 40) {
        setIsVisible(false); // Scrolling down
      } else if (lastScrollY - currentScrollY > 45) {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = ['servicos', 'trabalhos', 'contato'];
    
    // Set up observer for section trigger tracking
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center viewport trigger zone
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });

      // Special case: upper page tracking
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const dockItems = [
    { id: 'servicos', label: 'Expertise', icon: Sparkles, href: '#servicos' },
    { id: 'trabalhos', label: 'Trabalhos', icon: Briefcase, href: '#trabalhos' },
    { id: 'contato', label: 'Contato', icon: Mail, href: '#contato' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] md:max-w-md w-full"
        >
          {/* Main Floating Glass Capsule Dock */}
          <div className="liquid-glass rounded-full p-2 flex items-center justify-between shadow-2xl relative gap-2 h-14">
            
            {/* Top edge glare sheen line */}
            <div className="absolute top-[1.5px] left-6 right-6 h-[0.7px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full pointer-events-none" />

            {/* Back to top item */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 relative shrink-0 ${
                activeSection === 'hero' 
                  ? 'text-white' 
                  : 'text-white/40 hover:text-white/80'
              }`}
              title="Voltar ao início"
            >
              {activeSection === 'hero' && (
                <motion.div
                  layoutId="dockPill"
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  className="absolute inset-0 liquid-glass-active rounded-full"
                />
              )}
              <ArrowUp size={15} className="relative z-10" />
            </button>

            {/* Vertical dividing line */}
            <div className="w-[1px] h-6 bg-white/10 shrink-0" />

            {/* Main Nav Items and Sliding indicators */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {dockItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative flex-1 flex flex-col items-center justify-center h-10 rounded-full cursor-pointer select-none transition-all duration-300 hover:scale-[1.08] active:scale-95 ${
                      isActive ? 'text-white font-medium' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dockPill"
                        transition={{ type: "spring", stiffness: 220, damping: 24 }}
                        className="absolute inset-0 liquid-glass-active rounded-full"
                      />
                    )}
                    
                    {/* Visual icon label pairing */}
                    <div className="relative z-10 flex items-center gap-1.5 px-3">
                      <Icon size={14} />
                      <span className="hidden xs:inline text-[9px] uppercase tracking-widest font-semibold">{item.label}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Vertical dividing line */}
            <div className="w-[1px] h-6 bg-white/10 shrink-0" />

            {/* Integrated Admin Panel triggering key */}
            <button
              onClick={onAdminToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 relative shrink-0 ${
                isAdmin 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
              title={isAdmin ? "Administrador Activo (Clique para abrir painel)" : "Acesso Restrito ao Autor"}
            >
              {isAdmin ? (
                <Unlock size={14} className="animate-pulse" />
              ) : (
                <Lock size={14} />
              )}
            </button>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
