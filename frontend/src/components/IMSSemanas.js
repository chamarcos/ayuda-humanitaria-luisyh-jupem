import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const IMSSemanas = () => {
  const [formData, setFormData] = useState({
    nss: '',
    curp: '',
    user_name: '',
    birth_date: '',
    phone: ''
  });
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`${API}/imss/semanas/guide`);
        setGuide(response.data);
      } catch (error) {
        console.error('Error fetching IMSS guide:', error);
      }
    };

    fetchGuide();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API}/imss/semanas/request`, formData);
      setSubmittedData(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting IMSS request:', error);
      if (error.response?.data?.detail) {
        setErrors({ general: error.response.data.detail });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'curp' ? value.toUpperCase() : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name] || errors.general) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este servicio de semanas IMSS');
  };

  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-400">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl text-white">✅</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ¡Tu Solicitud fue Enviada!
              </h1>
              <p className="text-2xl text-gray-600">
                Te ayudaremos a consultar tus semanas cotizadas
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-l-8 border-blue-400">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">📋 Tus Datos:</h2>
              <div className="grid grid-cols-1 gap-6 text-xl">
                <div className="bg-white rounded-lg p-4">
                  <span className="font-bold text-gray-700">Tu NSS:</span>
                  <p className="text-2xl font-mono text-blue-900">{submittedData.nss}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="font-bold text-gray-700">Tu CURP:</span>
                  <p className="text-xl font-mono text-blue-900">{submittedData.curp}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <span className="font-bold text-gray-700">Tu Nombre:</span>
                  <p className="text-xl text-blue-900">{submittedData.user_name}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 mb-8 border-l-8 border-green-400">
              <h2 className="text-3xl font-bold text-green-800 mb-6">📱 Siguiente Paso MUY FÁCIL:</h2>
              <p className="text-2xl text-gray-700 mb-6">
                1. Guarda esta información en un papel
                <br />
                2. Envíanos un mensaje por WhatsApp
                <br />
                3. Te ayudamos paso a paso GRATIS
              </p>
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl hover:bg-green-700 transition-colors shadow-xl"
              >
                📱 ENVIAR WHATSAPP AHORA
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedData(null);
                  setFormData({
                    nss: '',
                    curp: '',
                    user_name: '',
                    birth_date: '',
                    phone: ''
                  });
                }}
                className="bg-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-700 transition-colors"
              >
                ← Nueva Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Extra Large for Elderly */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-white">👴</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Consultar Semanas IMSS
          </h1>
          <p className="text-3xl text-gray-600 font-medium">
            🌟 SÚPER FÁCIL para Adultos Mayores 🌟
          </p>
        </div>

        {/* Important Security Notice - Very Visible */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">🔴 MUY IMPORTANTE 🔴</h2>
            <div className="text-2xl space-y-3">
              <p>✅ Esta consulta es COMPLETAMENTE GRATIS</p>
              <p>❌ NUNCA pagues por esta información</p>
              <p>📱 Solo te ayudamos por WhatsApp: +52 5659 952408</p>
            </div>
          </div>
        </div>

        {/* Simple Instructions */}
        {guide && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-blue-200">
            <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
              📖 ¿Qué necesitas tener a la mano?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {guide.what_you_need.map((item, index) => (
                <div key={index} className="bg-blue-50 rounded-2xl p-6 border-l-8 border-blue-400">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-2xl text-gray-700 font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ultra-Simple Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-200">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
            📝 Llena estos datos (muy fácil)
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* NSS Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-700 mb-4">
                1️⃣ Tu NSS (11 números) *
              </label>
              <input
                type="text"
                name="nss"
                value={formData.nss}
                onChange={handleChange}
                required
                maxLength="11"
                placeholder="12345678901"
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-3xl text-center"
              />
              <p className="mt-3 text-xl text-gray-500 text-center">
                Está en tu credencial del IMSS - son 11 números seguidos
              </p>
            </div>

            {/* CURP Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-700 mb-4">
                2️⃣ Tu CURP completa (18 letras y números) *
              </label>
              <input
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                required
                maxLength="18"
                placeholder="ABCD123456HDFGHI01"
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-2xl text-center"
              />
              <p className="mt-3 text-xl text-gray-500 text-center">
                Está en tu INE - son 18 letras y números
              </p>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-700 mb-4">
                3️⃣ Tu nombre completo (igual que en tu INE) *
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                placeholder="María González López"
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-colors text-2xl text-center"
              />
            </div>

            {/* Birth Date Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-700 mb-4">
                4️⃣ Tu fecha de nacimiento *
              </label>
              <input
                type="text"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                required
                placeholder="15/06/1960"
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-colors font-mono text-3xl text-center"
              />
              <p className="mt-3 text-xl text-gray-500 text-center">
                Formato: DD/MM/YYYY (día/mes/año)
              </p>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-2xl font-bold text-gray-700 mb-4">
                5️⃣ Tu teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="5555551234"
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-colors text-3xl text-center"
              />
            </div>

            {/* Error Display */}
            {errors.general && (
              <div className="bg-red-50 rounded-2xl p-6 border-4 border-red-200">
                <p className="text-2xl text-red-700 text-center font-medium">{errors.general}</p>
              </div>
            )}

            {/* Submit Button - Extra Large */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-8 px-8 rounded-3xl font-bold text-3xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                '👴 CONSULTAR MIS SEMANAS IMSS'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-2xl text-gray-600 mb-4">
              ¿Tienes dudas? ¡Te ayudamos GRATIS!
            </p>
            <a
              href="https://wa.me/525659952408"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl hover:bg-green-700 transition-colors shadow-xl"
            >
              📱 WhatsApp de Ayuda
            </a>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR CON OTROS ADULTOS MAYORES
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMSSemanas;