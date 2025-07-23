import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CFDI = () => {
  const [xmlContent, setXmlContent] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [fraudGuide, setFraudGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('verify');

  useEffect(() => {
    const fetchFraudGuide = async () => {
      try {
        const response = await axios.get(`${API}/cfdi/fraud-guide`);
        setFraudGuide(response.data);
      } catch (error) {
        console.error('Error fetching fraud guide:', error);
      }
    };

    fetchFraudGuide();
  }, []);

  const handleVerification = async (e) => {
    e.preventDefault();
    
    if (!xmlContent.trim()) {
      alert('Por favor ingresa el contenido XML del CFDI');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/cfdi/verify`, {
        xml_content: xmlContent
      });
      setVerificationResult(response.data);
    } catch (error) {
      console.error('Error verifying CFDI:', error);
      alert('Error al verificar el CFDI. Verifica que el formato XML sea correcto.');
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado! Comparte este verificador CFDI');
  };

  const clearVerification = () => {
    setXmlContent('');
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">🧾</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CFDI - Verificador y Educación Anti-Fraude
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verifica CFDIs, aprende sobre fraudes fiscales y protégete de estafas
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'verify'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🔍 Verificador CFDI
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🛡️ Educación Anti-Fraude
            </button>
          </div>

          <div className="p-8">
            {/* Verificador Tab */}
            {activeTab === 'verify' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🔍 Verificador de CFDI
                </h2>

                <form onSubmit={handleVerification} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contenido XML del CFDI *
                    </label>
                    <textarea
                      value={xmlContent}
                      onChange={(e) => setXmlContent(e.target.value)}
                      rows="8"
                      placeholder="Pega aquí el contenido XML completo de tu CFDI..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors font-mono text-sm"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Copia y pega el contenido completo del archivo XML de tu factura
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading || !xmlContent.trim()}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Verificando...' : '🔍 Verificar CFDI'}
                    </button>
                    
                    {xmlContent && (
                      <button
                        type="button"
                        onClick={clearVerification}
                        className="bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        🗑️ Limpiar
                      </button>
                    )}
                  </div>
                </form>

                {/* Verification Result */}
                {verificationResult && (
                  <div className="mt-8 bg-gray-50 rounded-xl p-6 border-l-4 border-purple-400">
                    <h3 className="text-lg font-bold text-purple-800 mb-4">📊 Resultado de Verificación</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4">
                        <span className="font-semibold text-gray-700">Estado:</span>
                        <p className={`text-lg font-bold ${verificationResult.is_valid ? 'text-green-600' : 'text-red-600'}`}>
                          {verificationResult.is_valid ? '✅ Válido' : '❌ Inválido'}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <span className="font-semibold text-gray-700">Status:</span>
                        <p className="text-gray-900">{verificationResult.status}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <span className="font-semibold text-gray-700">RFC Emisor:</span>
                        <p className="font-mono text-gray-900">{verificationResult.rfc_emisor}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <span className="font-semibold text-gray-700">RFC Receptor:</span>
                        <p className="font-mono text-gray-900">{verificationResult.rfc_receptor}</p>
                      </div>
                    </div>

                    {verificationResult.warnings && verificationResult.warnings.length > 0 && (
                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Advertencias:</h4>
                        <ul className="space-y-1">
                          {verificationResult.warnings.map((warning, index) => (
                            <li key={index} className="text-yellow-700 text-sm">• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Official Links */}
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">🌐 Verificación Oficial SAT</h3>
                  <p className="text-blue-700 mb-4">
                    Para una verificación oficial, utiliza el sistema del SAT:
                  </p>
                  <a
                    href="https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    🌐 Verificar en SAT Oficial
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && fraudGuide && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🛡️ Educación Anti-Fraude Fiscal
                </h2>

                {/* Common Frauds */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Fraudes Comunes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fraudGuide.common_frauds.map((fraud, index) => (
                      <div key={index} className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                        <div className="flex items-start">
                          <span className="text-red-500 mr-3 text-lg">⚠️</span>
                          <p className="text-red-700 text-sm">{fraud}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Tips */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-green-800 mb-4">✅ Consejos de Verificación</h3>
                  <div className="space-y-4">
                    {fraudGuide.verification_tips.map((tip, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                        <div className="flex items-start">
                          <span className="text-green-500 mr-3 text-lg">💡</span>
                          <p className="text-green-700">{tip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Links */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">🌐 Enlaces Oficiales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-6 text-center">
                      <div className="text-3xl mb-3">🔍</div>
                      <h4 className="font-bold text-blue-800 mb-2">Verificar CFDI</h4>
                      <p className="text-blue-600 text-sm mb-4">Sistema oficial de verificación</p>
                      <a
                        href={fraudGuide.official_links.sat_verification}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ir al SAT
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                      <div className="text-3xl mb-3">🆔</div>
                      <h4 className="font-bold text-purple-800 mb-2">Validar RFC</h4>
                      <p className="text-purple-600 text-sm mb-4">Consulta si un RFC existe</p>
                      <a
                        href={fraudGuide.official_links.rfc_validation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm"
                      >
                        Consultar RFC
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">🚨 ¿Detectaste un Fraude?</h3>
                  <p className="mb-4">
                    Si sospechas de un fraude fiscal o necesitas ayuda para verificar documentos, contáctanos inmediatamente:
                  </p>
                  <a
                    href="https://wa.me/525659952408"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    📱 WhatsApp de Emergencia
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR VERIFICADOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFDI;