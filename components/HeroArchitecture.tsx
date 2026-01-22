
import React, { useState, useEffect } from 'react';

const brandColors = {
  teal: '#00917c',
  blue: '#28527a',
  red: '#c15050',
  gold: '#fbbf24'
};

const HeroArchitecture: React.FC = () => {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random latency between 0 and 100
      setLatency(Math.floor(Math.random() * 101));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full p-8 overflow-visible group cursor-pointer">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
          @keyframes pulse-stroke {
            0%, 100% { stroke-opacity: 0.2; stroke-width: 0.5; }
            50% { stroke-opacity: 0.8; stroke-width: 1.5; }
          }
          @keyframes flow {
            to { stroke-dashoffset: -20; }
          }
          @keyframes rapid-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .hero-float { 
            animation: float 6s ease-in-out infinite; 
            transform-origin: center;
          }
          .hero-pulse { 
            animation: pulse-stroke 4s ease-in-out infinite; 
            transition: animation-duration 0.3s ease;
          }
          .hero-flow { 
            stroke-dasharray: 4, 16; 
            animation: flow 2s linear infinite; 
          }
          
          /* Interactive Hover States */
          .group:hover .hero-pulse {
            animation-duration: 0.5s !important; /* Blink faster */
            stroke-opacity: 1 !important;
            stroke-width: 2 !important;
          }
          
          .hero-cluster {
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: center;
          }
          
          .group:hover .hero-cluster {
            animation: rapid-spin 8s linear infinite !important;
          }

          .isometric-node { transition: all 0.5s ease; }
          .group:hover .isometric-node { filter: url(#glow); }
        `}</style>
      </defs>

      {/* Explicit Background to match hero-section */}
      <rect width="200" height="200" fill="#040404" />

      {/* Blueprint Grid Background */}
      <g opacity="0.15">
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>
            <line x1="0" y1={i * 10} x2="200" y2={i * 10} stroke="white" strokeWidth="0.2" />
            <line x1={i * 10} y1="0" x2={i * 10} y2="200" stroke="white" strokeWidth="0.2" />
          </React.Fragment>
        ))}
      </g>

      <g className="hero-float">
        <g className="hero-cluster">
          {/* Central Cluster */}
          <g transform="translate(100, 100)">
            <path d="M 0 -30 L 26 -15 L 0 0 L -26 -15 Z" fill={brandColors.blue} opacity="0.8" />
            <path d="M 0 0 L 26 -15 L 26 15 L 0 30 Z" fill={brandColors.blue} opacity="0.6" />
            <path d="M 0 0 L -26 -15 L -26 15 L 0 30 Z" fill={brandColors.blue} opacity="0.4" />
            <path d="M 0 -30 L 26 -15 L 26 15 L 0 30 L -26 15 L -26 -15 Z" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
          </g>

          {/* Connection Beams - The "Edges" that blink */}
          <g stroke="white" strokeWidth="0.5" opacity="0.3">
            <line x1="100" y1="100" x2="40" y2="60" className="hero-pulse" />
            <line x1="100" y1="100" x2="160" y2="60" className="hero-pulse" style={{ animationDelay: '1s' }} />
            <line x1="100" y1="100" x2="100" y2="170" className="hero-pulse" style={{ animationDelay: '2s' }} />
          </g>

          {/* Satellite Nodes */}
          <g className="isometric-node">
            <circle cx="40" cy="60" r="8" fill={brandColors.teal} opacity="0.9" />
            <circle cx="160" cy="60" r="8" fill={brandColors.red} opacity="0.9" />
            <circle cx="100" cy="170" r="10" fill={brandColors.gold} opacity="0.9" />
            
            <circle cx="40" cy="60" r="12" fill="none" stroke={brandColors.teal} strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="160" cy="60" r="12" fill="none" stroke={brandColors.red} strokeWidth="0.5" strokeDasharray="2,2" />
          </g>
        </g>

        {/* Data Flow Rings */}
        <g fill="none" strokeWidth="1">
          <circle cx="100" cy="100" r="50" stroke={brandColors.teal} className="hero-flow" opacity="0.4" />
          <circle cx="100" cy="100" r="70" stroke={brandColors.blue} className="hero-flow" style={{ animationDirection: 'reverse', animationDuration: '3s' }} opacity="0.3" />
          <circle cx="100" cy="100" r="90" stroke={brandColors.red} className="hero-flow" style={{ animationDuration: '4s' }} opacity="0.2" />
        </g>
      </g>

      <text x="10" y="190" fill="white" fontSize="4" fontFamily="monospace" opacity="0.4">TOPOLOGY_V2.0</text>
      <text x="160" y="190" fill="white" fontSize="4" fontFamily="monospace" opacity="0.4" textAnchor="end">LATENCY: {latency}ms</text>
      <path d="M 10 10 L 30 10 M 10 10 L 10 30" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <path d="M 190 190 L 170 190 M 190 190 L 190 170" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
};

export default HeroArchitecture;
