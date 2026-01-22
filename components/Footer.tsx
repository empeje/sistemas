
import React from 'react';
import { COPYRIGHT_TEXT, FOOTER_DESCRIPTION, MENTOR_URL } from '../constants';

interface FooterProps {
  onHomeClick: (e: React.MouseEvent) => void;
}

const Footer: React.FC<FooterProps> = ({ onHomeClick }) => {
  return (
    <footer className="footer-bg w-full py-16">
      <div className="max-w-[1140px] mx-auto px-[15px] flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <p className="font-bold text-gray-700 mb-4 uppercase tracking-tighter">{COPYRIGHT_TEXT}</p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md italic">
            {FOOTER_DESCRIPTION}
          </p>
        </div>
        <div className="flex gap-16">
          <div>
            <h3 className="font-bold text-[#293c4b] text-lg mb-4">The Lab</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={onHomeClick} className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"><div className="w-1 h-3 bg-red-500"></div> Practice</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href={MENTOR_URL} className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"><div className="w-1 h-3 bg-[#00917c]"></div> Mentorship</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#293c4b] text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a target="_blank" rel="noopener noreferrer" href={MENTOR_URL} className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"><div className="w-1 h-3 bg-blue-500"></div> Community</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href={MENTOR_URL} className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"><div className="w-1 h-3 bg-red-500"></div> Newsletter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
