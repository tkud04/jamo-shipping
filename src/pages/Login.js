import React,{useState,useEffect} from "react"
import { redirect, useNavigate } from "react-router-dom"
import GenericBanner from "../components/GenericBanner"
import {ReactComponent as AppleLogo} from '../img/logos/apple.svg'
import {ReactComponent as GoogleLogo} from '../img/logos/google.svg'
import loadingImage from '../img/loading.gif'
import loginImg from '../img/login.png'
import ErrorText from "../components/ErrorText"
import { useLoginState, useLoginDispatch } from "../contexts/loginStore"
import { useGlobalState, useGlobalDispatch } from "../contexts/globalContext"

const Login = () => {
const [loading,setLoading] = useState(false)
const [emailSupplied,setEmailSupplied] = useState(false)
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [emailValidation,setEmailValidation] = useState(false)
const [passwordValidation,setPasswordValidation] = useState(false)
const [emailValidationMessage,setEmailValidationMessage] = useState('')
const [passwordValidationMessage,setPasswordValidationMessage] = useState('')
const [display2FA,setDisplay2FA] = useState(false)
const [otp,setOtp] = useState('')
const [otpValidation,setOtpValidation] = useState(false)
const [otpValidationMessage,setOtpValidationMessage] = useState('')
const [emailDisplay,setEmailDisplay] = useState('')

const loginState = useLoginState(), loginDispatch = useLoginDispatch(),
      globalState = useGlobalState(), globalDispatch = useGlobalDispatch()

const mailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const navigate = useNavigate()

const loginWithApple = (e) => {
    e.preventDefault()
    console.log('logging with Apple')
}

const loginWithGoogle = (e) => {
    e.preventDefault()
    console.log('logging with Google')
}

const clearValidationErrors = () => {
    setEmailValidation(false)
    setPasswordValidation(false)
    setOtpValidation(false)
}

const login = (e) => {
    clearValidationErrors()

    e.preventDefault()
    console.log('logging in normally')
    setLoading(true)

    if(email.length < 1 || !mailValidationRegex.test(email)){
     let msg = ''

     if(!mailValidationRegex.test(email)){
       msg = 'Enter a valid email address'
     }
     if(email.length < 1){
       msg = 'This field is required'
     }

     setEmailValidation(true)
     setEmailValidationMessage(msg)
     setLoading(false)
    }
    else{
      setTimeout(() => {
        setLoading(false)
        setEmailSupplied(true)
      },1000)
    }
    
}

const next = (e) => {
    e.preventDefault()
    clearValidationErrors()
    setLoading(true)
   
    if(password.length < 1 || password.length < 7){
        let ret = ''

     if(password.length < 7){
        ret = 'Password must be at least 7 characters'
     }

     if(password.length < 1){
        ret = 'This field is required'
      }

     setPasswordValidation(true)
     setPasswordValidationMessage(ret)
     setLoading(false)
    }
    else{
        //validation successful
       
        setTimeout(() => {
            console.log({email,password})
            setLoading(false)
            setDisplay2FA(true)
          },1000)
    }
}

const submit2FA = (e) => {
  e.preventDefault()
  clearValidationErrors()

  setLoading(true)

  if(otp.length < 1 || otp.length !== 6 ){
    let ret = ''

     if(otp.length !== 6){
        ret = 'OTP must be 6 digits'
     }

     if(otp.length < 1){
        ret = 'This field is required'
     }

     setOtpValidation(true)
     setOtpValidationMessage(ret)
     setLoading(false)
  }
  else{ 
    setTimeout(() => {
        setLoading(false)
        console.log('submitting 2fa otp code: ',otp)

        //Temporary login
        loginDispatch?.login({email})
        let profileData = {
            firstName: "John",
            lastName: "Snow",
            email,
            phone: '',
            role: 'user',
            balance: '0'
        }
        globalDispatch?.setProfile(profileData)
       console.log('navigating to dashboard, globalState: ',globalState)
       navigate('/dashboard')
      },1000)
     
  }
}

const ForgotPassword = () => (
    <div className="col-12">
        <a href="/forgot-password">Forgot Password?</a>
    </div>
)

const onChange = (id,evt) => {
    let ret = evt?.target?.value

    switch(id){
        case 'email':
            setEmail(ret)
        break

        case 'password':
            setPassword(ret)
        break

        case 'otp':
            setOtp(ret)
        break
    }
}

useEffect(() => {
 if(email.length > 0 && mailValidationRegex.test(email)){
    let emailArr = email.split('@'), ret = ''
    if(emailArr.length === 2){
        ret += emailArr[0][0]

      for(let i = 1; i < emailArr[0].length; i++){
        ret += '*'
      }
      ret += `@${emailArr[1]}`
      setEmailDisplay(ret)
    }
 }
},[email])

    return (
      <>
       

       {/* Login */}
       <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: 0.1, animationName: 'fadeInUp'}}>
                <div className="col-lg-6">
                    <h1 className="display-6">Login</h1>
                </div>
                <div className="col-lg-6 text-lg-end">
                   
                </div>
            </div>
            <div className="row g-5">
                <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: 0.1, animationName: 'fadeInUp'}}>
                    <img src={loginImg} alt='Login'/>
                </div>
                <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s" style={{marginTop: 200,visibility: 'visible', animationDelay: 0.5, animationName: 'fadeInUp'}}>
                    <form>

                        {display2FA ? (
                            <div className="row g-3">
                               <div className="col-md-12">
                                 <div className="col-md-12">
                                 <h4>A 6-digit OTP code has been sent to your email address. Please enter it below to continue</h4>
                                 </div>
                                 <div className="form-floating">
                                    <input type="number" className="form-control" value={otp} onChange={(e) => {onChange('otp',e)}} id="otp" placeholder="OTP code "/>
                                    <label htmlFor="name">OTP Code</label>
                                 </div>
                               </div>
                               {otpValidation && <ErrorText errorMessage={otpValidationMessage}/>}

                               <div className="col-12">
                                <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={submit2FA}>
                                    Submit
                                    {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
                                    </button>
                            </div>
                            </div>
                        )
                        : (
                          <div className="row g-3">
                            { emailSupplied ? (
                                <div className="col-md-12">
                                <h4>Welcome, {emailDisplay}</h4>
                               <div className="form-floating">
                                 
                                 <input type="password" className="form-control" id="password" value={password} onChange={(e) => {onChange('password',e)}} placeholder="Password" required/>
                                 <label htmlFor="name">Your Password</label>
                                
                               </div>
                               {passwordValidation && <ErrorText errorMessage={passwordValidationMessage}/>}
                             </div>
                            
                            ) : (
                                <div className="col-md-12">
                               
                                <div className="form-floating">
                                    <input 
                                      type="email" 
                                      className="form-control" 
                                      value={email} 
                                      onChange={(e) => {onChange('email',e)}} 
                                      id="name" 
                                      placeholder="Email "
                                      required
                                    />
                                    <label htmlFor="name">Your Email address</label>
                                </div>
                                {emailValidation && <ErrorText errorMessage={emailValidationMessage}/>}
                            </div>
                            )}
                            
                            <div className="col-12">
                                <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={(email.length > 0 && emailSupplied) ? next : login}>
                                    Next
                                    {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
                                    </button>
                            </div>
                            <ForgotPassword/>
                        </div>
                        )}

                        <div className="row g-3" style={{marginTop: 5}}>
                            <div className="col-md-12">
                                <h3 style={{textAlign: 'center'}}>OR</h3>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} onClick={loginWithGoogle}>
                                  <GoogleLogo style={styles.socialLogo}/>
                                  Continue with Google
                                </button>
                            </div>

                            <div className="col-12">
                                <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} onClick={loginWithApple}>
                                    <AppleLogo style={styles.socialLogo}/>
                                    Continue with Apple
                                </button>
                            </div>
                            <div className="col-12">
                                Don't have an account? <a href="/signup">Create an account</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </>
    )
}

const styles = {
    socialLogo: {
        width: 20,
        height: 20,
        marginRight: 5
    }
}

export default Login