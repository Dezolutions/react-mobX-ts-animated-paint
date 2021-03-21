import React from 'react';
import Canvas from './components/Canvas';
import ToolBar from './components/ToolBar';

const  App :React.FC = () => {
  
  return (
    <div className="app">
      <ToolBar/>
      <Canvas/>
    </div>
  );
}

export default App;
