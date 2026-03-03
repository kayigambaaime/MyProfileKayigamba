/**
 * Generate animated SVG path for a wave
 * @param width - Width of the SVG
 * @param height - Height of the wave
 * @param segments - Number of segments (more = smoother)
 * @returns SVG path string
 */
export const generateWavePath = (width: number, height: number, segments: number = 5): string => {
    const segmentWidth = width / segments;
    let path = `M 0 ${height}`;
    
    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      const y = height - Math.sin(i * Math.PI) * height / 2;
      path += ` L ${x} ${y}`;
    }
    
    path += ` L ${width} ${height} Z`;
    return path;
  };
  
  /**
   * Generate random particles for background effect
   * @param count - Number of particles
   * @param width - Container width
   * @param height - Container height
   * @returns Array of particle objects
   */
  export const generateParticles = (count: number, width: number, height: number) => {
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
    }));
  };
  
  /**
   * Custom easing functions for animations
   */
  export const easings = {
    // Bouncy spring effect
    springOut: [0.22, 1, 0.36, 1],
    // Slow start, fast middle, slow end
    smoothInOut: [0.4, 0, 0.2, 1],
    // Fast acceleration
    fastAccelerate: [0.4, 0, 1, 1],
    // Slow deceleration
    slowDecelerate: [0, 0, 0.2, 1],
  };
  
  /**
   * Convert skill level (1-5) to descriptive text
   * @param level - Skill level (1-5)
   * @returns Descriptive text
   */
  export const skillLevelToText = (level: number): string => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Elementary';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return '';
    }
  };
  
  /**
   * Check if code is running in browser environment
   * (useful for avoiding hydration errors with animations)
   */
  export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };
  
  /**
   * Generate a SVG gradient definition
   * @param id - Gradient ID
   * @param color1 - First color
   * @param color2 - Second color
   * @param direction - Direction ('horizontal', 'vertical', 'diagonal')
   */
  export const generateGradientDef = (
    id: string,
    color1: string,
    color2: string,
    direction: 'horizontal' | 'vertical' | 'diagonal' = 'horizontal'
  ) => {
    let x1, y1, x2, y2;
    
    switch (direction) {
      case 'vertical':
        x1 = '0%'; y1 = '0%'; x2 = '0%'; y2 = '100%';
        break;
      case 'diagonal':
        x1 = '0%'; y1 = '0%'; x2 = '100%'; y2 = '100%';
        break;
      case 'horizontal':
      default:
        x1 = '0%'; y1 = '0%'; x2 = '100%'; y2 = '0%';
        break;
    }
    
    return `
      <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
        <stop offset="0%" stopColor="${color1}" />
        <stop offset="100%" stopColor="${color2}" />
      </linearGradient>
    `;
  };