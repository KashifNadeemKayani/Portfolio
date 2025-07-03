import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './BackToTop.module.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="hero" smooth={true} duration={600} offset={-80}>
        <button className={`${styles.backToTop} ${isVisible ? styles.show : ''}`}>
          <FaArrowUp />
        </button>
      </Link>
    </motion.div>
  );
};

export default BackToTop;