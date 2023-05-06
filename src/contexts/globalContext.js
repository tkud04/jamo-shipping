import * as React from 'react'
import { storeProfileData } from '../common/utils'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: '',
    role: 'user',
    balance: '0'
}

const CONTEXT_ERROR =
  'Global context not found. Have you wrapped your components with GlobalContext.Consumer?'

  const GlobalStateContext = React.createContext(
    undefined,
  )

  const GlobalDispatchContext = React.createContext({
    getBalance: () => {
      throw new Error(CONTEXT_ERROR)
    },
    setProfile: () => {
      throw new Error(CONTEXT_ERROR)
    },
    logout: () => {
      throw new Error(CONTEXT_ERROR)
    },
   
})

function reducer(prevState, action) {
    switch (action.type) {
     case 'SET_DATA':
      return {...prevState, ...action.data}
     case 'LOG_OUT':
      return initialState
     default:
      return prevState
    }
}

function GlobalProvider({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
  
    // actions
    const GlobalDispatch = React.useMemo(
      () => ({
        getBalance: async (credentials) => {
          console.log({credentials})
        },
        setProfile: (data) => {
          storeProfileData(data)
          dispatch({
            type: 'SET_DATA',
            data
          })
        },
        logout: () => {
          dispatch({
            type: 'LOG_OUT'
          })
        }
      }),[state]
    )

    return (
        <GlobalStateContext.Provider value={state}>
          <GlobalDispatchContext.Provider value={GlobalDispatch}>
            {children}
          </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
      )
}

function useGlobalState() {
    const context = React.useContext(GlobalStateContext)
    if (context === undefined) {
      throw new Error('useGlobalState must be used with a GlobalProvider')
    }
    return context
  }
  
  function useGlobalDispatch() {
    const context = React.useContext(GlobalDispatchContext)
    if (context === undefined) {
      throw new Error('useGlobalDispatch must be used with a GlobalProvider')
    }
    return context
  }
  
  export {useGlobalDispatch, useGlobalState, GlobalProvider}