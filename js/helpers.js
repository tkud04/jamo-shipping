const developmentMode = true
const BASE_URL = developmentMode ? 'index.html' : ''

const trackingStatuses = [
  {value: 'none', label: 'Select status'},
  {value: 'station', label: 'ARRIVED AT STATION'},
  {value: 'hold', label: 'ON HOLD'},
  {value: 'transit', label: 'IN TRANSIT'},
  {value: 'delivery', label: 'OUT FOR DELIVERY'},
  {value: 'delivered', label: 'DELIVERED'}
]

const confirmAction = (actionId,callback) => {
  const v = confirm('Are you sure? This action cannot be undone')

  if(v){
    typeof callback === 'function' && callback(actionId)
  }
}

const initFirebase = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBMNfl4WYs99xRt3strOCeaNAdCBHuk4aE",
      authDomain: "lashy-projects.firebaseapp.com",
      projectId: "lashy-projects",
      storageBucket: "lashy-projects.appspot.com",
      messagingSenderId: "1019548262418",
      appId: "1:1019548262418:web:59f6bd06122d39aeb3b8cb",
      measurementId: "G-VDEVYCMQ8Z"
      }
    
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig)
      
}

const getDB = () => {
    //const analytics = firebase.getAnalytics(app)
    let ret = firebase?.firestore()
     return ret
}

const digestDate = (standardizedDate) => {
    const dateTimeArr = standardizedDate.split('T')
    let ret = {dateArr:[],timeArr:[]}
  
    if(dateTimeArr.length === 2){  
      const dateArr = dateTimeArr[0].split('-')
      const timeArr = dateTimeArr[1].split(':')
      ret.dateArr = dateArr
      ret.timeArr = timeArr
    }
  
    return ret
    
}

const getSapNumber = (max=1) => {
  return Math.floor(Math.random() * max)
}

