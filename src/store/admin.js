import {getAdmin ,deleteAdmin ,  createAdmin ,updateAdmin, getbyidAdmin} from "../module/admin.api";

 const admin = {
    state(){
        return {}
    },
     getters:{
       getAdminsList(state){
         return state
       }
    },
    mutations:{
     SETADMIN(state,{key,value}){
        state[key] = value
     }
    },
   
    actions:{
         async fetchAdmin({commit},param){
           return new Promise(async(resolve,reject)=>{
             try{
             const res = await getAdmin();
             if(res){
                commit("SETADMIN",{key:"list",value:res.results})
                commit("SETADMIN",{key:"count",value:res.count})
                resolve({status:true});
                console.log(res);
             }
             }catch(e){
             reject({status:false})
             }
           })
         },

         async adminDelete(_,id){
          return new Promise(async(resolve,reject)=>{
            try{
                const res = deleteAdmin(id)
                resolve({status:true});
            }catch(e){
              reject({status:false})
            }
          })
         },


         async adminUpdate(_,{id,data}){
           return new Promise(async(resolve,reject)=>{
             try{
                const res = await updateAdmin(id,data);
                resolve({status:true});
             }catch{
               reject({status:false});
             }
           })
         },


         async AdminCreate(_,data){
           return new Promise(async(resolve,reject)=>{
            try{
              const res = await createAdmin(data);
              console.log(res);
            }catch(e){
              console.log(e);
            }
           })
         },

         async admingetbyid(_,id){
          return new Promise(async(resolve,reject)=>{
            try{
              const res = await getbyidAdmin(id);
              resolve({status:true,data:res})
            }catch{
              reject({status:false})
            }
          })
         }


    }
}


export default admin