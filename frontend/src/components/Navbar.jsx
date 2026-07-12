import { useLocation } from "react-router-dom";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

function Navbar({ onNavigate }) {
  const location = useLocation();
  const activeIndex = LINKS.findIndex((l) => l.path === location.pathname);

  return (
    <header className="navbar">
      <button
        className="navbar__brand"
        onClick={() => onNavigate("/")}
        aria-label="Go to home"
      >
        <span className="navbar__orb" aria-hidden="true"></span>
        <span className="navbar__name">Lumen</span>
      </button>

      <nav className="navbar__track">
        <span
          className="navbar__thumb"
          style={{ transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
        ></span>
        {LINKS.map((link) => (
          <button
            key={link.path}
            className={`navbar__link ${location.pathname === link.path ? "is-active" : ""}`}
            onClick={() => onNavigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
