import React from 'react';
import Navbar      from './components/mkt/Navbar';
import Hero        from './components/mkt/Hero';
import Mission     from './components/mkt/Mission';
import Packs       from './components/mkt/Packs';
import Methodology from './components/mkt/Methodology';
import Team        from './components/mkt/Team';
import Clients     from './components/mkt/Clients';
import Contact     from './components/mkt/Contact';
import Footer      from './components/mkt/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1E232B] font-sans antialiased">
      <Navbar />
      <Hero />
      <Mission />
      <Packs />
      <Methodology />
      <Team />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}
