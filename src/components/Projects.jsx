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


//-------------------------------------1st NEW ATTEMPT--------------------------------
// import React, { useState, useEffect, useRef } from 'react';
// import { Container } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion';
// import project1 from '../assets/CV.jpg';
// import SWCrankSlider from '../assets/SWCrankSlider.png';
// import SWCup   from '../assets/SWCup.png';
// import CFDPipeFlow   from '../assets/CFDPipeFlow.jpg';
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

// // ---------------------------------------------------------------------------
// // Project Data
// // ---------------------------------------------------------------------------
// const projectData = {
//   'SolidWorks Projects': [
//     {
//       title: 'Crank Slider Mechanism',
//       image: SWCrankSlider,
//       shortDescription:
//         'A SolidWorks crank-slider mechanism demonstrating the conversion of rotary motion into linear reciprocating motion through motion simulation and assembly constraints.',
//       fullDescription:
//         `This project involved the design and assembly of a fully parametric crank-slider mechanism in SolidWorks to study the conversion of rotational motion into linear reciprocating motion. The mechanism consists of a crank, connecting rod, slider block, guide rails, and base plate, all modelled as individual parts and assembled using appropriate mechanical mates and motion constraints. A clearance of 0.1 mm was maintained between the slider and guide surfaces to ensure smooth operation while minimizing excessive play and interference during motion. The assembly was developed with careful consideration of dimensional accuracy, tolerance allocation, and proper alignment of moving components.SolidWorks Motion Study was utilized to validate the kinematic behavior of the mechanism, verify the transmission of motion through the linkage, and evaluate the displacement characteristics of the slider throughout a complete crank revolution. Interference detection tools were employed to identify and eliminate component collisions, ensuring reliable operation across the entire range of motion. The design demonstrates key concepts of mechanism synthesis, kinematic analysis, tolerance design, and assembly modelling. Such crank-slider mechanisms are widely used in internal combustion engines, reciprocating pumps, compressors, presses, and automated machinery where rotary motion must be converted into controlled linear motion. Engineering drawings and assembly documentation were generated to support design validation and potential manufacturing applications.`,
//       type: 'solidworks',
//     },
//     {
//       title: 'Cup Design',
//       image: SWCup,
//       shortDescription:
//         'A SolidWorks cup model created using advanced surface and solid modelling techniques with a focus on smooth geometry and manufacturable design.',
//       fullDescription:
//         `This project involved the design and modelling of a ceramic-style cup in SolidWorks using a combination of solid modelling and feature-based design techniques. The cup geometry was created with smooth external contours, a tapered body profile, rounded transitions, and an ergonomically positioned handle to achieve both structural integrity and aesthetic appeal.

// Advanced features such as Revolve, Extrude, Fillet, Shell, and Sweep operations were utilized to create the final geometry while maintaining dimensional consistency throughout the model. Particular attention was given to wall thickness distribution, handle attachment regions, and smooth curvature transitions to ensure manufacturability and realistic product representation.

// The model was developed following parametric design principles, allowing dimensions to be modified efficiently without rebuilding the entire geometry. Engineering considerations such as uniform wall thickness, stress concentration reduction through fillets, and ease of manufacturing were incorporated during the design process.

// The final model demonstrates proficiency in SolidWorks part modelling, feature management, design intent implementation, and consumer product development. Such modelling techniques are commonly applied in industrial design, consumer goods manufacturing, product visualization, and rapid prototyping workflows.`,
//       type: 'solidworks',
//     },
//     ],
//   'CFD Projects': [
 
//     {
//       title: 'CFD Analysis of Flow Around Cylindrical Obstacles with Varying Diameters',
//       image: CFDPipeFlow,
//       shortDescription:
//         'CFD investigation of pressure distribution, velocity fields, and vorticity generation around cylindrical obstacles of varying diameters in internal flow.',
//       fullDescription:
//         `This project involved a Computational Fluid Dynamics (CFD) study of flow around cylindrical obstacles with varying diameters placed within an internal flow domain. The objective was to investigate the influence of obstacle size on pressure distribution, velocity profiles, flow separation, wake formation, and vorticity generation.

// The geometry was modelled and discretized using an appropriate computational mesh, with boundary conditions applied to simulate steady incompressible flow. Multiple simulations were conducted by varying the cylinder diameter while maintaining consistent flow conditions to enable direct performance comparison.

// Post-processing was performed to analyze pressure contours, velocity fields, streamline behavior, and vorticity distribution around the obstacle. The results demonstrated how increasing obstacle diameter alters flow characteristics, increases pressure gradients, affects wake development, and modifies vortex formation downstream of the cylinder.

// The project provided practical experience in geometry preparation, mesh generation, boundary condition implementation, solver configuration, convergence monitoring, and CFD result interpretation. The study highlights fundamental fluid mechanics concepts including flow separation, recirculation zones, pressure drag, and vortex shedding phenomena commonly encountered in engineering applications.`,
//       type: 'cfd',
//     },

