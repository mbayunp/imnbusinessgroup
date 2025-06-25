import React, { useState, useEffect } from 'react';
import RevealOnScroll from '../components/RevealOnScroll'; 
import { submitContactForm } from '../services/contactService'; 
import { AxiosError } from 'axios';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showHeaderContent, setShowHeaderContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeaderContent(true);
    }, 500); 


    return () => clearTimeout(timer);
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    };

    try {
      const response = await submitContactForm(formData); 
      setSuccessMessage(response.message || 'Pesan Anda berhasil terkirim!');
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      let errorMessage = 'Gagal mengirim pesan. Silakan coba lagi.';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex w-full mx-auto flex-col min-h-screen bg-gray-50 font-inter">
      {/* Header Section*/}
      <RevealOnScroll delay={0} animationType="slide-up">
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Hubungi Kami
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-600">
              Kami siap membantu Anda. Silakan isi form berikut atau hubungi langsung melalui kontak yang tersedia.
            </p>
          </div>
        </section>
      </RevealOnScroll>
      
      {/* Konten utama*/}
      <RevealOnScroll delay={100} animationType="slide-up">
        <section className="flex-grow py-16 mt-12 ">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              
              {/* Contact Form */}
              <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                <div className="p-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Kirim Pesan</h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                          Nama Depan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                          Nama Belakang
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                        Subjek <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Pilih subjek...</option>
                        <option value="general">Pertanyaan Umum</option>
                        <option value="sales">Penawaran Produk/Layanan</option>
                        <option value="support">Dukungan Teknis</option>
                        <option value="partnership">Kemitraan</option>
                        <option value="career">Karir</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                        Pesan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    {/* Success and Error Messages */}
                    {successMessage && (
                      <div className="rounded-lg bg-green-100 p-3 text-sm text-green-700 font-medium">
                        {successMessage}
                      </div>
                    )}
                    {error && (
                      <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700 font-medium">
                        {error}
                      </div>
                    )}

                    <div>
                      <button
                        type="submit"
                        className={`w-full rounded-lg bg-blue-600 px-6 py-4 font-bold text-black shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Mengirim...' : 'Kirim Pesan'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                  <div className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Informasi Kontak</h2>
                    <div className="space-y-6">
                      {/* Alamat */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Alamat Kantor</h3>
                          <p className="mt-1 text-gray-600">
                            Jl. Cipondoh Girang, RT.06/RW.12<br />
                            Kel Cinunuk, Kec. Cileunyi<br />
                            Kabupaten Bandung, Jawa Barat 40624
                          </p>
                        </div>
                      </div>
                      {/* Telepon */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Telepon</h3>
                          <p className="mt-1 text-gray-600">
                            +62 21 1234 5678 (Customer Service)<br />
                            +62 21 8765 4321 (Sales)
                          </p>
                        </div>
                      </div>
                      {/* Email */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Email</h3>
                            <p className="mt-1 text-gray-600">
                                info@perusahaan.com<br />
                                hrd@imnbusinessgroup.co.id
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                  <div className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Jam Operasional</h2>
                    <div className="space-y-4">
                      {[
                        { day: "Senin - Jumat", hours: "08:00 - 17:00 WIB" },
                        { day: "Sabtu", hours: "09:00 - 14:00 WIB" },
                        { day: "Minggu & Hari Libur", hours: "Tutup" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between border-b border-gray-100 pb-3 last:border-0">
                          <span className="text-gray-600">{item.day}</span>
                          <span className="font-medium text-gray-900">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Iframe Peta Google Maps*/}
            <div className="mt-16 overflow-hidden rounded-xl bg-white shadow-xl w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.665279282584!2d107.73196619999999!3d-6.930551599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3fcfa905175%3A0x838e90b2735da1b!2sRumah%20Visi%20Indifa%20(RVI)!5e0!3m2!1sen!2sid!4v1750231879374!5m2!1sen!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Peta Lokasi Kantor"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
};

export default Contact;