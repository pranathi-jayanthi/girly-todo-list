import { useState } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../sounds';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center p-4 bg-white rounded-lg shadow-sm mb-3 transform transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => {
        setIsHovered(true);
        sounds.hover.play();
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center
          ${completed ? 'bg-pink-400 border-pink-400' : 'border-gray-300'}`}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          onToggle(id);
          sounds.complete.play();
        }}
      >
        {completed && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 text-white"
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

      <span className={`flex-grow ${completed ? 'line-through text-gray-400' : ''}`}>
        {text}
      </span>

      <motion.button
        className={`ml-4 text-gray-400 hover:text-red-500 transition-colors
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          onDelete(id);
          sounds.delete.play();
        }}
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}; 