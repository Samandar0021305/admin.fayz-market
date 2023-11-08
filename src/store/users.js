import { getUsers ,deleteUsers ,createUsers, getbyidUsers , updateUsers} from "../module/users.api";

 export const users = {
    state(){
        return {}
    },
    mutations:{
        SETUSERS(state,{key,value}){
             state[key] = value;  
        }
    },
    getters:{
       getUsersList(state){
        return state
       },
       getUsersCount(state){
        return state.count
       }
    },

    actions:{
        async fetchUsers({commit},{params}){
            return new Promise(async (resolve,reject)=>{
                try{
                  const data = await getUsers(params);
                   commit("SETUSERS",{key:"list",value:data.results})
                   commit("SETUSERS",{key:"count",value:data.count})
                   resolve({status:true});
                }catch(e){
                  reject({status:false})
                }
            })
        },
       
        async usersDelete(_,id){
            return new Promise(async(resolve,reject)=>{
                try{
                  const res = await deleteUsers(id);
                  resolve({status:true})
                }catch(e){
                    reject({status:false})
                }
            })
        },

        async usersCreate(_,data){
            return new Promise(async(resolve,reject)=>{
                try{
                   const res = await createUsers(data);
                   resolve({status:true})
                }catch(e){
                    reject({status:false})
                    ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");

                }
            })
        },
       async  UsersgetById(_,id){
        return new Promise(async(resolve,reject)=>{
            try{
             const data = await getbyidUsers(id);
             resolve({status:true,data})
            }catch{
                reject({status:false})
            }
        })
       },

       async UsersUpdate(_,{id,data}){
        return new Promise(async(resolve,reject)=>{
            try{
                const res = await updateUsers(id,data)
                resolve({status:true});
                
            }catch{
                reject({status:false})
            }
        })
       }


    
    }
}