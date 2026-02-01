import React, { useState } from 'react';
import QuoteCard from './components/QuoteCard';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ConnectivityStatus from './components/ConnectivityStatus';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    // Increment to trigger a re-fetch in TaskList
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          InspireTask
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Focus on what matters.</p>
      </header>

      <main>
        <QuoteCard />
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refreshTrigger={refreshKey} />
      </main>

      <ConnectivityStatus />
    </div>
  );
}

export default App;
