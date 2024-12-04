import React from 'react';
import { motion } from 'framer-motion';

function FloatingShapes({ color, size, top, left, delay }) {
  return (
    <div>
      <motion.div
        className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
        style={{ top: top, left: left }}
        animate={{
          y: ["0%", "100%", "0%"],
          x: ["0%", "100%", "0"],
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          delay,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default FloatingShapes;
