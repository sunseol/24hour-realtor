import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '서비스', href: '#services' },
    { name: '매물 정보', href: '#properties' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-gradient-to-b from-black/60 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${scrolled ? 'bg-primary-900 text-gold-400' : 'bg-white text-primary-900'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none ${scrolled ? 'text-primary-900' : 'text-white'}`}>
                24시간<span className="text-gold-500">코리아</span>
              </span>
              <span className={`text-xs font-medium tracking-widest uppercase ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                Real Estate Group
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`text-sm font-semibold tracking-wide hover:text-gold-500 transition-colors ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact"
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${
                scrolled 
                  ? 'bg-primary-900 text-white hover:bg-primary-800' 
                  : 'bg-gold-500 text-white hover:bg-gold-400'
              }`}
            >
              상담 신청
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out transform origin-top border-t border-gray-100 ${
            isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col py-6 px-6 space-y-4">
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="text-lg font-medium text-gray-800 hover:text-gold-600 hover:pl-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="mt-4 text-center w-full bg-primary-900 text-white py-3 rounded-lg font-bold"
              onClick={() => setIsOpen(false)}
            >
              상담 신청
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
