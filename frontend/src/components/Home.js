import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = ({ analytics }) => {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('API Response:', response.data.message);
        setApiStatus('connected');
      } catch (error) {
        console.error('API Error:', error);
        setApiStatus('error');
      }
    };

    checkApi();
  }, []);

  const services = [
    {
      id: 'cfe',
      title: '⚡ CFE - Reimpresión de Recibo',
      description: 'Reimprime tu recibo de luz CFE de forma segura',
      details: ['Donación: $10 primera vez, $20 siguientes', 'Verificación vía WhatsApp', 'Proceso 100% seguro'],
      color: 'from-yellow-500 to-orange-600',
      path: '/cfe',
      icon: '⚡'
    },
    {
      id: 'certificates',
      title: '🎓 Certificados Escolares',
      description: 'Accede a certificados de SEP, INEA y más',
      details: ['Enlaces oficiales verificados', 'Donación solidaria $80', 'Múltiples instituciones'],
      color: 'from-blue-500 to-indigo-600',
      path: '/certificates',
      icon: '🎓'
    },
    {
      id: 'fiscal',
      title: '📄 Constancia de Situación Fiscal',
      description: 'Obtén tu constancia fiscal por CURP',
      details: ['Validación automática de CURP', 'Guía paso a paso', 'Enlaces oficiales SAT'],
      color: 'from-green-500 to-teal-600',
      path: '/fiscal',
      icon: '📄'
    },
    {
      id: 'cfdi',
      title: '🧾 CFDI - Verificador y Educación',
      description: 'Verifica CFDIs y aprende sobre fraudes',
      details: ['Verificador de sello digital', 'Guías anti-fraude', 'Educación fiscal'],
      color: 'from-purple-500 to-pink-600',
      path: '/cfdi',
      icon: '🧾'
    },
    {
      id: 'tramites',
      title: '🧰 Centro de Trámites',
      description: 'Formatos y documentos oficiales',
      details: ['CURP, NSS, Acta de nacimiento', 'AFORE y semanas cotizadas', 'Descargas directas'],
      color: 'from-red-500 to-rose-600',
      path: '/tramites',
      icon: '🧰'
    },
    {
      id: 'contact',
      title: '📞 Contacto y Soporte',
      description: 'WhatsApp, email y ayuda personalizada',
      details: ['Soporte 24/7', 'WhatsApp directo', 'Ayuda personalizada'],
      color: 'from-indigo-500 to-cyan-600',
      path: '/contact',
      icon: '📞'
    }
  ];

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('¡Enlace copiado! Comparte HUMANIDAD UNIDA con quien lo necesite');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-6xl">🤝</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-bounce flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                HUMANIDAD
              </span>
              <br />
              <span className="text-white">UNIDA</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              🛡️ Combatimos el <span className="text-yellow-400 font-semibold">abandono digital</span> y protegemos 
              a personas vulnerables de <span className="text-red-300 font-semibold">fraudes</span>
            </p>

            {/* Mission Statement */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">🎯 Nuestra Misión</h2>
              <p className="text-lg text-white leading-relaxed">
                Capacitamos <span className="text-green-300 font-semibold">voluntarios</span> en México y el mundo 
                para que las personas de la <span className="text-blue-300 font-semibold">tercera edad</span> no se 
                sientan solas ni sean olvidados digitales. Los ayudamos con trámites que no pueden hacer presencialmente.
              </p>
            </div>

            {/* Statistics */}
            {analytics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-yellow-400">{analytics.total_requests.cfe}</div>
                  <div className="text-sm text-blue-200">Recibos CFE</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-400">{analytics.total_requests.certificates}</div>
                  <div className="text-sm text-blue-200">Certificados</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-400">{analytics.total_requests.fiscal}</div>
                  <div className="text-sm text-blue-200">Constancias</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-red-400">{analytics.total_helped}</div>
                  <div className="text-sm text-blue-200">Personas Ayudadas</div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                📱 WhatsApp: +52 5659 952408
              </a>
              
              <button
                onClick={shareUrl}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                🔗 COMPARTIR PÁGINA
              </button>
            </div>

            {/* API Status */}
            <div className="mt-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                apiStatus === 'connected' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : apiStatus === 'error'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  apiStatus === 'connected' ? 'bg-green-400 animate-pulse' 
                  : apiStatus === 'error' ? 'bg-red-400' 
                  : 'bg-yellow-400 animate-pulse'
                }`}></span>
                {apiStatus === 'connected' ? 'Sistema Funcionando' 
                 : apiStatus === 'error' ? 'Verificando Conexión' 
                 : 'Conectando...'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🛠️ Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todos los trámites que necesitas en un solo lugar, de forma segura y confiable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl text-white">{service.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow */}
                  <div className="absolute top-6 right-6 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            🌟 ¡Únete a Nuestra Causa!
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Ayudamos a combatir el abandono digital y protegemos a las personas más vulnerables. 
            <br />Juntos construimos un México más seguro y conectado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/525659952408"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              💬 Contáctanos por WhatsApp
            </a>
            
            <button
              onClick={shareUrl}
              className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🔗 Comparte con Quien lo Necesite
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;