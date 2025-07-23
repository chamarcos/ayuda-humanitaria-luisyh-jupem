import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Certificates = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    phone: '',
    certificate_type: 'SEP'
  });
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDonationInfo, setShowDonationInfo] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${API}/certificates/links`);
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching certificate links:', error);
      }
    };

    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/certificates/request`, formData);
      setSubmitted(true);
      setShowDonationInfo(false);
    } catch (error) {
      console.error('Error submitting certificate request:', error);
      alert('Error al registrar solicitud. Puedes continuar con los enlaces oficiales.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este servicio de certificados');
  };

  const certificateTypes = [
    { value: 'SEP', name: 'Certificados SEP', icon: '🎓' },
    { value: 'INEA', name: 'Certificados INEA', icon: '📚' },
    { value: 'CDMX', name: 'Certificados CDMX', icon: '🏛️' },
    { value: 'Puebla', name: 'Certificados Puebla', icon: '🌮' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">🎓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certificados Escolares
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accede a certificados escolares oficiales de SEP, INEA, CDMX y Puebla
          </p>
        </div>

        {/* Donation Info Card */}
        {showDonationInfo && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-8 text-white shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">💰 DONACIÓN SOLIDARIA OBLIGATORIA</h2>
              <div className="text-4xl font-bold mb-4">$80 MXN</div>
              <p className="text-lg mb-6">
                Tu donación nos ayuda a mantener este servicio gratuito y apoyar a más personas vulnerables
              </p>
              
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">💳 Información de Pago</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Cuenta BanCoppel:</p>
                    <p className="text-2xl font-mono font-bold">10481427628</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90 mb-1">CLABE:</p>
                    <p className="text-lg font-mono font-bold">137180104814276285</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <a
                  href="https://wa.me/525659952408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                >
                  📱 Enviar Comprobante por WhatsApp
                </a>
              </div>

              <button
                onClick={() => setShowDonationInfo(false)}
                className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                ✅ Entendido, continuar con certificados
              </button>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {!submitted && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📝 Registro de Solicitud (Opcional)
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: 55 1234 5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Certificado
                </label>
                <select
                  name="certificate_type"
                  value={formData.certificate_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {certificateTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Registrando...' : '📝 Registrar Solicitud'}
              </button>
            </form>
          </div>
        )}

        {/* Official Links */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🔗 Enlaces Oficiales Verificados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificateTypes.map(type => (
              <div key={type.value} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl text-white">{type.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  Accede al sistema oficial para consultar y descargar tu certificado
                </p>
                
                <a
                  href={links[type.value] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  🌐 Ir al Sitio Oficial
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Importante</h3>
            <ul className="space-y-2 text-yellow-700 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                Estos son enlaces oficiales del gobierno mexicano
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                No compartas tus datos con sitios no oficiales
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                Si necesitas ayuda, contáctanos por WhatsApp
              </li>
            </ul>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR SERVICIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificates;