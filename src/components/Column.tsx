import React from "react";

interface ColumnProps {
    title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
    return (
        <div style = {
            { border: '1px solid black',
            width: '30%',
            padding: '10px',
            minHeight: '400px' }
            }>
            <h2>{title}</h2>
            {/* Here will be tasks cards */}
        </div>
    );
};

export default Column;