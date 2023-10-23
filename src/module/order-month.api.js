import ConfigApi from "../api";



export const getOrderMonth = async(param)=>
 await ConfigApi.get(`top-selling/?period=${param}/`);
 