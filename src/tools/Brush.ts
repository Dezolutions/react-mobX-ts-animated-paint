import Tool from "./Tool";

export default class Brush extends Tool {
  inMouseDown : boolean = false;
  coords :any[] = [];
  color : string = '';
  
  constructor(canvas:any) {
    super(canvas);
    this.listen();
  }
  
  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.addEventListener('touchstart',  this.touchStartHandler.bind(this)); 
    this.canvas.addEventListener('touchmove',  this.touchMoveHandler.bind(this));
    this.canvas.addEventListener('touchend',  this.touchEndHandler.bind(this));
  }
  //touch функции для телефона
  touchMoveHandler(e:any){
    e.preventDefault()
    if(this.inMouseDown) {
      this.draw(e.touches[0].clientX - e.target.offsetLeft , e.touches[0].clientY - e.target.offsetTop)
    }
  }
  touchStartHandler(e: any) {
    this.inMouseDown = true
    this.ctx.beginPath()
    this.coords.push(String(sessionStorage.getItem('color')))
    this.draw(e.touches[0].clientX - e.target.offsetLeft, e.touches[0].clientY - e.target.offsetTop)
  }
  touchEndHandler(e:any) {
    e.preventDefault()
    this.inMouseDown = false;
    this.ctx.beginPath();
    this.coords.push('touchend')
  }

  //mouseEvent функции для десктопа
  mouseDownHandler(e: any) {
    this.inMouseDown = true
    this.ctx.beginPath()
    this.coords.push(String(sessionStorage.getItem('color')))
    this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    
    
  }
  mouseMoveHandler(e:any) {
    if (this.inMouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

  }
  mouseUpHandler(e:any) {
    e.preventDefault()
    this.inMouseDown = false;
    this.ctx.beginPath();
    this.coords.push('mouseup')
  }
  //функция рисования
  draw(x:number, y:number) {
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
    this.ctx.beginPath();

    this.ctx.arc(x, y, this.ctx.lineWidth / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.beginPath();

    this.ctx.moveTo(x, y);
    this.coords.push([x,y])  
  }
}