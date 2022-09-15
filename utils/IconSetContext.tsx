import React, { createContext, useReducer } from 'react'
import { iconSetReducer, iconSetState } from './IconSet.store'
import { iconSetStateType } from '../interface'

export const IconSetContext = createContext<{
  iconState: iconSetStateType
  iconDispatch: React.Dispatch<any>
}>({ iconState: iconSetState, iconDispatch: () => null })

interface IconSetWrapperProps {
  children: React.ReactNode
}

export const IconSetWrapper: React.FC<IconSetWrapperProps> = ({ children }) => {
  const [iconState, iconDispatch] = useReducer(iconSetReducer, iconSetState)
  return (
    <IconSetContext.Provider value={{ iconState, iconDispatch }}>
      {children}
    </IconSetContext.Provider>
  )
}
