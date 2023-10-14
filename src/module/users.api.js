import ConfigApi from "../api";

const usersEndpoints = {
    list:"users/"
}

export const getUsers = async(param)=>
  await ConfigApi.get(usersEndpoints.list);

export const deleteUsers = async(id)=>
 await ConfigApi.delete(usersEndpoints.list + `${id}/`)

 export const createUsers = async(data)=>
  await ConfigApi.post(usersEndpoints.list,data);

export const getbyidUsers = async(id)=>
 await ConfigApi.get(usersEndpoints.list + `${id}/`)

 export const updateUsers = async(id,data)=>
  await ConfigApi.patch(usersEndpoints.list + `${id}/`,data)