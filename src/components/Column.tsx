import React from "react";
import Card from "./Card";

interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
}

interface ColumnProps {
    title: string;
    tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
    return (
        <div style = {
            { border: '1px solid black',
            width: '30%',
            padding: '10px',
            minHeight: '400px' }
            }>
            <h2>{title}</h2>
            {tasks.map(task => (
                <Card 
                key={task.id}
                title={task.title}
                description={task.description}
                deadline={task.deadline}
                />
            ))}
        </div>
    );
};

export default Column;