import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const sections = [
  'hero',
  'education',
  'skills',
  'projects',
  'certificates',
  'contact'
];

const NavigationBar = () => {
  const navRef = useRef(null);
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (sliderRef.current && isMobile) {
      setDragWidth(
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
      );
    }
  }, [isMobile]);

  // Scroll handler (same as your original)
  useEffect(() => {
    if (!navRef.current) return;
    const handleScroll = () => {
      if (!navRef.current) return;
      const links = navRef.current.querySelectorAll('a');
      let currentSection = null;
      let maxVisibleHeight = 0;
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          const sectionId = href.substring(1);
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
            if (visibleHeight > maxVisibleHeight && rect.top <= 100 && rect.bottom >= 100) {
              maxVisibleHeight = visibleHeight;
              currentSection = link;
            }
          }
        }
      });
      if (currentSection) {
        currentSection.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav ref={navRef} className={styles.navbar}>
      {isMobile ? (
        <div className={styles.sliderOuter}>
          <motion.div
            ref={sliderRef}
            className={styles.sliderContainer}
            drag="x"
            dragConstraints={{ left: -dragWidth, right: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            {sections.map((section) => (
              <motion.div
                key={section}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={styles.slideItem}
              >
                <Nav.Link
                  as={Link}
                  to={section}
                  smooth={true}
                  duration={600}
                  offset={-100}
                  spy={true}
                  activeClass={styles.active}
                  className={styles.navLink}
                  onClick={() => {
                    if (navRef.current) {
                      const activeLink = navRef.current.querySelector(`a[href="#${section}"]`);
                      activeLink?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                    }
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Nav.Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        sections.map((section) => (
          <motion.div
            key={section}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Nav.Link
              as={Link}
              to={section}
              smooth={true}
              duration={600}
              offset={-100}
              spy={true}
              activeClass={styles.active}
              className={styles.navLink}
              onClick={() => {
                if (navRef.current) {
                  const activeLink = navRef.current.querySelector(`a[href="#${section}"]`);
                  activeLink?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
                }
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Nav.Link>
          </motion.div>
        ))
      )}
    </Nav>
  );
};

export default NavigationBar;
