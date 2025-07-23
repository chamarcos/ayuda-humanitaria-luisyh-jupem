import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CFE = () => {
  const [formData, setFormData] = useState({
    service_number: '',
    user_name: '',
    phone: '',
    is_first_time: true
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/cfe/request`, formData);
      setSubmittedData(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting CFE request:', error);
      alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este servicio CFE');
  };

  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-white">✅</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Solicitud Recibida Exitosamente!
              </h1>
              <p className="text-lg text-gray-600">
                Tu solicitud de reimpresión CFE ha sido procesada
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 mb-8 border-l-4 border-yellow-400">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">📋 Detalles de tu Solicitud</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Número de Servicio:</span>
                  <p className="text-gray-900">{submittedData.service_number}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Nombre:</span>
                  <p className="text-gray-900">{submittedData.user_name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Teléfono:</span>
                  <p className="text-gray-900">{submittedData.phone}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Donación:</span>
                  <p className="text-green-600 font-bold">${submittedData.donation_amount} MXN</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8 border-l-4 border-blue-400">
              <h2 className="text-xl font-bold text-blue-800 mb-4">💳 Información de Pago</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Cuenta BanCoppel:</h3>
                  <p className="text-2xl font-mono font-bold text-blue-900 bg-white p-3 rounded border">
                    10481427628
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">CLABE:</h3>
                  <p className="text-lg font-mono font-bold text-blue-900 bg-white p-3 rounded border">
                    137180104814276285
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8 border-l-4 border-green-400">
              <h2 className="text-xl font-bold text-green-800 mb-4">📱 Siguiente Paso</h2>
              <p className="text-gray-700 mb-4">
                Una vez realizado tu pago, envía tu comprobante por WhatsApp para procesar tu recibo CFE:
              </p>
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                📱 Enviar Comprobante por WhatsApp
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedData(null);
                  setFormData({
                    service_number: '',
                    user_name: '',
                    phone: '',
                    is_first_time: true
                  });
                }}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                ← Nueva Solicitud
              </button>
              <button
                onClick={shareUrl}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                🔗 Compartir Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">⚡</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CFE - Reimpresión de Recibo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obtén la reimpresión de tu recibo de luz CFE de forma segura y confiable
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">💰 Donaciones</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Primera vez: <span className="font-bold text-green-600 ml-2">$10 MXN</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Siguientes: <span className="font-bold text-blue-600 ml-2">$20 MXN</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
            <h3 className="text-lg font-bold text-blue-800 mb-3">✅ Proceso</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">1.</span>
                Llena el formulario
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">2.</span>
                Realiza la donación
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">3.</span>
                Envía comprobante por WhatsApp
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Servicio CFE *
              </label>
              <input
                type="text"
                name="service_number"
                value={formData.service_number}
                onChange={handleChange}
                required
                placeholder="Ej: 12345678901"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Ej: 55 1234 5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_first_time"
                  checked={formData.is_first_time}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Esta es mi primera solicitud de reimpresión CFE 
                  <span className="font-semibold text-green-600"> ($10 MXN)</span>
                </span>
              </label>
              {!formData.is_first_time && (
                <p className="mt-2 text-sm text-blue-600">
                  Donación para siguientes solicitudes: <span className="font-bold">$20 MXN</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                '⚡ Solicitar Reimpresión CFE'
              )}
            </button>
          </form>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR SERVICIO CFE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFE;