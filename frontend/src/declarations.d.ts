// src/declarations.d.ts

// Untuk mengatasi impor file media (gambar, svg, dsb)
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg' {
  const content: string;
  export default content;
}

// Untuk mengatasi file CSS/SCSS module jika digunakan
declare module '*.module.css';
declare module '*.module.scss';

declare module './pages/Projects';
declare module './pages/Project';
declare module './pages/AdminLogin';
declare module './pages/AdminDashboard';
declare module './components/Navbar';
declare module './components/Footer';
