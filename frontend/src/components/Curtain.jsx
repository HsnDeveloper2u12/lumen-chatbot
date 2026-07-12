function Curtain({ open }) {
  return (
    <div className={`curtain ${open ? "curtain--open" : ""}`} aria-hidden="true">
      <div className="curtain__panel curtain__panel--left"></div>
      <div className="curtain__panel curtain__panel--right"></div>
    </div>
  );
}

export default Curtain;
