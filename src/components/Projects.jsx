// import React, { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import project1 from '../assets/CV.jpg';
// import Reliable from '../assets/Reliable.jpg';
// import TicTacToe from '../assets/TicTacToe.jpg';
// import Mech from '../assets/Mechanical.png';
// import ReactPlayer from 'react-player';
// import styles from './Projects.module.css';

// const projectData = {
//   'Webdev Projects': [
//     { title: 'myCV', image: project1, link: 'https://kashifnadeemkayani.github.io/myCV/', type: 'web' },
//     { title: "The Reliable Mart's Web Page", image: Reliable, link: 'https://thereliablemart.github.io/ItemList/', type: 'web' },
//     { title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)', image: TicTacToe, link: 'https://kashifnadeemkayani.github.io/TicTacToe./', type: 'web' },
//   ],
//   'Graphic Designing Projects': [
//     { title: 'Canva Poster', image: Mech, type: 'graphic' },
//     { title: 'Canva Poster', image: Reliable, type: 'graphic' },
//   ],
//   'Fusion Projects': [
//     { title: 'Fusion Project 1', image: project1, type: 'fusion' },
//   ],
//   'Video Editing Projects': [
//     { title: 'DaVinci Resolve Video', thumbnail: project1, videoUrl: 'https://www.example.com/sample-video.mp4', type: 'video' },
//   ],
// };

// const Projects = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [playing, setPlaying] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('WebDev Projects');
//   const [currentIndex, setCurrentIndex] = useState(0); // Track current project index in category

//   useEffect(() => {
//     // Add or remove 'no-scroll' class on body based on modal state
//     if (showModal) {
//       document.body.classList.add('no-scroll');
//     } else {
//       document.body.classList.remove('no-scroll');
//     }

//     // Handle keyboard events
//     const handleKeyDown = (event) => {
//       if (showModal) {
//         // Modal is open: Navigate images or close with Esc
//         if (event.key === 'Escape' || event.keyCode === 27) {
//           setShowModal(false);
//           setPlaying(false);
//         } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
//           // Move to previous project
//           const prevIndex = (currentIndex - 1 + projectData[activeCategory].length) % projectData[activeCategory].length;
//           setCurrentIndex(prevIndex);
//           setSelectedProject(projectData[activeCategory][prevIndex]);
//         } else if (event.key === 'ArrowRight' || event.keyCode === 39) {
//           // Move to next project
//           const nextIndex = (currentIndex + 1) % projectData[activeCategory].length;
//           setCurrentIndex(nextIndex);
//           setSelectedProject(projectData[activeCategory][nextIndex]);
//         }
//       } else {
//         // Modal is closed: Navigate categories
//         const categories = Object.keys(projectData);
//         const currentCategoryIndex = categories.indexOf(activeCategory);
//         if (event.key === 'ArrowLeft' || event.keyCode === 37) {
//           // Move to previous category
//           const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
//           if (categories[prevCategoryIndex] !== 'Fusion Projects' && categories[prevCategoryIndex] !== 'Video Editing Projects') {
//             setActiveCategory(categories[prevCategoryIndex]);
//           }
//         } else if (event.key === 'ArrowRight' || event.keyCode === 39) {
//           // Move to next category
//           const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
//           if (categories[nextCategoryIndex] !== 'Fusion Projects' && categories[nextCategoryIndex] !== 'Video Editing Projects') {
//             setActiveCategory(categories[nextCategoryIndex]);
//           }
//         }
//       }
//     };

//     // Add event listener only when component is mounted
//     window.addEventListener('keydown', handleKeyDown);

//     // Cleanup event listener on unmount
//     return () => {
//       document.body.classList.remove('no-scroll');
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [showModal, activeCategory, currentIndex]); // Re-run when these states change

