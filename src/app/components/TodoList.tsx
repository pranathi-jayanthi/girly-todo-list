'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        ✨ My Cute Todo List ✨
      </motion.h1>

      <form onSubmit={addTodo} className="mb-8 relative">
        <motion.div
          className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
            isInputFocused
              ? 'bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 opacity-50'
              : 'opacity-0'
          }`}
          layoutId="input-background"
        />
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Add a new task..."
          className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-inner
            border-2 border-transparent focus:border-pink-200 outline-none
            text-gray-700 placeholder-gray-400 transition-all duration-300 relative z-10"
        />
        <motion.button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20
            px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400
            text-white rounded-xl shadow-md hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!newTodo.trim()}
        >
          Add ✨
        </motion.button>
      </form>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8 text-gray-500 italic"
            >
              ✨ Your todo list is empty. Add some tasks! ✨
            </motion.div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {todos.length > 0 && (
        <motion.div
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {todos.filter(t => t.completed).length} of {todos.length} tasks completed
        </motion.div>
      )}
    </motion.div>
  );
}; 