import React,{useState,useEffect} from "react"
import SideBar from "../components/SideBar"
import GenericModal from "../components/GenericModal"
import ErrorText from "../components/ErrorText"


const Security = () => {
  
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmNewPassword,setConfirmNewPassword] = useState('')
  const [currentPasswordValidation,setCurrentPasswordValidation] = useState(false)
  const [currentPasswordValidationMessage,setCurrentPasswordValidationMessage] = useState('')
  const [newPasswordValidation,setNewPasswordValidation] = useState(false)
  const [newPasswordValidationMessage,setNewPasswordValidationMessage] = useState('')
  const [confirmNewPasswordValidation,setConfirmNewPasswordValidation] = useState(false)
  const [confirmNewPasswordValidationMessage,setConfirmNewPasswordValidationMessage] = useState('')
  const [loading,setLoading] = useState(false)

  const onInputChanged = (id,value) => {
  
   switch(id){
    case 'current-password':
      setCurrentPassword(value)
    break

    case 'new-password':
      setNewPassword(value)
    break

    case 'confirm-new-password':
      setConfirmNewPassword(value)
    break

    default:
      console.log('nothing to do here')
   }
  }

  const clearValidationErrors = () => {
   setCurrentPasswordValidation(false)
   setNewPasswordValidation(false)
   setConfirmNewPasswordValidation(false)
  }

  const clearInputs = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }

  const next = () => {
    clearValidationErrors()
    let validation = currentPassword === '' || currentPassword.length < 7 ||
    newPassword === '' || newPassword.length < 7 || 
    confirmNewPassword === '' || confirmNewPassword.length < 7 ||
    newPassword !== confirmNewPassword

    if(validation){
      if(currentPassword.length < 7){
        setCurrentPasswordValidationMessage('Must be at least 7 characters')
        setCurrentPasswordValidation(true)
      }
      if(currentPassword.length === ''){
        setCurrentPasswordValidationMessage('This field is required')
        setCurrentPasswordValidation(true)
      }

      if(newPassword.length < 7){
        setNewPasswordValidationMessage('Must be at least 7 characters')
        setNewPasswordValidation(true)
      }
      if(newPassword.length === ''){
        setNewPasswordValidationMessage('This field is required')
        setNewPasswordValidation(true)
      }

      if(confirmNewPassword.length < 7){
        setConfirmNewPasswordValidationMessage('Must be at least 7 characters')
        setConfirmNewPasswordValidation(true)
      }
      if(confirmNewPassword.length === ''){
        setConfirmNewPasswordValidationMessage('This field is required')
        setConfirmNewPasswordValidation(true)
      }
      if(newPassword !== confirmNewPassword){
        setConfirmNewPasswordValidationMessage('Passwords do not match')
        setConfirmNewPasswordValidation(true)
      }
    }
    else{
      setLoading(true)
      setTimeout(() => {
        alert('Password changed!')
        setLoading(false)
        clearInputs()
        document.querySelector('#close-button').click()
      },1000)
    }
  }

  
    return (
      <div className="row">
        <div className="col-md-4">
         <SideBar
          activeBar="security"
         />
        </div>
        <div className="col-md-8">
          <div className="py-5">
           <div style={styles.itemWrapper}>
             <h4 style={styles.itemTitle}>Two-Factor Authentication <i className=" fa fa-exclamation-circle" data-bs-toggle="tooltip" data-bs-title="Default tooltip"></i></h4>
             <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{flexDirection: 'row', marginLeft: 10}}>
                <i className="fa fa-envelope"></i>
                <span style={{marginLeft: 10, color: 'rgb(38, 55, 77)'}}>Email</span>
              </div>
              <p>2FA codes are sent by email</p>
              <button className="btn btn-primary" style={{marginRight: 10}}>Enable</button>
             </div>
           </div>

           <div style={{...styles.itemWrapper,marginTop: 50}}>
             <h4 style={styles.itemTitle}>Password </h4>
             <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{flexDirection: 'row', marginLeft: 10}}>
                <i className="fa fa-lock"></i>
                <span style={{marginLeft: 10, color: 'rgb(38, 55, 77)'}}>Change Password</span>
              </div>
              <button className="btn btn-primary" style={{marginRight: 10}} data-bs-toggle="modal" data-bs-target="#exampleModal">Change</button>
             </div>
           </div>
          </div>
        </div>
     <GenericModal
      id='exampleModal'
      title='Change Password'
      body={
        <form>
        <div className="form-floating">
         <input type="password" value={currentPassword} onChange={(e) => {onInputChanged('current-password',e?.target?.value)}} className="form-control" id="currentPassword" placeholder="Current password"/>
         <label htmlFor="currentPassword" className="form-label">Current password</label>
        </div>
        {currentPasswordValidation && (<ErrorText errorMessage={currentPasswordValidationMessage}/>)}
  
        <div className="form-floating mt-3">
         <input type="password" value={newPassword} onChange={(e) => {onInputChanged('new-password',e?.target?.value)}} className="form-control" id="newPassword" placeholder="New password"/>
         <label htmlFor="currentPassword" className="form-label">New password</label>    
        </div>
        {newPasswordValidation && (<ErrorText errorMessage={newPasswordValidationMessage}/>)}
  
        <div className="form-floating mt-3">
         <input type="password" value={confirmNewPassword} onChange={(e) => {onInputChanged('confirm-new-password',e?.target?.value)}} className="form-control" id="confirmPassword" placeholder="Confirm password"/>
         <label htmlFor="currentPassword" className="form-label">Confirm new password</label>
        </div>
        {confirmNewPasswordValidation && (<ErrorText errorMessage={confirmNewPasswordValidationMessage}/>)}
        </form>
      }
      onSubmit={next}
      loading={loading}
     />
      </div>
    )
}

const styles = {
  itemWrapper: {
    border: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(219, 225, 234)',
    borderRadius: 12,
    paddingTop: 26,
    paddingBottom: 24
  },
  itemTitle: {
    fontSize: 18,
    color: 'rgb(38, 55, 77)',
    marginLeft: 10
  }
}

export default Security