//   ],
//   'WebDev Projects': [
//     {
//       title: 'myCV',
//       image: project1,
//       link: 'https://kashifnadeemkayani.github.io/myCV/',
//       type: 'web',
//     },
//     {
//       title: "The Reliable Mart's Web Page",
//       image: Reliable,
//       link: 'https://thereliablemart.github.io/ItemList/',
//       type: 'web',
//     },
//     {
//       title: 'Tic Tac Toe (impossible to beat AI while playing 2nd)',
//       image: TicTacToe,
//       link: 'https://kashifnadeemkayani.github.io/TicTacToe./',
//       type: 'web',
//     },
//   ],
//   'Graphic Designing Projects': [
//     { title: 'Canva Poster', image: Mech,      type: 'graphic' },
//     { title: 'Canva Poster', image: Success,   type: 'graphic' },
//     { title: 'Canva Poster', image: Mirror,    type: 'graphic' },
//     { title: 'Canva Poster', image: TwoThings, type: 'graphic' },
//     { title: 'Canva Poster', image: RealFlex,  type: 'graphic' },
//     { title: 'Canva Poster', image: Sun,       type: 'graphic' },
//     { title: 'Canva Poster', image: Loosing,   type: 'graphic' },
//     { title: 'Canva Poster', image: Voice,     type: 'graphic' },
//   ],
//   'Video Editing Projects': [
//     {
//       title: 'DaVinci Resolve Video',
//       thumbnail: project1,
//       videoUrl: 'https://www.example.com/sample-video.mp4',
//       type: 'video',
//     },
//   ],
// };

// const DISABLED_CATEGORIES = ['Video Editing Projects'];
// const ENGINEERING_TYPES   = ['solidworks', 'cfd'];

// // ---------------------------------------------------------------------------
// // HoverCard — reusable thumbnail card with dark overlay text on hover.
// // Used by both engineering cards and web-dev cards.
// // ---------------------------------------------------------------------------
// const HoverCard = ({ image, alt, overlayText, extraImgClass }) => (
//   <div className={styles.hoverCard}>
//     <img
//       src={image}
//       alt={alt}
//       className={[styles.projectImage, extraImgClass].filter(Boolean).join(' ')}
//     />
//     <div className={styles.hoverCardOverlay}>
//       <span className={styles.hoverCardOverlayText}>{overlayText}</span>
//     </div>
//   </div>
// );

// // ---------------------------------------------------------------------------
// // EngineeringModalContent
// //
// // LAYOUT — the outer wrapper (.engModalContent) is a flex-column box with a
// // fixed viewport height (set in CSS).  Inside it:
// //
// //   ┌──────────────────────────────────────┐  ← .engModal  (flex col, full height)
// //   │                                      │
// //   │   .engModalImageWrap  (flex: 1)      │  ← grows to fill all space above caption
// //   │         <img>  object-fit:contain    │
// //   │         [overlay panel slides up]    │
// //   │                                      │
// //   ├──────────────────────────────────────┤
// //   │   .engModalCaption  (flex-shrink:0)  │  ← always exactly caption-height
// //   │   shortDesc …………………  [See More ▼]  │
// //   └──────────────────────────────────────┘
// //
// // When showFull=true:
// //   • The overlay panel (position:absolute, bottom:0, height:auto up to 80%)
// //     slides up OVER the image via AnimatePresence y:'100%'→0
// //   • The caption bar stays visible underneath — image is still there,
// //     just partially covered by the frosted panel.
// // ---------------------------------------------------------------------------
// const EngineeringModalContent = ({ project, showFull, onToggle }) => (
//   <div className={styles.engModal}>

//     {/* ── image area (fills available height) ── */}
//     <div className={styles.engModalImageWrap}>
//       <img
//         src={project.image}
//         alt={project.title}
//         className={styles.engModalImg}
//       />

//       {/* frosted full-description panel — slides up over the image */}
//       <AnimatePresence>
//         {showFull && (
//           <motion.div
//             className={styles.engModalOverlayPanel}
//             initial={{ y: '100%', opacity: 0 }}
//             animate={{ y: 0,      opacity: 1 }}
//             exit={{   y: '100%', opacity: 0 }}
//             transition={{ type: 'spring', damping: 30, stiffness: 280 }}
//             onClick={onToggle}
//           >
//             <p className={styles.engModalFullDesc}>{project.fullDescription}</p>
//             <button
//               className={styles.seeMoreBtn}
//               onClick={(e) => { e.stopPropagation(); onToggle(); }}
//             >
//               Show Less ▲
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>

//     {/* ── caption bar — always visible, flush below image ── */}
//     <div className={styles.engModalCaption}>
//       <p className={styles.engModalShortDesc}>{project.shortDescription}</p>
//       {!showFull && (
//         <button className={styles.seeMoreBtn} onClick={onToggle}>
//           See More ▼
//         </button>
//       )}
//     </div>

//   </div>
// );

// // ---------------------------------------------------------------------------
// // Main Component
// // ---------------------------------------------------------------------------
// const Projects = () => {
//   const [showModal,       setShowModal]       = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [playing,         setPlaying]         = useState(false);
//   const [activeCategory,  setActiveCategory]  = useState('SolidWorks Projects');
//   const [currentIndex,    setCurrentIndex]    = useState(0);
//   const [showFullDesc,    setShowFullDesc]     = useState(false);

//   // Stores the window.scrollY at the moment the modal opens so we can
//   // restore it precisely on close — no position:fixed needed.
//   const savedScrollY = useRef(0);

//   // ── scroll-lock: overflow:hidden on <html> (not body) preserves scroll
//   //    position natively on all browsers including iOS Safari.             ──
//   useEffect(() => {
//     const html = document.documentElement;
//     if (showModal) {
//       savedScrollY.current = window.scrollY;
//       html.style.overflow = 'hidden';
//       // iOS Safari still needs this to prevent rubber-band
//       document.body.style.overflow = 'hidden';
//     } else {
//       html.style.overflow = '';
//       document.body.style.overflow = '';
//       // Restore exact position — use 'instant' so there is zero animation
//       window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
//     }
//     return () => {
//       html.style.overflow = '';
//       document.body.style.overflow = '';
//     };
//   }, [showModal]);

