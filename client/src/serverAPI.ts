import { CustomerPaymentInfo } from "./interfaces/interfaces"

export default async function serverAPI(customerInfo: CustomerPaymentInfo){
    return new Promise((resolve, reject)=>
        setTimeout(()=>{
            resolve({status:"ok"})
        },3000)
    )
}