import React from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

const Preloader = () => {
  return (
    <motion.div
      className={styles.preloader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.dots}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.dot}></div>
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;