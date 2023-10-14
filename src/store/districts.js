
import {getDistricts} from "../module/districts.api"

const districts =  {
 state(){
    return {}
 },

 mutations:{
  SET_DISTRICTS(state,{key,value}){
    state[key] = value
  }
 },

 getters:{
  getDistrictsList(state){
    return state
  }
 },

 actions:{
    async fetchDistricts({commit}){
        return new Promise(async(resolve,reject)=>{
            try{
               const res = await getDistricts();
               commit("SET_DISTRICTS",{key:"list",value:res.results})
               resolve({status:true})
            }catch(e){
                reject({status:false,e})
            }
        })
    }
 }

}

export default districts