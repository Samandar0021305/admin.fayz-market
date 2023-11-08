import ConfigApi from "../api"

const imagesProduct = {
    state(){
        return {}
    },

    mutations:{

    },
    actions:{
       async updateImages(_,{id,data}){
        return new Promise(async(resolve,reject)=>{
            try{
                const res = await ConfigApi.get(`product-images/${id}/`,data);
                resolve({status:true})
            }catch{
                reject({status:false})
            }
        })
       }
    }
}

export default imagesProduct