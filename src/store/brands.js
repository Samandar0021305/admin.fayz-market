import { getBrands , createBrands, deleteBrands ,upditeBrands,getbyBrands} from "../module/brends.api"
 
 const brands = {
    state(){
        return {
            brandsData:{},
            uptdata:""
        }
    },
    getters:{
      brandsDataList(state){
       return state.brandsData
      }
    },
    mutations:{
        SETBRANDS(state,{key,value}){
           state.brandsData[key] = value;
        },
        setData(state,id){
            state.uptdata = id
        }
       
    },
    actions:{
        async curentId(_,id){
              return new Promise(async (resolve,reject)=>{
                try{
                    const res = await getbyBrands(id)
                    resolve({status:true,data:res})
                  
                }catch(r){
                    console.log(e);
                    reject({status:false})
                }   
            }) 
              
        },
        async upditeBrands(_,{id,form}){
              return new Promise(async(resolve,reject)=>{
                try{
                     const data = upditeBrands(id,form)
                     resolve({status:true})
                }catch(err){
                    console.log(err);
                    reject({status:false})
                }
              })          
        },
        async brandDelete(_,id){
            return new Promise(async(resolve,reject)=>{
                try{
                    const data = await deleteBrands(id)
                    
                    resolve({status:true})
                }catch(r){
                  reject({status:false})
                }
            })
        },
        async fetchBrands({commit},{params}){
            return new Promise(async (resolve,reject)=>{
                try{
                    let res = await getBrands(params);
                    if(res){
                        commit("SETBRANDS",{key:"list",value:res})
                        commit("SETBRANDS",{key:"count",value:res.length})
                        resolve({status:true});   
                    }
                    }catch(e){
                      reject({
                        status: false,
                        error: e,
                    });
                }  
            })
        },
      
        async createBrands(_,form){
          return new Promise(async (resolve,reject)=>{
            try{
               const res = await createBrands(form);
               if(res){
                resolve({
                    status:true
                   })
               }
             }catch(c){
               reject({
                status:false
               })
            }
          })   
        }
    }
}

export default brands