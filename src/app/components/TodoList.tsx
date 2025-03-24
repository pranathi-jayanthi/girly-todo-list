'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([...todos, {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
        onSubmit={addTodo}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="✨ Add a new task..."
            className="flex-1 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white/90 placeholder-pink-300 text-gray-700"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-200 flex items-center gap-2 shadow-md"
          >
            <FaHeart className="text-sm" />
            Add
          </motion.button>
        </div>
      </motion.form>

      <AnimatePresence mode="popLayout">
        <motion.div className="space-y-3">
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.02 }}
              layout
              className={`p-4 rounded-xl shadow-sm border-2 transition-all duration-300 ${
                todo.completed 
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100' 
                  : 'bg-white border-pink-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    todo.completed 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 border-transparent' 
                      : 'border-pink-300 hover:border-pink-400'
                  }`}
                >
                  {todo.completed && <FaHeart className="text-white text-sm" />}
                </motion.button>
                <span className={`flex-1 transition-all duration-300 ${
                  todo.completed 
                    ? 'line-through text-pink-300' 
                    : 'text-gray-700'
                }`}>
                  {todo.text}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTodo(todo.id)}
                  className="text-pink-400 hover:text-pink-600 transition-colors duration-200 text-xl font-light"
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 