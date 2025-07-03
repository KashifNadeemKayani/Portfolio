import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import project1 from '../assets/CV.png';
import Reliable from '../assets/Reliable.png';
import TicTacToe from '../assets/TicTacToe.png';
import ReactPlayer from 'react-player';
import styles from './Projects.module.css';

const projectData = {
  'Front-End Projects': [
    { title: 'myCV', image: project1, link: 'https://kashifnadeemkayani.github.io/myCV/', type: 'web' },
    { title: "The Reliable Mart's Web Page", image: Reliable, link: 'https://thereliablemart.github.io/ItemList/', type: 'web' },
    { title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)', image: TicTacToe, link: 'https://kashifnadeemkayani.github.io/TicTacToe./', type: 'web' },
  ],
  'Fusion Projects': [
    { title: 'Fusion Project 1', image: project1, type: 'fusion' },
  ],
  'Graphic Designing Projects': [
    { title: 'Canva Poster', image: project1, type: 'graphic' },
  ],
  'Video Editing Projects': [
    { title: 'DaVinci Resolve Video', thumbnail: project1, videoUrl: 'https://www.example.com/sample-video.mp4', type: 'video' },
  ],
};

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Front-End Projects');
  const [isFrontEndOnly] = useState(true); // Set to false to re-enable all categories

  const handleShow = (project) => {
    if (project.type === 'web') {
      window.open(project.link, '_blank');
    } else if (project.type === 'video') {
      setSelectedProject(project);
      setShowModal(true);
      setPlaying(true);
    } else {
      setSelectedProject(project);
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPlaying(false);
  };

  const renderContent = () => {
    if (selectedProject?.type === 'video' && selectedProject.videoUrl) {
      return (
        <ReactPlayer
          url={selectedProject.videoUrl}
          playing={playing}
          controls={true}
          width="100%"
          height="100%"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      );
    }
    return <img src={selectedProject?.image || selectedProject?.thumbnail} alt={selectedProject?.title} className={styles.enlargedImage} />;
  };

  const handleCategoryClick = (category) => {
    if (isFrontEndOnly && category !== 'Front-End Projects') {
      if (window.innerWidth <= 768) {
        alert('This category is currently disabled by Kashif Nadeem Kayani.');
      }
      return; // Prevent category change
    }
    setActiveCategory(category);
  };

  return (
    <section id="projects" className={styles.projects}>
      <Container>
        <motion.h2
          className={`text-center mb-4 ${styles.sectionTitle}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <div className={styles.categorySlider}>
          {Object.keys(projectData).map((category, index) => (
            <button
              key={index}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''} ${isFrontEndOnly && category !== 'Front-End Projects' ? styles.disabledCategory : ''
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.projectGrid}>
            {projectData[activeCategory].map((project, idx) => (
              <motion.div
                key={idx}
                className={styles.projectItem}
                custom={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                onClick={() => handleShow(project)}
                whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }} // Disable scale on mobile
              >
                <div className={styles.projectImageContainer}>
                  <img src={project.image || project.thumbnail} alt={project.title} className={styles.projectImage} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {showModal && (
          <>
            <button
              className={styles.closeButton}
              onClick={handleClose}
            >
              ✕
            </button>
            <div className={styles.customEnlargedView}>
              <div className={styles.enlargedContent}>
                {renderContent()}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Projects;