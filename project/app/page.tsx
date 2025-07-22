'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Users, Sparkles, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  
  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-white overflow-x-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20" />
        
        {/* Floating Geometric Shapes */}
        <motion.div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <div className={`w-${4 + (i % 3) * 2} h-${4 + (i % 3) * 2} ${
                i % 3 === 0 ? 'bg-blue-500/20 rounded-full' :
                i % 3 === 1 ? 'bg-purple-500/20 rotate-45' :
                'bg-orange-500/20 rounded-lg'
              } backdrop-blur-sm`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Particle System */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y: backgroundY }}
        >
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `${
                  i % 4 === 0 ? '#3B82F6' :
                  i % 4 === 1 ? '#8B5CF6' :
                  i % 4 === 2 ? '#F97316' :
                  '#10B981'
                }`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-600/30 to-pink-600/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      </div>

      {/* Enhanced Navigation */}
      <motion.nav 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 shadow-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex space-x-8">
          {[
            { id: 'home', label: 'Home', icon: Rocket },
            { id: 'about', label: 'About', icon: Star },
            { id: 'skills', label: 'Skills', icon: Zap },
            { id: 'projects', label: 'Projects', icon: Code },
            { id: 'contact', label: 'Contact', icon: Mail },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center space-x-2 ${
                activeSection === item.id 
                  ? 'text-white bg-blue-600/50 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-50"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center z-10">
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[Code, Palette, Zap, Sparkles, Rocket, Star].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i * 15)}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <Icon size={32} className="text-blue-400/30" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={20} className="text-blue-400" />
              <span className="text-blue-400 font-medium">Available for Freelance</span>
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
              style={{ y: textY }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Creative
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Developer
              </motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Crafting exceptional digital experiences with{' '}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{ color: ['#3B82F6', '#8B5CF6', '#F97316', '#3B82F6'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              modern technologies
            </motion.span>
            {' '}and innovative design that captivates and converts
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
                onClick={() => scrollToSection('projects')}
              >
                <Rocket className="mr-2" size={20} />
                View My Work
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mr-2" size={20} />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '30+', label: 'Happy Clients' },
              { number: '99%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 + index * 0.1 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-blue-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer group"
            onClick={() => scrollToSection('about')}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                Scroll to explore
              </span>
              <ArrowDown className="text-blue-400 group-hover:text-blue-300 transition-colors" size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-1">
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                    <Code size={120} className="text-blue-400" />
                  </div>
                </div>
                <motion.div
                  className="absolute top-10 right-10 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Zap size={32} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Passionate Full-Stack Developer</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating 
                beautiful, functional, and user-friendly applications. My passion lies in 
                transforming complex problems into simple, elegant solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I love working with modern technologies like React, Next.js, TypeScript, and 
                Node.js to build scalable applications that make a difference.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2">React</Badge>
                <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2">Next.js</Badge>
                <Badge variant="secondary" className="bg-blue-600 text-white px-4 py-2">TypeScript</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'], color: 'blue' },
              { icon: Zap, title: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'], color: 'green' },
              { icon: Palette, title: 'Design', skills: ['Figma', 'UI/UX', 'Animations', 'Responsive'], color: 'purple' },
              { icon: Users, title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'CI/CD'], color: 'orange' },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${category.color}-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon size={32} className={`text-${category.color}-400`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 0.8, delay: (index * 0.1) + (skillIndex * 0.1) }}
                          viewport={{ once: true }}
                          className="text-sm text-gray-300 bg-white/5 rounded-full px-3 py-1"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Modern e-commerce solution with React, Node.js, and Stripe integration',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
              {
                title: 'Task Management App',
                description: 'Collaborative task management with real-time updates and team features',
                tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
                image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
              {
                title: 'Weather Dashboard',
                description: 'Beautiful weather app with interactive maps and detailed forecasts',
                tech: ['React', 'API Integration', 'Chart.js', 'Tailwind'],
                image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </Button>
                        <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                          <Github size={16} className="mr-2" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-400/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-blue-400" size={24} />
                    <span className="text-gray-300">hello@example.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Github className="text-blue-400" size={24} />
                    <span className="text-gray-300">github.com/username</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="text-blue-400" size={24} />
                    <span className="text-gray-300">linkedin.com/in/username</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Send Message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Creative Developer. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}