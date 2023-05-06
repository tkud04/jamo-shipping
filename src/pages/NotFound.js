import React,{useState,useEffect} from "react"
import { redirect, useNavigate } from "react-router-dom"
import about from '../img/about.png'
import GenericBanner from "../components/GenericBanner"

const NotFound = () => {
const navigate = useNavigate()


    return (
      <>
       <GenericBanner 
        title="Not Found"
       />

       {/* Not Found */}
       <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: 0.1, animationName: 'fadeInUp'}}>
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                    <h1 className="display-1">404</h1>
                    <h1 className="mb-4">Page Not Found</h1>
                    <p className="mb-4">We're sorry, we could not find what you wre looking for! Maybe go to
                        our home page or try to use a search?</p>
                    <a className="btn btn-primary py-3 px-4" href="/">Go Back To Home</a>
                </div>
            </div>
        </div>
    </div>

    </>
    )
}

export default NotFound