const getTrackings2 = async () => {
    let req = new Request(`https://mysterious-ravine-02108.herokuapp.com/api/xxx`)

    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
     console.log({responseJSON})

     if(responseJSON?.status === 'ok'){
        if(responseJSON?.data.length > 0){
         let htmlData = ``
         let statuses = {
            'none': "Select status", 
            'station': "ARRIVED AT STATION", 
            'hold': "ON HOLD", 
            'transit': "IN TRANSIT", 
            'delivery': "OUT FOR DELIVERY", 
            'delivered': "DELIVERED"
         }
         
                    

         for(let t of responseJSON?.data){
            let tu = `zzz.html?xf=${t?.tnum}`
           htmlData += `
           <tr>
           <td>${t?.tnum}</td>
           <td>
                    <ul class="no-dot">
                      <li>Ship Type: ${t?.stype}</li>
                      <li>Weight: ${t?.weight}kg</li>
                      <li>Origin office: ${t?.origin}</li>
                      <li>Destination office: ${t?.dest}</li>
                    </ul>
            </td>
            <td>
                    <ul class="no-dot">
                      <li>Name: ${t?.shipper?.name}</li>
                      <li>Phone: ${t?.shipper?.phone}</li>
                      <li>Address: ${t?.shipper?.address}</li>
                    </ul>
            </td>
            <td>
                    <ul class="no-dot">
                      <li>Name: ${t?.receiver?.name}</li>
                      <li>Phone: ${t?.receiver?.phone}</li>
                      <li>Address: ${t?.receiver?.address}</li>
                    </ul>
            </td>
            <td><span class="badge bg-info">${statuses[t?.status]}</span></td>
            <td>
                    <div class="btn-group">
                      <a href="${tu}" class="btn btn-primary">View</a>
                      <a class="ru" href="#" data-xf='${t?.tnum}' class="btn btn-danger">Remove</a>
                   </div>  
            </td>
            </tr>
           `
           jQuery('#results-tbody').html(htmlData)
         }
        }
        else{
          alert('No trackings found')
        }
     }else{
      alert('Tracking information not found, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}

const getTracking2 = async (tnum) => {
    let req = new Request(`https://mysterious-ravine-02108.herokuapp.com/api/yyy?xf=${tnum}`)
    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
    console.log({responseJSON})
     if(responseJSON?.status === 'ok'){
        
        if(responseJSON.data.length < 1){
            alert('Tracking information not found, please try again')
        }
        else{
          //show trackings div
          let dt = responseJSON?.data
          updateResult(dt)
        }
     }else{
      alert('Tracking information not found, please try again')
     }
   }
   else{
    alert('We could not process your request, please try again in a few minutes')
   }

}

const getTrackings = (successCallback,errorCallback,type='all') => {
  const db = getDB()
  let coll = null

  if(type === 'active'){
     coll =  db.collection('sapphire-trackings').where('status','==','active')
  }
  else if(type === 'all'){
    coll =  db.collection('sapphire-trackings')
  }

    coll?.get()
    .then((querySnapshot) => {
      typeof successCallback === 'function' && successCallback(querySnapshot)
    })
    .catch((err) => {
      console.log('error in getTrackings: ',err)
      typeof errorCallback === 'function' && errorCallback(err)
    })
}

const getTracking = async (tnum,successCallback,errorCallback) => {
  const db = getDB()
  
  const docRef = db.collection('sapphire-trackings').doc(tnum)
  docRef?.get()
    .then((d) => {
     typeof successCallback === 'function' && successCallback(d)
    })
    .catch((err) => {
      typeof errorCallback === 'function' && errorCallback(err)
    })

}

const addTracking2 = async (fd) => {
    let req = new Request(`https://mysterious-ravine-02108.herokuapp.com/api/xxx`,
    {
      method: 'POST',
      body: fd
    })

    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
     console.log({responseJSON})

     if(responseJSON?.status === 'ok'){
         alert('Tracking information added!')
         window.location.replace('yyy.html')
     }else{
      alert('Tracking information not added, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}

const addTracking = (
  data={
    info: {
      booking_mode:'',
      description:'',
      destination_office:'',
      freight:'',
      origin_office:'',
      pickup_date:'',
      ship_type:'',
      weight:'',
    },
    receiver: {
      address: '',
      name: '',
      phone: ''
    },
    shipper: {
      address: '',
      name: '',
      phone: ''
    }
  },
  successCallback,errorCallback) => {
  const db = getDB()
  data.date = new Date().toISOString()
  const tnum = `SAP${getSapNumber(999999)}`
  db.collection('sapphire-trackings').doc(tnum)
  .set({
      ...data.info,
      date: data.date
  })
  .then(() => {
    db.collection('sapphire-shippers').doc(tnum)
    .set({
        ...data.shipper
    })
    .then(() => {
      db.collection('sapphire-receivers').doc(tnum)
      .set({
          ...data.receiver
      })
      .then(() => {
        typeof successCallback === 'function' && successCallback()
      })
    })

    
      
  })
  .catch(err => {
      console.log('Failed to add tracking: ',err)
      typeof errorCallback === 'function' && errorCallback(err)
  })
}

const updateTracking = (
  data={
    xf:'',
    info: {
      booking_mode:'',
      description:'',
      destination_office:'',
      freight:'',
      origin_office:'',
      pickup_date:'',
      ship_type:'',
      weight:'',
    },
    receiver: {
      address: '',
      name: '',
      phone: ''
    },
    shipper: {
      address: '',
      name: '',
      phone: ''
    }
  },
  successCallback,errorCallback) => {
  const db = getDB()
  data.date = new Date().toISOString()
  const tnum = data.xf
  db.collection('sapphire-trackings').doc(tnum)
  .update({
      ...data.info,
      date: data.date
  })
  .then(() => {
    db.collection('sapphire-shippers').doc(tnum)
    .update({
        ...data.shipper
    })
    .then(() => {
      db.collection('sapphire-receivers').doc(tnum)
      .update({
          ...data.receiver
      })
      .then(() => {
        typeof successCallback === 'function' && successCallback()
      })
    })

    
      
  })
  .catch(err => {
      console.log('Failed to add tracking: ',err)
      typeof errorCallback === 'function' && errorCallback(err)
  })
}


const updateResult = (dt) => {
    jQuery('#xf').val(dt?.tnum)
    jQuery('#sname').val(dt?.shipper?.name)
    jQuery('#sadd').val(dt?.shipper?.address)
    jQuery('#sphone').val(dt?.shipper?.phone)
    jQuery('#rname').val(dt?.receiver?.name)
    jQuery('#radd').val(dt?.receiver?.address)
    jQuery('#rphone').val(dt?.receiver?.phone)
    jQuery('#stype').val(dt?.stype)
    jQuery('#weight').val(dt?.weight)
    jQuery('#origin').val(dt?.origin)
    jQuery('#dest').val(dt?.dest)
    jQuery('#bmode').val(dt?.bmode)
    jQuery('#freight').val(dt?.freight)
    jQuery('#description').val(dt?.description)
    jQuery('#tracking-status').val(dt?.status)
    jQuery('#pickup-at').val(dt?.pickup_at)
}

const getTrackingHistory = async (tnum) => {
    let req = new Request(`https://mysterious-ravine-02108.herokuapp.com/api/qqq?tnum=${tnum}`)

    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
    
     if(responseJSON?.status === 'ok'){
        console.log({responseJSON})
        if(responseJSON?.data.length > 0){
         let htmlData = ``
         let statuses = {
            'none': "Select status", 
            'station': "ARRIVED AT STATION", 
            'hold': "ON HOLD", 
            'transit': "IN TRANSIT", 
            'delivery': "OUT FOR DELIVERY", 
            'delivered': "DELIVERED"
         }
         
                    

         for(let t of responseJSON?.data){
           
           htmlData += `
           <tr>
            <td>${t?.tnum}</td>
            <td>${t?.location}</td>
            <td>${statuses[t?.status]}</td>
            <td>${t?.date}</td>
            <td>${t?.remarks}</td>
           </tr>
           `
           jQuery('#results-tbody').html(htmlData)
         }
        }
        else{
          alert('No trackings found')
        }
     }else{
      alert('Tracking information not found, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}

const addTrackingHistory = async (fd,xf) => {
    let req = new Request(`https://mysterious-ravine-02108.herokuapp.com/api/qqq`,
    {
      method: 'POST',
      body: fd
    })

    let response = null

    try{
     response = await fetch(req)
    }
    catch(err){
     console.log({err})
    }

   if(response.status === 200){
     const responseJSON = await response.json()
     console.log({responseJSON})

     if(responseJSON?.status === 'ok'){
         alert('Tracking history added!')
         window.location.replace(`qqq.html?xf=${xf}`)
     }else{
      alert('Tracking history not added, please try again')
     }
   }
   else{
     const responseJSON = await response.json()
     console.log({responseJSON})
    alert('We could not process your request, please try again in a few minutes')
   }

}

/********** COMPONENTS */
const renderLoading = ({
  text='',
  style=''
}) => {
  const ret = `
   <p>${text} <image src="images/loading.gif" style="width: 30px; height: 30px; ${style}" placeholder="${text}"/></p>
  `

  return ret
}