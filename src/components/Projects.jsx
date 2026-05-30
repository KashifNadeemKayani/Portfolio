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


// OLD BUT NOT THAT MUCH 
//______________________________________________________________________________________________________________________________________________



// import React, { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
// import { motion } from 'framer-motion';
// import project1 from '../assets/CV.jpg';
// import Reliable from '../assets/Reliable.jpg';
// import TicTacToe from '../assets/TicTacToe.jpg';
// import Mech from '../assets/Mechanical.png';
// import Loosing from '../assets/Graphic/Loosing.jpg';
// import Mirror from '../assets/Graphic/Mirror.jpg';
// import RealFlex from '../assets/Graphic/RealFlex.jpg';
// import Success from '../assets/Graphic/Success.jpg';
// import Sun from '../assets/Graphic/Sun.jpg';
// import TwoThings from '../assets/Graphic/TwoThings.jpg';
// import Voice from '../assets/Graphic/Voice.jpg';
// import ReactPlayer from 'react-player';
// import styles from './Projects.module.css';

// const projectData = {
//   'WebDev Projects': [
//     { title: 'myCV', image: project1, link: 'https://kashifnadeemkayani.github.io/myCV/', type: 'web' },
//     { title: "The Reliable Mart's Web Page", image: Reliable, link: 'https://thereliablemart.github.io/ItemList/', type: 'web' },
//     { title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)', image: TicTacToe, link: 'https://kashifnadeemkayani.github.io/TicTacToe./', type: 'web' },
//   ],
//   'Graphic Designing Projects': [
//     { title: 'Canva Poster', image: Mech, type: 'graphic' },
//     { title: 'Canva Poster', image: Success, type: 'graphic' },
//     { title: 'Canva Poster', image: Mirror, type: 'graphic' },
//     { title: 'Canva Poster', image: TwoThings, type: 'graphic' },
//     { title: 'Canva Poster', image: RealFlex, type: 'graphic' },
//     { title: 'Canva Poster', image: Sun, type: 'graphic' },
//     { title: 'Canva Poster', image: Loosing, type: 'graphic' },
//     { title: 'Canva Poster', image: Voice, type: 'graphic' },
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

//     // Handle keyboard events globally
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
//         // Modal is closed: Navigate categories globally
//         const categories = Object.keys(projectData);
//         const currentCategoryIndex = categories.indexOf(activeCategory);
//         if (event.key === 'ArrowLeft' || event.keyCode === 37) {
//           // Move to previous category
//           let prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
//           while (prevCategoryIndex !== currentCategoryIndex && (categories[prevCategoryIndex] === 'Fusion Projects' || categories[prevCategoryIndex] === 'Video Editing Projects')) {
//             prevCategoryIndex = (prevCategoryIndex - 1 + categories.length) % categories.length;
//           }
//           if (categories[prevCategoryIndex] !== 'Fusion Projects' && categories[prevCategoryIndex] !== 'Video Editing Projects') {
//             setActiveCategory(categories[prevCategoryIndex]);
//           }
//         } else if (event.key === 'ArrowRight' || event.keyCode === 39) {
//           // Move to next category
//           let nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
//           while (nextCategoryIndex !== currentCategoryIndex && (categories[nextCategoryIndex] === 'Fusion Projects' || categories[nextCategoryIndex] === 'Video Editing Projects')) {
//             nextCategoryIndex = (nextCategoryIndex + 1) % categories.length;
//           }
//           if (categories[nextCategoryIndex] !== 'Fusion Projects' && categories[nextCategoryIndex] !== 'Video Editing Projects') {
//             setActiveCategory(categories[nextCategoryIndex]);
//           }
//         }
//       }
//     };

//     // Add event listener globally
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
//           <div className={`${styles.projectGrid} ${activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignGrid : ''}`}>
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
//                 <div className={`${styles.projectImageContainer} ${activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignContainer : ''}`}>
//                   <img
//                     src={project.image || project.thumbnail}
//                     alt={project.title}
//                     className={`${styles.projectImage} ${activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignImage : ''}`}
//                   />
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


