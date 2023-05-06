import React,{useState,useEffect} from "react"
import { redirect, useNavigate } from "react-router-dom"
import hero from '../img/hero-1.png'
import { useLoginState } from "../contexts/loginStore"
import ErrorText from "../components/ErrorText"
import loadingImage from '../img/loading.gif'
import { BASE_URL } from "../common/appVariables"

const Home = () => {
const [tabId,setTabId] = useState('tab-1')
const [pic,setPic] = useState('')
const [picValidation,setPicValidation] = useState('')
const [loading,setLoading] = useState(false)
const [zipCode,setZipCode] = useState('')
const [zipCodeValidation,setZipCodeValidation] = useState(false)
const [phone,setPhone] = useState('')
const [firstName,setFirstName] = useState('')
const [firstNameValidation,setFirstNameValidation] = useState(false)
const [lastName,setLastName] = useState('')
const [lastNameValidation,setLastNameValidation] = useState(false)
const [phoneValidation,setPhoneValidation] = useState(false)
const [emailValidation,setEmailValidation] = useState(false)
const [email,setEmail] = useState('')
const [message,setMessage] = useState('')
const [address,setAddress] = useState('')
const [addressValidation,setAddressValidation] = useState(false)
const [city,setCity] = useState('')
const [cityValidation,setCityValidation] = useState(false)

const navigate = useNavigate(), loginState = useLoginState()


       


const Banner = () => {

    return (
     <div className="container-fluid hero-header bg-light py-5 mb-5">
        <div className="container py-5">
            <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                    <h1 className="display-4 mb-3 animated slideInDown">Atrium Recruitment</h1>
                    <p className="animated slideInDown">Scroll down to appy and we would find you a high paying job in 5 minutes.</p>
                    <a href="#apply-div" className="btn btn-primary py-3 px-4 animated slideInDown">Apply Now</a>
                </div>
                <div className="col-lg-6 animated fadeIn">
                    <img className="img-fluid animated pulse infinite" style={{animationDuration: 3}} src={hero}
                        alt=""/>
                </div>
            </div>
        </div>
    </div>

    )
}

const onInputChanged = (id,value) => {
  
    switch(id){
     case 'zip-code':
       setZipCode(value)
     break
 
     case 'address':
       setAddress(value)
     break
 
    case 'city':
       setCity(value)
     break
 
     case 'pic':
       setPic(value)
     break
 
     case 'first-name':
       setFirstName(value)
     break

     case 'last-name':
       setLastName(value)
     break

     case 'email':
       setEmail(value)
     break

     case 'phone':
       setPhone(value)
     break

     case 'message':
       setMessage(value)
     break
 
     default:
       console.log('nothing to do here')
    
    }
   }


  const selectTab = id => {
      setTabId(id)
  }

  const clearValidationErrors = () => {
    setFirstNameValidation(false)
    setLastNameValidation(false)
    setEmailValidation(false)
    setPhoneValidation(false)
    setAddressValidation(false)
    setCityValidation(false)
    setPicValidation(false)
    setZipCodeValidation(false)
  }

  const readFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log({text})
      setPic(text)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const validateTab1 = (e) => {
    e.preventDefault()
    clearValidationErrors()
   
    let validation = firstName === '' || lastName === '' || email === '' ||
    phone === '' || address === '' || city === '' || zipCode == ''
  
    if(validation){
     if(firstName === ''){
       // setNewPasswordValidationMessage('This field is required')
        setFirstNameValidation(true)
      }
      if(lastName === ''){
        setLastNameValidation(true)
      }
      if(email === ''){
        setEmailValidation(true)
      }
      if(phone === ''){
        setPhoneValidation(true)
      }
      if(address === ''){
       setAddressValidation(true)
      }
      if(city === ''){
        setCityValidation(true)
      }
      if(zipCode === ''){
        setZipCodeValidation(true)
      }
    }
    else{
      selectTab('tab-2')
    }
  }

  const validateTab2 = async (e) => {
    e.preventDefault()
    clearValidationErrors()
   
    let validation = pic === '' || pic.length < 3

    if(validation){
     if(pic === '' || pic.length < 3){
       // setNewPasswordValidationMessage('This field is required')
        setPicValidation(true)
      }
    }
    else{
      setLoading(true)
        let dt = {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zipCode,
          pic,
          message
        }
        let fd = new FormData()
        let payload = JSON.stringify(dt)
        console.log({payload})
        fd.append('dt',payload)

        let request = new Request(`${BASE_URL}/api/apply`,{
          method: 'POST',
          body: fd
        })
        let response = null

        try{
           response = await fetch(request)
          setLoading(false)
        }
        catch(err){
          console.log({err})
          setLoading(false)
        }
       

        if(response.status === 200){
          const responseJSON = await response.json()
          //console.log({responseJSON})
          if(responseJSON?.status === 'ok'){
           alert('Resume added, we would reach out to you shortly')
           navigate(0)
          }else{
            alert('Your resume could not be added, please try again')
          }
        }
        else{
          alert('We could not process your request, please try again in a few minutes')
        }
    }
  }


  const activeTabColors = {
    backgroundColor: '#16D5FF',
    color: '#ffffff'
  }

  const inactiveTabColors = {
    backgroundColor: 'rgb(245, 247, 250)',
    color: '#000000'
  }

  const countries = [
    {label: 'Nigeria', value: 'nigeria'}
   ]

   const idTypes = [
    {label: 'Voter\'s card',value: 'voters-card'},
    {label: 'Driver\'s license',value: 'drivers-license'},
    {label: 'National ID Card',value: 'national-id-card'},
  ]


    return (
      <>
       <Banner/>
       
       <div className="row" id="apply-div">
        <div className="col-md-3"/>
       <div className="col-md-8">
          <div className="py-5">
           <div className="row" style={styles.tabWrapper}>
             <a className="col-md-6" onClick={() => null} >
             <div style={{...styles.tabDiv,backgroundColor: tabId === 'tab-1' ? activeTabColors.backgroundColor : inactiveTabColors.backgroundColor}}>
              <h4 style={{...styles.tabTitle,color: tabId === 'tab-1' ? activeTabColors.color : inactiveTabColors.color}}>Personal Info</h4>
             </div>
             </a>
             <a className="col-md-6" onClick={() => null}>
             <div style={{...styles.tabDiv,backgroundColor: tabId === 'tab-2' ? activeTabColors.backgroundColor : inactiveTabColors.backgroundColor}}>
             <h4 style={{...styles.tabTitle,color: tabId === 'tab-2' ? activeTabColors.color : inactiveTabColors.color}}>Resume</h4>
             </div>
             </a>
           </div>
          </div>

          <div className="row">
            {tabId === 'tab-1' && (
              <div className="col-md-8 offset-md-1">
                 <form>
                 <div className="row">
                    <div className="col-md-6">
                    <div className="form-floating mt-3">
                   <input type="text" value={firstName} onChange={(e) => {onInputChanged('first-name',e?.target?.value)}} className="form-control" id="first-name" placeholder="e.g John"/>
                   <label htmlFor="first-name" className="form-label">First Name</label>
                  </div>
                 {firstNameValidation && (<ErrorText errorMessage='This field is required'/>)}

                 <div className="form-floating mt-3">
                   <input type="text" value={lastName} onChange={(e) => {onInputChanged('last-name',e?.target?.value)}} className="form-control" id="last-name" placeholder="e.g Doe"/>
                   <label htmlFor="last-name" className="form-label">Last Name</label>
                  </div>
                 {lastNameValidation && (<ErrorText errorMessage='This field is required'/>)}

                 <div className="form-floating mt-3">
                   <input type="text" value={email} onChange={(e) => {onInputChanged('email',e?.target?.value)}} className="form-control" id="email" placeholder="Email address"/>
                   <label htmlFor="email" className="form-label">Email address</label>
                  </div>
                 {emailValidation && (<ErrorText errorMessage='This field is required'/>)}

                 <div className="form-floating mt-3">
                   <input type="text" value={phone} onChange={(e) => {onInputChanged('phone',e?.target?.value)}} className="form-control" id="phone" placeholder="Phone number"/>
                   <label htmlFor="phone" className="form-label">Phone number</label>
                  </div>
                 {phoneValidation && (<ErrorText errorMessage='This field is required'/>)}

                    </div>

                    <div className="col-md-6">
                    <div className="form-floating mt-3">
                      <input type="text" value={address} onChange={(e) => {onInputChanged('address',e?.target?.value)}} className="form-control" id="address" placeholder="Address"/>
                      <label htmlFor="address" className="form-label">Address</label>
                     </div>
                     {addressValidation && (<ErrorText errorMessage='This field is required'/>)}  
    
                    <div className="form-floating mt-3">
                     <input type="text" value={city} onChange={(e) => {onInputChanged('city',e?.target?.value)}} className="form-control" id="city" placeholder="City"/>
                     <label htmlFor="city" className="form-label">City</label>
                    </div>
                    {cityValidation && (<ErrorText errorMessage='This field is required'/>)}

                    <div className="form-floating mt-3">
                     <input type="text" value={zipCode} onChange={(e) => {onInputChanged('zip-code',e?.target?.value)}} className="form-control" id="zipCode" placeholder="ZIP Code"/>
                     <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                    </div>
                    {zipCodeValidation && (<ErrorText errorMessage='This field is required'/>)}
                   </div>
                 </div>

                 <div className="col-12 mt-5">
                    <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={validateTab1}>
                      Next
                      {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
                    </button>
                  </div>
                 </form>
              </div>
            )}

            {tabId === 'tab-2' && (
              <div className="col-md-8 offset-md-1">
                 <form>
                <div className="form-floating mt-3">
                   <input type="file" onChange={readFile} className="form-control" id="pic" placeholder="Upload your ID"/>
                   <label htmlFor="pic" className="form-label">Upload yor Resume</label>
                  </div>
                 {picValidation && (<ErrorText errorMessage='This field is required'/>)}

                 <div className="form-floating mt-3">
                     <input type="text" value={message} onChange={(e) => {onInputChanged('message',e?.target?.value)}} className="form-control" id="message" placeholder="Message"/>
                     <label htmlFor="message" className="form-label">Message</label>
                 </div>


                 <div className="col-12 mt-5">
                   <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-outline-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={() => {selectTab('tab-1')}}>
                       Back
                      </button>
                    </div>
                    <div className="col-md-6">
                     <button className="btn btn-primary py-3 px-4 form-control" style={{flexDirection: 'row'}} disabled={loading} onClick={validateTab2}>
                      Next
                      {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
                     </button>
                    </div>
                   </div>
                    
                  </div>
                 </form>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-1"/>
       </div>
      </>
    )
}

const styles = {
    tabWrapper: {
      borderRadius: 12,
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'row', 
      //justifyContent: 'space-between',
      width: '90%',
      //borderBottomWidth: 0.5,
      //borderBottomStyle: 'solid',
      //borderBottomColor: '#00000015'
    },
    tabDiv: {
      padding: 4,
      borderRadius: 5,
      justifyContent: 'center'
    },
    tabTitle: {
      alignSelf: 'center',
      textAlign: 'center'
    }
  }


  

export default Home