//   // ── keyboard navigation ─────────────────────────────────────────────────
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (showModal) {
//         if (e.key === 'Escape' || e.keyCode === 27) {
//           closeModal();
//         } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
//           const prev =
//             (currentIndex - 1 + projectData[activeCategory].length) %
//             projectData[activeCategory].length;
//           setCurrentIndex(prev);
//           setSelectedProject(projectData[activeCategory][prev]);
//           setShowFullDesc(false);
//         } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
//           const next = (currentIndex + 1) % projectData[activeCategory].length;
//           setCurrentIndex(next);
//           setSelectedProject(projectData[activeCategory][next]);
//           setShowFullDesc(false);
//         }
//       } else {
//         const cats   = Object.keys(projectData);
//         const catIdx = cats.indexOf(activeCategory);
//         if (e.key === 'ArrowLeft' || e.keyCode === 37) {
//           let prev = (catIdx - 1 + cats.length) % cats.length;
//           while (prev !== catIdx && DISABLED_CATEGORIES.includes(cats[prev]))
//             prev = (prev - 1 + cats.length) % cats.length;
//           if (!DISABLED_CATEGORIES.includes(cats[prev])) setActiveCategory(cats[prev]);
//         } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
//           let next = (catIdx + 1) % cats.length;
//           while (next !== catIdx && DISABLED_CATEGORIES.includes(cats[next]))
//             next = (next + 1) % cats.length;
//           if (!DISABLED_CATEGORIES.includes(cats[next])) setActiveCategory(cats[next]);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [showModal, activeCategory, currentIndex]);

//   // ── handlers ────────────────────────────────────────────────────────────
//   const openModal = (project, index) => {
//     setSelectedProject(project);
//     setCurrentIndex(index);
//     setShowFullDesc(false);
//     setShowModal(true);
//     if (project.type === 'video') setPlaying(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setPlaying(false);
//     setShowFullDesc(false);
//   };

//   const handleShow = (project) => {
//     if (project.type === 'web') { window.open(project.link, '_blank'); return; }
//     const idx = projectData[activeCategory].findIndex((p) => p.title === project.title);
//     openModal(project, idx);
//   };

//   const handleCategoryClick = (category, e) => {
//     e.preventDefault();
//     if (DISABLED_CATEGORIES.includes(category)) {
//       if (window.innerWidth <= 768)
//         alert('This category is currently disabled by Kashif Nadeem Kayani.');
//       return;
//     }
//     setActiveCategory(category);
//   };

//   // ── modal content renderer ───────────────────────────────────────────────
//   const renderModalContent = () => {
//     if (!selectedProject) return null;

//     if (selectedProject.type === 'video' && selectedProject.videoUrl) {
//       return (
//         <ReactPlayer
//           url={selectedProject.videoUrl}
//           playing={playing}
//           controls
//           width="100%"
//           height="100%"
//           onPlay={() => setPlaying(true)}
//           onPause={() => setPlaying(false)}
//         />
//       );
//     }

//     if (ENGINEERING_TYPES.includes(selectedProject.type)) {
//       return (
//         <EngineeringModalContent
//           project={selectedProject}
//           showFull={showFullDesc}
//           onToggle={() => setShowFullDesc((v) => !v)}
//         />
//       );
//     }

//     // graphic
//     return (
//       <img
//         src={selectedProject.image || selectedProject.thumbnail}
//         alt={selectedProject.title}
//         className={styles.enlargedImage}
//       />
//     );
//   };

//   // ── grid class helper ────────────────────────────────────────────────────
//   const gridClass = [
//     styles.projectGrid,
//     activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignGrid : '',
//     ENGINEERING_TYPES.includes(projectData[activeCategory]?.[0]?.type)
//       ? styles.engineeringGrid : '',
//   ].filter(Boolean).join(' ');

//   const isEngModal = selectedProject && ENGINEERING_TYPES.includes(selectedProject.type);

//   // ── render ───────────────────────────────────────────────────────────────
//   return (
//     <section id="projects" className={styles.projects}>
//       <Container>

//         {/* Heading */}
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

//         {/* Category tabs */}
//         <div className={styles.categorySlider}>
//           {Object.keys(projectData).map((category, i) => {
//             const isDisabled = DISABLED_CATEGORIES.includes(category);
//             return (
//               <button
//                 key={i}
//                 className={[
//                   styles.categoryButton,
//                   activeCategory === category ? styles.activeCategory : '',
//                   isDisabled ? styles.disabledCategory : '',
//                 ].filter(Boolean).join(' ')}
//                 onClick={(e) => handleCategoryClick(category, e)}
//                 style={{
//                   cursor: isDisabled && window.innerWidth > 768 ? 'not-allowed' : 'pointer',
//                 }}
//               >
//                 {category}
//               </button>
//             );
//           })}
//         </div>

//         {/* Grid */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           viewport={{ once: false, amount: 0.3 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className={gridClass}>
//             {projectData[activeCategory].map((project, idx) => {
//               const isEng     = ENGINEERING_TYPES.includes(project.type);
//               const isWeb     = project.type === 'web';
//               const isGraphic = activeCategory === 'Graphic Designing Projects';

//               return (
//                 <motion.div
//                   key={idx}
//                   className={styles.projectItem}
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: false, amount: 0.3 }}
//                   transition={{ duration: 0.6, delay: idx * 0.2 }}
//                   onClick={() => handleShow(project)}
//                   whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
//                 >
//                   {/* Engineering cards — "Click to View Details" overlay */}
//                   {isEng && (
//                     <div className={`${styles.projectImageContainer} ${styles.engCardOuter}`}>
//                       <HoverCard
//                         image={project.image}
//                         alt={project.title}
//                         overlayText="Click to View Details"
//                       />
//                     </div>
//                   )}

