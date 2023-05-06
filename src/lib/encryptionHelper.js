import CryptoJS from "crypto-js"

export const encryptData = (encKey='', data='') => {
  // @ts-ignore
  let keyArr = CryptoJS.enc.Base64.parse(encKey)
  let encOptions = {
    // @ts-ignore
    mode: CryptoJS.mode.ECB,
    // @ts-ignore
    padding: CryptoJS.pad.Pkcs7,
  };
  // @ts-ignore
  let encryptedData = CryptoJS.AES.encrypt(data, keyArr, encOptions)
  return encryptedData.toString()
}


export const decryptData = (encKey='',str='') => {
  let keyArr = CryptoJS.enc.Base64.parse(encKey)
  let decOptions = {
    // @ts-ignore
    mode: CryptoJS.mode.ECB,
    // @ts-ignore
    padding: CryptoJS.pad.Pkcs7,
  };
  let ret = null

  if(str !== null){
    let decryptedData = CryptoJS.AES.decrypt(str, keyArr,decOptions)
    ret = decryptedData.toString(CryptoJS.enc.Utf8)
  }
  
  return ret
}
