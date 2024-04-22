import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <p>&copy; {currentYear} ProductPulse</p> {/* Updated website name */}
      </footer>
    </div>
  );
}