//                   {/* Web-dev cards — "Click to View Website" overlay */}
//                   {isWeb && (
//                     <div className={styles.projectImageContainer}>
//                       <HoverCard
//                         image={project.image}
//                         alt={project.title}
//                         overlayText="Click to View Website"
//                       />
//                     </div>
//                   )}

//                   {/* Graphic / other cards — plain image, no overlay */}
//                   {!isEng && !isWeb && (
//                     <div className={[
//                       styles.projectImageContainer,
//                       isGraphic ? styles.graphicDesignContainer : '',
//                     ].filter(Boolean).join(' ')}>
//                       <img
//                         src={project.image || project.thumbnail}
//                         alt={project.title}
//                         className={[
//                           styles.projectImage,
//                           isGraphic ? styles.graphicDesignImage : '',
//                         ].filter(Boolean).join(' ')}
//                       />
//                     </div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* Modal */}
//         {showModal && (
//           <>
//             <button className={styles.closeButton} onClick={closeModal}>✕</button>
//             <div
//               className={styles.customEnlargedView}
//               onClick={closeModal}
//               onTouchMove={(e) => e.preventDefault()}
//             >
//               <div
//                 className={[
//                   styles.enlargedContent,
//                   isEngModal ? styles.engModalContent : '',
//                 ].filter(Boolean).join(' ')}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {renderModalContent()}
//               </div>
//             </div>
//           </>
//         )}

//       </Container>
//     </section>
//   );
// };

// export default Projects;



// 2nd NEW ATTEMPT 

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import project1 from '../assets/CV.jpg';
import Reliable from '../assets/Reliable.jpg';
import TicTacToe from '../assets/TicTacToe.jpg';


//Thumbnails 
import ThumbnailBasicProjects from '../assets/Thumbnails/ThumbnailBasicProjects.png';
import ThumbnailCFD from '../assets/Thumbnails/ThumbnailCFD.png';
import ThumbnailCrankSlider from '../assets/Thumbnails/ThumbnailCrankSlider.png';
import ThumbnailCup from '../assets/Thumbnails/ThumbnailCup.png';
import ThumbnailGearBox from '../assets/Thumbnails/ThumbnailGearBox.png';
import ThumbnailRamp from '../assets/Thumbnails/ThumbnailRamp.png';
import ThumbnailRoboticArm from '../assets/Thumbnails/ThumbnailRoboticArm.png';
import ThumbnailRockerArm from '../assets/Thumbnails/ThumbnailRockerArm.png';
import ThumbnailCClamp from '../assets/Thumbnails/ThumbnailCClamp.png';



//CFD
import CFDPipeFlow from '../assets/CFD/CFDPipeFlow.jpg';

// Basic Projects
import Archimedes1 from '../assets/BasicProjects/Archimedes1.png'; 
import Archimedes2 from '../assets/BasicProjects/Archimedes2.png';
import DrillBit from '../assets/BasicProjects/DrillBit.png';
import Flange1 from '../assets/BasicProjects/Flange1.png'; 
import Flange2 from '../assets/BasicProjects/Flange2.png'; 
import RacknPinion1 from '../assets/BasicProjects/RacknPinion1.png'; 
import RacknPinion2 from '../assets/BasicProjects/RacknPinion2.png'; 
import SciissorLift1 from '../assets/BasicProjects/SciissorLift1.png';
import SciissorLift2 from '../assets/BasicProjects/SciissorLift2.png';
import SciissorLift3 from '../assets/BasicProjects/SciissorLift3.png';



//Robotic Arm
import RoboticArm1 from '../assets/RoboticArm/RoboticArm1.png'; 
import RoboticArm2 from '../assets/RoboticArm/RoboticArm2.png'; 
import RoboticArm3 from '../assets/RoboticArm/RoboticArm3.png'; 
import RoboticArm4 from '../assets/RoboticArm/RoboticArm4.png'; 
import RoboticArm5 from '../assets/RoboticArm/RoboticArm5.png'; 
import RoboticArm6 from '../assets/RoboticArm/RoboticArm6.png'; 
import RoboticArm7 from '../assets/RoboticArm/RoboticArm7.png'; 
import RoboticArm8 from '../assets/RoboticArm/RoboticArm8.png';
import RoboticArm9 from '../assets/RoboticArm/RoboticArm9.png';


// SOLIDWORKS Gearbox Assembly
import GearBox1 from '../assets/gearbox/GearBox1.png';
import GearBox2 from '../assets/gearbox/GearBox2.png';
import GearBox3 from '../assets/gearbox/GearBox3.png';
import GearBox4 from '../assets/gearbox/GearBox4.png';
import GearBox5 from '../assets/gearbox/GearBox5.png';
import GearBox6 from '../assets/gearbox/GearBox6.png';
import GearBox7 from '../assets/gearbox/GearBox7.png';

