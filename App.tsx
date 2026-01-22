import React, { useState, useEffect } from 'react';
import { Problem } from './types';
import InterviewSession from './components/InterviewSession';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignSistemasSection from './components/DesignSistemasSection';
import ProblemGrid from './components/ProblemGrid';
import ConceptStrip from './components/ConceptStrip';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';

const STORAGE_KEY = 'sistemas_gemini_api_key';
const aiMode = process.env.AI_MODE || 'BYOK'; // Default to BYOK if not set

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  useEffect(() => {
    // Check AI_MODE configuration
    if (aiMode === 'MANAGED') {
      // Use the API key from environment variable
      const envApiKey = process.env.GEMINI_API_KEY;
      if (envApiKey) {
        setApiKey(envApiKey);
      }
    } else if (aiMode === 'BYOK') {
      // In BYOK mode, try to load from localStorage
      const storedKey = localStorage.getItem(STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem(STORAGE_KEY, key);
    setShowApiKeyModal(false);
  };

  const handleProblemSelect = (problem: Problem) => {
    // In BYOK mode, check if we have an API key
    if (aiMode === 'BYOK' && !apiKey) {
      setShowApiKeyModal(true);
      setSelectedProblem(problem);
    } else {
      setSelectedProblem(problem);
    }
  };

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProblem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProblem && apiKey) {
    return <InterviewSession problem={selectedProblem} onExit={() => setSelectedProblem(null)} apiKey={apiKey} />;
  }

  return (
    <div className="flex flex-col items-center">
      <Navbar onHomeClick={handleGoHome} />
      
      <Hero />

      <main className="w-full max-w-[960px] xl:max-w-[1140px] px-[15px] mb-20">
        <DesignSistemasSection />
        <ProblemGrid onSelectProblem={handleProblemSelect} />
      </main>

      <ConceptStrip />

      <Footer onHomeClick={handleGoHome} />

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onSubmit={handleApiKeySubmit}
        onClose={() => {
          setShowApiKeyModal(false);
          setSelectedProblem(null);
        }}
      />
    </div>
  );
};

export default App;
