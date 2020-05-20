import { CustomerPaymentInfo } from "./typings"

export default async function serverAPI(customerInfo: CustomerPaymentInfo){
    // console.log(customerInfo)
    return new Promise((resolve, reject)=>
        setTimeout(()=>{
            resolve({status:"ok"})
        },3000)
    )
}