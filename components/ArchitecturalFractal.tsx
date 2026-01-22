
import React from 'react';

const brandColors = {
  teal: '#00917c',
  blue: '#28527a',
  red: '#c15050',
  gold: '#fbbf24'
};

const ArchitecturalFractal: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
    <defs>
      <pattern id="dotGrid" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.4" fill={brandColors.blue} opacity="0.2" />
      </pattern>
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(5px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(5px) rotate(-360deg); }
        }
        .animate-draw {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 3s linear infinite;
        }
        .animate-spin-dynamic {
          animation: spin 40s linear infinite;
          transform-origin: center;
          transition: animation-duration 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .animate-spin-dynamic {
          animation-duration: 3s;
        }
        .orbiting-element {
          animation: orbit 12s linear infinite;
          transform-origin: center;
        }
        .group:hover .orbiting-element {
          animation-duration: 1.5s;
        }
        .recursive-rect {
          transition: stroke 0.3s ease;
        }
      `}</style>
    </defs>
    <rect width="100" height="100" fill="url(#dotGrid)" />
    
    <g stroke={brandColors.blue} strokeWidth="0.05" opacity="0.3">
      <path d="M 0 0 L 100 100 M 100 0 L 0 100" />
      <path d="M 50 0 V 100 M 0 50 H 100" />
    </g>

    <g fill="none" strokeWidth="0.25">
      <g className="animate-spin-dynamic">
        {[...Array(12)].map((_, i) => {
          const colors = [brandColors.teal, brandColors.blue, brandColors.red, brandColors.gold];
          const color = colors[i % colors.length];
          return (
            <rect 
              key={`r-${i}`}
              x={50 - (i * 3.5)} 
              y={50 - (i * 3.5)} 
              width={i * 7} 
              height={i * 7} 
              stroke={color}
              className="animate-pulse recursive-rect"
              style={{ 
                animationDelay: `${i * 0.1}s`, 
                strokeOpacity: 0.8 - (i * 0.05),
                transform: `rotate(${i * 10}deg)`,
                transformOrigin: 'center'
              }}
            />
          );
        })}
        
        <circle cx="50" cy="50" r="46" stroke={brandColors.teal} strokeDasharray="1,3" strokeOpacity="0.4" />
        <circle cx="50" cy="50" r="38" stroke={brandColors.blue} strokeDasharray="4,2" strokeOpacity="0.5" />
        <circle cx="50" cy="50" r="32" stroke={brandColors.gold} strokeDasharray="0.5,5" strokeOpacity="0.6" />
        
        <path d="M 50 12 L 88 78 L 12 78 Z" stroke={brandColors.red} strokeOpacity="0.4" />
        <path d="M 50 88 L 12 22 L 88 22 Z" stroke={brandColors.teal} strokeOpacity="0.4" />
      </g>
      
      <circle cx="50" cy="50" r="28" stroke={brandColors.blue} className="animate-draw" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="20" stroke={brandColors.teal} className="animate-draw" style={{ animationDirection: 'reverse', animationDuration: '4s' }} strokeOpacity="0.4" />
      
      {[0, 90, 180, 270].map((angle, i) => {
        const colors = [brandColors.teal, brandColors.red, brandColors.blue, brandColors.gold];
        return (
          <g key={i} transform={`rotate(${angle}, 50, 50) translate(0, -42)`}>
            <rect x="-2.5" y="-2.5" width="5" height="5" stroke={colors[i]} className="orbiting-element" strokeOpacity="0.8" />
            <circle r="1" fill={colors[i]} opacity="0.6" />
          </g>
        );
      })}

      {[0, 100].map((x, xi) => [0, 100].map((y, yi) => {
        const cornerColor = (xi + yi) % 2 === 0 ? brandColors.teal : brandColors.blue;
        return (
          <g key={`${x}-${y}`} transform={`translate(${x === 0 ? 5 : 85}, ${y === 0 ? 5 : 85})`}>
            <rect x="-4" y="-4" width="8" height="8" stroke={cornerColor} strokeWidth="0.1" />
            <circle r="2.5" stroke={brandColors.red} strokeWidth="0.1" strokeOpacity="0.5" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke={cornerColor} strokeWidth="0.05" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke={cornerColor} strokeWidth="0.05" />
          </g>
        );
      }))}
    </g>
  </svg>
);

export default ArchitecturalFractal;
