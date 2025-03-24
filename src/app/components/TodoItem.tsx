'use client';
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleComplete = async () => {
    if (!completed) {
      // Trigger completion animation
      await controls.start({
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.4 }
      });
    }
    onToggle(id);
  };

  return (
    <motion.div
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-purple-100/20" />
        {completed && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-100/20 to-blue-100/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      <div className="relative flex items-center p-4">
        <motion.button
          animate={controls}
          className={`w-8 h-8 rounded-full border-3 mr-4 flex items-center justify-center transition-all duration-300 group-hover:shadow-md
            ${completed 
              ? 'bg-gradient-to-r from-pink-400 to-purple-400 border-transparent shadow-inner' 
              : 'border-pink-300 hover:border-pink-400 group-hover:scale-110 hover:shadow-pink-200/50'
            }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleComplete}
        >
          {completed && (
            <motion.svg
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-5 h-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </motion.button>

        <motion.span 
          className={`flex-grow text-lg transition-all duration-300 ${
            completed 
              ? 'line-through text-gray-400 italic' 
              : 'text-gray-700'
          }`}
          animate={{ opacity: completed ? 0.6 : 1 }}
        >
          {text}
        </motion.span>

        <motion.button
          className={`ml-4 text-gray-400 hover:text-red-400 transition-all duration-300
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          onClick={() => onDelete(id)}
        >
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        {/* Sparkles on hover */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-300 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}; 