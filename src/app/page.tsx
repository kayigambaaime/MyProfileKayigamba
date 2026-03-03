"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animationVariants';
import HeroSection from '@/components/sections/HeroSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import ContactPreview from '@/components/sections/ContactPreview';

export default function HomePage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with 3D elements */}
      <HeroSection />
      
      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-20 bg-secondary/30"
        variants={staggerContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUpVariant} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">My Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I specialize in building modern, responsive, and performant web applications
              using cutting-edge technologies.
            </p>
          </motion.div>
          <SkillsSection />
        </div>
      </motion.section>
      
      {/* Projects Preview */}
      <motion.section
        id="projects"
        className="py-20"
        variants={staggerContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUpVariant} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects. Take a look at what I&apos;ve been working on.
            </p>
          </motion.div>
          <ProjectsPreview />
        </div>
      </motion.section>

      {/* Contact Preview */}
      <motion.section
        id="contact"
        className="py-20 bg-secondary/30"
        variants={staggerContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUpVariant} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interested in collaborating? Feel free to reach out and let&apos;s create something amazing.
            </p>
          </motion.div>
          <ContactPreview />
        </div>
      </motion.section>
    </div>
  );
}