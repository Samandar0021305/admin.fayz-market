
import {getRegions} from "../module/regions.api"

const regions =  {
    state(){
      return {}
    },

 getters:{
   GETREGIONSLIST(state){
    return state
   }
 },

 mutations:{
    SET_REGIONS(state,{key,value}){
      state[key] = value
    }
   },

 actions:{
    async fetchRegions({commit}){
        return new Promise(async(resolve,reject)=>{
            try{
               const res = await getRegions();
               commit("SET_REGIONS",{key:"list",value:res})
               resolve({status:true});
            }catch(e){
                reject({status:false,e})
            }
        })
    }
 }

}

export default regions