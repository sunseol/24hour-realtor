import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import FeaturedProperties from './components/FeaturedProperties';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <FeaturedProperties />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
