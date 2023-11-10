import ConfigApi from "../api";

const OrderAdminEindpost = {
    list:"order-admin/"
}

export const getOrderAdmin = async({params})=>
  await ConfigApi.get(OrderAdminEindpost.list,{params})


export const deleteOrderAdmin = async(id)=>
 await ConfigApi.delete(OrderAdminEindpost.list + `${id}/`)  


export const updateOrderAdmin = async(id,data)=>
  await ConfigApi.patch(OrderAdminEindpost.list + `${id}/`,data);

export const getbyIdOrderAdmin = async(id)=>
  await ConfigApi.get(OrderAdminEindpost.list+`${id}/`);

export const createOrderAdmin = async(data)=>
 await ConfigApi.post(OrderAdminEindpost.list,data)