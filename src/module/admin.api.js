import ConfigApi from "../api";

const adminEndpoints = {
    list:"admins/"
}

export const getAdmin = async({params})=>
 await ConfigApi.get(adminEndpoints.list,{params});
 
export const deleteAdmin = async(id)=>
 await ConfigApi.delete(adminEndpoints.list + `${id}/`)


 export const updateAdmin = async(id,data)=>
  await ConfigApi.patch(adminEndpoints.list + `${id}/`,data);

export const createAdmin = async(data)=>
  await ConfigApi.post(adminEndpoints.list, data);

export const getbyidAdmin = async(id)=>
  await ConfigApi.get(adminEndpoints.list + `${id}/`)