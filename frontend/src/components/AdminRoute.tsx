import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getProfile, logout } from '../services/authService';
import Cookies from 'js-cookie';
import { User } from '../types/user';

interface AdminRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('AdminRoute: Memulai pemeriksaan otentikasi...');
      const token = Cookies.get('jwtToken');
      console.log('AdminRoute: Token ditemukan di cookie:', token ? 'YA' : 'TIDAK');

      if (!token) {
        console.log('AdminRoute: Tidak ada token, tidak terotentikasi.');
        setIsAuthenticated(false);
        setHasPermission(false);
        return;
      }

      try {
        const userData = await getProfile();
        setUser(userData);
        setIsAuthenticated(true);
        console.log('AdminRoute: Profil user berhasil dimuat:', userData);

        if (allowedRoles && allowedRoles.length > 0) {
          if (userData && allowedRoles.includes(userData.role)) {
            setHasPermission(true);
            console.log('AdminRoute: User memiliki izin.');
          } else {
            setHasPermission(false);
            console.log('AdminRoute: User TIDAK memiliki izin (role tidak sesuai).');
          }
        } else {
          setHasPermission(true);
          console.log('AdminRoute: Tidak ada role spesifik yang diperlukan, izin diberikan.');
        }

      } catch (error) {
        console.error('AdminRoute: Pemeriksaan otentikasi gagal:', error);
        setIsAuthenticated(false);
        setHasPermission(false);
        logout();
        console.log('AdminRoute: Token dihapus dan diatur ke tidak terotentikasi.');
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (isAuthenticated === null || hasPermission === null) {
    console.log('AdminRoute: Menampilkan loading...');
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-20">
        <div className="text-lg font-medium text-gray-700">Memeriksa otentikasi...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('AdminRoute: Mengarahkan ke halaman login...');
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasPermission) {
    console.log('AdminRoute: Mengarahkan ke halaman tidak diizinkan atau menampilkan pesan akses ditolak...');
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 pt-20">
        <div className="rounded-md bg-red-100 p-4 text-red-700 text-center">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </div>
      </div>
    );
  }
  console.log('AdminRoute: Otentikasi dan izin berhasil. Merender konten...');
  return children ? <>{children}</> : <Outlet context={{ user }} />;
};

export default AdminRoute;
