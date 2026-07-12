import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Curtain from "./components/Curtain.jsx";
import Home from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import "./App.css";

const TRANSITION_MS = 550;

function App() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Play the "window opening" reveal once on first load.
  useEffect(() => {
    const timer = setTimeout(() => setCurtainOpen(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Curtain-style page transition: close the shutters, swap the route
  // underneath while hidden, then open them again on the new page.
  const handleNavigate = (path) => {
    if (path === location.pathname) return;
    setCurtainOpen(false);
    setTimeout(() => {
      navigate(path);
      requestAnimationFrame(() => {
        setTimeout(() => setCurtainOpen(true), 60);
      });
    }, TRANSITION_MS);
  };

  return (
    <div className="page">
      <div className="bg-decor" aria-hidden="true">
        <span className="bg-decor__blob bg-decor__blob--violet"></span>
        <span className="bg-decor__blob bg-decor__blob--pink"></span>
        <span className="bg-decor__blob bg-decor__blob--cyan"></span>
      </div>
      <Curtain open={curtainOpen} />
      <Navbar onNavigate={handleNavigate} />
      <main key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
