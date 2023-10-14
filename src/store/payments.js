import {getPayments , deletePayments ,  getbyidPayments , updatePayments} from "../module/payments.api"

const payments = {
    state(){
        return {

        }
    },
    mutations:{
      SETPAYMENTS(state,{key,value}){
         state[key] = value
      }
    },
    getters:{
      PaymentsList(state){
        return state
      }
    },
    actions:{
        async fectPayments({commit},{params}){
            return new Promise(async(resolve,reject)=>{
                try{
                    const res = await getPayments()
                    console.log(res,"orer");
                    if(res){
                        commit("SETPAYMENTS",{key:"list",value:res.results})
                        commit("SETPAYMENTS",{key:"count",value:res?.results?.length})
                        resolve({state:true});
                    }
                }catch(e){
                    reject({status:false});
                }
            })
        },
        async paymentsDelete(_,id){
          return new Promise(async(resolve,reject)=>{
            try{
               const res = await deletePayments(id)
               resolve({status:true})
            }catch(e){
                resolve({status:fase})
            }
          })
        },
        async paymentsBYID(_,id){
         return new Promise(async(resolve,reject)=>{
          try{
           const res = await  getbyidPayments(id)
           resolve({status:true,data:res});
          }catch(e){
            reject({status:false});
          }
         })
        },
        async updatePayments(_,{id,data}){
          return new Promise(async(resolve,reject)=>{
            try{
              const res = await updatePayments(id,data)
              console.log(data);
              resolve({status:true})
            }catch(e){
              resolve({status:false})
            }
          })
        }
    }
}


export default payments;