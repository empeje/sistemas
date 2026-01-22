
import React from 'react';
import { Problem } from '../types';
import { SYSTEM_DESIGN_PROBLEMS } from '../constants';

interface ProblemGridProps {
  onSelectProblem: (problem: Problem) => void;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({ onSelectProblem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SYSTEM_DESIGN_PROBLEMS.map((problem, idx) => (
        <div 
          key={problem.id}
          className={`p-8 border border-gray-200 cursor-pointer transition-all hover:shadow-lg flex flex-col iconic-hover ${
            idx % 2 === 0 ? 'border-teal' : 'border-blue'
          }`}
          onClick={() => onSelectProblem(problem)}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-[#293c4b] group-hover:text-white transition-colors uppercase tracking-tight">{problem.title}</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-50 text-gray-400 border border-gray-100">{problem.difficulty}</span>
          </div>
          <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed flex-1 mb-6">
            {problem.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {problem.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-gray-400 border border-gray-100 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemGrid;
