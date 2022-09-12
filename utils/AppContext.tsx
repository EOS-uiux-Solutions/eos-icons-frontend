import React, { createContext, useReducer } from 'react'
import { iconsReducer, eosIconsState } from './EosIcons.store'
import { eosIconsStateType } from '../interface'

export const AppContext = createContext<{
  state: eosIconsStateType
  dispatch: React.Dispatch<any>
}>({ state: eosIconsState, dispatch: () => null })

interface AppWrapperProps {
  children: React.ReactNode
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [state, dispatch] = useReducer(iconsReducer, eosIconsState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
