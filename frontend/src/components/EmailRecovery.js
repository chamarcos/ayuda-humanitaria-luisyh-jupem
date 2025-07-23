import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EmailRecovery = () => {
  const [formData, setFormData] = useState({
    email_to_recover: '',
    user_name: '',
    birth_date: '',
    phone: '',
    curp: '',
    email_provider: 'Gmail',
    additional_info: ''
  });
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('form');

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(`${API}/email/recovery/guide`);
        setGuide(response.data);
      } catch (error) {
        console.error('Error fetching email recovery guide:', error);
      }
    };

    fetchGuide();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${API}/email/recovery/request`, formData);
      setSubmittedData(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting email recovery request:', error);
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
    alert('¡Enlace copiado! Comparte este servicio de recuperación de email');
  };

  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-400">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl text-white">✅</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ¡Tu Solicitud fue Recibida!
              </h1>
              <p className="text-2xl text-gray-600">
                Te ayudaremos a recuperar tu contraseña de email
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 mb-8 border-l-8 border-purple-400">
              <h2 className="text-3xl font-bold text-purple-800 mb-6">📧 Email a Recuperar:</h2>
              <div className="bg-white rounded-lg p-6">
                <p className="text-3xl font-mono text-purple-900 text-center font-bold">
                  {submittedData.email_to_recover}
                </p>
                <p className="text-xl text-gray-600 text-center mt-4">
                  Proveedor: {submittedData.email_provider}
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 mb-8 border-l-8 border-green-400">
              <h2 className="text-3xl font-bold text-green-800 mb-6">📱 Siguiente Paso SÚPER FÁCIL:</h2>
              <div className="text-2xl text-gray-700 space-y-4 mb-6">
                <p>1. 📝 Anota esta información en un papel</p>
                <p>2. 📱 Mándanos mensaje por WhatsApp</p>
                <p>3. 🤝 Te ayudamos paso a paso GRATIS</p>
                <p>4. 🔐 Recuperamos tu contraseña juntos</p>
              </div>
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl hover:bg-green-700 transition-colors shadow-xl"
              >
                📱 PEDIR AYUDA POR WHATSAPP
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmittedData(null);
                  setFormData({
                    email_to_recover: '',
                    user_name: '',
                    birth_date: '',
                    phone: '',
                    curp: '',
                    email_provider: 'Gmail',
                    additional_info: ''
                  });
                }}
                className="bg-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-700 transition-colors"
              >
                ← Recuperar Otro Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Extra Large for Elderly */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-white">🔐</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Recuperar Contraseña de Email
          </h1>
          <p className="text-3xl text-gray-600 font-medium">
            🌟 SÚPER FÁCIL para Adultos Mayores 🌟
          </p>
        </div>

        {/* Security Warning - Very Large */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">🚨 SEGURIDAD IMPORTANTE 🚨</h2>
            <div className="text-2xl space-y-3">
              <p>❌ NUNCA des tu contraseña por teléfono</p>
              <p>❌ Las empresas oficiales NO piden contraseñas</p>
              <p>✅ Solo usamos sitios oficiales y seguros</p>
              <p>📱 Te ayudamos GRATIS: +52 5659 952408</p>
            </div>
          </div>
        </div>

        {/* Tabs - Large for Elderly */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden mb-8">
          <div className="flex border-b-4 border-gray-200">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex-1 px-6 py-6 text-2xl font-bold transition-colors ${
                activeTab === 'form'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 SOLICITAR AYUDA
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex-1 px-6 py-6 text-2xl font-bold transition-colors ${
                activeTab === 'guide'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📖 GUÍA SIMPLE
            </button>
          </div>

          <div className="p-8">
            {/* Form Tab */}
            {activeTab === 'form' && (
              <div>
                <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
                  📝 Llena estos datos para que te ayudemos
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email to Recover */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      1️⃣ ¿Cuál email quieres recuperar? *
                    </label>
                    <input
                      type="email"
                      name="email_to_recover"
                      value={formData.email_to_recover}
                      onChange={handleChange}
                      required
                      placeholder="ejemplo@gmail.com"
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors text-2xl text-center"
                    />
                  </div>

                  {/* Email Provider */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      2️⃣ ¿Qué tipo de email es? *
                    </label>
                    <select
                      name="email_provider"
                      value={formData.email_provider}
                      onChange={handleChange}
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors text-2xl"
                    >
                      <option value="Gmail">Gmail (termina en @gmail.com)</option>
                      <option value="Outlook">Outlook (@outlook.com, @hotmail.com, @live.com)</option>
                      <option value="Yahoo">Yahoo (@yahoo.com, @yahoo.com.mx)</option>
                      <option value="Otro">Otro tipo de email</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      3️⃣ Tu nombre completo *
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      placeholder="María González López"
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors text-2xl text-center"
                    />
                  </div>

                  {/* Birth Date */}
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
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors font-mono text-3xl text-center"
                    />
                    <p className="mt-3 text-xl text-gray-500 text-center">
                      Formato: DD/MM/YYYY (día/mes/año)
                    </p>
                  </div>

                  {/* CURP */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      5️⃣ Tu CURP (está en tu INE) *
                    </label>
                    <input
                      type="text"
                      name="curp"
                      value={formData.curp}
                      onChange={handleChange}
                      required
                      maxLength="18"
                      placeholder="ABCD123456HDFGHI01"
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors font-mono text-2xl text-center"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      6️⃣ Tu teléfono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="5555551234"
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors text-3xl text-center"
                    />
                  </div>

                  {/* Additional Info */}
                  <div>
                    <label className="block text-2xl font-bold text-gray-700 mb-4">
                      7️⃣ ¿Recuerdas algo más? (opcional)
                    </label>
                    <textarea
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Por ejemplo: cuándo fue la última vez que entraste, si recuerdas alguna pregunta de seguridad, etc."
                      className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent transition-colors text-xl"
                    />
                  </div>

                  {/* Error Display */}
                  {errors.general && (
                    <div className="bg-red-50 rounded-2xl p-6 border-4 border-red-200">
                      <p className="text-2xl text-red-700 text-center font-medium">{errors.general}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-8 px-8 rounded-3xl font-bold text-3xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Enviando...' : '🔐 PEDIR AYUDA PARA RECUPERAR'}
                  </button>
                </form>
              </div>
            )}

            {/* Guide Tab */}
            {activeTab === 'guide' && guide && (
              <div>
                <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
                  📖 Guía Simple por Tipo de Email
                </h2>

                <div className="space-y-8">
                  {Object.entries(guide.email_providers).map(([key, provider]) => (
                    <div key={key} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-8 border-blue-400">
                      <h3 className="text-3xl font-bold text-blue-800 mb-6">
                        {provider.icon || '📧'} {provider.name}
                      </h3>
                      
                      <p className="text-2xl text-gray-700 mb-6">
                        <strong>¿Cómo saber si es tuyo?</strong> {provider.how_to_identify}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-2xl font-bold text-green-800 mb-4">✅ Pasos MUY Fáciles:</h4>
                        <ol className="space-y-3">
                          {provider.simple_steps.map((step, index) => (
                            <li key={index} className="flex items-start text-xl text-gray-700">
                              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <a
                        href={provider.recovery_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-colors"
                      >
                        🌐 Ir al Sitio Oficial
                        <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Security Notes */}
                <div className="mt-8 bg-yellow-50 rounded-2xl p-8 border-l-8 border-yellow-400">
                  <h3 className="text-3xl font-bold text-yellow-800 mb-6">🛡️ Para Tu Seguridad:</h3>
                  <ul className="space-y-3">
                    {guide.important_security.map((tip, index) => (
                      <li key={index} className="flex items-start text-xl text-yellow-700">
                        <span className="w-4 h-4 bg-yellow-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-green-50 rounded-3xl p-8 border-4 border-green-200 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            💬 ¿Necesitas Ayuda Personal?
          </h2>
          <p className="text-2xl text-gray-700 mb-6">
            No te preocupes, te ayudamos paso a paso por WhatsApp COMPLETAMENTE GRATIS
          </p>
          <a
            href="https://wa.me/525659952408"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl hover:bg-green-700 transition-colors shadow-xl"
          >
            📱 PEDIR AYUDA AHORA
          </a>
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

export default EmailRecovery;