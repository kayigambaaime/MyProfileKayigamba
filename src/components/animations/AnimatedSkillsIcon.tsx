"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';

interface AnimatedSkillIconProps {
  name: string;
  level: number; // 1-5
  delay?: number;
}

const AnimatedSkillIcon = ({ name, level, delay = 0 }: AnimatedSkillIconProps) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate the stroke percentage based on skill level
  const percentage = level * 20;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  
  // Get colors based on theme
  const primaryColor = theme === 'dark' ? '#8c61ff' : '#FD3359';
  const secondaryColor = theme === 'dark' ? '#536dfe' : '#F4D302';
  
  const levelLabel = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][level - 1] || '';
  
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center mb-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background circle */}
        <svg width="96" height="96" viewBox="0 0 100 100" className="absolute">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="var(--secondary)"
            strokeWidth="4"
            opacity="0.3"
          />
        </svg>
        
        {/* Progress circle */}
        <motion.svg
          width="96"
          height="96"
          viewBox="0 0 100 100"
          className="absolute"
          initial={{ rotate: -90 }}
          animate={{ 
            rotate: isHovered ? [270, 630] : -90
          }}
          transition={{ 
            duration: isHovered ? 0.7 : 0,
            ease: "easeInOut"
          }}
        >
          <defs>
            <linearGradient id={`skillGradient-${name}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={`url(#skillGradient-${name})`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </motion.svg>
        
        {/* Center content */}
        <motion.div 
          className="z-10 text-foreground font-bold"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {isHovered ? (
            <div className="text-lg">{level}/5</div>
          ) : (
            <div className="text-center">
              <div className="text-sm uppercase font-semibold">{name}</div>
            </div>
          )}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground">{levelLabel}</div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedSkillIcon;