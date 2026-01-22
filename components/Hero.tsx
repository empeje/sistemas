
import React from 'react';
import HeroArchitecture from './HeroArchitecture';
import { BRAND_NAME, APP_SUBTITLE, HERO_QUOTE } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="hero-section flex items-center justify-center mb-10">
      <div className="max-w-[960px] xl:max-w-[1140px] w-full h-full flex flex-col md:flex-row items-stretch">
        <div className="flex-none w-full md:w-1/3 h-full bg-[#040404] flex items-center justify-center overflow-hidden">
           <HeroArchitecture />
        </div>
        <div className="flex-1 px-10 py-16 flex flex-col justify-center text-white bg-[#040404]">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight text-white">{BRAND_NAME}</h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed font-light">{APP_SUBTITLE}</p>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl italic font-serif">
            {HERO_QUOTE}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
