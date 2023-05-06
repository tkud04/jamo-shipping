import React from 'react'
import loadingImage from '../img/loading.gif'

const GenericModal = ({
title='',
id='',
body,
buttonText='Submit',
onSubmit,
loading=false
}) => {

  const next = () => {
    if(typeof onSubmit === 'function'){
      onSubmit()
    }
    else{
      console.log('no onSubmit function is defined')
      document.querySelector('#close-button').click()
    }

  }
 
return (

<div className="col-md-12">
  <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={id + "Label"} aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id={id + "Label"}>{title}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {body}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" id='close-button' data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={next} className="btn btn-primary" disabled={loading}>{buttonText}</button>
        {loading && (<img src={loadingImage} style={{width: 20, marginLeft: 5}}/>)}
      </div>
    </div>
  </div>
</div>
        </div>

)
}

export default GenericModal
