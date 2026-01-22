
import React from 'react';
import { MENTOR_URL } from '../constants';

interface NavbarProps {
  onHomeClick: (e: React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHomeClick }) => {
  return (
    <nav className="w-full max-w-[1200px] px-[15px] flex justify-end py-6">
      <ul className="flex gap-2">
        <li>
          <a 
            href="#" 
            onClick={onHomeClick}
            className="iconic-hover border-blue nav-link"
          >
            Home
          </a>
        </li>
        <li>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href={MENTOR_URL} 
            className="iconic-hover border-teal nav-link"
          >
            Meet Mentor
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
