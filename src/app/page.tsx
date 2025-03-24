'use client';

import { TodoList } from './components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <TodoList />
    </main>
  );
}
