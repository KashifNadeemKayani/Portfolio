import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import styles from './App.module.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      console.log('Page fully loaded');
      setLoading(false); // Set loading to false when load event fires
    };

    // Add event listener for page load
    window.addEventListener('load', handleLoad);

    // Fallback: Check if page is already loaded
    if (document.readyState === 'complete') {
      console.log('Page already loaded');
      setLoading(false);
    }

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className={styles.app}>
      {loading ? (
        <Preloader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <ScrollProgress />
          <Element name="hero">
            <Hero />
          </Element>
          <Element name="education">
            <Education />
          </Element>
          <Element name="skills">
            <Skills />
          </Element>
          <Element name="projects">
            <Projects />
          </Element>
          <Element name="certificates">
            <Certificates />
          </Element>
          <Element name="contact">
            <Contact />
          </Element>
          <BackToTop />
        </motion.div>
      )}
    </div>
  );
};

export default App;