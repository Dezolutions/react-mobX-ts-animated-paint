import { action, makeAutoObservable, observable } from "mobx"

class CanvasState {
  @observable public canvas :any = null
  @observable public backList : any[] = []
  @observable public forwardList : any[] = []
  constructor() {
    makeAutoObservable(this)
  }

  @action setCanvas = (canvas:any) => {
    this.canvas = canvas;
  }

  @action pushToBack =(data:string | undefined) => {
    this.backList.push(data)
    

  }
  @action pushToFor =(data:string | undefined) => {
    this.forwardList.push(data)
  }

  @action back() {
    let ctx = this.canvas.getContext('2d')
    if(this.backList.length > 0){
      let dataUrl = this.backList.pop()
      this.forwardList.push(this.canvas.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        ctx.drawImage(img,0,0,this.canvas.width, this.canvas.height)
      }
    }
    else{
      ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }
  }
  @action forward() {
    let ctx = this.canvas.getContext('2d')
    if(this.forwardList.length > 0){
      let dataUrl = this.forwardList.pop()
      this.backList.push(this.canvas.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
        ctx.drawImage(img,0,0,this.canvas.width, this.canvas.height)
      }
    }
  }
}

export default CanvasState;