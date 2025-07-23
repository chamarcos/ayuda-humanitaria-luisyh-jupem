import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Tramites = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API}/tramites/documents`);
        setDocuments(response.data.formats);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (documentType) => {
    try {
      await axios.post(`${API}/tramites/download`, {
        document_type: documentType
      });
      // Track download for analytics
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este centro de trámites');
  };

  const documentIcons = {
    'CURP': '🆔',
    'NSS': '🏥',
    'ACTA': '📜',
    'AFORE': '💰',
    'SEMANAS': '📊'
  };

  const documentColors = {
    'CURP': 'from-blue-500 to-blue-600',
    'NSS': 'from-green-500 to-green-600',
    'ACTA': 'from-purple-500 to-purple-600',
    'AFORE': 'from-yellow-500 to-orange-600',
    'SEMANAS': 'from-red-500 to-pink-600'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl text-white">🧰</span>
          </div>
          <p className="text-lg text-gray-600">Cargando trámites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">🧰</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Centro de Trámites
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra todos los enlaces oficiales para tus trámites gubernamentales en un solo lugar
          </p>
        </div>

        {/* Quick Access Info */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 mb-12 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🚀 Acceso Rápido y Seguro</h2>
            <p className="text-lg mb-6 opacity-90">
              Todos los enlaces son oficiales del gobierno mexicano. No necesitas intermediarios ni pagos adicionales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">✅</div>
                <div className="font-semibold">100% Oficial</div>
                <div className="text-sm opacity-90">Enlaces verificados</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🆓</div>
                <div className="font-semibold">Totalmente Gratis</div>
                <div className="text-sm opacity-90">Sin costos ocultos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-semibold">Seguro</div>
                <div className="text-sm opacity-90">Protección garantizada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {documents.map((doc) => (
            <div
              key={doc.type}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${documentColors[doc.type] || 'from-gray-500 to-gray-600'} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">{documentIcons[doc.type] || '📄'}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{doc.name}</h3>
                      <p className="text-sm opacity-90">{doc.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {doc.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                      Trámite oficial y gratuito
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Disponible 24/7
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Sin intermediarios
                    </li>
                  </ul>
                </div>

                {/* Action Button */}
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDownload(doc.type)}
                  className={`w-full bg-gradient-to-r ${documentColors[doc.type] || 'from-gray-500 to-gray-600'} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center`}
                >
                  🌐 Ir al Sitio Oficial
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💡 ¿Necesitas Ayuda con tu Trámite?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Si tienes dificultades con algún trámite o necesitas orientación personalizada, 
              estamos aquí para ayudarte completamente gratis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp Support */}
            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-400">
              <h3 className="text-lg font-bold text-green-800 mb-3">📱 WhatsApp Personal</h3>
              <p className="text-green-700 mb-4">
                Contáctanos directamente para ayuda personalizada con cualquier trámite
              </p>
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                💬 Chatear por WhatsApp
              </a>
            </div>

            {/* Email Support */}
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
              <h3 className="text-lg font-bold text-blue-800 mb-3">✉️ Correo Electrónico</h3>
              <p className="text-blue-700 mb-4">
                Envíanos un correo detallando tu situación y te responderemos pronto
              </p>
              <a
                href="mailto:luisgomez92ux5@gmail.com"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📧 Enviar Email
              </a>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-8 bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Importante - Evita Fraudes</h3>
            <ul className="space-y-2 text-yellow-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                Todos estos trámites son completamente gratuitos en los sitios oficiales
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                No pagues a intermediarios por servicios que el gobierno ofrece gratis
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                Siempre verifica que estés en el sitio oficial (.gob.mx)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                Si algo parece sospechoso, contáctanos antes de proceder
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">📚 Recursos Adicionales</h2>
            <p className="text-lg mb-6 opacity-90">
              ¿Buscas otro tipo de trámite? Te ayudamos a encontrar la información correcta
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="font-semibold">Gobierno Federal</div>
                <div className="text-sm opacity-90">Trámites nacionales</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-semibold">Gobierno Estatal</div>
                <div className="text-sm opacity-90">Por estado</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🏘️</div>
                <div className="font-semibold">Gobierno Municipal</div>
                <div className="text-sm opacity-90">Trámites locales</div>
              </div>
            </div>

            <a
              href="https://wa.me/525659952408"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              💬 Pedir Ayuda Personalizada
            </a>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-12">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR CENTRO DE TRÁMITES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tramites;