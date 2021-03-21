import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from "../store/hooks";
import '../sass/canvas.scss'
import Brush from '../tools/Brush';

const Canvas : React.FC = observer(() => {
  const canvasRef  = React.useRef<HTMLCanvasElement>(null);
  const canvasState = useStore("canvasState");
  const toolState = useStore("toolState");
  toolState.setColor('#000');
  
  React.useEffect(():void => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
    sessionStorage.setItem('color', JSON.stringify(toolState.getColor()))
    console.log(canvasState.backList)
  },[])

  const mouseDownHandler = () => {
    canvasState.pushToBack(canvasRef.current?.toDataURL())
  }
  return (
    <div className="canvas">
      <canvas 
        ref={canvasRef} 
        width={window.innerWidth} 
        height={window.innerHeight-45}
        onMouseDown={mouseDownHandler}
      ></canvas>
      
    </div>
  )
});

export default Canvas;
