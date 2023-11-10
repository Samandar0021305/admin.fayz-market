import ConfigApi from "../api";



export const getOrderMonth = async(param)=>
 await ConfigApi.get(`top-selling/?period=${param}/`,{ limit: 8,offset: 0});
 