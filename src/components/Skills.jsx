import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillsData = {
  'Programming Languages': ['C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
  'Frameworks & Technologies': ['Bootstrap', 'Node.js', 'React', 'MERN Stack', 'WordPress'],
  'Design & Editing Tools': ['Canva', 'Adobe Photoshop','Adobe Illustrator', 'DaVinci Resolve', 'Fusion'],
};

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <Container>
        <motion.h2
          className={`text-center mb-4 ${styles.sectionTitle}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <Row>
          {Object.entries(skillsData).map(([category, skills], index) => (
            <Col md={4} key={category} className="mb-4">
              <motion.div
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                exit={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
                whileHover={{ scale: 1.03 }}
              >
                <h4 className={styles.category}>{category}</h4>
                {skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.skillItem}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className={styles.badge}>{skill}</span>
                    <div className="progress">
                      <div
                        className={`progress-bar ${styles.progressBar}`}
                        role="progressbar"
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Skills;