import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from './Education.module.css';

const educationData = [
  {
    degree: 'Matric',
    institution: 'Iftikhar Model  Academy ',
    duration: '2019-21',
  },
  {
    degree: 'Intermediate',
    institution: 'PakTurk Maarif International Schools & Colleges ',
    duration: '2021-23',
  },
  {
    degree: 'Bachelor of Engineering in Mechanical',
    institution: 'National University of Sciences and Technology',
    duration: '2023-Present',
  },
];

const Education = () => {
  return (
    <section id="education" className={styles.education}>
      <Container>
        <motion.h2
          className={`text-center mb-4 ${styles.sectionTitle}`}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        <Row>
          {educationData.map((edu, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className={styles.card}>
                  <Card.Body>
                    <Card.Title>{edu.degree}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{edu.institution}</Card.Subtitle>
                    <Card.Text>{edu.duration}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Education;