import {getOrderAdmin ,  deleteOrderAdmin , updateOrderAdmin , getbyIdOrderAdmin , createOrderAdmin} from "../module/OrderAdmin.api"
 
export const OrderAdmin = {
 state(){
    return {}
 },

 getters:{
   getOrderAdminList(state){
    return state
   }
 },
 mutations:{
  SETORDERADMIN(state,{key,value}){
    state[key] = value
  }
 },

 actions:{
    async fetchOrderAdmin({commit},{params}){
        return new Promise(async(resolve,reject)=>{
            try{
               const res = await getOrderAdmin({params})
                commit("SETORDERADMIN",{key:"list",value:res.results})
                commit("SETORDERADMIN",{key:"count",value:res.count})
                resolve({status:true});
            }catch(e){
                reject({state:false})
            }
        })
    },

    async OrderAdminDelete(_,id){
      return new Promise(async(resolve,reject)=>{
         try{
           const results = await deleteOrderAdmin(id);
            resolve({status:true});
        }catch(e){
          reject({status:false})
         }
      })
    },
    async OrderAdminUpdate(_,{id,data}){
     return new Promise(async(resolve,reject)=>{
        try{
            const res = await updateOrderAdmin(id,data);
            resolve({status:true});
        }catch(e){
          reject({status:false});
        }
     })

    },

    async OrderAdmingetbyId(_,id){
      return new Promise(async(resolve,reject)=>{
        try{
          const res = await getbyIdOrderAdmin(id);
          resolve({status:true,data:res});
        }catch(e){
          reject({status:false});
        }
      })
    },

    async OrderAdminCreate(_,{data}){
      return new Promise(async(resolve,reject)=>{
         try{
              const res = await createOrderAdmin(data)
              resolve({status:true}) 
         }catch(e){
          ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
          
          reject({status:false})
         }
      })
    }





 }

}