"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';

interface EnhancedSvgIllustrationProps {
  technologies?: string[];
}

const EnhancedSvgIllustration = ({ 
  technologies = ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB'] 
}: EnhancedSvgIllustrationProps) => {
  const { theme } = useTheme();

  // Theme-specific colors
  const colors = {
    primary: theme === 'dark' ? '#8c61ff' : '#FD3359',
    secondary: theme === 'dark' ? '#536dfe' : '#F4D302',
    tertiary: theme === 'dark' ? '#2979ff' : '#21BDFF',
    background: theme === 'dark' ? '#1e1e2f' : '#ffffff',
    text: theme === 'dark' ? '#ffffff' : '#333333',
    centralFill: theme === 'dark' ? '#8c61ff' : '#FD3359',
    centralText: theme === 'dark' ? '#ffffff' : '#ffffff',
    nodeFill: theme === 'dark' ? '#2d2d40' : '#f8f9fa',
    nodeStroke: theme === 'dark' ? '#8c61ff' : '#FD3359',
    nodeText: theme === 'dark' ? '#ffffff' : '#333333',
  };

  // Generate unique gradient IDs based on theme to prevent conflicts
  const circleGradientId = `circleGradient-${theme}`;
  const pulseGradientId = `pulseGradient-${theme}`;
  
  return (
    <motion.svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md"
    >
      <defs>
        <linearGradient id={circleGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>

        <radialGradient id={pulseGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
        </radialGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Backdrop glow effect */}
      <motion.circle
        cx="200" cy="200" r="180"
        fill={`url(#${pulseGradientId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      {/* Animated circles */}
      <motion.circle
        cx="200" cy="200" r="160"
        fill="none"
        stroke={`url(#${circleGradientId})`}
        strokeWidth="2"
        initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.circle
        cx="200" cy="200" r="120"
        fill="none"
        stroke={`url(#${circleGradientId})`}
        strokeWidth="4"
        strokeDasharray="10 5"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 1, type: "spring" }}
      >
        {/* Small tech nodes */}
        {technologies.map((tech, i) => {
          const angle = (i * (360 / technologies.length)) * Math.PI / 180;
          const x = 200 + 80 * Math.cos(angle);
          const y = 200 + 80 * Math.sin(angle);
          
          return (
            <motion.g key={tech}>
              {/* Node pulse animation */}
              <motion.circle
                cx={x} cy={y} r="20"
                fill="transparent"
                stroke={colors.primary}
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
              
              {/* Node circle */}
              <motion.circle
                cx={x} cy={y} r="20"
                fill={colors.nodeFill}
                stroke={colors.nodeStroke}
                strokeWidth="2"
                filter="url(#glow)"
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  y: [y, y - 5, y],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2 + i * 0.5, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
              
              {/* Node connection line */}
              <motion.line
                x1="200" y1="200"
                x2={x} y2={y}
                stroke={`url(#${circleGradientId})`}
                strokeWidth="1.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.5 + (i * 0.1),
                  ease: "easeOut"
                }}
              />
              
              {/* Tech label */}
              <motion.text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.nodeText}
                fontSize="10"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + (i * 0.1) }}
              >
                {tech}
              </motion.text>
            </motion.g>
          );
        })}
        
        {/* Central node */}
        <motion.circle
          cx="200" cy="200" r="30"
          fill={colors.centralFill}
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.text
          x="200" y="200"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={colors.centralText}
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Full-Stack
        </motion.text>
      </motion.g>
    </motion.svg>
  );
};

export default EnhancedSvgIllustration;