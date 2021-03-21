import Brush from './Brush'

export default class Eraser extends Brush {
  
  constructor(canvas:any){
    super(canvas);
    
  }


  draw(x:number, y:number) {
    this.ctx.strokeStyle = "white"
    this.ctx.fillStyle = "white"
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}