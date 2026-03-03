"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Get colors based on theme
  const primaryColor = theme === 'dark' ? '#8c61ff' : '#ff7a7a';
  const secondaryColor = theme === 'dark' ? '#536dfe' : '#ff9d7a';
  const tertiaryColor = theme === 'dark' ? '#2979ff' : '#ff7ac6';
  
  // Track mouse position for interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Apply subtle movement to SVG elements
      const circles = svgRef.current.querySelectorAll('circle');
      const paths = svgRef.current.querySelectorAll('path');
      
      circles.forEach((circle, i) => {
        const factor = (i % 3) + 1;
        circle.setAttribute('cy', `${parseFloat(circle.getAttribute('data-original-cy') || '0') + y * 20 * factor}`);
        circle.setAttribute('cx', `${parseFloat(circle.getAttribute('data-original-cx') || '0') + x * 20 * factor}`);
      });
      
      paths.forEach((path, i) => {
        const factor = (i % 3) + 1;
        path.setAttribute('transform', `translate(${x * 10 * factor}, ${y * 10 * factor})`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Store original positions on load
  useEffect(() => {
    if (!svgRef.current) return;
    
    const circles = svgRef.current.querySelectorAll('circle');
    circles.forEach(circle => {
      circle.setAttribute('data-original-cx', circle.getAttribute('cx') || '0');
      circle.setAttribute('data-original-cy', circle.getAttribute('cy') || '0');
    });
  }, []);
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full opacity-70"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* Background shapes */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={tertiaryColor} stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Animated blobs */}
        <motion.path
          d="M600,200 Q750,50 900,150 Q1050,250 900,400 Q750,550 600,400 Q450,250 600,200"
          fill="url(#gradient1)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.7,
            translateX: [0, 20, 0],
            translateY: [0, -10, 0] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.path
          d="M100,300 Q200,100 400,200 Q600,300 400,500 Q200,700 100,500 Q0,300 100,300"
          fill="url(#gradient2)"
          filter="url(#glow)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.7,
            translateX: [0, -20, 0],
            translateY: [0, 15, 0] 
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + (i * 60) % 900}
            cy={150 + (i * 50) % 700}
            r={2 + (i % 4)}
            fill={i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : tertiaryColor}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0]
            }}
            transition={{ 
              duration: 5 + (i % 5),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;