"use client";

import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import AnimatedCountdown from '@/components/animations/AnimatedCountdown';
import { fadeUpVariant } from '@/lib/animationVariants';
import AnimatedSvgBackground from '@/components/animations/AnimatedSvgBackground';
import EnhancedSvgIllustration from '../animations/EnhancedSvgIllustration';
import portfolioData from '@/data/portfolio.json';
import technologiesData from '@/data/technologies.json';

// Dynamically import the 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 bg-secondary/50 rounded-full animate-pulse" />
    </div>
  ),
});

const HeroSection = () => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract data from JSON
  const { hero } = portfolioData;
  const { techStack } = technologiesData;

  // Handle countdown completion
  const handleCountdownComplete = () => {
    setShowContent(true);
  };

  // Start intro animation on mount
  const startIntroAnimation = () => {
    if (!hasAnimationStarted) {
      setHasAnimationStarted(true);
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle button actions
  const handleButtonClick = (action: string) => {
    switch (action) {
      case 'scrollToProjects':
        scrollToSection('projects');
        break;
      case 'scrollToContact':
        scrollToSection('contact');
        break;
      default:
        break;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Animated background */}
      <AnimatedSvgBackground />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/70 to-background"></div>

      {/* 3D background canvas with error boundary */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-secondary/50 rounded-full animate-pulse" />
          </div>
        }>
          <ErrorBoundary fallback={
            <div className="w-full h-full bg-gradient-to-b from-primary/5 to-background/30" />
          }>
            <HeroScene />
          </ErrorBoundary>
        </Suspense>
      </div>

      {/* Profile Picture Background */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.6, -0.05, 0.01, 0.99],
              delay: 0.3
            }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-end">
              <Image
                src={hero.profileImage}
                alt="Profile"
                fill
                className="object-contain object-right dark:opacity-100 opacity-80"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 90%, transparent 100%)',
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/25 to-background/40 dark:from-background/30 dark:via-background/40 dark:to-background/60"></div>
              {/* Enhanced animated glow effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(ellipse 40% 50% at 25% 50%, rgba(99, 102, 241, 0.15), transparent)',
                    'radial-gradient(ellipse 45% 55% at 25% 50%, rgba(99, 102, 241, 0.25), transparent)',
                    'radial-gradient(ellipse 40% 50% at 25% 50%, rgba(99, 102, 241, 0.15), transparent)',
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="flex flex-col items-center justify-center">
          {/* Initial countdown animation */}
          <AnimatePresence>
            {!hasAnimationStarted && (
              <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold mb-8 text-foreground/90 drop-shadow-md"
              >
                Welcome to My <span className="text-primary">Portfolio</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
              >
                Prepare to explore my work and skills in just
              </motion.p>
              <AnimatedCountdown
                onComplete={() => {
                  handleCountdownComplete();
                  setTimeout(() => {
                    startIntroAnimation();
                  }, 500);
                }}
                autoStart={true}
              />
            </motion.div>
            )}
          </AnimatePresence>

          {/* Main content revealed after countdown */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                ref={contentRef}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.4,
                    },
                  },
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left"
              >
                <motion.div
                  variants={fadeUpVariant}
                  className="max-w-xl lg:ml-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    className="mb-4 inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium backdrop-blur-sm border border-primary/20"
                  >
                    {hero.badge}
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.7,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    dangerouslySetInnerHTML={{ __html: hero.title.replace('<span>', '<span class="text-primary bg-primary/10 px-2 rounded">') }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.9,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    className="text-muted-foreground text-lg mb-8 leading-relaxed"
                  >
                    {hero.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.1,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  >
                    {hero.buttons.map((button, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          size="lg"
                          variant={button.variant as "primary" | "outline"}
                          onClick={() => handleButtonClick(button.action)}
                        >
                          {button.text}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                  className="hidden lg:flex justify-center items-center"
                >
                  {/* Animated SVG illustration with floating effect */}
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <EnhancedSvgIllustration
                      technologies={techStack.primary}
                    />
                    {/* Glowing orb effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech stack icons */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.3,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="mt-20 pt-8 border-t border-border/40 backdrop-blur-sm"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-muted-foreground text-center mb-6 font-medium"
              >
                Tech Stack
              </motion.p>
              <div className="flex flex-wrap justify-center gap-8">
                {techStack.primary.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1.6 + 0.1 * index,
                      duration: 0.5,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      color: 'rgb(var(--primary, 99, 102, 241))',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="text-foreground/70 font-medium cursor-pointer transition-colors px-3 py-1 rounded-lg hover:bg-primary/10"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              onClick={() => scrollToSection('projects')}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
            >
              <motion.p
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-muted-foreground text-sm mb-2 font-medium"
              >
                Scroll to explore
              </motion.p>
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary group-hover:text-primary/80 transition-colors"
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
                {/* Pulsing effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 -z-10"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;