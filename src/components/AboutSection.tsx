import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Award, label: 'Years Experience', value: '3+' },
    { icon: Users, label: 'Happy Clients', value: '20+' },
    { icon: Clock, label: 'Projects Completed', value: '15+' },
    { icon: Star, label: 'Client Satisfaction', value: '9.8/10' },
  ];

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="container-custom" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8" />
            <p className="text-xl text-text-soft max-w-3xl mx-auto leading-relaxed">
              Passionate interior designer dedicated to creating spaces that tell stories 
              and enhance lives through thoughtful design and meticulous attention to detail.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-playfair text-2xl lg:text-3xl font-semibold text-primary mb-6">
                My Design Philosophy
              </h3>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                I believe that great interior design goes beyond aesthetics—it's about creating 
                spaces that resonate with the people who inhabit them. Every project begins with 
                understanding the client's lifestyle, preferences, and dreams.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                With expertise in space planning, color theory, material selection, and lighting design, 
                I craft environments that are both beautiful and highly functional. My approach combines 
                timeless elegance with contemporary innovation.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                From residential homes to commercial spaces, I specialize in creating designs that 
                maximize spatial efficiency while reflecting the unique personality and needs of each client.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <h4 className="font-playfair text-xl font-semibold text-primary mb-6">
                Key Expertise
              </h4>
              <div className="space-y-4">
                {[
                  'Space Planning & Layout Design',
                  'Color Theory & Material Selection',
                  'Lighting Design & Ergonomic Solutions',
                  '3D Visualization & Technical Drawings',
                  'Project Management & Client Relations',
                  'Sustainable Design Practices'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="font-playfair text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-soft font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;