//-------------------------------------
import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import project1 from '../assets/CV.jpg';
import SWCrankSlider from '../assets/SWCrankSlider.png';
import SWCup   from '../assets/SWCup.png';
import CFDPipeFlow   from '../assets/CFDPipeFlow.jpg';
import Reliable from '../assets/Reliable.jpg';
import TicTacToe from '../assets/TicTacToe.jpg';
import Mech from '../assets/Mechanical.png';
import Loosing from '../assets/Graphic/Loosing.jpg';
import Mirror from '../assets/Graphic/Mirror.jpg';
import RealFlex from '../assets/Graphic/RealFlex.jpg';
import Success from '../assets/Graphic/Success.jpg';
import Sun from '../assets/Graphic/Sun.jpg';
import TwoThings from '../assets/Graphic/TwoThings.jpg';
import Voice from '../assets/Graphic/Voice.jpg';
import ReactPlayer from 'react-player';
import styles from './Projects.module.css';

// ---------------------------------------------------------------------------
// Project Data
// ---------------------------------------------------------------------------
const projectData = {
  'SolidWorks Projects': [
    {
      title: 'Crank Slider Mechanism',
      image: SWCrankSlider,
      shortDescription:
        'A SolidWorks crank-slider mechanism demonstrating the conversion of rotary motion into linear reciprocating motion through motion simulation and assembly constraints.',
      fullDescription:
        `This project involved the design and assembly of a fully parametric crank-slider mechanism in SolidWorks to study the conversion of rotational motion into linear reciprocating motion. The mechanism consists of a crank, connecting rod, slider block, guide rails, and base plate, all modelled as individual parts and assembled using appropriate mechanical mates and motion constraints. A clearance of 0.1 mm was maintained between the slider and guide surfaces to ensure smooth operation while minimizing excessive play and interference during motion. The assembly was developed with careful consideration of dimensional accuracy, tolerance allocation, and proper alignment of moving components.SolidWorks Motion Study was utilized to validate the kinematic behavior of the mechanism, verify the transmission of motion through the linkage, and evaluate the displacement characteristics of the slider throughout a complete crank revolution. Interference detection tools were employed to identify and eliminate component collisions, ensuring reliable operation across the entire range of motion. The design demonstrates key concepts of mechanism synthesis, kinematic analysis, tolerance design, and assembly modelling. Such crank-slider mechanisms are widely used in internal combustion engines, reciprocating pumps, compressors, presses, and automated machinery where rotary motion must be converted into controlled linear motion. Engineering drawings and assembly documentation were generated to support design validation and potential manufacturing applications.`,
      type: 'solidworks',
    },
    {
      title: 'Cup Design',
      image: SWCup,
      shortDescription:
        'A SolidWorks cup model created using advanced surface and solid modelling techniques with a focus on smooth geometry and manufacturable design.',
      fullDescription:
        `This project involved the design and modelling of a ceramic-style cup in SolidWorks using a combination of solid modelling and feature-based design techniques. The cup geometry was created with smooth external contours, a tapered body profile, rounded transitions, and an ergonomically positioned handle to achieve both structural integrity and aesthetic appeal.

Advanced features such as Revolve, Extrude, Fillet, Shell, and Sweep operations were utilized to create the final geometry while maintaining dimensional consistency throughout the model. Particular attention was given to wall thickness distribution, handle attachment regions, and smooth curvature transitions to ensure manufacturability and realistic product representation.

The model was developed following parametric design principles, allowing dimensions to be modified efficiently without rebuilding the entire geometry. Engineering considerations such as uniform wall thickness, stress concentration reduction through fillets, and ease of manufacturing were incorporated during the design process.

The final model demonstrates proficiency in SolidWorks part modelling, feature management, design intent implementation, and consumer product development. Such modelling techniques are commonly applied in industrial design, consumer goods manufacturing, product visualization, and rapid prototyping workflows.`,
      type: 'solidworks',
    },
    ],
  'CFD Projects': [
 
    {
      title: 'CFD Analysis of Flow Around Cylindrical Obstacles with Varying Diameters',
      image: CFDPipeFlow,
      shortDescription:
        'CFD investigation of pressure distribution, velocity fields, and vorticity generation around cylindrical obstacles of varying diameters in internal flow.',
      fullDescription:
        `This project involved a Computational Fluid Dynamics (CFD) study of flow around cylindrical obstacles with varying diameters placed within an internal flow domain. The objective was to investigate the influence of obstacle size on pressure distribution, velocity profiles, flow separation, wake formation, and vorticity generation.

The geometry was modelled and discretized using an appropriate computational mesh, with boundary conditions applied to simulate steady incompressible flow. Multiple simulations were conducted by varying the cylinder diameter while maintaining consistent flow conditions to enable direct performance comparison.

Post-processing was performed to analyze pressure contours, velocity fields, streamline behavior, and vorticity distribution around the obstacle. The results demonstrated how increasing obstacle diameter alters flow characteristics, increases pressure gradients, affects wake development, and modifies vortex formation downstream of the cylinder.

The project provided practical experience in geometry preparation, mesh generation, boundary condition implementation, solver configuration, convergence monitoring, and CFD result interpretation. The study highlights fundamental fluid mechanics concepts including flow separation, recirculation zones, pressure drag, and vortex shedding phenomena commonly encountered in engineering applications.`,
      type: 'cfd',
    },

  ],
  'WebDev Projects': [
    {
      title: 'myCV',
      image: project1,
      link: 'https://kashifnadeemkayani.github.io/myCV/',
      type: 'web',
    },
    {
      title: "The Reliable Mart's Web Page",
      image: Reliable,
      link: 'https://thereliablemart.github.io/ItemList/',
      type: 'web',
    },
    {
      title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)',
      image: TicTacToe,
      link: 'https://kashifnadeemkayani.github.io/TicTacToe./',
      type: 'web',
    },
  ],
  'Graphic Designing Projects': [
    { title: 'Canva Poster', image: Mech,      type: 'graphic' },
    { title: 'Canva Poster', image: Success,   type: 'graphic' },
    { title: 'Canva Poster', image: Mirror,    type: 'graphic' },
    { title: 'Canva Poster', image: TwoThings, type: 'graphic' },
    { title: 'Canva Poster', image: RealFlex,  type: 'graphic' },
    { title: 'Canva Poster', image: Sun,       type: 'graphic' },
    { title: 'Canva Poster', image: Loosing,   type: 'graphic' },
    { title: 'Canva Poster', image: Voice,     type: 'graphic' },
  ],
  'Video Editing Projects': [
    {
      title: 'DaVinci Resolve Video',
      thumbnail: project1,
      videoUrl: 'https://www.example.com/sample-video.mp4',
      type: 'video',
    },
  ],
};

