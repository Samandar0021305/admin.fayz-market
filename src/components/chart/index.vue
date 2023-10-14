<template>
     <div class="chart">
       <div id="chart" >
        <h2 class="chart--title"> <slot></slot> </h2>
        <apexchart :type="type" height="280" :options="value.chartOptions" :series="value.series"></apexchart>
      </div>
     </div>
  </template>

  <script setup>
   const props = defineProps({
    value:{
        type:Object,
        default:""
    },
    type:{
        type:String,
        default:""
    }
   }) 

   const {value , type} = props
  </script>