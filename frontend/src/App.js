import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import components
import Home from "./components/Home";
import CFE from "./components/CFE";
import Certificates from "./components/Certificates";
import Fiscal from "./components/Fiscal";
import CFDI from "./components/CFDI";
import Tramites from "./components/Tramites";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${API}/analytics/dashboard`);
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <BrowserRouter>
        <Navbar analytics={analytics} />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home analytics={analytics} />} />
            <Route path="/cfe" element={<CFE />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/fiscal" element={<Fiscal />} />
            <Route path="/cfdi" element={<CFDI />} />
            <Route path="/tramites" element={<Tramites />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
