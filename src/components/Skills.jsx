// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import styles from './Skills.module.css';

// const skillsData = {
//   'Technical Skills': ['SolidWorks', 'Ansys', 'Advanced Excel', 'AutoDesk Fusion', 'MatLab'],
//   'Programming Languages': ['C++', 'Python', 'JavaScript', 'HTML', 'CSS'],
//   'Frameworks & Technologies': ['Bootstrap', 'Node.js', 'React', 'MERN Stack', 'WordPress'],
//   'Design & Editing Tools': ['Canva', 'Adobe Photoshop','Adobe Illustrator', 'DaVinci Resolve', 'Fusion'],
//   'Professional Skills': ['Teamwork', 'Leadership', 'Communication', 'Adaptability', 'Problem-Solving'],

// };

// const Skills = () => {
//   return (
//     <section id="skills" className={styles.skills}>
//       <Container>
//         <motion.h2
//           className={`text-center mb-4 ${styles.sectionTitle}`}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           Skills
//         </motion.h2>
//         <Row>
//           {Object.entries(skillsData).map(([category, skills], index) => (
//             <Col md={6} key={category} className="mb-4">
//               <motion.div
//                 initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 exit={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
//                 viewport={{ once: false, amount: 0.3 }}
//                 transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <h4 className={styles.category}>{category}</h4>
//                 {skills.map((skill, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={styles.skillItem}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: 'spring', stiffness: 300 }}
//                   >
//                     <span className={styles.badge}>{skill}</span>
//                     <div className="progress">
//                       <div
//                         className={`progress-bar ${styles.progressBar}`}
//                         role="progressbar"
//                         style={{ width: `${Math.random() * 30 + 70}%` }}
//                         aria-valuenow="80"
//                         aria-valuemin="0"
//                         aria-valuemax="100"
//                       ></div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Skills;


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillsData = {
  'Technical Skills': [
    { name: 'SolidWorks', level: 90 },
    { name: 'Ansys', level: 80 },
    { name: 'Advanced Excel', level: 98 },
    { name: 'AutoDesk Fusion', level: 85 },
    { name: 'MatLab', level: 95 },
  ],
  'Programming Languages': [
    { name: 'C++', level: 92 },
    { name: 'Basic Python', level: 90 },
    { name: 'JavaScript', level: 98 },
    { name: 'HTML', level: 97 },
    { name: 'CSS', level: 96 },
  ],
  'Frameworks & Technologies': [
    { name: 'Bootstrap', level: 85 },
    { name: 'Node.js', level: 70 },
    { name: 'React', level: 90 },
    { name: 'MERN Stack', level: 65 },
    { name: 'WordPress', level: 70 },
  ],
  'Design & Editing Tools': [
    { name: 'Canva', level: 95 },
    { name: 'Adobe Photoshop', level: 75 },
    { name: 'Adobe Illustrator', level: 70 },
    { name: 'DaVinci Resolve', level: 96 },
    { name: 'Figma', level: 40 },
  ],
  'Professional Skills': [
    { name: 'Teamwork', level: 95 },
    { name: 'Leadership', level: 95 },
    { name: 'Communication', level: 94},
    { name: 'Adaptability', level: 80 },
    { name: 'Problem-Solving', level: 98 },
  ],
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
                    <span className={styles.badge}>{skill.name}</span>
                    <div className="progress">
                      <div
                        className={`progress-bar ${styles.progressBar}`}
                        role="progressbar"
                        style={{ width: `${skill.level}%` }}
                        aria-valuenow={skill.level}
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
