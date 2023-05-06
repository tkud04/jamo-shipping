import React,{useState,useEffect} from "react"
import { redirect, useNavigate } from "react-router-dom"
import GenericBanner from "../components/GenericBanner"
import {ReactComponent as AppleLogo} from '../img/logos/apple.svg'
import {ReactComponent as GoogleLogo} from '../img/logos/google.svg'
import loadingImage from '../img/loading.gif'
import signupImg from '../img/signup.png'
import ErrorText from "../components/ErrorText"

const Signup = () => {
const [loading,setLoading] = useState(false)
const [firstName,setFirstName] = useState('')
const [firstNameValidation,setFirstNameValidation] = useState(false)
const [lastName,setLastName] = useState('')
const [lastNameValidation,setLastNameValidation] = useState(false)
const [email,setEmail] = useState('')
const [emailValidation,setEmailValidation] = useState(false)
const [emailValidationMessage,setEmailValidationMessage] = useState('')
const [password,setPassword] = useState('')
const [passwordValidation,setPasswordValidation] = useState(false)
const [passwordValidationMessage,setPasswordValidationMessage] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [confirmPasswordValidation,setConfirmPasswordValidation] = useState(false)
const [confirmPasswordValidationMessage,setConfirmPasswordValidationMessage] = useState(false)

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
    setFirstNameValidation(false)
    setLastNameValidation(false)
    setConfirmPasswordValidation(false)
}


const next = (e) => {
    e.preventDefault()
    clearValidationErrors()
    setLoading(true)
   
    if(firstName.length < 1 || lastName.length < 1 || (email.length < 1 || !mailValidationRegex.test(email)) || password.length < 1 || password.length < 7 || confirmPassword.length < 1 || confirmPassword !== password){
        let ret = ''
    
        if(firstName.length < 1){
            setFirstNameValidation(true)
        }

        if(lastName.length < 1){
            setLastNameValidation(true)
        }

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
            
        }

     if(password.length < 7 || password.length < 1){
        if(password.length < 7){
            ret = 'Password must be at least 7 characters'
         }
    
         if(password.length < 1){
            ret = 'This field is required'
          }
          
         setPasswordValidation(true)
         setPasswordValidationMessage(ret)
         
     }

     if(confirmPassword.length < 1 || confirmPassword !== password){
        if(confirmPassword.length < 1){
            ret = 'This field is required'
         }
    
         if(confirmPassword !== password){
            ret = 'Passwords don\'t match'
          }
          
         setConfirmPasswordValidation(true)
         setConfirmPasswordValidationMessage(ret)
         
     }

     setLoading(false)
     
    }
    else{
        //validation successful
       
        setTimeout(() => {
            console.log({firstName,lastName,email,password,confirmPassword})
            setLoading(false)
          },1000)
    }
}


const onChange = (id,evt) => {
    let ret = evt?.target?.value

    switch(id){
        case 'email':
            setEmail(ret)
        break

        case 'password':
            setPassword(ret)
        break

        case 'fname':
            setFirstName(ret)
        break

        case 'lname':
            setLastName(ret)
        break

        case 'confirm-password':
            setConfirmPassword(ret)
        break
    }
}

/*
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
*/

    return (
      <>
      

       {/* Signup */}
       <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: 0.1, animationName: 'fadeInUp'}}>
                <div className="col-lg-6">
                    <h1 className="display-6">Signup</h1>
                </div>
                <div className="col-lg-6 text-lg-end">
                   
                </div>
            </div>
            <div className="row g-5">
                <div className="col-lg-5 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: 0.1, animationName: 'fadeInUp'}}>
                    <img src={signupImg} alt='Login'/>
                </div>
                <div className="col-lg-7 col-md-6 wow fadeInUp" data-wow-delay="0.5s" style={{marginTop: 100,visibility: 'visible', animationDelay: 0.5, animationName: 'fadeInUp'}}>
                    <form>
                          <div className="row g-3">
                            <div className="col-md-6">
                               <div className="form-floating">
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      value={firstName} 
                                      onChange={(e) => {onChange('fname',e)}} 
                                      id="fname" 
                                      placeholder="First Name "
                                      required
                                    />
                                    <label htmlFor="fname">Your First Name</label>
                                </div>
                                {firstNameValidation && <ErrorText errorMessage='This field is required'/>}
                            </div>
                            <div className="col-md-6">
                               <div className="form-floating">
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      value={lastName} 
                                      onChange={(e) => {onChange('lname',e)}} 
                                      id="lname" 
                                      placeholder="Last Name "
                                      required
                                    />
                                    <label htmlFor="lname">Your Last Name</label>
                                </div>
                                {lastNameValidation && <ErrorText errorMessage='This field is required'/>}
                            </div>
                            <div className="col-md-12">
                               
                                <div className="form-floating">
                                    <input 
                                      type="email" 
                                      className="form-control" 
                                      value={email} 
                                      onChange={(e) => {onChange('email',e)}} 
                                      id="email" 
                                      placeholder="Email "
                                      required
                                    />
                                    <label htmlFor="email">Your Email address</label>
                                </div>
                                {emailValidation && <ErrorText errorMessage={emailValidationMessage}/>}
                            </div>

                            <div className="col-md-6">
                               <div className="form-floating">
                                 
                                 <input type="password" className="form-control" id="password" value={password} onChange={(e) => {onChange('password',e)}} placeholder="Password" required/>
                                 <label htmlFor="password">Your Password</label>
                                
                               </div>
                               {passwordValidation && <ErrorText errorMessage={passwordValidationMessage}/>}
                             </div>

                             <div className="col-md-6">
                               <div className="form-floating">
                                 
                                 <input type="password" className="form-control" id="confirm-password" value={confirmPassword} onChange={(e) => {onChange('confirm-password',e)}} placeholder="Confirm Password" required/>
                                 <label htmlFor="confirm-password">Confirm Password</label>
                                
                               </div>
                               {confirmPasswordValidation && <ErrorText errorMessage={confirmPasswordValidationMessage}/>}
                             </div>
                            
                            <div className="col-12">
                                <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={next}>
                                    Next
                                    {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
                                    </button>
                            </div>
                           
                        </div>
                   

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
                                Already have an account? <a href="/login">Log in</a>
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

export default Signup