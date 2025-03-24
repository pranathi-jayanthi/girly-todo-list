'use client';

import { TodoList } from './components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <TodoList />
      </div>
    </main>
  );
}
