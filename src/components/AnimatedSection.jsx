
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 50 
}) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: { y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        x: 0 
      } : { 
        opacity: 0, 
        ...directions[direction] 
      }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
