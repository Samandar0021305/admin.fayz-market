import ConfigApi from "../api";

const productsEndpoints = {
  list: "products/"
};

export const getProduct = async ({params}) =>
  await ConfigApi.get(productsEndpoints.list,{params});

export const createProduct = async (data) =>
  await ConfigApi.post(productsEndpoints.list, data );

export const deleteProduct = async (id) =>
  await ConfigApi.delete(productsEndpoints.list + `${id}/`);

export const upditeProduct = async(id,data)=>
  await ConfigApi.patch(productsEndpoints.list + `${id}/`,data)

  export const getByIdProduct = async(id)=>
   await ConfigApi.get(productsEndpoints.list + `${id}/`);


export const createImageProduct = async(data)=>
  await ConfigApi.post("product-images/",data)