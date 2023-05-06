import React from 'react'
import './App.css'
import { LoginProvider } from "./contexts/loginStore"
import { GlobalProvider } from './contexts/globalContext'
import RootNavigation from './navigation/RootNavigation'


function App() {
  
return (
  <GlobalProvider>
    <LoginProvider>
      <RootNavigation/>
    </LoginProvider>
  </GlobalProvider>
  
)
}


export default App;
