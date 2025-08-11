import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Eye, X } from 'lucide-react';
import masterBedroomImage from '../assets/master-bedroom.jpg';
import modularKitchenImage from '../assets/modular-kitchen.jpg';
import residentialDesignImage from '../assets/residential-design.jpg';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
}

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Master Bedroom with Attached Bath & Toilet',
      category: 'Residential Design',
      description: 'Comprehensive master bedroom design with ensuite bathroom featuring modern layouts and premium finishes.',
      fullDescription: 'A sophisticated master bedroom design project featuring efficient space planning and luxurious materials. The project includes detailed technical drawings, 3D visualizations, and precise material specifications. The ensuite bathroom incorporates optimal lighting solutions and ergonomic design principles for maximum comfort and functionality.',
      image: masterBedroomImage,
      technologies: ['AutoCAD', 'SketchUp', 'V-Ray', 'Material Selection']
    },
    {
      id: 2,
      title: 'Modular Kitchen Plan',
      category: 'Kitchen Design',
      description: 'Efficient modular kitchen design optimizing workflow and storage while maximizing space utilization.',
      fullDescription: 'Complete modular kitchen design focusing on workflow efficiency and storage optimization. The project includes detailed cabinet layouts, appliance placement, and material selection. Special attention was given to ergonomic principles and modern cooking requirements while maintaining aesthetic appeal.',
      image: modularKitchenImage,
      technologies: ['AutoCAD', 'SketchUp', 'Space Planning', 'Ergonomic Design']
    },
    {
      id: 3,
      title: 'Comprehensive Residential Design Deliverables',
      category: 'Full Home Design',
      description: 'Complete residential design package including all technical drawings and design specifications.',
      fullDescription: 'A comprehensive residential design project delivering complete design documentation. The project encompasses space planning, material palettes, furniture specifications, and detailed technical drawings. This full-service approach ensures seamless project execution and client satisfaction.',
      image: residentialDesignImage,
      technologies: ['AutoCAD', 'Technical Documentation', 'Material Palettes', 'Project Management']
    }
  ];

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
            A showcase of my most impactful interior design projects, each telling a unique story 
            through thoughtful space planning and aesthetic excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover-lift"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-accent-dark transition-colors"
                  >
                    <Eye size={20} />
                    <span>View Details</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-accent font-medium mb-2">{project.category}</div>
                <h3 className="font-playfair text-xl font-semibold text-primary mb-3">{project.title}</h3>
                <p className="text-foreground leading-relaxed mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface text-text-soft text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-card text-foreground p-2 rounded-full hover:bg-surface transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="text-accent font-medium mb-2">{selectedProject.category}</div>
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-primary mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-foreground leading-relaxed text-lg mb-6">
                  {selectedProject.fullDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-surface text-text-soft rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-hero flex items-center justify-center space-x-2"
                  >
                    <ExternalLink size={20} />
                    <span>View Full Project</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;