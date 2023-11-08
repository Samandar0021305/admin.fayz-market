import { getCategories , createCategory , deleteCategory ,upditeCategory , getbyIdCategory} from "../module/category.api";

 const category = {
    state(){
        return {
            categoryData:{},
            current:""
        }
    },
    getters:{
      categoryDataList(state){
        return state.categoryData
      }
    },
    mutations:{
        SET_CATEGORY(state,{key,value}){
           state.categoryData[key] = value;
        }
    },
    actions:{
        async curentCategory(_,id){
            return new Promise(async (resolve,reject)=>{
              try{
                  const res = await getbyIdCategory(id)
                  resolve({
                    status:true,
                    data:res
                  })
              }catch(r){
                  reject({status:false})
              }   
          }) 
            
      },
        async fetchCategory({commit},{params}){
            return new Promise(async (resolve,reject)=>{
                try{
                    let res = await getCategories(params);
                    if(res){
                        
                        commit("SET_CATEGORY",{key:"list",value:res})
                        commit("SET_CATEGORY",{key:"count",value:res.length})
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
        async createCategory({commit},fd){
            return new Promise(async(resolve ,reject)=>{
                try{
                   const data = await createCategory(fd)
                   if(data){
                    resolve({
                        status:true
                    })
                   }
                }catch(r){
                  ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
                      reject({
                        status:false
                      })
                }
            })
        },
        async upditecat(_,{id,form}){
            return new Promise(async(resolve,reject)=>{
              try{
                
                   const data = upditeCategory(id,form)
                   resolve({status:true})
              }catch(err){
  
                  reject({status:false})
              }
            })          
      },
        async categoryDelete(_,id){
          return new Promise(async(resolve,reject)=>{
              try{
              const res = await deleteCategory(id)
                resolve({status:true})
              }catch{
              reject({status:false})
              }
          })
        }

    }
}

export default  category