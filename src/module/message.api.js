import ConfigApi from "../api";


const messageEindpost = {
    list:"product-comments/"
}

export const getMessage =async(params)=>
 await ConfigApi.get(messageEindpost.list,{params});

export const deleteMessage = async(id)=>
 await ConfigApi.delete(messageEindpost.list + `${id}/`)