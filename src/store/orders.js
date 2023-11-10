import { getOrder } from "../module/order.api";

const orders = {
  state(){
    return {}
  },
  getters:{},
  mutations:{
     setState(state,{}){

     }
  },

  actions:{
    async fetchOrders({ commit }, { params }) {
        return new Promise(async (resolve,reject)=>{
            try{
                let res = await getOrder({params});
                if(res){
                    
                    commit("setState",{key:"list",value:res.results});
                    commit("setState",{key:"count",value:res.count});
                    resolve({status:true});
                }
                }catch(e){
                  reject({
                    status: false,
                    error: e,
                });
                
            }  
        })
    }

  }
}


export default orders