import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ analytics }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: '🏠 Inicio', href: '/', icon: '🏠' },
    { name: '⚡ CFE', href: '/cfe', icon: '⚡' },
    { name: '🎓 Certificados', href: '/certificates', icon: '🎓' },
    { name: '📄 Constancia Fiscal', href: '/fiscal', icon: '📄' },
    { name: '🧾 CFDI', href: '/cfdi', icon: '🧾' },
    { name: '🧰 Trámites', href: '/tramites', icon: '🧰' },
    { name: '📞 Contacto', href: '/contact', icon: '📞' },
  ];

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('¡Enlace copiado! Comparte HUMANIDAD UNIDA con quien lo necesite');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">🤝</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                  HUMANIDAD UNIDA
                </h1>
                <p className="text-sm text-blue-200 -mt-1">Ayuda Digital Humanitaria</p>
              </div>
            </Link>
          </div>

          {/* Analytics Badge */}
          {analytics && (
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center space-x-2 text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">
                    {analytics.total_helped} personas ayudadas
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/30'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name.replace(/^[^\s]+ /, '')}
              </Link>
            ))}
            
            <button
              onClick={shareUrl}
              className="ml-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🔗 COMPARTIR
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none focus:text-yellow-300 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'bg-white/20 text-white shadow-md backdrop-blur-md border border-white/30'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={() => {
                shareUrl();
                setIsOpen(false);
              }}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
            >
              🔗 COMPARTIR PÁGINA
            </button>

            {analytics && (
              <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">
                    {analytics.total_helped} personas ayudadas
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;