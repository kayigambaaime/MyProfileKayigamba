"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 1-5
    icon?: React.ReactNode;
  }[];
}

interface SkillsVisualizationProps {
  skillCategories: SkillCategory[];
  isVisible: boolean;
}

const SkillsVisualization = ({ skillCategories, isVisible }: SkillsVisualizationProps) => {
  const { theme } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Theme-specific colors
  const colors = {
    primary: theme === 'dark' ? '#8c61ff' : '#FD3359',
    secondary: theme === 'dark' ? '#536dfe' : '#F4D302',
    tertiary: theme === 'dark' ? '#2979ff' : '#21BDFF',
    quaternary: theme === 'dark' ? '#9c27b0' : '#FF7AC6',
    background: theme === 'dark' ? '#1e1e2f' : '#ffffff',
    cardBackground: theme === 'dark' ? '#2d2d40' : '#f8f9fa',
    text: theme === 'dark' ? '#ffffff' : '#333333',
    mutedText: theme === 'dark' ? '#a0a0b8' : '#6c757d',
    highlight: theme === 'dark' ? '#03dac6' : '#ff4081',
  };

  // Generate gradient IDs to avoid conflicts
  const centerGradientId = `centerGradient-${theme}`;
  const lineGradientId = `lineGradient-${theme}`;
  const pulseGradientId = `pulseGradient-${theme}`;
  
  // Glow filter for better visibility
  const glowFilterId = `glow-${theme}`;
  
  return (
    <motion.div
      className="mt-12 flex justify-center overflow-visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.6 }}
    >
      <svg width="700" height="400" viewBox="0 0 700 400" className="max-w-full">
        <defs>
          {/* Center gradient */}
          <linearGradient id={centerGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.9" />
          </linearGradient>
          
          {/* Line gradient */}
          <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.7" />
          </linearGradient>
          
          {/* Pulse animation gradient */}
          <radialGradient id={pulseGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.highlight} stopOpacity="0" />
          </radialGradient>
          
          {/* Glow filter for text and nodes */}
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Pattern for background texture */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" />
            <circle cx="10" cy="10" r="0.5" fill={theme === 'dark' ? '#ffffff20' : '#00000010'} />
          </pattern>
        </defs>
        
        {/* Background with subtle pattern */}
        <rect width="700" height="400" fill="url(#gridPattern)" rx="10" ry="10" opacity="0.5" />
        
        {/* Center circle pulse animation */}
        <motion.circle 
          cx="350" cy="200" 
          r="45" 
          fill="transparent"
          stroke={colors.highlight}
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0, 0.3, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Central node */}
        <motion.circle 
          cx="350" cy="200"
          r="40" 
          fill={`url(#${centerGradientId})`}
          stroke="#ffffff"
          strokeWidth="2"
          filter={`url(#${glowFilterId})`}
          initial={{ r: 0 }}
          animate={isVisible ? { r: 40 } : { r: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          onMouseEnter={() => setHoveredCategory(null)}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Central icon */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <motion.text
            x="350" y="190"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="16"
            fontWeight="bold"
            filter={`url(#${glowFilterId})`}
          >
            Full-Stack
          </motion.text>
          <motion.text
            x="350" y="210"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="normal"
          >
            Developer
          </motion.text>
        </motion.g>
        
        {/* Connection lines and nodes */}
        {skillCategories.map((category, index) => {
          // Calculate position based on index (evenly distribute around circle)
          const angle = ((index * 120) - 60) * (Math.PI / 180);
          const distance = 150;
          const x = 350 + distance * Math.cos(angle);
          const y = 200 + distance * Math.sin(angle);
          
          const isHovered = hoveredCategory === category.name;
          
          return (
            <g key={category.name}>
              {/* Connection line */}
              <motion.line
                x1="350" y1="200"
                x2={x} y2={y}
                stroke={`url(#${lineGradientId})`}
                strokeWidth={isHovered ? 3 : 2}
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { 
                  pathLength: 1,
                  strokeWidth: isHovered ? 3 : 2
                } : { 
                  pathLength: 0,
                  strokeWidth: 2 
                }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.6 + index * 0.2,
                  strokeWidth: { duration: 0.2 }
                }}
              />
              
              {/* Category node pulse (active when hovered) */}
              {isHovered && (
                <motion.circle
                  cx={x} cy={y}
                  r="35"
                  fill="transparent"
                  stroke={colors.highlight}
                  strokeWidth="2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8], 
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              )}
              
              {/* Category node */}
              <motion.circle
                cx={x} cy={y}
                r="30"
                fill={isHovered ? colors.highlight : colors.cardBackground}
                stroke={isHovered ? colors.highlight : `url(#${lineGradientId})`}
                strokeWidth="2"
                filter={isHovered ? `url(#${glowFilterId})` : ''}
                initial={{ scale: 0 }}
                animate={isVisible ? { 
                  scale: 1,
                  fill: isHovered ? colors.highlight : colors.cardBackground
                } : { 
                  scale: 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + index * 0.2,
                  fill: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Category label */}
              <motion.text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered ? "#ffffff" : colors.text}
                fontSize="14"
                fontWeight="bold"
                filter={isHovered ? `url(#${glowFilterId})` : ''}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.2 }}
              >
                {category.name}
              </motion.text>
              
              {/* Skill dots and connections */}
              {category.skills.map((skill, skillIndex) => {
                const skillAngle = angle + ((skillIndex - 2) * 15) * (Math.PI / 180);
                const skillDistance = 220;
                const sx = 350 + skillDistance * Math.cos(skillAngle);
                const sy = 200 + skillDistance * Math.sin(skillAngle);
                
                const isSkillHovered = hoveredSkill === skill.name || hoveredCategory === category.name;
                
                return (
                  <g key={skill.name}>
                    {/* Skill connection line */}
                    <motion.line
                      x1={x} y1={y}
                      x2={sx} y2={sy}
                      stroke={isSkillHovered ? colors.highlight : colors.mutedText}
                      strokeWidth={isSkillHovered ? 2 : 1}
                      strokeDasharray={isSkillHovered ? "3,3" : ""}
                      initial={{ pathLength: 0, opacity: 0.3 }}
                      animate={isVisible ? { 
                        pathLength: 1, 
                        opacity: isSkillHovered ? 0.9 : 0.5,
                        stroke: isSkillHovered ? colors.highlight : colors.mutedText
                      } : { 
                        pathLength: 0, 
                        opacity: 0.3 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1 + index * 0.2 + skillIndex * 0.05,
                        stroke: { duration: 0.3 },
                        opacity: { duration: 0.3 }
                      }}
                    />
                    
                    {/* Skill node background for better text visibility */}
                    <motion.circle
                      cx={sx} cy={sy}
                      r={isSkillHovered ? 30 : 18}
                      fill={isSkillHovered ? colors.cardBackground : "transparent"}
                      stroke={isSkillHovered ? colors.highlight : "transparent"}
                      strokeWidth="1"
                      initial={{ scale: 0 }}
                      animate={isVisible ? { 
                        scale: 1,
                        r: isSkillHovered ? 30 : 18
                      } : { 
                        scale: 0 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.1 + index * 0.2 + skillIndex * 0.05,
                        r: { duration: 0.3 }
                      }}
                    />
                    
                    {/* Skill node */}
                    <motion.circle
                      cx={sx} cy={sy}
                      r="4"
                      fill={isSkillHovered ? colors.highlight : colors.primary}
                      stroke={isSkillHovered ? "#ffffff" : "transparent"}
                      strokeWidth="2"
                      filter={isSkillHovered ? `url(#${glowFilterId})` : ''}
                      initial={{ scale: 0 }}
                      animate={isVisible ? { 
                        scale: isSkillHovered ? 2 : 1, 
                        opacity: [0.7, 1, 0.7],
                        fill: isSkillHovered ? colors.highlight : colors.primary
                      } : { 
                        scale: 0 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: 1.2 + index * 0.2 + skillIndex * 0.05,
                        scale: { 
                          duration: 0.3,
                          repeat: 0 
                        },
                        fill: { duration: 0.3 }
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    
                    {/* Skill label (only visible when hovered) */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={isVisible && isSkillHovered ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.text
                        x={sx} y={sy - 5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={colors.text}
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {skill.name}
                      </motion.text>
                      <motion.text
                        x={sx} y={sy + 10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={colors.mutedText}
                        fontSize="9"
                      >
                        {['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                      </motion.text>
                      
                      {/* Star rating visualization */}
                      <g>
                        {[...Array(5)].map((_, i) => (
                          <motion.path
                            key={i}
                            d="M12 2 L14.5 9.5 L22 9.5 L16 14 L18.5 21 L12 17 L5.5 21 L8 14 L2 9.5 L9.5 9.5 Z"
                            transform={`translate(${sx - 30 + i * 15}, ${sy + 22}) scale(0.6)`}
                            fill={i < skill.level ? colors.highlight : colors.mutedText + '40'}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                          />
                        ))}
                      </g>
                    </motion.g>
                  </g>
                );
              })}
            </g>
          );
        })}
        
        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <rect x="30" y="350" width="120" height="30" rx="5" fill={colors.cardBackground} opacity="0.8" />
          <text x="90" y="370" textAnchor="middle" fill={colors.text} fontSize="12" fontWeight="bold">
            Hover for details
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default SkillsVisualization;