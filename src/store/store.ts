import React from 'react';
import CanvasState from './canvasState'
import ToolState from './toolState'

export const stores = Object.freeze({
  canvasState : new CanvasState(),
  toolState: new ToolState()

})

export const storesContext = React.createContext(stores);
export const StoresProvider = storesContext.Provider;