const DISABLED_CATEGORIES = ['Video Editing Projects'];
const ENGINEERING_TYPES   = ['solidworks', 'cfd'];

// ---------------------------------------------------------------------------
// HoverCard — reusable thumbnail card with dark overlay text on hover.
// Used by both engineering cards and web-dev cards.
// ---------------------------------------------------------------------------
const HoverCard = ({ image, alt, overlayText, extraImgClass }) => (
  <div className={styles.hoverCard}>
    <img
      src={image}
      alt={alt}
      className={[styles.projectImage, extraImgClass].filter(Boolean).join(' ')}
    />
    <div className={styles.hoverCardOverlay}>
      <span className={styles.hoverCardOverlayText}>{overlayText}</span>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// EngineeringModalContent
//
// LAYOUT — the outer wrapper (.engModalContent) is a flex-column box with a
// fixed viewport height (set in CSS).  Inside it:
//
//   ┌──────────────────────────────────────┐  ← .engModal  (flex col, full height)
//   │                                      │
//   │   .engModalImageWrap  (flex: 1)      │  ← grows to fill all space above caption
//   │         <img>  object-fit:contain    │
//   │         [overlay panel slides up]    │
//   │                                      │
//   ├──────────────────────────────────────┤
//   │   .engModalCaption  (flex-shrink:0)  │  ← always exactly caption-height
//   │   shortDesc …………………  [See More ▼]  │
//   └──────────────────────────────────────┘
//
// When showFull=true:
//   • The overlay panel (position:absolute, bottom:0, height:auto up to 80%)
//     slides up OVER the image via AnimatePresence y:'100%'→0
//   • The caption bar stays visible underneath — image is still there,
//     just partially covered by the frosted panel.
// ---------------------------------------------------------------------------
const EngineeringModalContent = ({ project, showFull, onToggle }) => (
  <div className={styles.engModal}>

    {/* ── image area (fills available height) ── */}
    <div className={styles.engModalImageWrap}>
      <img
        src={project.image}
        alt={project.title}
        className={styles.engModalImg}
      />

      {/* frosted full-description panel — slides up over the image */}
      <AnimatePresence>
        {showFull && (
          <motion.div
            className={styles.engModalOverlayPanel}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{   y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            onClick={onToggle}
          >
            <p className={styles.engModalFullDesc}>{project.fullDescription}</p>
            <button
              className={styles.seeMoreBtn}
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
            >
              Show Less ▲
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* ── caption bar — always visible, flush below image ── */}
    <div className={styles.engModalCaption}>
      <p className={styles.engModalShortDesc}>{project.shortDescription}</p>
      {!showFull && (
        <button className={styles.seeMoreBtn} onClick={onToggle}>
          See More ▼
        </button>
      )}
    </div>

  </div>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const Projects = () => {
  const [showModal,       setShowModal]       = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [playing,         setPlaying]         = useState(false);
  const [activeCategory,  setActiveCategory]  = useState('SolidWorks Projects');
  const [currentIndex,    setCurrentIndex]    = useState(0);
  const [showFullDesc,    setShowFullDesc]     = useState(false);

  // Stores the window.scrollY at the moment the modal opens so we can
  // restore it precisely on close — no position:fixed needed.
  const savedScrollY = useRef(0);

  // ── scroll-lock: overflow:hidden on <html> (not body) preserves scroll
  //    position natively on all browsers including iOS Safari.             ──
  useEffect(() => {
    const html = document.documentElement;
    if (showModal) {
      savedScrollY.current = window.scrollY;
      html.style.overflow = 'hidden';
      // iOS Safari still needs this to prevent rubber-band
      document.body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      document.body.style.overflow = '';
      // Restore exact position — use 'instant' so there is zero animation
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
    }
    return () => {
      html.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showModal]);

  // ── keyboard navigation ─────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape' || e.keyCode === 27) {
          closeModal();
        } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
          const prev =
            (currentIndex - 1 + projectData[activeCategory].length) %
            projectData[activeCategory].length;
          setCurrentIndex(prev);
          setSelectedProject(projectData[activeCategory][prev]);
          setShowFullDesc(false);
        } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
          const next = (currentIndex + 1) % projectData[activeCategory].length;
          setCurrentIndex(next);
          setSelectedProject(projectData[activeCategory][next]);
          setShowFullDesc(false);
        }
      } else {
        const cats   = Object.keys(projectData);
        const catIdx = cats.indexOf(activeCategory);
        if (e.key === 'ArrowLeft' || e.keyCode === 37) {
          let prev = (catIdx - 1 + cats.length) % cats.length;
          while (prev !== catIdx && DISABLED_CATEGORIES.includes(cats[prev]))
            prev = (prev - 1 + cats.length) % cats.length;
          if (!DISABLED_CATEGORIES.includes(cats[prev])) setActiveCategory(cats[prev]);
        } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
          let next = (catIdx + 1) % cats.length;
          while (next !== catIdx && DISABLED_CATEGORIES.includes(cats[next]))
            next = (next + 1) % cats.length;
          if (!DISABLED_CATEGORIES.includes(cats[next])) setActiveCategory(cats[next]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, activeCategory, currentIndex]);

  // ── handlers ────────────────────────────────────────────────────────────
  const openModal = (project, index) => {
    setSelectedProject(project);
    setCurrentIndex(index);
    setShowFullDesc(false);
    setShowModal(true);
    if (project.type === 'video') setPlaying(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPlaying(false);
    setShowFullDesc(false);
  };

  const handleShow = (project) => {
    if (project.type === 'web') { window.open(project.link, '_blank'); return; }
    const idx = projectData[activeCategory].findIndex((p) => p.title === project.title);
    openModal(project, idx);
  };

  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    if (DISABLED_CATEGORIES.includes(category)) {
      if (window.innerWidth <= 768)
        alert('This category is currently disabled by Kashif Nadeem Kayani.');
      return;
    }
    setActiveCategory(category);
  };

  // ── modal content renderer ───────────────────────────────────────────────
  const renderModalContent = () => {
    if (!selectedProject) return null;

    if (selectedProject.type === 'video' && selectedProject.videoUrl) {
      return (
        <ReactPlayer
          url={selectedProject.videoUrl}
          playing={playing}
          controls
          width="100%"
          height="100%"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      );
    }

    if (ENGINEERING_TYPES.includes(selectedProject.type)) {
      return (
        <EngineeringModalContent
          project={selectedProject}
          showFull={showFullDesc}
          onToggle={() => setShowFullDesc((v) => !v)}
        />
      );
    }

    // graphic
    return (
      <img
        src={selectedProject.image || selectedProject.thumbnail}
        alt={selectedProject.title}
        className={styles.enlargedImage}
      />
    );
  };

  // ── grid class helper ────────────────────────────────────────────────────
  const gridClass = [
    styles.projectGrid,
    activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignGrid : '',
    ENGINEERING_TYPES.includes(projectData[activeCategory]?.[0]?.type)
      ? styles.engineeringGrid : '',
  ].filter(Boolean).join(' ');

  const isEngModal = selectedProject && ENGINEERING_TYPES.includes(selectedProject.type);

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <section id="projects" className={styles.projects}>
      <Container>

        {/* Heading */}
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

        {/* Category tabs */}
        <div className={styles.categorySlider}>
          {Object.keys(projectData).map((category, i) => {
            const isDisabled = DISABLED_CATEGORIES.includes(category);
            return (
              <button
                key={i}
                className={[
                  styles.categoryButton,
                  activeCategory === category ? styles.activeCategory : '',
                  isDisabled ? styles.disabledCategory : '',
                ].filter(Boolean).join(' ')}
                onClick={(e) => handleCategoryClick(category, e)}
                style={{
                  cursor: isDisabled && window.innerWidth > 768 ? 'not-allowed' : 'pointer',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className={gridClass}>
            {projectData[activeCategory].map((project, idx) => {
              const isEng     = ENGINEERING_TYPES.includes(project.type);
              const isWeb     = project.type === 'web';
              const isGraphic = activeCategory === 'Graphic Designing Projects';

              return (
                <motion.div
                  key={idx}
                  className={styles.projectItem}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  onClick={() => handleShow(project)}
                  whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
                >
                  {/* Engineering cards — "Click to View Details" overlay */}
                  {isEng && (
                    <div className={`${styles.projectImageContainer} ${styles.engCardOuter}`}>
                      <HoverCard
                        image={project.image}
                        alt={project.title}
                        overlayText="Click to View Details"
                      />
                    </div>
                  )}

                  {/* Web-dev cards — "Click to View Website" overlay */}
                  {isWeb && (
                    <div className={styles.projectImageContainer}>
                      <HoverCard
                        image={project.image}
                        alt={project.title}
                        overlayText="Click to View Website"
                      />
                    </div>
                  )}

                  {/* Graphic / other cards — plain image, no overlay */}
                  {!isEng && !isWeb && (
                    <div className={[
                      styles.projectImageContainer,
                      isGraphic ? styles.graphicDesignContainer : '',
                    ].filter(Boolean).join(' ')}>
                      <img
                        src={project.image || project.thumbnail}
                        alt={project.title}
                        className={[
                          styles.projectImage,
                          isGraphic ? styles.graphicDesignImage : '',
                        ].filter(Boolean).join(' ')}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Modal */}
        {showModal && (
          <>
            <button className={styles.closeButton} onClick={closeModal}>✕</button>
            <div
              className={styles.customEnlargedView}
              onClick={closeModal}
              onTouchMove={(e) => e.preventDefault()}
            >
              <div
                className={[
                  styles.enlargedContent,
                  isEngModal ? styles.engModalContent : '',
                ].filter(Boolean).join(' ')}
                onClick={(e) => e.stopPropagation()}
              >
                {renderModalContent()}
              </div>
            </div>
          </>
        )}

      </Container>
    </section>
  );
};

export default Projects;
