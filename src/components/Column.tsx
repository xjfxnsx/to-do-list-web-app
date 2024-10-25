import React from "react";
import Card from "./Card";
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
}

interface ColumnProps {
    title: string;
    tasks: Task[];
    onDeleteTask: (taskId: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, onDeleteTask }) => {
    return (
        <div style={{ margin: '0 10px' }}>
      <h2>{title}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: '#f0f0f0', padding: 10, minHeight: 300 }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      marginBottom: 10,
                      ...provided.draggableProps.style,
                    }}
                  >
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Deadline: {task.deadline}</p>
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
    );
};

export default Column;