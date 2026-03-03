"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/app/providers';

interface AnimatedCountdownProps {
  onComplete?: () => void;
  startValue?: number;
  autoStart?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedCountdown = ({ 
  onComplete, 
  startValue = 3, 
  autoStart = false,
  size = 'lg'
}: AnimatedCountdownProps) => {
  const [count, setCount] = useState(startValue);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };
  
  const textSizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  // Set primary colors based on theme
  const primaryColor = theme === 'dark' ? '#8c61ff' : '#FD3359';
  const secondaryColor = theme === 'dark' ? '#536dfe' : '#F4D302';
  const tertiaryColor = theme === 'dark' ? '#2979ff' : '#21BDFF';
  
  useEffect(() => {
    if (!isRunning) return;
    
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setIsComplete(true);
          setIsRunning(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isRunning, onComplete]);
  
  const startCountdown = () => {
    setCount(startValue);
    setIsComplete(false);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center rounded-full`}
        initial={{ borderRadius: '20px' }}
        animate={{ 
          borderRadius: isRunning ? ['20px', '50%', '0', '50%', '20px'] : '20px',
          rotate: isRunning ? [0, 360, 720, 1080, 1440] : 0,
        }}
        transition={{ 
          duration: isRunning ? 4 : 0.3,
          times: [0.15, 0.43, 0.65, 0.9, 1],
          ease: "easeInOut"
        }}
      >
        {/* Colored blocks container */}
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-inherit"
          animate={{ 
            width: isRunning ? ['100%', '140px', '140px', '140px', '100%'] : '100%',
            marginLeft: isRunning ? ['0px', '-70px', '-70px', '-70px', '0px'] : '0px'
          }}
          transition={{ 
            duration: 4,
            times: [0.15, 0.25, 0.9, 0.9, 1],
            ease: "easeInOut"
          }}
        >
          {/* Rotating blocks */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: isRunning ? 360 : 0 }}
            transition={{ duration: 1.3, repeat: isRunning ? Infinity : 0, ease: "linear" }}
          >
            {/* Block 1 */}
            <div 
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] origin-top-left"
              style={{ 
                transform: 'rotate(0deg) skewX(210deg)',
                backgroundColor: primaryColor
              }}
            />
            
            {/* Block 2 */}
            <div 
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] origin-top-left"
              style={{ 
                transform: 'rotate(120deg) skewX(210deg)',
                backgroundColor: secondaryColor
              }}
            />
            
            {/* Block 3 */}
            <div 
              className="absolute top-1/2 left-1/2 w-[300%] h-[300%] origin-top-left"
              style={{ 
                transform: 'rotate(240deg) skewX(210deg)',
                backgroundColor: tertiaryColor
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Number display */}
        <AnimatePresence mode="wait">
          {isRunning && (
            <motion.div
              key="countText"
              className={`z-10 ${textSizes[size]} font-bold text-white`}
              initial={{ opacity: 1 }}
              animate={{ opacity: isRunning ? [1, 0, 0, 0, 1] : 1 }}
              transition={{ 
                duration: 4,
                times: [0.15, 0.2, 0.96, 0.96, 1],
                ease: "easeInOut"
              }}
              exit={{ opacity: 0 }}
            >
              {count}
            </motion.div>
          )}
          
          {!isRunning && !isComplete && (
            <motion.div
              key="readyText"
              className={`z-10 ${textSizes[size]} font-bold text-white`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Ready
            </motion.div>
          )}
          
          {isComplete && (
            <motion.div
              key="goText"
              className={`z-10 ${textSizes[size]} font-bold text-white`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              GO!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {!isRunning && (
        <motion.button
          onClick={startCountdown}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isComplete ? 'Restart' : 'Start'}
        </motion.button>
      )}
    </div>
  );
};

export default AnimatedCountdown;