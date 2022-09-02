import React, { createContext, useReducer } from 'react'
import { iconSetReducer, iconSetState } from './IconSet.store.js'

export const IconSetContext = createContext()

export const IconSetWrapper = ({ children }) => {
  const [iconState, iconDispatch] = useReducer(iconSetReducer, iconSetState)
  return (
    <IconSetContext.Provider value={{ iconState, iconDispatch }}>
      {children}
    </IconSetContext.Provider>
  )
}
