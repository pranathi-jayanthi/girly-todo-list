'use client';
import { motion } from 'framer-motion';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          duration: 1.5,
          bounce: 0.4
        }}
      >
        {/* Logo Container */}
        <motion.div className="relative w-32 h-32 flex items-center justify-center">
          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-pink-400 rounded-full"
              initial={{ 
                opacity: 0,
                x: 0,
                y: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos(i * Math.PI / 4) * 60,
                y: Math.sin(i * Math.PI / 4) * 60,
                scale: [1, 1.5, 0]
              }}
              transition={{
                duration: 2,
                delay: 0.8,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Main Logo */}
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full shadow-xl flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.span
              className="text-4xl text-white font-cursive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              ✨
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="absolute top-full mt-8 text-center w-full text-2xl font-cursive bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Cute Todo List
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}; 