//   const handleShow = (project) => {
//     if (project.type === 'web') {
//       window.open(project.link, '_blank');
//     } else if (project.type === 'video') {
//       setSelectedProject(project);
//       setShowModal(true);
//       setPlaying(true);
//       setCurrentIndex(projectData[activeCategory].findIndex(p => p.title === project.title));
//     } else {
//       setSelectedProject(project);
//       setShowModal(true);
//       setCurrentIndex(projectData[activeCategory].findIndex(p => p.title === project.title));
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setPlaying(false);
//   };

//   const renderContent = () => {
//     if (selectedProject?.type === 'video' && selectedProject.videoUrl) {
//       return (
//         <ReactPlayer
//           url={selectedProject.videoUrl}
//           playing={playing}
//           controls={true}
//           width="100%"
//           height="100%"
//           onPlay={() => setPlaying(true)}
//           onPause={() => setPlaying(false)}
//         />
//       );
//     }
//     return <img src={selectedProject?.image || selectedProject?.thumbnail} alt={selectedProject?.title} className={styles.enlargedImage} />;
//   };

//   const handleCategoryClick = (category, event) => {
//     event.preventDefault();
//     if (category === 'Fusion Projects' || category === 'Video Editing Projects') {
//       if (window.innerWidth <= 768) {
//         alert('This category is currently disabled by Kashif Nadeem Kayani.');
//       }
//       return;
//     }
//     setActiveCategory(category);
//   };

//   return (
//     <section id="projects" className={styles.projects}>
//       <Container>
//         <motion.h2
//           className={`text-center mb-4 ${styles.sectionTitle}`}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           Projects
//         </motion.h2>
//         <div className={styles.categorySlider}>
//           {Object.keys(projectData).map((category, index) => (
//             <button
//               key={index}
//               className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''} ${(category === 'Fusion Projects' || category === 'Video Editing Projects') ? styles.disabledCategory : ''
//                 }`}
//               onClick={(event) => handleCategoryClick(category, event)}
//               style={{
//                 cursor: (category === 'Fusion Projects' || category === 'Video Editing Projects') && window.innerWidth > 768 ? 'not-allowed' : 'pointer',
//               }}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className={styles.projectGrid}>
//             {projectData[activeCategory].map((project, idx) => (
//               <motion.div
//                 key={idx}
//                 className={styles.projectItem}
//                 custom={idx}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: false, amount: 0.3 }}
//                 transition={{ duration: 0.6, delay: idx * 0.2 }}
//                 onClick={() => handleShow(project)}
//                 whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
//               >
//                 <div className={styles.projectImageContainer}>
//                   <img src={project.image || project.thumbnail} alt={project.title} className={styles.projectImage} />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//         {showModal && (
//           <>
//             <button className={styles.closeButton} onClick={handleClose}>
//               ✕
//             </button>
//             <div className={styles.customEnlargedView}>
//               <div className={styles.enlargedContent}>
//                 {renderContent()}
//               </div>
//             </div>
//           </>
//         )}
//       </Container>
//     </section>
//   );
// };

// export default Projects;









import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import project1 from '../assets/CV.jpg';
import Reliable from '../assets/Reliable.jpg';
import TicTacToe from '../assets/TicTacToe.jpg';
import Mech from '../assets/Mechanical.png';
import ReactPlayer from 'react-player';
import styles from './Projects.module.css';

