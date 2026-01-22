
import React from 'react';

const ConceptStrip: React.FC = () => {
  return (
    <section className="as-seen-at-strip w-full mb-0 mt-20">
      <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px] text-center">
        <h2 className="text-white font-bold text-sm uppercase mb-6 tracking-widest opacity-80">Core Mentorship Focus</h2>
        <div className="flex flex-wrap justify-center items-center gap-10">
           {['Resilience', 'Trade-offs', 'Scalability', 'Observability', 'Efficiency'].map(word => (
             <span key={word} className="bg-white/10 px-4 py-2 text-white font-bold text-xs rounded tracking-widest">{word}</span>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ConceptStrip;
