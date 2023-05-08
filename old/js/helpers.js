const getTrackings = async () => {
    let req = new Request('http://localhost:8000/api/xxx')

    let response = null
    
    try{
        response = await fetch(req)
     }
     catch(err){
       console.log({err})
     }

     if(response.status === 200){
        const responseJSON = await response.json()
        //console.log({responseJSON})
        if(responseJSON?.status === 'ok'){
        
        }else{
          alert('Trackings could not be fetched, please try again')
        }
      }
      else{
        alert('We could not process your request, please try again in a few minutes')
      }
}