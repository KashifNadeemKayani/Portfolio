import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
// import cert1 from '../assets/Pic.jpg';
import KT from '../assets/KT Hatori.jpg';
import AKDC from '../assets/AKDC.jpg';
import AKDCN from '../assets/ADKCnationals.jpg';
import styles from './Certificates.module.css';

const certificatesData = [
  {
    title: 'KT Hatori Design Challenge',
    platform: 'National University of Sciences and Technology',
    date: 'Dec 2023',
    image: KT,
  },
  {
    title: 'Abul Kalam Design Challenge (AKDC)',
    platform: 'National University of Sciences and Technology',
    date: 'May 2024',
    image: AKDC,
  },
  {
    title: 'Abul Kalam Design Challenge(AKDC) Nationals',
    platform: 'ImechE Pakistan UET Taxila',
    date: 'Jan 2025',
    image: AKDCN,
  },
];

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  // Handle Esc key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && selectedImage) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  return (
    <section id="certificates" className={styles.certificates}>
      <Container>
        <motion.h2
          className={`text-center mb-4 ${styles.sectionTitle}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Certificates
        </motion.h2>
        <Row>
          {certificatesData.map((cert, index) => (
            <Col md={6} key={index} className="mb-4">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={cert.image}
                    alt={cert.title}
                    className={styles.certImage}
                    onClick={() => handleImageClick(cert.image)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Card.Body>
                    <Card.Title>{cert.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{cert.platform}</Card.Subtitle>
                    <Card.Text>{cert.date}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      {selectedImage && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged Certificate"
            className={styles.enlargedImage}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            className={styles.closeButton}
            onClick={handleClose}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            ✕
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default Certificates;