//ManualRockerArmPunchingMachine
import ManualRockerArmPunchingMachine1 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine1.png';
import ManualRockerArmPunchingMachine2 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine2.png'; 
import ManualRockerArmPunchingMachine3 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine3.png';
import ManualRockerArmPunchingMachine4 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine4.png';
import ManualRockerArmPunchingMachine5 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine5.png';
import ManualRockerArmPunchingMachine6 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine6.png';
import ManualRockerArmPunchingMachine7 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine7.png';
import ManualRockerArmPunchingMachine8 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine8.png';
// import ManualRockerArmPunchingMachine9 from '../assets/ManualRockerArmPunchingMachine/ManualRockerArmPunchingMachine9.png';

// RAMP
import SPCRamp1 from '../assets/spcRamp/SPCRamp1.png';
import SPCRamp2 from '../assets/spcRamp/SPCRamp2.png';

// C Clamp
import CClamp1 from '../assets/CClamp/CClamp1.png';
// import CClamp2 from '../assets/CClamp/CClamp2.png'; 
import CClamp3 from '../assets/CClamp/CClamp3.png';
import CClamp4 from '../assets/CClamp/CClamp4.png';
import CClamp5 from '../assets/CClamp/CClamp5.png';
import CClamp6 from '../assets/CClamp/CClamp6.png';

//Crankslider
import SWCrankSlider1 from '../assets/CrankSlider/SWCrankSlider1.png';
import SWCrankSlider2 from '../assets/CrankSlider/SWCrankSlider2.png';
import SWCrankSlider3 from '../assets/CrankSlider/SWCrankSlider3.png';

//Cup
import SWCup1 from '../assets/Cup/SWCup1.png';
import SWCup2 from '../assets/Cup/SWCup2.jpeg';
import SWCup3 from '../assets/Cup/SWCup3.jpeg';



// GRAPHIC DESIGN
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

// =============================================================================
// PROJECT DATA
// =============================================================================
// Structure for SolidWorks / CFD projects:
// {
//   title:            string        — project name (shown as bold title in modal)
//   images:           string[]      — array of imported images; images[0] = thumbnail
//   shortDescription: string        — one-line caption shown by default
//   fullDescription:  string        — full text shown when "See More" is clicked
//   type:             'solidworks' | 'cfd'
// }
//
// To add a new project, just push another object into the array — nothing else
// needs to change. The carousel, modal, grid, and hover card all derive from
// this single source of truth automatically.
// =============================================================================


