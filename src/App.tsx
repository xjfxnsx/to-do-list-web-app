import React, { useEffect, useState } from 'react';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import { title } from 'process';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
}

const App: React.FC = () => {
  const [tasksTodo, setTasksTodo] = useState<Task[]>(() => {

    const savedTasks = localStorage.getItem('tasksTodo');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tasksInProgress, setTasksInProgress] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasksInProgress');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tasksDone, setTasksDone] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasksDone');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
  })

  useEffect(() => {
    localStorage.setItem('tasksTodo', JSON.stringify(tasksTodo));
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone));
  }, [tasksTodo, tasksInProgress, tasksDone]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      deadline: newTask.deadline,
    };

    setTasksTodo([...tasksTodo, task]);
    setNewTask({ title: '', description: '', deadline: ''});
  };

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
    if (column === 'Task') {
      setTasksTodo(tasksTodo.filter(task => task.id !== taskId));
    } else if (column === 'In Progress') {
      setTasksInProgress(tasksInProgress.filter(task => task.id !== taskId));
    } else if (column === 'Done') {
      setTasksDone(tasksDone.filter(task => task.id !== taskId));
    }
  };

  return (

    <div>

      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          required
        />
        <input
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={
        {
          display: 'flex',
          justifyContent: 'space-around'
        }
      }>
        <Column title="Task" tasks={tasksTodo} onDeleteTask={(id) => handleDeleteTask(id, 'Task')} />
        <Column title="In Progress" tasks={tasksInProgress} onDeleteTask={(id) => handleDeleteTask(id, 'In Progress')} />
        <Column title="Done" tasks={tasksDone} onDeleteTask={(id) => handleDeleteTask(id, 'Done')} />
      </div>
    </DragDropContext>
    </div>
  );
};

export default App;