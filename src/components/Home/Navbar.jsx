import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu on large resize
    const handleResizeClose = () => {
      if (window.innerWidth >= 768 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResizeClose);
    return () => window.removeEventListener('resize', handleResizeClose);
  }, [menuOpen]);

  const navItems = ['ACCUEIL', 'PROTOTYPES', 'SERVICES', 'COLLABORATION'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-teko font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
              NEXUS WebLab
            </span>
          </div>

          {/* Desktop Navigation Links */}
          {/* <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-cyan-400 transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
              >
                {item}
              </a>
            ))}
          </div> */}

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <a href="/login">
              <button className="hidden md:inline-block px-4 py-2 text-sm font-medium text-black bg-gradient-to-r from-white to-cyan-400 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                SE CONNECTER
              </button>
            </a>
            {/* <button
              onClick={() => setMenuOpen((s) => !s)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-cyan-300 hover:text-white hover:bg-white/5 transition"
            >
              <svg className={`h-6 w-6 transform transition-transform ${menuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div className={`md:hidden fixed inset-x-0 top-16 z-40 transition-transform duration-300 ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2/4 opacity-0 pointer-events-none'}`}>
        <div className="bg-black/90 backdrop-blur-md border-t border-white/5 px-4 py-6">
          <div className="flex flex-col space-y-4">
            {/* {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-white text-lg uppercase tracking-wider font-semibold"
              >
                {item}
              </a>
            ))} */}

            {/* <button onClick={() => setMenuOpen(false)} className="mt-3 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full">
              DEMARRER L'EXPLORATION
            </button> */}

            <a href="/login">
              <button className="mt-3 px-4 py-2 text-sm font-medium text-black bg-gradient-to-r from-white to-cyan-400 rounded-full">
                SE CONNECTER
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
