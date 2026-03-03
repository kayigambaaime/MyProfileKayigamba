"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';

const AnimatedSvgBackground = () => {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Theme-specific colors
  const colors = {
    primary: theme === 'dark' ? '#8c61ff' : '#FD3359',
    secondary: theme === 'dark' ? '#536dfe' : '#F4D302',
    tertiary: theme === 'dark' ? '#2979ff' : '#21BDFF',
    highlight: theme === 'dark' ? '#03dac6' : '#ff4081',
  };

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Apply subtle parallax to SVG elements
      const paths = svgRef.current.querySelectorAll('path');
      const circles = svgRef.current.querySelectorAll('circle');
      
      paths.forEach((path, i) => {
        const factor = (i % 3) + 1;
        const translateX = (x - 0.5) * 20 * factor;
        const translateY = (y - 0.5) * 20 * factor;
        path.setAttribute('transform', `translate(${translateX}, ${translateY})`);
      });
      
      circles.forEach((circle, i) => {
        const factor = (i % 3) + 1;
        const translateX = (x - 0.5) * 10 * factor;
        const translateY = (y - 0.5) * 10 * factor;
        circle.setAttribute('transform', `translate(${translateX}, ${translateY})`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg 
        ref={svgRef}
        className="w-full h-full opacity-60"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id="bgGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={colors.tertiary} stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id="bgGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.tertiary} stopOpacity="0.1" />
            <stop offset="100%" stopColor={colors.highlight} stopOpacity="0.05" />
          </linearGradient>
          
          <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
          
          {/* Filters */}
          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background shapes */}
        <motion.path
          d="M0,200 Q250,50 500,100 Q750,150 1000,50 L1000,1000 L0,1000 Z"
          fill="url(#bgGradient1)"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        <motion.path
          d="M0,400 Q200,350 400,450 Q600,550 800,500 Q1000,450 1000,550 L1000,1000 L0,1000 Z"
          fill="url(#bgGradient2)"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
        
        <motion.path
          d="M0,600 Q200,550 400,650 Q600,750 800,700 Q1000,650 1000,750 L1000,1000 L0,1000 Z"
          fill="url(#bgGradient3)"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        />
        
        {/* Decorative elements */}
        {/* Large glowing circle */}
        <motion.circle
          cx="200"
          cy="300"
          r="100"
          fill="url(#circleGradient)"
          filter="url(#glow1)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0.6] }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Small floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + (i * 45) % 900}
            cy={100 + (i * 40) % 800}
            r={2 + (i % 4)}
            fill={
              i % 4 === 0 ? colors.primary : 
              i % 4 === 1 ? colors.secondary : 
              i % 4 === 2 ? colors.tertiary : 
              colors.highlight
            }
            filter="url(#glow2)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0]
            }}
            transition={{ 
              duration: 5 + (i % 5),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Decorative lines */}
        <motion.path
          d="M200,200 C300,150 400,250 500,200 S700,100 800,200"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        
        <motion.path
          d="M150,400 C250,350 350,450 450,400 S650,300 750,400"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Tech words floating in the background */}
        {[
          { text: "React", x: 150, y: 150, color: colors.secondary },
          { text: "TypeScript", x: 800, y: 250, color: colors.primary },
          { text: "Node.js", x: 200, y: 500, color: colors.tertiary },
          { text: "Next.js", x: 700, y: 400, color: colors.highlight },
          { text: "Tailwind", x: 400, y: 300, color: colors.primary }
        ].map((item, i) => (
          <motion.g key={i} filter="url(#glow2)">
            <motion.text
              x={item.x}
              y={item.y}
              fill={item.color}
              fontFamily="monospace"
              fontSize="12"
              opacity="0.5"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [item.y - 10, item.y, item.y - 10]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            >
              {item.text}
            </motion.text>
          </motion.g>
        ))}
        
        {/* Binary code effect */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.text
            key={`binary-${i}`}
            x={300 + (i * 100)}
            y={600 + (i * 20)}
            fill={colors.primary}
            fontFamily="monospace"
            fontSize="10"
            opacity="0.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {Array.from({ length: 20 }).map(() => Math.round(Math.random())).join('')}
          </motion.text>
        ))}
      </svg>
    </div>
  );
};

export default AnimatedSvgBackground;