
import React from 'react';
import { COPYRIGHT_TEXT, FOOTER_DESCRIPTION, FOOTER_LINKS } from '../constants';

interface FooterProps {
  onHomeClick: (e: React.MouseEvent) => void;
}

const Footer: React.FC<FooterProps> = ({ onHomeClick }) => {
  return (
    <footer className="footer-bg w-full py-16">
      <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px] flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <p className="font-bold text-gray-700 mb-4 uppercase tracking-tighter">{COPYRIGHT_TEXT}</p>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md italic">
            {FOOTER_DESCRIPTION}
          </p>
        </div>
        <div className="flex gap-16">
          <div>
            <h3 className="font-bold text-[#293c4b] text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link, index) => (
                <li key={link.label}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.url}
                    className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"
                  >
                    <div className={`w-1 h-3 ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-[#00917c]' : 'bg-blue-500'}`}></div>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#293c4b] text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.community.map((link, index) => (
                <li key={link.label}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.url}
                    className="text-gray-600 hover:text-[#00917c] text-sm flex items-center gap-2"
                  >
                    <div className={`w-1 h-3 ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-[#00917c]' : 'bg-blue-500'}`}></div>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
