import { action, makeAutoObservable, observable } from "mobx"

class ToolState {
  @observable private tool : any = null
  @observable private color : string = ''
  constructor(){
    makeAutoObservable(this)
  }

  @action getCoords(){
    return this.tool.coords;
  }
  @action deleteCoords(){
    this.tool.coords = []
  }
  @action getColor(){
    return this.color;

  }
  @action setColor(color:string){
    this.color = color;
  }
  @action setToolColor(color:string){
    this.tool.strokeColor = color
    this.tool.fillColor = color
    this.color = color
  }

  @action getTool(){
    return this.tool;
  }
  
  @action setTool(tool:any){
    this.tool = tool
  }

  @action setLineWidth(width:string){
    this.tool.lineWidth = width
  }
}

export default ToolState;