import React from 'react'

import { useState, useEffect } from 'react';
import '../assets/home.css';
import Navbar from './Home/Navbar';
import ThreeDCharacter from './Home/ThreeDCharacter';


const Home = () => {

  const sections = [
    {
      "id": 0,
      "subtitle": "CRÉATION SUR MESURE",
      "title": "SITES WEB MODERNES",
      "description": "Conception et développement de sites vitrines, e-commerce et plateformes sur mesure, alliant design responsive et performance.",
      "stats": [
        { "number": "120+", "label": "PROJETS RÉALISÉS" },
        { "number": "95%", "label": "CLIENTS SATISFAITS" }
      ]
    },
    {
      "id": 1,
      "subtitle": "EXPÉRIENCE UTILISATEUR",
      "title": "APPLICATIONS MOBILES",
      "description": "Développement d’applications Android et iOS performantes et intuitives, conçues pour offrir une expérience fluide et engageante.",
      "features": [
        "DESIGN ADAPTÉ À CHAQUE MARQUE",
        "PERFORMANCE OPTIMISÉE",
        "MAINTENANCE & MISES À JOUR"
      ]
    },
    {
      "id": 2,
      "subtitle": "TECHNOLOGIES INNOVANTES",
      "title": "SOLUTIONS DIGITALES",
      "description": "Mise en place de solutions digitales personnalisées : tableaux de bord, systèmes de gestion et intégration d’API sécurisées.",
      "techSpecs": [
        "INTÉGRATION API",
        "TABLEAUX DE BORD INTERACTIFS",
        "SÉCURITÉ RENFORCÉE"
      ]
    },
    {
      "id": 3,
      "subtitle": "TRAVAILLEZ AVEC NOUS",
      "title": "COLLABORATION",
      "description": "Discutons de votre projet et donnons vie à vos idées grâce à des solutions digitales adaptées à vos besoins.",
      "contact": {
        "email": "maryratiary@gmail.com",
        "phone": "+261 32 31 084 80"
      }
    }
  ];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTiny, setIsTiny] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTiny(w < 420);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const newProgress = (scrollProgress + (e.deltaY > 0 ? 0.02 : -0.02));
      setScrollProgress(newProgress < 0 ? 1 + newProgress : newProgress % 1);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [scrollProgress]);

  const short = (text, limit = 80) => (text && text.length > limit ? text.slice(0, limit).trim() + '...' : text);
  const shortTitle = (text) => isTiny ? short(text, 20) : isMobile ? short(text, 30) : text;
  const shortSubtitle = (text) => isTiny ? short(text, 18) : isMobile ? short(text, 30) : text;

  // Helper to produce indicator classes (keeps JSX simpler)
  const indicatorClass = (index) => {
    if (currentSection === index) {
      return `h-1 transition-all duration-300 ${isMobile ? 'w-8 bg-cyan-100' : 'w-12 bg-cyan-100'}`;
    }
    return `h-1 transition-all duration-300 ${isMobile ? 'w-2 bg-gray-600' : 'w-4 bg-gray-600'}`;
  };

  const timelineClass = (index) => (currentSection === index ? 'w-[1px] h-16 bg-cyan-400 transition-all duration-300' : 'w-[1px] h-16 bg-gray-600 transition-all duration-300');



  return (


    <div className="flex flex-col h-screen relative overflow-hidden bg-black py-4 sm:py-10">
      <div className="absolute inset-0 w-full h-full z-0">
        <ThreeDCharacter scrollProgress={scrollProgress} setCurrentSection={setCurrentSection} />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Vertical bars: hidden on tiny */}
        {/* <div className={`hidden sm:fixed ${isTiny ? '' : 'left-4'} top-24 bottom-24 sm:flex flex-col justify-between items-center w-10 sm:left-8 sm:top-32 sm:bottom-32 sm:w-14`}>
          {!isTiny && <div className="w-[1px] h-20 sm:h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />}
          {!isTiny && <div className="rotate-180 tracking-[0.45em] text-cyan-400 text-[11px] sm:text-xs writing-mode-vertical">EXPLOREZ</div>}
          {!isTiny && <div className="w-[1px] h-20 sm:h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />}
        </div> */}

        {/* Right live indicator: hidden on tiny */}
        {/* {!isTiny && (
          <div className="hidden sm:fixed right-4 top-24 sm:flex flex-col items-end space-y-4 sm:right-8 sm:top-32 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
              <div className="text-[11px] sm:text-xs text-cyan-400">LIVE</div>
            </div>
            <div className="h-28 sm:h-36 w-[1px] bg-gradient-to-b from-cyan-400/50 to-transparent mx-auto"></div>
            <div className="text-[11px] sm:text-xs text-gray-400 tracking-wider">{new Date().getFullYear()}</div>
          </div>
        )} */}

        {/* Header: navigation links hidden on mobile/tiny */}
        <div className="fixed top-25 left-4 right-4 md:top-15 md:left-1/3 md:-translate-x-1/2">
          <div className="flex justify-between items-center">
            {/* <div className="flex items-center space-x-3 sm:space-x-6">
              <div className={`text-[10px] sm:text-xs text-cyan-400 tracking-[0.28em]`}>SECTION {currentSection + 1}/4</div>
              <div className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
            </div> */}
            <div className="w-2 h-2"></div>
            <div className="hidden sm:flex items-center space-x-6 sm:space-x-10">
              {['SITE', 'APP MOBILE', 'DIGITALISATION', 'COLLABORATION'].map((item, index) => (
                <div key={index} className={`text-xs tracking-[0.16em] transition-colors duration-300 ${currentSection === index ? 'text-cyan-400' : 'text-gray-600'}`}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content - texts shortened and fonts reduced on tiny */}
        <div className={`fixed inset-x-0 ${isTiny ? 'bottom-6' : 'bottom-12'} sm:bottom-24 px-4 sm:px-12`}>
          <div className="max-w-7xl mx-auto">
            {/* Grid: left text / right details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end">
              <div className="col-span-12 md:col-span-7 text-white">
                <div className="space-y-3">
                  <p className={`text-cyan-400 ${isTiny ? 'text-[10px]' : 'text-xs'} tracking-[0.22em] font-light mb-1`}>{shortSubtitle(sections[currentSection].subtitle)}</p>
                  <h2 className={`font-bold bg-gradient-to-r font-teko from-white to-cyan-400 bg-clip-text text-transparent leading-tight ${isTiny ? 'text-lg' : isMobile ? 'text-xl sm:text-3xl' : 'text-2xl md:text-5xl lg:text-6xl'}`}>{shortTitle(sections[currentSection].title)}</h2>
                  <p className={`text-gray-400 font-light tracking-wider max-w-full md:max-w-2xl leading-relaxed ${isTiny ? 'text-sm' : 'text-base'}`}>{isTiny ? short(sections[currentSection].description, 60) : isMobile ? short(sections[currentSection].description, 100) : sections[currentSection].description}</p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 text-white">
                <div className="flex flex-col md:items-end md:justify-center space-y-4">
                  {sections[currentSection].stats && !isTiny && (
                    <div className="w-full md:w-auto">
                      <div className="grid grid-cols-2 gap-4 md:gap-6 text-left md:text-right">
                        {sections[currentSection].stats.map((stat, index) => (
                          <div key={index} className="flex flex-col">
                            <div className={`${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'} font-bold text-cyan-400`}>{stat.number}</div>
                            <div className={`text-xs ${isMobile ? 'text-[10px]' : 'md:text-sm'} tracking-widest text-gray-400`}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* features and techSpecs remain hidden on mobile/tiny */}
                  {!isMobile && !isTiny && sections[currentSection].features && (
                    <div className="mt-2 md:mt-0 w-full md:w-auto text-left md:text-right space-y-2">
                      {sections[currentSection].features.map((feature, index) => (
                        <div key={index} className="text-sm tracking-[0.18em] text-gray-400"><span className="text-cyan-400 mr-2">×</span>{feature}</div>
                      ))}
                    </div>
                  )}

                  {!isMobile && !isTiny && sections[currentSection].techSpecs && (
                    <div className="mt-2 w-full md:w-auto text-left md:text-right">
                      {sections[currentSection].techSpecs.map((spec, index) => (
                        <div key={index} className="inline-block px-3 py-1 border border-cyan-400/30 rounded-full text-xs tracking-wider text-cyan-400 mr-2 mb-2">{spec}</div>
                      ))}
                    </div>
                  )}

                  {/* Contact: on tiny show only email, on mobile show email and small phone */}
                  {sections[currentSection].contact && (
                    <div className="mt-4 text-left md:text-right">
                      <p className={`font-light text-cyan-400 ${isTiny ? 'text-sm' : 'text-base'}`}>{sections[currentSection].contact.email}</p>
                      {!isTiny && <p className={`font-light text-gray-400 ${isMobile ? 'text-sm' : 'text-base'}`}>{sections[currentSection].contact.phone}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section indicator: hide on tiny */}
            {!isTiny && (
              <div className="mt-4 flex justify-center">
                <div className="flex items-center space-x-2">
                  {sections.map((_, index) => (
                    <div key={index} className={indicatorClass(index)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline - desktop only */}
        {/* <div className="hidden lg:block fixed right-40 top-1/2 -translate-y-1/2">
          <div className="flex flex-col space-y-12">
            {sections.map((_, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className={`text-sm ${currentSection === index ? 'text-cyan-400' : 'text-gray-600'}`}>{(index + 1).toString().padStart(2, '0')}</div>
                <div className={timelineClass(index)} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Home
