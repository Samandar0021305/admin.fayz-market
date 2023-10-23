<template>
     <div class="chart" >
       <div id="chart" >
        <h2 class="chart--title"> <slot></slot> </h2>
        <apexchart type="bar" height="280" :options="props?.ColumnCharts?.chartOptions" :series="props?.ColumnCharts?.series"></apexchart>
      </div>
     </div>
  </template>

<script setup>
import { useStore } from "vuex";
const props = defineProps({
    
    type:{
        type:String,
        default:""
    },
    statistics:{
      type:Object,
      default:{}
    },
    ColumnCharts:{
      type:Object,
      default:{}
    }
   }) 


</script>