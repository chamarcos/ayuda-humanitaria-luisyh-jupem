import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Fiscal = () => {
  const [formData, setFormData] = useState({
    curp: '',
    user_name: '',
    phone: ''
  });
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [curpError, setCurpError] = useState('');

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`${API}/fiscal/sat-guide`);
        setGuide(response.data);
      } catch (error) {
        console.error('Error fetching SAT guide:', error);
      }
    };

    fetchGuide();
  }, []);

  const validateCURP = (curp) => {
    const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
    return curpPattern.test(curp.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCURP(formData.curp)) {
      setCurpError('CURP inválida. Debe tener 18 caracteres y el formato correcto.');
      return;
    }

    setLoading(true);
    setCurpError('');

    try {
      const response = await axios.post(`${API}/fiscal/request`, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting fiscal request:', error);
      if (error.response?.data?.detail?.includes('CURP format')) {
        setCurpError('Formato de CURP inválido. Verifica que sea correcto.');
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
    
    if (name === 'curp') {
      setCurpError('');
    }
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este servicio fiscal');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-white">✅</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Solicitud Registrada!
              </h1>
              <p className="text-lg text-gray-600">
                Tu solicitud de constancia fiscal ha sido registrada exitosamente
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8 border-l-4 border-green-400">
              <h2 className="text-xl font-bold text-green-800 mb-4">📋 Datos Registrados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">CURP:</span>
                  <p className="text-gray-900 font-mono">{formData.curp}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Nombre:</span>
                  <p className="text-gray-900">{formData.user_name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Teléfono:</span>
                  <p className="text-gray-900">{formData.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ curp: '', user_name: '', phone: '' });
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Nueva Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">📄</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Constancia de Situación Fiscal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obtén tu constancia de situación fiscal del SAT usando tu CURP
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-green-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CURP (Clave Única de Registro de Población) *
              </label>
              <input
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                required
                maxLength="18"
                placeholder="Ej: ABCD123456HDFGHI01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors font-mono text-lg ${
                  curpError 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              {curpError && (
                <p className="mt-2 text-sm text-red-600">{curpError}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                La CURP debe tener exactamente 18 caracteres alfanuméricos
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo (Opcional)
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Teléfono (Opcional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej: 55 1234 5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.curp}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Validando...' : '📄 Registrar y Ver Guía'}
            </button>
          </form>
        </div>

        {/* Guide */}
        {guide && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📖 Guía Paso a Paso
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-green-800 mb-4">✅ Pasos para Obtener tu Constancia:</h3>
              <div className="space-y-4">
                {guide.steps.map((step, index) => (
                  <div key={index} className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-800 mb-4">📋 Requisitos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guide.requirements.map((req, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">
                      {req === 'CURP' ? '🆔' : req.includes('correo') ? '📧' : '👤'}
                    </div>
                    <p className="text-gray-700 font-medium">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a
                href={guide.sat_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🌐 Ir al Sitio Oficial del SAT
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Importante</h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                  Este es un trámite completamente gratuito en el SAT oficial
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                  No pagues a intermediarios por este servicio
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                  Si necesitas ayuda, contáctanos por WhatsApp
                </li>
              </ul>
            </div>
          </div>
        )}

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

export default Fiscal;