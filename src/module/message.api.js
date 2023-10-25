import ConfigApi from "../api";


const messageEindpost = {
    list:"product-comments/"
}

export const getMessage =async()=>
 await ConfigApi.get(messageEindpost.list);

export const deleteMessage = async(id)=>
 await ConfigApi.delete(messageEindpost.list + `${id}/`)