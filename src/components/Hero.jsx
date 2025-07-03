import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
              <h1 className={styles.title}>Assalamualaikum,  I'm Kashif Nadeem Kayani</h1>
              <p className={styles.description}>
                A passionate WordPress developer, MERN stack enthusiast, and creative designer specializing in Fusion and DaVinci Resolve.
              </p>
            </motion.div>
          </Col>
          <Col md={6} className="text-center">
            <motion.img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;