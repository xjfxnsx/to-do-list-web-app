import React from "react";

interface CardProps {
    title: string;
    description: string;
    deadline: string;
}

const Card: React.FC<CardProps> = ({ title, description, deadline }) => {
    return (
        <div style = {
            {border: '1px solid gray',
            padding: '10px',
            margin: '10px 0',
            backgroundColor: '#f9f9f9'}
            }>
                <h3>{title}</h3>
                <p>{description}</p>
                <small>Deadline: {deadline}</small>
        </div>
    );
};

export default Card;