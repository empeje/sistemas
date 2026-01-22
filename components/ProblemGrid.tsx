
import React from 'react';
import { Problem } from '../types';
import { SYSTEM_DESIGN_PROBLEMS } from '../constants';

interface ProblemGridProps {
  onSelectProblem: (problem: Problem) => void;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({ onSelectProblem }) => {
  const getBorderClass = (idx: number) => {
    const colors = ['border-teal', 'border-blue', 'border-red', 'border-amber'];
    return colors[idx % colors.length];
  };

  const getTagColor = (tagIdx: number) => {
    const colors = [
      'border-teal text-[#00917c]',
      'border-blue text-[#28527a]',
      'border-red text-[#c15050]',
      'border-amber text-[#D97706]'
    ];
    return colors[tagIdx % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SYSTEM_DESIGN_PROBLEMS.map((problem, idx) => (
        <div 
          key={problem.id}
          className={`p-8 border border-gray-200 cursor-pointer transition-all hover:shadow-lg flex flex-col iconic-hover ${getBorderClass(idx)}`}
          onClick={() => onSelectProblem(problem)}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-[#293c4b] hover-text-white transition-colors uppercase tracking-tight">{problem.title}</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-50 text-gray-400 border border-gray-100 hover-text-white transition-colors">{problem.difficulty}</span>
          </div>
          <p className="text-gray-600 hover-text-white-90 text-sm leading-relaxed flex-1 mb-6">
            {problem.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag, tagIdx) => (
              <span key={tag} className={`text-[9px] font-bold uppercase tracking-wider border px-2 py-0.5 hover-text-white transition-colors ${getTagColor(tagIdx)}`}>
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
