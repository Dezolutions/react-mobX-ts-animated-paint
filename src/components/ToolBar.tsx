import React from 'react'
import { useStore } from "../store/hooks";
import Brush from '../tools/Brush';
import Eraser from '../tools/Eraser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSave,faPaintBrush, faEraser,faTrash,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import '../sass/toolbar.scss'


const ToolBar :React.FC  = () => {
  const toolState = useStore("toolState");
  const canvasState = useStore("canvasState");
  
  const changeColor = (e: React.ChangeEvent<HTMLInputElement>):void => {
    toolState.setToolColor(e.target.value)
    sessionStorage.setItem('color', JSON.stringify(toolState.getColor()))
  }
  const onSelectBrush = () => {
    if(toolState.getTool() === null) {
      toolState.setTool(new Brush(canvasState.canvas))
    }  
    toolState.setToolColor(toolState.getColor())
  }

  const chooseEraser = ():void => {
    let canvas  = canvasState.canvas 
    let ctx :CanvasRenderingContext2D = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    // toolState.setTool(new Eraser(canvasState.canvas))
  }

  const changeWidth = (e: React.ChangeEvent<HTMLInputElement>):void => {
    toolState.setLineWidth(e.target.value)
  }

  const onSave = ():void => {
    sessionStorage.setItem('coords',JSON.stringify(toolState.getCoords()))
  }
  const onDelete = ():void => {
    let canvas  = canvasState.canvas 
    let ctx :CanvasRenderingContext2D = canvas.getContext('2d')
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.fillStyle = toolState.getColor();
    ctx.strokeStyle = toolState.getColor();
    sessionStorage.removeItem('coords');
    toolState.deleteCoords();
  }
  const onReplay = () => {
    let coords : any[] = JSON.parse(String(sessionStorage.getItem('coords')))
    let canvas  = canvasState.canvas 
    let ctx :CanvasRenderingContext2D = canvas.getContext('2d')
    if(coords){
      ctx.clearRect(0,0, canvas.width, canvas.height)
      ctx.beginPath();
      
      let timer = setInterval(() => {
        if(!coords.length){
          clearInterval(timer);
          ctx.beginPath();
          return;
        }
        // if((/^"#/g).test(coords[0])){
        //   toolState.setToolColor(coords[0])
        //   sessionStorage.setItem('color',toolState.getColor());
        //   ctx.fillStyle = String(sessionStorage.getItem('color'));
        //   ctx.strokeStyle = String(sessionStorage.getItem('color'));
        //   console.log(String(sessionStorage.getItem('color')))
          
        // }
        let crd = coords.shift();

        let a = {
          clientX: crd['0'],
          clientY: crd['1']
        }

        ctx.lineTo(a.clientX,a.clientY);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(a.clientX,a.clientY,ctx.lineWidth /2,0,Math.PI * 2);
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(a.clientX,a.clientY);
      
    
      },10)
    }
    return false;
    
  }

  return (
    <div className="button-block">
      <button className="brush" onClick={onSelectBrush}><FontAwesomeIcon icon={faPaintBrush}/></button>
      <button className="eraser"  onClick={chooseEraser}><FontAwesomeIcon icon={faEraser}/></button>
      <input className="brush-width" onChange={changeWidth} defaultValue={1} min={1} max={50} type="range"/>
      <input className="сolor" onChange={e => changeColor(e)} type="color"/>
      <button className="replay" onClick={onReplay} ><FontAwesomeIcon icon={faPlay}/></button>
      <button className="save" onClick={onSave} ><FontAwesomeIcon icon={faSave}/></button>
      <button className="back" onClick={() => canvasState.back()}><FontAwesomeIcon icon={faChevronLeft}/></button>
      <button className="forward" onClick={() => canvasState.forward()}><FontAwesomeIcon icon={faChevronRight}/></button>
      <button className="delete" onClick={onDelete}><FontAwesomeIcon icon={faTrash}/></button>
    </div>
  )
}

export default ToolBar