const projectData = {
  'SolidWorks Projects': [
    {
      title: 'Industrial Robotic Arm',
      thumbnail: ThumbnailRoboticArm,
      images: [RoboticArm1,RoboticArm2,RoboticArm3,RoboticArm4,RoboticArm5,RoboticArm6,RoboticArm7,RoboticArm8,RoboticArm9],
      shortDescription:
        'Multi-axis robotic arm assembly featuring articulated joints and gripper mechanism.',
      fullDescription:
        'This project involved the design and assembly of a multi-axis industrial robotic arm in SolidWorks consisting of a rotating base, articulated arm links, wrist assembly, gripper end-effector, and supporting structural components. Individual parts were modelled separately and assembled using appropriate mechanical mates to simulate realistic joint movement and kinematic behavior. The design incorporates multiple rotational degrees of freedom to enable positioning and object manipulation within a defined workspace while maintaining structural stability and motion continuity. Particular attention was given to component interfacing, joint alignment, assembly clearances, and manufacturability during the modelling process. The gripper mechanism was designed to demonstrate basic object-handling functionality, while the arm geometry was optimized to provide adequate reach and motion flexibility. The project demonstrates proficiency in complex assembly modelling, mechanical system integration, parametric part design, motion-oriented CAD development, and robotic mechanism design principles commonly used in industrial automation and material handling applications.',
      type: 'solidworks',
    },
    {
      title: 'Mechanical Gear Assembly',
      thumbnail: ThumbnailGearBox,
      images: [GearBox1,GearBox2,GearBox3,GearBox4,GearBox5,GearBox6,GearBox7],
      shortDescription:
        'Helical gearbox assembly featuring ISO-standard gears, shafts, bearings, and housing.',
      fullDescription:
        'This project involved designing a manual rocker arm punching machine in SolidWorks for sheet metal punching and light-duty pressing operations. The assembly consists of a rigid C-frame structure, rocker arm mechanism, threaded power screw, punch holder, die block, and supporting fasteners. The rocker arm converts manual rotational input into controlled linear motion of the punch, providing mechanical advantage while maintaining alignment between punch and die. Individual components were modelled as separate parts and assembled using mates to verify motion and fit. The design emphasized manufacturability, structural rigidity, assembly feasibility, and smooth force transmission, while incorporating standard mechanical elements such as threaded shafts, guide components, bolted joints, and precision mating features.',
      type: 'solidworks',
    },
    {
      title: 'Manual Rocker Arm Punching Machine',
      thumbnail: ThumbnailRockerArm,
      images: [ManualRockerArmPunchingMachine1, ManualRockerArmPunchingMachine2, ManualRockerArmPunchingMachine3, ManualRockerArmPunchingMachine4, ManualRockerArmPunchingMachine5, ManualRockerArmPunchingMachine6, ManualRockerArmPunchingMachine7, ManualRockerArmPunchingMachine8],
      shortDescription:
        'Manually actuated punching machine designed using rocker arm linkage mechanism.',
      fullDescription:
        'This project consists of a collection of fundamental mechanical components developed in SolidWorks to strengthen proficiency in parametric CAD modelling and feature-based design. The models include an Archimedes screw, twist drill bit, pipe flange assembly, rack-and-pinion mechanism and scissor lift mechanism, each created using industry-standard modelling techniques such as sweeps, helices, circular patterns, revolved features, and assembly constraints. The project provided hands-on experience with geometric design, mechanical component modelling, dimensional control, and engineering drawing preparation while reinforcing core SolidWorks workflows commonly used in mechanical design and manufacturing applications.',
      type: 'solidworks',
    },
    {
      title: 'SMME Piston Cup Ramp',
      thumbnail: ThumbnailCClamp,
      images: [CClamp1,  CClamp3, CClamp4, CClamp5,  CClamp6],
      shortDescription:
        'Weldment-based inspection ramp designed for SMME Piston Cup vehicles.',
      fullDescription:
        'This project involved designing a complete C-clamp assembly in SolidWorks consisting of a rigid C-frame, threaded power screw, swivel pressure pad, handle bar, and fastening features. The model was created to demonstrate mechanical clamping principles, thread modelling, force transmission, and manufacturable part design. Individual components were modelled separately and assembled using mates to verify alignment, motion, and functionality. The threaded spindle converts rotational input into linear clamping force, while the reinforced frame geometry ensures structural rigidity under load. The project provided practical experience in part modelling, assembly design, thread generation, and mechanical component integration.',
      type: 'solidworks',
    },
    {
      title: 'C-Clamp Assembly Design',
      thumbnail: ThumbnailRamp,
      images: [SPCRamp1, SPCRamp2],
      shortDescription:
        'Functional C-clamp assembly featuring a threaded spindle and adjustable clamping mechanism.',
      fullDescription:
        'This project involved the design and development of a weldment-based vehicle inspection ramp for the SMME Piston Cup, the flagship off-road vehicle design competition organized by the School of Mechanical and Manufacturing Engineering (SMME), NUST. The ramp was modelled in SolidWorks using weldment features and designed through precise geometric calculations to achieve the required operating angle, dimensions, and load-bearing capability. The mechanism was engineered such that once a buggy ascends the inclined platform, the structure rotates about a fixed pivot point and settles into a stable horizontal position, allowing safe vehicle inspection. Particular attention was given to structural rigidity, load distribution, manufacturability, weldment optimization, and operational safety. The project demonstrates practical application of CAD modelling, weldment design, engineering calculations, and real-world competition infrastructure development.',
      type: 'solidworks',
    },
    {
      title: 'Crank-Slider Mechanism',
      thumbnail: ThumbnailCrankSlider,
      images: [SWCrankSlider1, SWCrankSlider2, SWCrankSlider3],
      shortDescription:
        'Parametric crank-slider mechanism with motion analysis and interference validation.',
      fullDescription:
        'This project involved the design and assembly of a fully parametric crank-slider mechanism in SolidWorks to demonstrate the conversion of rotational motion into linear reciprocating motion. The assembly consists of a crank, connecting rod, slider block, guide rails, and base plate, all modelled as individual components and assembled using appropriate mechanical mates and motion constraints. A clearance of 0.1 mm was maintained between the slider and guide surfaces to ensure smooth operation while minimizing excessive play and interference. SolidWorks Motion Study was utilized to validate the kinematic behavior of the mechanism, evaluate slider displacement throughout a complete crank revolution, and verify proper transmission of motion through the linkage. Interference detection tools were employed to eliminate component collisions and ensure reliable operation across the entire range of motion. The project demonstrates practical application of mechanism design, kinematic analysis, tolerance allocation, assembly modelling, and motion simulation principles commonly used in engines, pumps, compressors, and automated machinery.',
      type: 'solidworks',
    },
    {
      title: 'Ergonomic Cup Design',
      thumbnail: ThumbnailCup,
      images: [SWCup1, SWCup2, SWCup3],
      shortDescription:
        'Parametric cup model developed using advanced SolidWorks surface and solid modelling.',
      fullDescription:
        'This project involved the design and modelling of an ergonomic cup in SolidWorks using a combination of solid modelling and feature-based design techniques. The geometry incorporates a tapered body profile, smooth curvature transitions, integrated handle design, and a stable base configuration to achieve both functional and aesthetic objectives. Features including Revolve, Extrude, Fillet, Shell, and Sweep operations were utilized to create the final model while maintaining dimensional consistency and design intent throughout the development process. Particular attention was given to wall thickness distribution, handle attachment geometry, manufacturability, and stress concentration reduction through smooth transitions and rounded edges. The model was developed using parametric design principles, enabling efficient modification of dimensions and geometry without rebuilding the entire part. The project demonstrates proficiency in consumer product modelling, feature management, design-for-manufacturing considerations, and CAD-based product development commonly applied in industrial design, rapid prototyping, and consumer goods engineering.',
      type: 'solidworks',
    },
    {
      title: 'Basic Solidworks Projects',
      thumbnail: ThumbnailBasicProjects,
      images: [Flange1, Flange2, Archimedes1, Archimedes2, DrillBit, RacknPinion1, RacknPinion2, SciissorLift1, SciissorLift2, SciissorLift3],
      shortDescription:
        'Collection of fundamental mechanical components modelled using SolidWorks design techniques.',
      fullDescription:
        'This project consists of a collection of fundamental mechanical components developed in SolidWorks to strengthen proficiency in parametric CAD modelling and feature-based design. The models include an Archimedes screw, twist drill bit, pipe flange assembly, rack-and-pinion mechanism and scissor lift mechanism, each created using industry-standard modelling techniques such as sweeps, helices, circular patterns, revolved features, and assembly constraints. The project provided hands-on experience with geometric design, mechanical component modelling, dimensional control, and engineering drawing preparation while reinforcing core SolidWorks workflows commonly used in mechanical design and manufacturing applications.',
      type: 'solidworks',
    },
  ],
  
  'CFD Projects': [
    {
      title: 'Flow Around Cylindrical Obstacles',
      thumbnail: ThumbnailCFD,
      images: [CFDPipeFlow],
      shortDescription:
      'CFD analysis of pressure, velocity, and vorticity around varying obstacle diameters.',
      fullDescription:
      'This project involved a Computational Fluid Dynamics (CFD) investigation of internal flow around cylindrical obstacles of varying diameters placed within a flow domain. The objective was to evaluate the influence of obstacle size on pressure distribution, velocity profiles, wake formation, flow separation, and vorticity generation. The geometry was meshed and simulated under consistent flow conditions while systematically varying obstacle diameter to enable direct comparison of flow behavior. Post-processing was performed using pressure contours, velocity fields, streamlines, and vorticity plots to examine the effects of changing blockage ratio on fluid flow characteristics. The study provided practical experience in geometry preparation, mesh generation, boundary condition implementation, solver configuration, convergence monitoring, and CFD result interpretation while reinforcing fundamental fluid mechanics concepts such as pressure drag, recirculation zones, vortex formation, and flow separation.',
      type: 'cfd',
    },
  ],

  'WebDev Projects': [
    {
      title: 'myCV',
      images: [project1],
      image: project1,
      link: 'https://kashifnadeemkayani.github.io/myCV/',
      type: 'web',
    },
    {
      title: "The Reliable Mart's Web Page",
      images: [Reliable],
      image: Reliable,
      link: 'https://thereliablemart.github.io/ItemList/',
      type: 'web',
    },
    {
      title: 'Tic Tac Toe',
      images: [TicTacToe],
      image: TicTacToe,
      link: 'https://kashifnadeemkayani.github.io/TicTacToe./',
      type: 'web',
    },
  ],

  'Graphic Designing Projects': [
    { title: 'Canva Poster', images: [Mech],      image: Mech,      type: 'graphic' },
    { title: 'Canva Poster', images: [Success],   image: Success,   type: 'graphic' },
    { title: 'Canva Poster', images: [Mirror],    image: Mirror,    type: 'graphic' },
    { title: 'Canva Poster', images: [TwoThings], image: TwoThings, type: 'graphic' },
    { title: 'Canva Poster', images: [RealFlex],  image: RealFlex,  type: 'graphic' },
    { title: 'Canva Poster', images: [Sun],       image: Sun,       type: 'graphic' },
    { title: 'Canva Poster', images: [Loosing],   image: Loosing,   type: 'graphic' },
    { title: 'Canva Poster', images: [Voice],     image: Voice,     type: 'graphic' },
  ],

  'Video Editing Projects': [
    {
      title: 'DaVinci Resolve Video',
      images: [project1],
      thumbnail: project1,
      videoUrl: 'https://www.example.com/sample-video.mp4',
      type: 'video',
    },
  ],
};

