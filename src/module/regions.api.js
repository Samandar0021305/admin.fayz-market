import ConfigApi from "../api";

const regionsEindpost = {
    list:"regions/"
}

export const getRegions = async()=>
 await ConfigApi.get(regionsEindpost.list)
 