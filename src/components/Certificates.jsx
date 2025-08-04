import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import KT from '../assets/KT Hatori.jpg';
import AKDC from '../assets/AKDC.jpg';
import Meta from '../assets/Meta.png';
import Davinci from '../assets/Davinci.png';
import AKDCN from '../assets/ADKCnationals.jpg';
import styles from './Certificates.module.css';

const certificatesData = [
  {
    title: 'Front-End Developer Capstone',
    platform: 'Meta',
    date: '16 July 2025',
    image: Meta,
    link: 'https://coursera.org/verify/YGBV0LNCALD2',
  },
  {
    title: 'DaVinci Resolve 19 Masterclass',
    platform: 'Skillshare',
    date: '04 August 2025',
    image: Davinci,
    link: 'https://coursera.org/verify/YOZJ85RJGM9F',
  },
  {
    title: 'Abul Kalam Design Challenge(AKDC) Nationals',
    platform: 'ImechE Pakistan UET Taxila',
    date: 'Jan 2025',
    image: AKDCN,
  },
  {
    title: 'Abul Kalam Design Challenge (AKDC)',
    platform: 'National University of Sciences and Technology',
    date: 'May 2024',
    image: AKDC,
  },
  {
    title: 'KT Hatori Design Challenge',
    platform: 'National University of Sciences and Technology',
    date: 'Dec 2023',
    image: KT,
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleImageClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleClose = () => {
    setSelectedCert(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && selectedCert) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedCert]);

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
                    onClick={() => handleImageClick(cert)}
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

      {selectedCert && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.img
            src={selectedCert.image}
            alt="Enlarged Certificate"
            className={styles.enlargedImage}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              if (selectedCert.link) {
                window.open(selectedCert.link, '_blank', 'noopener,noreferrer');
              }
            }}
            style={{ cursor: selectedCert.link ? 'pointer' : 'default' }}
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
