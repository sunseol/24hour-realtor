import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Menu, X } from 'lucide-react';
import { useScroll } from '../../hooks';
import { navLinks } from '../../data/defaults';
import Button from '../common/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScroll(20);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const showTransparent = isHomePage && !isScrolled;

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.hash && location.pathname === '/') {
      const element = document.querySelector(link.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showTransparent
          ? "bg-transparent py-5"
          : "bg-white shadow-lg py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              showTransparent ? "bg-white/20 backdrop-blur text-white" : "bg-slate-900 text-amber-500"
            }`}>
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold leading-none ${showTransparent ? "text-white" : "text-slate-900"}`}>
                24시<span className="text-amber-500"> 코리아 부동산</span>
              </span>
              <span className={`text-xs font-medium tracking-wider ${showTransparent ? "text-white/70" : "text-slate-500"}`}>
                24-HOUR REALTOR
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.hash ? `/${link.hash}` : link.href}
                onClick={() => handleNavClick(link)}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  showTransparent ? "text-white/90" : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="primary" size="md">
                상담하기
              </Button>
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${showTransparent ? "text-white" : "text-slate-900"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-2xl p-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.hash ? `/${link.hash}` : link.href}
                className="block py-2 text-slate-700 font-medium hover:text-amber-500"
                onClick={() => handleNavClick(link)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                상담하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