const projectData = {
  'WebDev Projects': [
    { title: 'myCV', image: project1, link: 'https://kashifnadeemkayani.github.io/myCV/', type: 'web' },
    { title: "The Reliable Mart's Web Page", image: Reliable, link: 'https://thereliablemart.github.io/ItemList/', type: 'web' },
    { title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)', image: TicTacToe, link: 'https://kashifnadeemkayani.github.io/TicTacToe./', type: 'web' },
  ],
  'Graphic Designing Projects': [
    { title: 'Canva Poster', image: Mech, type: 'graphic' },
  ],
  'Fusion Projects': [
    { title: 'Fusion Project 1', image: project1, type: 'fusion' },
  ],
  'Video Editing Projects': [
    { title: 'DaVinci Resolve Video', thumbnail: project1, videoUrl: 'https://www.example.com/sample-video.mp4', type: 'video' },
  ],
};

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('WebDev Projects');
  const [currentIndex, setCurrentIndex] = useState(0); // Track current project index in category

  useEffect(() => {
    // Add or remove 'no-scroll' class on body based on modal state
    if (showModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Handle keyboard events globally
    const handleKeyDown = (event) => {
      if (showModal) {
        // Modal is open: Navigate images or close with Esc
        if (event.key === 'Escape' || event.keyCode === 27) {
          setShowModal(false);
          setPlaying(false);
        } else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
          // Move to previous project
          const prevIndex = (currentIndex - 1 + projectData[activeCategory].length) % projectData[activeCategory].length;
          setCurrentIndex(prevIndex);
          setSelectedProject(projectData[activeCategory][prevIndex]);
        } else if (event.key === 'ArrowRight' || event.keyCode === 39) {
          // Move to next project
          const nextIndex = (currentIndex + 1) % projectData[activeCategory].length;
          setCurrentIndex(nextIndex);
          setSelectedProject(projectData[activeCategory][nextIndex]);
        }
      } else {
        // Modal is closed: Navigate categories globally
        const categories = Object.keys(projectData);
        const currentCategoryIndex = categories.indexOf(activeCategory);
        if (event.key === 'ArrowLeft' || event.keyCode === 37) {
          // Move to previous category
          let prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
          while (prevCategoryIndex !== currentCategoryIndex && (categories[prevCategoryIndex] === 'Fusion Projects' || categories[prevCategoryIndex] === 'Video Editing Projects')) {
            prevCategoryIndex = (prevCategoryIndex - 1 + categories.length) % categories.length;
          }
          if (categories[prevCategoryIndex] !== 'Fusion Projects' && categories[prevCategoryIndex] !== 'Video Editing Projects') {
            setActiveCategory(categories[prevCategoryIndex]);
          }
        } else if (event.key === 'ArrowRight' || event.keyCode === 39) {
          // Move to next category
          let nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
          while (nextCategoryIndex !== currentCategoryIndex && (categories[nextCategoryIndex] === 'Fusion Projects' || categories[nextCategoryIndex] === 'Video Editing Projects')) {
            nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
          }
          if (categories[nextCategoryIndex] !== 'Fusion Projects' && categories[nextCategoryIndex] !== 'Video Editing Projects') {
            setActiveCategory(categories[nextCategoryIndex]);
          }
        }
      }
    };

    // Add event listener globally
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal, activeCategory, currentIndex]); // Re-run when these states change

  const handleShow = (project) => {
    if (project.type === 'web') {
      window.open(project.link, '_blank');
    } else if (project.type === 'video') {
      setSelectedProject(project);
      setShowModal(true);
      setPlaying(true);
      setCurrentIndex(projectData[activeCategory].findIndex(p => p.title === project.title));
    } else {
      setSelectedProject(project);
      setShowModal(true);
      setCurrentIndex(projectData[activeCategory].findIndex(p => p.title === project.title));
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

  const handleCategoryClick = (category, event) => {
    event.preventDefault();
    if (category === 'Fusion Projects' || category === 'Video Editing Projects') {
      if (window.innerWidth <= 768) {
        alert('This category is currently disabled by Kashif Nadeem Kayani.');
      }
      return;
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
              className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategory : ''} ${(category === 'Fusion Projects' || category === 'Video Editing Projects') ? styles.disabledCategory : ''
                }`}
              onClick={(event) => handleCategoryClick(category, event)}
              style={{
                cursor: (category === 'Fusion Projects' || category === 'Video Editing Projects') && window.innerWidth > 768 ? 'not-allowed' : 'pointer',
              }}
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
                whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
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
            <button className={styles.closeButton} onClick={handleClose}>
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