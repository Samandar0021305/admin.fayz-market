import {  getOrderMonth } from "../module/order-month.api"

const chart =  {
  state(){
    return {}
  }, 

  getters:{
    getColumnCharts(state){
      return state.ColumnCharts
    },
    getCoast(state){
      return state.caost
    }
  },

  mutations:{
    SET_COAST(state,res){
      let sum = 0;
      for(let item of res){
       sum+=item.overall_cost
      }
     state.caost = sum
    },
   SET_ORDERMONTH(state,res){
    let ColumnCharts = {
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
           
          ],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        }
      }
    }

    const map = new Set();
    res.forEach(item=>{
      for(let val in item.product){
           if(!map.has(val)){
            ColumnCharts.chartOptions.xaxis.categories.push(`${val}`.slice(0,10))
             ColumnCharts.series[0].data.push(item.product[val]);
             map.add(val);
             }
           } 
    })

    state.ColumnCharts = ColumnCharts;

   }
  },

  actions:{
    async fetchChart({commit},param){
      return new Promise(async(resolve,reject)=>{
        try{
          const res = await getOrderMonth(param);
          commit("SET_ORDERMONTH",res)
          console.log(res);
          commit("SET_COAST",res)
          resolve({status:true})
        }catch{
         reject({status:false})
        }
      })
    }
  }
}

export default chart