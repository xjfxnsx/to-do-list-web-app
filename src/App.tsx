import React, { useState } from 'react';
import Column from './components/Column';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './App.css';

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination || 
      (source.droppableId === destination.droppableId &&
    source.index === destination.index)) {
      return;
    }

    const updatedTasks = Array.from(tasks);

    const [movedTask] = updatedTasks.splice(source.index, 1);

    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={
        {
          display: 'flex',
          justifyContent: 'space-around'
        }
      }>
        <Column title='Task' tasks={tasks} />
        <Column title='In Process' tasks={[]} />
        <Column title='Done' tasks={[]} />
      </div>
    </DragDropContext>
  );
};

export default App;