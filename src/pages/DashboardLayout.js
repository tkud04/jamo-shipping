import React, {useState,useEffect} from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import { useGlobalState,useGlobalDispatch } from "../contexts/globalContext"
import { useLoginDispatch } from "../contexts/loginStore"
import { removeProfileData } from "../common/utils"
import Footer from "../components/Footer"


const DashboardLayout = () => {
   const [spinnerVisible,setSpinnerVisible] = useState(true)
   const globalState = useGlobalState(), globalDispatch = useGlobalDispatch(),
   loginDispatch = useLoginDispatch()
  
    // Spinner
    const spinner = function () {
        setTimeout(function () {
            setSpinnerVisible(false)
            /*if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }*/
        }, 1);
    }


    const logout = async () => {
      console.log('logging out')
    await removeProfileData()
    globalDispatch?.logout()
    loginDispatch?.logout()
  }
    

   useEffect(() => {
     spinner()
   })

  



   

    return (
     <div>
       {spinnerVisible && (
        <>
        {/* Spinner Start */}
        <div id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
         >
         <div className="spinner-grow text-primary" role="status"></div>
         </div>
         {/* Spinner End */}
         </>
       )}
      {/* Navbar */}

      <NavBar logout={logout}/>
     

      <div className="container-xxl py-5">
        <Outlet/>
      </div>
     

     <Footer/>


    {/* Back to Top */}
    <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i
            className="bi bi-arrow-up"></i></a> 
      {/* end FOOTER */}

     </div>

     
    )
}

export default DashboardLayout
