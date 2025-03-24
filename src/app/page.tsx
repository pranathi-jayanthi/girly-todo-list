'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaMagic } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 flex items-center justify-center gap-3">
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaHeart className="text-pink-500 text-3xl" />
            </motion.span>
            My Cute Todo List
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaHeart className="text-pink-500 text-3xl" />
            </motion.span>
          </h1>
          <p className="text-lg text-pink-400 flex items-center justify-center gap-2">
            <FaWandMagicSparkles className="animate-spin-slow text-purple-400" />
            <span className="gradient-text font-medium">Stay organized in style</span>
            <FaMagic className="animate-bounce text-purple-400" />
          </p>
        </motion.div>
        
        <TodoList />
      </div>
    </div>
  );
}
