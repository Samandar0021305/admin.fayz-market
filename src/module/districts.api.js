import ConfigApi from "../api";

const districtsEindo = {
    list:"districts/"
}

export const getDistricts = async()=>
 await ConfigApi.get(districtsEindo.list)