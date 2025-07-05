import React, { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader when the page is fully loaded
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);

    // Cleanup the event listener
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return loading ? (
    <div className={styles.preloader}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  ) : null;
};

export default Preloader;