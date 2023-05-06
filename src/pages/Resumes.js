import React,{useState,useEffect} from "react"
import { redirect, useNavigate } from "react-router-dom"
import about from '../img/about.png'
import GenericBanner from "../components/GenericBanner"
import loadingImage from '../img/loading.gif'
import { BASE_URL } from "../common/appVariables"

const Resumes = () => {
const navigate = useNavigate()
const [resumes,setResumes] = useState([])
const [loading,setLoading] = useState(false)
const [deleteLoading,setDeleteLoading] = useState('')

const getExtension = (mime) => {
    let ret = ''
    mime = mime.substring(5)

    switch(mime){
     case 'application/pdf':
        ret = 'pdf'
     break
     case 'text/plain':
        ret = 'txt'
     break
     case 'text/csv':
        ret = 'csv'
     break
     case 'application/msword':
        ret = 'doc'
     break
     case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ret = 'docx'
     break
     case 'image/gif':
        ret = 'gif'
     break
     case 'text/html':
        ret = 'html'
     break
     case 'image/jpeg':
        ret = 'jpg'
     break
     case 'image/png':
        ret = 'png'
     break
     case 'application/vnd.ms-powerpoint':
        ret = 'ppt'
     break
     case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ret = 'pptx'
     break
    }
    
    return ret
}

const downloadFile = (url,title) => {
    let a = document.createElement("a")
    a.href = url
    a.download = title
    a.click()
}

const deleteResume = async (id) => {
    setDeleteLoading(id)
 
    let request = new Request(`${BASE_URL}/api/yyy?xf=${id}`,{
       method: 'GET' 
     })
   
     let response = null
   
     try{
        response = await fetch(request)
       setDeleteLoading('')
     }
     catch(err){
       console.log({err})
       setDeleteLoading('')
     }
    
   
     if(response.status === 200){
       const responseJSON = await response.json()
       //console.log({responseJSON})
       if(responseJSON?.status === 'ok'){
        alert('Resume removed!')
        navigate(0)
       }else{
         alert('Error removing resume, please try again')
       }
     }
     else{
       alert('Error removing resume, please try again in a few minutes')
     }
}

const getResumes = async () => {
 setLoading(true)
 
 let request = new Request(`${BASE_URL}/api/xxx`,{
    method: 'GET'
  })

  let response = null

  try{
     response = await fetch(request)
  }
  catch(err){
    console.log({err})
    setLoading(false)
  }
 

  if(response.status === 200){
    const responseJSON = await response.json()
   
    if(responseJSON?.status === 'ok'){
     setResumes(responseJSON?.data)
     setLoading(false)
    }else{
      alert('Error fetching resumes, please try again')
      setLoading(false)
    }
  }
  else{
    alert('Error fetching resumes, please try again in a few minutes')
    setLoading(false)
  }
}

useEffect(() => {
 getResumes()
},[])

    return (
      <>
       <GenericBanner 
        title="Resumes"
       />

       {/* Resumes */}
       <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5 align-items-center">
                <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="table-responsive-md">
                    <table className="table table-striped data-table">
                    <thead>
                     <tr>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>ZIP Code</th>
                      <th>Resume</th>
                      <th>Message</th>
                      <th>Date Submitted</th>
                      <th>Actions</th>
                    </tr>
                   </thead>
                   <tbody>
                    {loading ? (
                        <center>                        
                          <p>
                           Loading resumes <img src={loadingImage} width={20} height={20}/>
                          </p>
                        </center>
                    ) : (
                         resumes.map((r,index) => {
                        let mime = r.pic.split(';')[0]
                        let ext = getExtension(mime)
                        let title = `resume.${ext}`
                       
                      return (
                        <tr key={index}>
                            <td>{r.first_name} {r.last_name}</td>
                            <td>{r.email}</td>
                            <td>{r.phone}</td>
                            <td>{r.address}</td>
                            <td>{r.city}</td>
                            <td>{r.zip_code}</td>
                            <td><a href="#" onClick={(e) => {e.preventDefault(); downloadFile(r.pic,title)}}>Download</a></td>
                            <td>{r.message}</td>
                            <td>{r.last_updated}</td>
                            <td>
                                {deleteLoading === r.id ? (
                                  <p>
                                    Removing
                                    <img src={loadingImage} width={20} height={20}/>
                                  </p>
                                ): (
                                    <a className="btn btn-danger" href="#" onClick={(e) => {e.preventDefault(); deleteResume(r.id)}}>Delete</a>
                                )
                                }
                                
                            </td>
                            
                        </tr>
                      )}
                     )
                    )}
                   </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
    )
}

export default Resumes