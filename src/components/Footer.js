import React from 'react'
import logo from '../images/logo.png'

const Footer = () => {
    return (

<div className="container-fluid bg-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
<div className="container py-5">
    <div className="row g-5">
        <div className="col-md-6">
            <h1 className="text-primary mb-4"><img className="img-fluid me-2" src={logo} alt=""
                    style={{width: 45}}/>Atrium Recruitment</h1>
            <span>Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed
                stet lorem sit clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum
                et lorem et sit.</span>
        </div>
        <div className="col-md-6">
            <h5 className="mb-4">Newsletter</h5>
            <p>Subscribe to our Newsletter for notifications and updates about profitable coins</p>
            <div className="position-relative">
                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text"
                    placeholder="Your email"/>
                <button type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
            </div>
        </div>
        <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Get In Touch</h5>
            <p><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
            <p><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
            <p><i className="fa fa-envelope me-3"></i>info@hrmproject.com</p>
        </div>
        <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Our Services</h5>
            <a className="btn btn-link" href="/">Currency Wallet</a>
            <a className="btn btn-link" href="/">Currency Transaction</a>
            <a className="btn btn-link" href="/">Bitcoin Investment</a>
            <a className="btn btn-link" href="/">Token Sale</a>
        </div>
        <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Quick Links</h5>
            <a className="btn btn-link" href="/">About Us</a>
            <a className="btn btn-link" href="/">Contact Us</a>
            <a className="btn btn-link" href="/">Our Services</a>
            <a className="btn btn-link" href="/">Terms & Condition</a>
        </div>
        <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Follow Us</h5>
            <div className="d-flex">
                <a className="btn btn-square rounded-circle me-1" href="/"><i className="fa fa-twitter"></i></a>
                <a className="btn btn-square rounded-circle me-1" href="/"><i className="fa fa-facebook"></i></a>
                <a className="btn btn-square rounded-circle me-1" href="/"><i className="fa fa-youtube"></i></a>
                <a className="btn btn-square rounded-circle me-1" href="/"><i className="fa fa-linkedin"></i></a>
            </div>
        </div>
    </div>
</div>
<div className="container-fluid copyright">
    <div className="container">
        <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy; <a href="/">Atrium Recruitment</a>, All Rights Reserved.
            </div>
           
        </div>
    </div>
</div>
</div>
)
}

export default Footer