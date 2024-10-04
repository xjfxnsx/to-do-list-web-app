import React from 'react';
import Column from './components/Column';

const App: React.FC = () => {
  return (
    <div style = {
      {display: 'flex',
        justifyContent: 'space-around'
      }
    }>
      <Column title='Task' />
      <Column title='In Process' />
      <Column title='Done' />
    </div>
  );
};

export default App;