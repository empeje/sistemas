import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onSubmit: (apiKey: string) => void;
  onClose: () => void;
}

const ApiKeyModal: React.FC<Props> = ({ isOpen, onSubmit, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }
    if (!apiKey.startsWith('AIza')) {
      setError('Invalid Gemini API key format. It should start with "AIza"');
      return;
    }
    onSubmit(apiKey.trim());
    setApiKey('');
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full mx-4 shadow-2xl border border-gray-200">
        <div className="bg-[#00917C] px-8 py-6">
          <h2 className="text-white text-sm font-bold uppercase tracking-widest">
            <i className="fas fa-key mr-3"></i>
            Gemini API Key Required
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-700 leading-relaxed">
              To use Sistemas, you need to provide your own Google Gemini API key.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">API Key</span>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="AIza..."
                className="mt-2 w-full bg-gray-50 border border-gray-200 border-l-4 border-l-[#00917C] px-4 py-3 text-sm focus:border-gray-300 focus:outline-none"
              />
            </label>
            {error && (
              <p className="text-xs text-red-600 font-medium">{error}</p>
            )}
          </div>

          <div className="pt-2 space-y-3">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00917C] hover:underline font-medium flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i>
              Get your free API key from Google AI Studio
            </a>
          </div>
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <button
            onClick={handleSubmit}
            className="iconic-hover border-teal flex-1 bg-[#00917C] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest border-none hover:bg-[#007d6a] transition-colors"
          >
            <i className="fas fa-check mr-2"></i>
            Continue
          </button>
          <button
            onClick={onClose}
            className="iconic-hover border-gray px-6 py-3 text-xs font-bold uppercase tracking-widest bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
