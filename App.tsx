
import React, { useState } from 'react';
import { Problem } from './types';
import InterviewSession from './components/InterviewSession';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignSistemasSection from './components/DesignSistemasSection';
import ProblemGrid from './components/ProblemGrid';
import ConceptStrip from './components/ConceptStrip';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProblem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProblem) {
    return <InterviewSession problem={selectedProblem} onExit={() => setSelectedProblem(null)} />;
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar onHomeClick={handleGoHome} />
      
      <Hero />

      <main className="w-full max-w-[960px] xl:max-w-[1140px] px-[15px] mb-20">
        <DesignSistemasSection />
        <ProblemGrid onSelectProblem={setSelectedProblem} />
      </main>

      <ConceptStrip />


      <Footer onHomeClick={handleGoHome} />
    </div>
  );
};

export default App;
