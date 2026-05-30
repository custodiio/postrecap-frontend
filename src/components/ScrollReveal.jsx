import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 }
  }
};

export default function ScrollReveal({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 0.7, 
  className = '',
  style = {}
}) {
  const anim = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
