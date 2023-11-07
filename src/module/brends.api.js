import ConfigApi from "../api";

const brandsEndpoints = {
    list:"/brands/"
}

export const getBrands = async(params)=> 
  await ConfigApi.get(brandsEndpoints.list,{params})


  export const createBrand = async(fd)=>
   await ConfigApi.post(brandsEndpoints.list, fd)


export const deleteBrands = async (id) =>
  await ConfigApi.delete(brandsEndpoints.list + id);

  export const getbyBrands =async(id)=>
    await ConfigApi.get(brandsEndpoints.list + `${id}/`);

    export const upditeBrands = async(id,data)=>
     await ConfigApi.patch(brandsEndpoints.list + `${id}/`, data)
 