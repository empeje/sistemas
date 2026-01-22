
import React from 'react';
import ArchitecturalFractal from './ArchitecturalFractal';

const DesignSistemasSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-gray-100 items-center">
      <div className="md:col-span-2">
        <h2 className="text-4xl font-bold text-[#293c4b] mb-6 leading-tight">Your Career is an Architecture</h2>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed mb-6">
          The transition from Senior to Staff isn't just about code—it's about the systems you design and the trade-offs you own. 
          We mentor the next generation of architects to build resilient, world-scale systems and find the roles that truly inspire them.
        </p>
        <p className="text-gray-400 font-medium">
          Select a challenge below to begin your high-fidelity mock interview with our AI mentor.
        </p>
      </div>
      <div className="hidden md:flex h-64 border border-gray-100 bg-gray-50 items-center justify-center relative overflow-hidden group cursor-pointer transition-colors hover:bg-white">
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
          <ArchitecturalFractal />
        </div>
        <div className="z-10 text-center pointer-events-none">
          <div className="w-12 h-1 bg-[#00917c] mx-auto mb-4"></div>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em] bg-white/80 px-2 py-1 backdrop-blur-sm rounded">Diseño de Sistemas</span>
        </div>
      </div>
    </div>
  );
};

export default DesignSistemasSection;
