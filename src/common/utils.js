import React from "react"
import { encryptData, decryptData } from "../lib/encryptionHelper"

const PROFILE = 'PROFILE'
const encKey = 'wwgwgwwhwwhwwfsvx@1512'

export const testEncryption = (data={test:'testing encryption/decryption'}) => {
 console.log({data})
 let enc = encryptData(encKey,JSON.stringify(data))
 console.log({enc})
 let dec = decryptData(encKey,enc)
 console.log({dec})
}

export const restoreProfileData = async () => {
    try {
      const data = await localStorage.getItem(PROFILE)
      const decryptedData = decryptData(encKey,data)
      return data ? JSON.parse(decryptedData) : null
    } 
    catch (error) {
        console.log('error restoring profile data: ',error)
      return null
    }
}

export const storeProfileData = async (data) => {
    try {
        let encryptedData = encryptData(encKey,JSON.stringify(data))
        return await localStorage.setItem(PROFILE, encryptedData)
      }
     catch (error) {
        console.log('error storing profile data: ',error)
     }
}

export const removeProfileData = async () => {
    try{
      localStorage.clear()
    }
    catch (error){
        console.log('error removing profile data: ',error)
    }
}