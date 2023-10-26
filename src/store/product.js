import { getProduct , createProduct , deleteProduct,getByIdProduct,upditeProduct } from "../module/product.api";

const product = {
    state() {
        return {
          data:{},
          current:""
        }
      },
     getters: {
       ProductCurrent(state){
         return state.current
       },
       GetProdctCount(state){
        return state.data.count
       }
     },
     mutations: {
        SETPRODUCT(state,{key,value}) {
            state.data[key] = value 
    },
      setData(state,id){
         state.current = id
    }
  },
  actions: {
    async curentProduct(_,id){
      return new Promise(async (resolve,reject)=>{
        try{
           const value = await getByIdProduct(id)

            resolve({status:true,data:value})
        }catch(r){
            reject({status:false})
        }   
    })
  },
  async productUpdite(_,{id,form}){
     return new Promise(async(resolve,reject)=>{
      try{ 
        
         const res = await upditeProduct(id,form)
         resolve({status:true})
      }catch(e){
        reject({status:false})
        
      }
     })
  },
    async productDelete(_,id){
      return new Promise(async(resolve,reject)=>{
          try{
              const data = await deleteProduct(id)
              resolve({status:true})
          }catch(r){
            reject({status:false})
          }
      })
  },
  async productCreate(_,formData){
     return new Promise(async (resolve,reject)=>{
        try{
          
          const data = await createProduct(formData)
          resolve({status:false});
          
        }catch(er){
          reject({status:false})
        }
     })
  },
    async fetchProduct({ commit }, { params }) {
        return new Promise(async (resolve,reject)=>{
            try{
                let res = await getProduct({params});
                commit("SETPRODUCT",{key:"list",value:res.results});
                commit("SETPRODUCT",{key:"count",value:res.count});
                resolve({status:true});
                
                }catch(e){
                  reject({
                    status: false,
                    error: e,
                });
            }  
        })
    },
    async deleteItems(_, { items, api }) {
      return new Promise(async (resolve, reject) => {
        try {
          let promises = [];
          items.forEach((el) => {
            if (!el) {
              return false;
            }
            let promise = new Promise(async (resolve, reject) => {
              try {
                await this.$axios.delete(`${api}/${el}`);
                resolve({
                  status: true,
                });
              } catch (e) {
                reject({
                  status: false,
                  error: e,
                });
              }
            });
            promises.push(promise);
          });
          await Promise.all(promises);
          resolve({ status: true });
        } catch (error) {
          console.error(error);
        }
      });
    },
  }
}


export default product