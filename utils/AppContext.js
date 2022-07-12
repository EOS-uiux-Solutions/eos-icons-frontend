import React, { createContext, useReducer } from 'react'
import { iconsReducer, eosIconsState } from '../utils/EosIcons.store.js'

export const AppContext = createContext()

export const AppWrapper = ({ children }) => {
	const [state, dispatch] = useReducer(iconsReducer, eosIconsState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}



