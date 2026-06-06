import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Project } from './types';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeProjectToEdit, setActiveProjectToEdit] = useState<Project | null>(null);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      
      <main>
        <Hero />
        <Services />
        <Projects 
          isAdmin={isAdmin} 
          onSelectProjectToEdit={(project) => setActiveProjectToEdit(project)} 
        />
      </main>

      <Footer />

      {/* Administrative portal for portfolio owner */}
      <AdminPanel 
        onAdminStateChange={(adminActive) => setIsAdmin(adminActive)}
        activeProjectToEdit={activeProjectToEdit}
        onCloseEdit={() => setActiveProjectToEdit(null)}
      />
    </div>
  );
}

