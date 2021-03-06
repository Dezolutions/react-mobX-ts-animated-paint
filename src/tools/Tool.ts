export default class Tool {
  canvas :any
  ctx: any
  constructor(canvas:any){
    this.canvas  = canvas;
    this.ctx = canvas.getContext('2d');
    this.destroyEvents()

  }
  set fillColor(color:any){
    this.ctx.fillStyle = color
  }
  set strokeColor(color:any){
    this.ctx.strokeStyle = color;
  }
  set lineWidth(width:any){
    this.ctx.lineWidth = width;
  }
  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.ontouchstart = null
    this.canvas.ontouchmove = null
    this.canvas.ontouchend = null
    
  }
  
}