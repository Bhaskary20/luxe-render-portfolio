import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Ruler, Lightbulb, Camera, Layers, Settings } from 'lucide-react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      icon: Palette,
      title: 'Design Software',
      skills: [
        { name: 'AutoCAD', level: 95 },
        { name: 'SketchUp', level: 90 },
        { name: 'V-Ray', level: 85 },
        { name: 'Photoshop', level: 88 },
        { name: 'Enscape', level: 82 },
      ]
    },
    {
      icon: Ruler,
      title: 'Design Expertise',
      skills: [
        { name: 'Space Planning', level: 98 },
        { name: 'Color Theory', level: 92 },
        { name: 'Material Selection', level: 90 },
        { name: 'Lighting Design', level: 88 },
        { name: 'Ergonomic Solutions', level: 85 },
      ]
    },
    {
      icon: Lightbulb,
      title: 'Professional Skills',
      skills: [
        { name: 'Project Management', level: 90 },
        { name: 'Client Relations', level: 95 },
        { name: 'Presentation Skills', level: 88 },
        { name: 'Budget Planning', level: 85 },
        { name: 'Team Collaboration', level: 92 },
      ]
    }
  ];

  const tools = [
    { name: 'AutoCAD', icon: '📐', category: '2D Drafting' },
    { name: 'SketchUp', icon: '🏗️', category: '3D Modeling' },
    { name: 'V-Ray', icon: '✨', category: 'Rendering' },
    { name: 'Lumion', icon: '🎬', category: 'Visualization' },
    { name: 'Photoshop', icon: '🎨', category: 'Image Editing' },
    { name: 'CorelDRAW', icon: '📊', category: 'Vector Graphics' },
    { name: 'Canva', icon: '🖼️', category: 'Presentation' },
    { name: 'Microsoft Office', icon: '📋', category: 'Documentation' },
  ];

  return (
    <section id="skills" className="section-padding bg-surface">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-6">
            Skills & Tools
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of technical expertise and design skills that enable me to 
            bring innovative interior design concepts to life.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <category.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-primary">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-text-soft text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="bg-gradient-to-r from-accent to-accent-dark h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-12">
            Tools & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{tool.name}</h4>
                <p className="text-text-soft text-sm">{tool.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1 }}
          className="mt-20 bg-card rounded-2xl p-8 shadow-soft max-w-4xl mx-auto"
        >
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-8">
            Professional Strengths
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-accent mb-4">Design Philosophy</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>User-centered design approach</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Sustainable design practices</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Innovative space optimization</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-accent mb-4">Project Management</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>On-time project delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Budget optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>Effective client communication</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;