const DISABLED_CATEGORIES = ['Video Editing Projects'];
const ENGINEERING_TYPES   = ['solidworks', 'cfd'];

// =============================================================================
// HoverCard — thumbnail card with dark overlay on hover
// =============================================================================
const HoverCard = ({ image, alt, overlayText }) => (
  <div className={styles.hoverCard}>
    <img src={image} alt={alt} className={styles.projectImage} />
    <div className={styles.hoverCardOverlay}>
      <span className={styles.hoverCardOverlayText}>{overlayText}</span>
    </div>
  </div>
);

// =============================================================================
// ImageCarousel — handles multi-image display inside the engineering modal
//
// Navigation:
//   PC  — left/right arrow buttons + mouse-wheel scroll over the image
//         + keyboard left/right arrows (wired from parent)
//   Mobile — touch swipe left/right
//
// Props:
//   images      : string[]             — array of image URLs
//   title       : string               — shown as bold gradient title at the top
//   imgIndex    : number               — controlled from parent (for keyboard nav)
//   setImgIndex : (n: number) => void  — setter from parent
// =============================================================================
const ImageCarousel = ({ images, title, imgIndex, setImgIndex }) => {
  const total     = images.length;
  const touchStartX = useRef(null);
  const wrapRef     = useRef(null);

  const goPrev = useCallback(() =>
    setImgIndex((i) => (i - 1 + total) % total), [total, setImgIndex]);
  const goNext = useCallback(() =>
    setImgIndex((i) => (i + 1) % total), [total, setImgIndex]);

  // Mouse-wheel navigation (PC)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0 || e.deltaX > 0) goNext();
      else goPrev();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [goPrev, goNext]);

  // Touch swipe (mobile)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  return (
    <div className={styles.carousel} ref={wrapRef}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* ── bold gradient title at the top of the image ── */}
      <div className={styles.carouselTitle}>{title}</div>

      {/* ── image with animated crossfade ── */}
      <div className={styles.carouselImgWrap}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={images[imgIndex]}
            alt={`${title} — image ${imgIndex + 1}`}
            className={styles.carouselImg}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{   opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>

      {/* ── left / right arrow buttons (shown only when >1 image) ── */}
      {total > 1 && (
        <>
          <button
            className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* ── dot indicators ── */}
          <div className={styles.carouselDots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.carouselDot} ${i === imgIndex ? styles.carouselDotActive : ''}`}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// =============================================================================
// EngineeringModalContent
//
// Layout (flex-column, fills .engModalContent which has explicit height):
//
//   ┌──────────────────────────────────────────┐
//   │   ImageCarousel  (flex:1, fills height)  │
//   │     ─ gradient title at top of image     │
//   │     ─ ‹ › arrow buttons on sides         │
//   │     ─ dot indicators at bottom of image  │
//   ├──────────────────────────────────────────┤
//   │   Caption bar  (flex-shrink:0, ~64px)    │
//   │   shortDesc ……………………… [See More ▼]     │
//   └──────────────────────────────────────────┘
//
// See More → frosted overlay panel slides UP over the carousel.
// =============================================================================
const EngineeringModalContent = ({ project, showFull, onToggle, imgIndex, setImgIndex }) => (
  <div className={styles.engModal}>

    {/* ── carousel + overlay panel ── */}
    <div className={styles.engModalImageWrap}>
      <ImageCarousel
        images={project.images}
        title={project.title}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
      />

      {/* full-description frosted panel slides up over the carousel */}
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
              Show Less ▼
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* ── caption bar ── */}
    <div className={styles.engModalCaption}>
      <p className={styles.engModalShortDesc}>{project.shortDescription}</p>
      {!showFull && (
        <button className={styles.seeMoreBtn} onClick={onToggle}>
          See More ▲
        </button>
      )}
    </div>

  </div>
);

// =============================================================================
// Main Component
// =============================================================================
const Projects = () => {
  const [showModal,       setShowModal]       = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [playing,         setPlaying]         = useState(false);
  const [activeCategory,  setActiveCategory]  = useState('SolidWorks Projects');
  const [currentIndex,    setCurrentIndex]    = useState(0);
  const [showFullDesc,    setShowFullDesc]     = useState(false);
  const [imgIndex,        setImgIndex]        = useState(0); // carousel image index

  const savedScrollY = useRef(0);

  // ── scroll lock (no position:fixed — preserves scroll position) ──────────
  useEffect(() => {
    const html = document.documentElement;
    if (showModal) {
      savedScrollY.current     = window.scrollY;
      html.style.overflow      = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      html.style.overflow      = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
    }
    return () => {
      html.style.overflow      = '';
      document.body.style.overflow = '';
    };
  }, [showModal]);

  // ── keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape' || e.keyCode === 27) {
          closeModal();
        } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
          // When engineering modal open → navigate IMAGES within the project
          if (selectedProject && ENGINEERING_TYPES.includes(selectedProject.type)) {
            const total = selectedProject.images?.length || 1;
            setImgIndex((i) => (i - 1 + total) % total);
          }
        } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
          if (selectedProject && ENGINEERING_TYPES.includes(selectedProject.type)) {
            const total = selectedProject.images?.length || 1;
            setImgIndex((i) => (i + 1) % total);
          }
        }
      } else {
        // Modal closed → arrow keys switch category tabs
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
  }, [showModal, activeCategory, currentIndex, selectedProject, imgIndex]);

  // ── handlers ─────────────────────────────────────────────────────────────
  const openModal = (project, index) => {
    setSelectedProject(project);
    setCurrentIndex(index);
    setShowFullDesc(false);
    setImgIndex(0); // always start at first image
    setShowModal(true);
    if (project.type === 'video') setPlaying(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPlaying(false);
    setShowFullDesc(false);
    setImgIndex(0);
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

  // ── modal content ─────────────────────────────────────────────────────────
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
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
        />
      );
    }

    // graphic
    return (
      <img
        src={selectedProject.images?.[0] || selectedProject.image || selectedProject.thumbnail}
        alt={selectedProject.title}
        className={styles.enlargedImage}
      />
    );
  };

  // ── grid class ────────────────────────────────────────────────────────────
  const gridClass = [
    styles.projectGrid,
    activeCategory === 'Graphic Designing Projects' ? styles.graphicDesignGrid : '',
    ENGINEERING_TYPES.includes(projectData[activeCategory]?.[0]?.type)
      ? styles.engineeringGrid : '',
  ].filter(Boolean).join(' ');

  const isEngModal = selectedProject && ENGINEERING_TYPES.includes(selectedProject.type);

  // ── render ────────────────────────────────────────────────────────────────
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
              // thumbnail shown on grid card — uses dedicated thumbnail if provided,
              // otherwise falls back to first image in the carousel array
              const thumb = project.thumbnail ?? project.images?.[0] ?? project.image;

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
                  {/* Engineering cards */}
                  {isEng && (
                    <div className={`${styles.projectImageContainer} ${styles.engCardOuter}`}>
                      <HoverCard image={thumb} alt={project.title} overlayText="Click to View Details" />
                    </div>
                  )}

                  {/* Web-dev cards */}
                  {isWeb && (
                    <div className={styles.projectImageContainer}>
                      <HoverCard image={thumb} alt={project.title} overlayText="Click to View Website" />
                    </div>
                  )}

                  {/* Graphic / other cards */}
                  {!isEng && !isWeb && (
                    <div className={[
                      styles.projectImageContainer,
                      isGraphic ? styles.graphicDesignContainer : '',
                    ].filter(Boolean).join(' ')}>
                      <img
                        src={thumb}
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
