import ConfigApi from "../api";

const paymentsEndpoints = {
    list:"order-fees/"
}


export const getPayments = async({params})=>
  await ConfigApi.get(paymentsEndpoints.list,{params})

export const deletePayments = async(id)=>
  await ConfigApi.delete(paymentsEndpoints.list + `${id}/`)

  
export const getbyidPayments = async(id)=>
  await ConfigApi.get(paymentsEndpoints.list + `${id}/`)


export const updatePayments = async(id,data)=>
await ConfigApi.patch(paymentsEndpoints.list + `${id}/` , data)