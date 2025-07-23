import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${API}/contact/info`);
        setContactInfo(response.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact/message`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error al enviar el mensaje. Por favor intenta por WhatsApp.');
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
    alert('¡Enlace copiado! Comparte nuestros datos de contacto');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-200 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Mensaje Enviado Exitosamente!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                ← Enviar Otro Mensaje
              </button>
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                📱 WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">📞</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contacto y Soporte
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Necesitas ayuda? Estamos aquí para apoyarte con cualquier trámite o duda que tengas
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* WhatsApp */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200 hover:shadow-2xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Personal</h3>
              <p className="text-gray-600 mb-4">
                Respuesta inmediata para emergencias y consultas urgentes
              </p>
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="font-bold text-green-800 text-lg">
                  {contactInfo?.whatsapp || '+52 5659 952408'}
                </p>
              </div>
              <a
                href={contactInfo?.whatsapp_url || 'https://wa.me/525659952408'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                💬 Chatear por WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200 hover:shadow-2xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">✉️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Correo Electrónico</h3>
              <p className="text-gray-600 mb-4">
                Para consultas detalladas y seguimiento de casos
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="font-bold text-blue-800 text-sm break-all">
                  {contactInfo?.email || 'luisgomez92ux5@gmail.com'}
                </p>
              </div>
              <a
                href={`mailto:${contactInfo?.email || 'luisgomez92ux5@gmail.com'}`}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                📧 Enviar Email
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-200 hover:shadow-2xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">🕐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Horarios de Atención</h3>
              <p className="text-gray-600 mb-4">
                {contactInfo?.business_hours || 'Lunes a Viernes 9:00 AM - 6:00 PM'}
              </p>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p className="font-bold text-purple-800">
                  Respuesta en {contactInfo?.response_time || '24 horas máximo'}
                </p>
              </div>
              <div className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-center">
                ⏰ Disponible 7 días
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📝 Envía un Mensaje
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@correo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mensaje *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Describe detalladamente tu consulta o el problema que necesitas resolver..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              <p className="mt-2 text-sm text-gray-500">
                Mientras más detalles proporciones, mejor podremos ayudarte
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-indigo-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : '📤 Enviar Mensaje'}
            </button>
          </form>
        </div>

        {/* Mission Statement */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🤝 Nuestra Promesa</h2>
            <p className="text-lg mb-6 opacity-90 max-w-4xl mx-auto">
              En HUMANIDAD UNIDA estamos comprometidos con combatir el abandono digital y proteger 
              a las personas más vulnerables de fraudes y estafas. Nuestro apoyo es completamente 
              <span className="font-bold text-yellow-300"> gratuito </span> 
              y está dirigido especialmente a adultos mayores que necesitan ayuda con trámites digitales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🆓</div>
                <div className="font-semibold">100% Gratuito</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-semibold">Anti-Fraudes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">👴👵</div>
                <div className="font-semibold">Adultos Mayores</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold">Apoyo Personal</div>
              </div>
            </div>

            <p className="text-yellow-300 font-medium text-lg">
              💡 "No más estafas, no más abandono digital. Juntos construimos un México más seguro y conectado."
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">🚨 ¿Es una Emergencia o Fraude?</h3>
            <p className="mb-4">
              Si detectaste un fraude o necesitas ayuda urgente, contáctanos inmediatamente:
            </p>
            <a
              href="https://wa.me/525659952408"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              🚨 WhatsApp de Emergencia
            </a>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8">
          <button
            onClick={shareUrl}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🔗 COMPARTIR CONTACTO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;