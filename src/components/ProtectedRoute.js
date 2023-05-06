import React from 'react'
import { useGlobalState } from '../contexts/globalContext'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({children,dest='/login'}) => {
    const navigate = useNavigate()
    const globalState = useGlobalState()
   
    if(globalState?.email?.length < 1){
       navigate(dest)
    }
 
    return children
 }

export default ProtectedRoute
