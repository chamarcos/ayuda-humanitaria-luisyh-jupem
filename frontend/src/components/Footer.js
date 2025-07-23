import React from 'react';

const Footer = () => {
  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert('¡Enlace copiado! Comparte HUMANIDAD UNIDA con quien lo necesite');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">🤝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">HUMANIDAD UNIDA</h3>
                <p className="text-gray-300 text-sm">Ayuda Digital Humanitaria</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              Combatimos el abandono digital y protegemos a las personas vulnerables de fraudes y estafas. 
              Capacitamos voluntarios para ayudar con trámites digitales, especialmente a adultos mayores.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/525659952408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📱 WhatsApp: +52 5659 952408
              </a>
              <a
                href="mailto:luisgomez92ux5@gmail.com"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ✉️ Email: luisgomez92ux5@gmail.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">🛠️ Servicios</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">⚡ Recibos CFE</span></li>
              <li><span className="text-gray-300">🎓 Certificados Escolares</span></li>
              <li><span className="text-gray-300">📄 Constancia Fiscal</span></li>
              <li><span className="text-gray-300">🧾 Verificador CFDI</span></li>
              <li><span className="text-gray-300">🧰 Centro de Trámites</span></li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">🎯 Nuestra Misión</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✅ Prevenir fraudes digitales</li>
              <li>✅ Capacitar voluntarios</li>
              <li>✅ Ayudar a adultos mayores</li>
              <li>✅ Combatir abandono digital</li>
              <li>✅ Trámites seguros y gratuitos</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 HUMANIDAD UNIDA. Todos los derechos reservados.</p>
              <p className="mt-1">
                🌟 Ayudando a personas vulnerables • Previniendo fraudes digitales • 
                <span className="text-yellow-400 font-medium"> Sin fines de lucro</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={shareUrl}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔗 COMPARTIR PÁGINA
              </button>
            </div>
          </div>
          
          {/* Impact Stats */}
          <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-500/20">
            <div className="text-center">
              <p className="text-yellow-300 font-medium text-sm">
                💡 "No más estafas, no más abandono digital. Juntos construimos un México más seguro y conectado."
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;