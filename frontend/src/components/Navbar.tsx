import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-600 font-bold'
      : 'text-gray-700 font-medium hover:text-blue-600 transition-colors';

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'block px-4 py-2 text-blue-600 font-bold text-lg'
      : 'block px-4 py-2 text-gray-700 hover:bg-gray-100 text-lg';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">

        <div className="flex-shrink-0">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="IMN Logo" className="h-10 w-auto" />
          </NavLink>
        </div>

        <ul className="hidden items-center space-x-8 md:flex">
          <li><NavLink to="/" className={navLinkClasses}>Beranda</NavLink></li>
          <li><NavLink to="/tentang" className={navLinkClasses}>Tentang Kami</NavLink></li>
          <li><NavLink to="/kegiatan" className={navLinkClasses}>Kegiatan Kami</NavLink></li>
          <li><NavLink to="/careers" className={navLinkClasses}>Karir</NavLink></li>
          <li><NavLink to="/press-releases" className={navLinkClasses}>Berita Pers</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClasses}>Kontak</NavLink></li>
          <li>
            <NavLink to="/admin/login" className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
              Login Admin
            </NavLink>
          </li>
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >

            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col py-4">
          <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Beranda</NavLink></li>
          <li><NavLink to="/tentang" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Tentang</NavLink></li>
          <li><NavLink to="/kegiatan" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Kegiatan</NavLink></li>
          <li><NavLink to="/careers" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Careers</NavLink></li>
          <li><NavLink to="/press-releases" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Berita Pers</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses}>Contact</NavLink></li>
          <li>
            <NavLink to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 mt-2 mx-4 rounded-md bg-blue-600 text-black font-semibold text-center hover:bg-blue-300 transition-colors">
              Login Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
