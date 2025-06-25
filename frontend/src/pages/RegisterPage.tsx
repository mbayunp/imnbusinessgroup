import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { register } from '../services/authService'; // Mengimpor fungsi register dari authService
import { AxiosError } from 'axios'; // Untuk penanganan error Axios

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'hr'>('hr'); // Default role 'hr', bisa diubah
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccessMessage(null); // Reset success message
    setLoading(true); // Aktifkan loading

    try {
      // Panggil fungsi register dari authService
      const userData = await register(username, password, role);
      console.log('Registration successful:', userData);
      setSuccessMessage('Akun berhasil didaftarkan! Silakan login.');
      // Opsional: Langsung arahkan ke halaman login setelah registrasi
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000); // Tunda 2 detik untuk user membaca pesan sukses
    } catch (err: unknown) {
      let errorMessage = 'Gagal mendaftarkan akun.';
      if (err instanceof AxiosError) {
        errorMessage = (err.response?.data as { message?: string })?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
      console.error('Registration failed:', err);
    } finally {
      setLoading(false); // Matikan loading
    }
  };

  return (
    <div 
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center" /* Ditambahkan w-screen */
      style={{ backgroundImage: 'url("/imn-building2.png")' }} /* Menggunakan gambar lokal */
    >
      <div className="w-full max-w-md rounded-xl bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm border border-purple-200">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-blue-600">Daftar Akun Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Pilih username Anda"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Buat password Anda"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'hr')}
              required
            >
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-sm text-red-700 font-medium border border-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 rounded-lg bg-green-100 p-4 text-sm text-green-700 font-medium border border-green-200">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full rounded-lg bg-purple-600 px-6 py-3 text-black font-bold text-lg hover:bg-purple-700 focus:outline-none focus:ring-3 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar Akun'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-700">
          Sudah punya akun?{' '}
          <NavLink to="/admin/login" className="font-bold text-purple-600 hover:text-purple-800 transition-colors">
            Login di sini
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
