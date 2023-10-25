import ConfigApi from "../api";

const categoryEndpoints = {
    list:"categories/"
}

export const getCategories = async(params)=> 
  await ConfigApi.get(categoryEndpoints.list,{params})

  export const createCategory = async(data)=>
   await ConfigApi.post(categoryEndpoints.list, data)

  export const deleteCategory = async(id)=>
  await ConfigApi.delete(categoryEndpoints.list + id);

  export const upditeCategory = async(id,data)=>
  await ConfigApi.patch(categoryEndpoints.list + `${id}/`, data)
  

  export const getbyIdCategory = async(id)=>
   await ConfigApi.get(categoryEndpoints.list + `${id}/`)