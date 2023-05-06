import React, {useState,useEffect} from "react"
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
  } from "react-router-dom"

  import Layout from "../pages/Layout"
  import Home from "../pages/Home"
  import Login from "../pages/Login"
  import Signup from "../pages/Signup"
  import Security from "../pages/Security"
  import NotFound from "../pages/NotFound"

  import DashboardLayout from "../pages/DashboardLayout"
  import Dashboard from "../pages/Dashboard"
import { useGlobalDispatch } from "../contexts/globalContext"
import { restoreProfileData } from "../common/utils"
import ProtectedRoute from "../components/ProtectedRoute"
import Resumes from "../pages/Resumes"




  const RootNavigation = () => {
    const [destination,setDestination] = useState('')
   
    const globalDispatch = useGlobalDispatch()
    

  const restoreProfile = async () => {
    const response = await restoreProfileData()
  // console.log('tried to restore profile info: ',response)
    if (response) {
      globalDispatch.setProfile(response)
    }
  }

  useEffect(() => {
    restoreProfile()
  },[])



    const protectRoute = (children) => (
       <ProtectedRoute>
        {children}
       </ProtectedRoute>
    )



    const router = createBrowserRouter(
       createRoutesFromElements(
         <>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/xxx" element={<Resumes/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="*" element={<NotFound/>}/>
           </Route>  

           <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={protectRoute(<Dashboard/>)}  />
            <Route path="/security" element={protectRoute(<Security/>)} />
            </Route>
        </>
       )
    )


    return (
       <RouterProvider router={router}/>
    )
  }
  
export default RootNavigation
