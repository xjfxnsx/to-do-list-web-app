import React, { useEffect, useState } from 'react';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const App: React.FC = () => {
  const [tasksTodo, setTasksTodo] = useState<Task[]>(() => {

    const savedTasks = localStorage.getItem('tasksTodo');
    return savedTasks ? JSON.parse(savedTasks) : [

      {
        id: 1,
        title: 'Learn TypeScript',
        description: 'Pass tutorials and documentation.',
        deadline: '2024-10-10'
      },
      {
        id: 2,
        title: 'Create To-Do App',
        description: 'Create project with columns and cards.',
        deadline: '2024-10-15'
      },
    ];
  });

  const [tasksInProgress, setTasksInProgress] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasksInProgress');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tasksDone, setTasksDone] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasksDone');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasksTodo', JSON.stringify(tasksTodo));
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
  }, [tasksTodo, tasksInProgress, tasksDone]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)) {
      return;
    }

    let sourceTasks =
      source.droppableId === 'Task' ?
        tasksTodo : source.droppableId === 'In Progress' ?
          tasksInProgress : tasksDone;

    let destinationTasks =
      destination.droppableId === 'Task' ?
        tasksTodo : destination.droppableId === 'In Progress' ?
          tasksInProgress : tasksDone;

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, movedTask);

    if (source.droppableId === 'Task') setTasksTodo([...sourceTasks]);
    if (source.droppableId === 'In Progress') setTasksInProgress([...sourceTasks]);
    if (source.droppableId === 'Done') setTasksDone([...sourceTasks]);

    if (destination.droppableId === 'Task') setTasksTodo([...destinationTasks]);
    if (destination.droppableId === 'In Progress') setTasksInProgress([...destinationTasks]);
    if (destination.droppableId === 'Done') setTasksDone([...destinationTasks]);
  }

  const handleDeleteTask = (taskId: number, column: string) => {
    if (column === 'Задача') {
      setTasksTodo(tasksTodo.filter(task => task.id !== taskId));
    } else if (column === 'В процессе') {
      setTasksInProgress(tasksInProgress.filter(task => task.id !== taskId));
    } else if (column === 'Готово') {
      setTasksDone(tasksDone.filter(task => task.id !== taskId));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={
        {
          display: 'flex',
          justifyContent: 'space-around'
        }
      }>
        <Column title="Задача" tasks={tasksTodo} onDeleteTask={(id) => handleDeleteTask(id, 'Task')} />
        <Column title="В процессе" tasks={tasksInProgress} onDeleteTask={(id) => handleDeleteTask(id, 'In Progress')} />
        <Column title="Готово" tasks={tasksDone} onDeleteTask={(id) => handleDeleteTask(id, 'Done')} />
      </div>
    </DragDropContext>
  );
};

export default App;