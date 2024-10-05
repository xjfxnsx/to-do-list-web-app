import React, { useState } from 'react';
import Column from './components/Column';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn TypeScript',
      description: 'Pass tutorial and documentation.',
      deadline: '2024-10-10'
    },
    {
      id: 2,
      title: 'Create To-Do App',
      description: 'Create project with columns and cards.',
      deadline: '2024-10-15'
    },
  ]);

  return (
    <div style={
      {
        display: 'flex',
        justifyContent: 'space-around'
      }
    }>
      <Column title='Task' tasks={tasks}/>
      <Column title='In Process' tasks={[]}/>
      <Column title='Done' tasks={[]}/>
    </div>
  );
};

export default App;