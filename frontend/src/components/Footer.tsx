import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-gray-300 py-12">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">

            <img src="/logo.png" alt="IMN Business Group Logo" className="h-10 mb-4" /> 

            <p className="text-sm">Jl. Cipondoh Girang, RT.06/RW.12</p>
            <p className="text-sm">Kel Cinunuk, Kec. Cileunyi</p>
            <p className="text-sm">Kabupaten Bandung, Jawa Barat 40624</p>

            <p className="text-sm mt-4">Email: info@imnbusinessgroup.com</p>
            <p className="text-sm">Phone: +62 21 1234 5678</p>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg text-white mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/kegiatan" className="hover:text-white transition-colors">Kegiatan Kami</Link></li> {/* Mengarahkan ke Kegiatan Kami */}
              <li><Link to="/careers" className="hover:text-white transition-colors">Karir</Link></li>
            </ul>
          </div>


          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg text-white mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">HR Consultant</a></li>
              <li><a href="#" className="hover:text-white transition-colors">IT Solutions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financial Consulting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design & Printing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aqiqah & Qurban</a></li>
            </ul>
          </div>


          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg text-white mb-4">Legal & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kebijakan-privasi" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/press-releases" className="hover:text-white transition-colors">Press Releases</Link></li> {/* Berita Pers */}
            </ul>
          </div>
        </div>


        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">

          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © 2025 IMN Business Group. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link to="/kebijakan-privasi" className="text-gray-500 hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link to="/contact" className="text-gray-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
