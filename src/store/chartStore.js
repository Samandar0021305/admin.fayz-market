import {  getOrderMonth } from "../module/order-month.api"

const chart =  {
  state(){
    return {}
  }, 

  getters:{
    getColumnCharts(state){
      return state.ColumnCharts
    }
  },

  mutations:{
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

    res.forEach(item=>{
           for(let val in item.product){
             ColumnCharts.series[0].data.push(item.product[val]);
             ColumnCharts.chartOptions.xaxis.categories.push(`${val}`.slice(0,10))
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
          resolve({status:true})
        }catch{
         reject({status:false})
        }
      })
    }
  }
}

export default chart