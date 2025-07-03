import React from 'react';

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        'service_yw5sp05',
        'template_oa1uj7j',
        formData,
        '7Ba6Ij1877lqULeWr'
      )
      .then(
        () => {
          setShowSuccessModal(true);
          setFormData({ from_name: '', from_email: '', message: '' });
        },
        (error) => {
          console.error('Failed to send email:', error);
          setShowErrorModal(true);
        }
      );
  };

  return (
    <section id="contact" className={styles.contact}>
      <Container>
        <motion.h2
          className={`text-center mb-4 ${styles.sectionTitle}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>
        <Row>
          <Col md={6} className="mb-4">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <Form onSubmit={sendEmail}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.submitButton}>
                  Send Message
                </Button>
              </Form>
            </motion.div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <h4 className={styles.connectTitle}>Connect with Me</h4>
              <div className={styles.socialIcons}>
                <a href="https://github.com/KashifNadeemKayani/" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={30} className={styles.icon} />
                </a>
                <a href="www.linkedin.com/in/kashif-nadeem-kayani-060ab1314" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={30} className={styles.icon} />
                </a>
                <a href="https://www.instagram.com/kashif_nadeem_kayani_?igsh=MXhnb2pweDc2eDNucQ==" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className={styles.icon} />
                </a>
                <a href="mailto:kashifnadeem898@email.com">
                  <FaEnvelope size={30} className={styles.icon} />
                </a>
              </div>
            </motion.div>
          </Col>
        </Row>
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Message sent successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Failed to send message. Please try again.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default Contact;