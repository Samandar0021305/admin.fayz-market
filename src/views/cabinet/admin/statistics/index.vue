<template>
  <div class="statistics">
    <div class="statistics-header">
      <h2>Statistics</h2>
      <!-- <div class="statistics-header-functions">
        <el-tabs
          v-model="activeDate"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="This week" :name="1"></el-tab-pane>
          <el-tab-pane label="Last week" :name="2"></el-tab-pane>
          <el-tab-pane label="Date" :name="3"></el-tab-pane>
        </el-tabs>
        <button>
          <svgicon name="dots-horizontal" />
        </button>
      </div> -->
    </div>

    <div class="statistics-body" >
        <el-row :gutter="30">
          <el-col :span="24">
           <Charts :value="ColumnCharts" type="bar">
            <template #default>
              Mahsulotlar
            </template>
           </Charts>
        </el-col>
               
        
          <el-col :md="8" :sm="12" :xs="24">
            <div class="orders">
                <button>
                    <svgicon name="user-time" />
                </button>
                <span>Ummumiy mijozlar soni</span>
                <strong class="big">{{ users }}</strong>
            </div>
        </el-col>

        <el-col :md="8" :sm="12" :xs="24">
            <div class="orders">
                <button>
                    <svgicon name="mahsulotlar" />
                </button>
                <span>Ummumiy mahsulotlar soni</span>
                <strong class="big">{{ product }}</strong>
            </div>
        </el-col>

        <el-col :md="8" :sm="12" :xs="24">
            <div class="orders">
                <button>
                    <svgicon name="mahsulotlar" />
                </button>
                <span>Oylik tushgan umumiy summa </span>
                <strong class="big">{{ overflowProduct }}</strong>
            </div>
        </el-col>

        <el-col :span="24" >
           <Charts :value="circle" type="donut">
            <template #default>
              Buyurtmalar
            </template>
           </Charts>
        </el-col>


      </el-row>
     
    </div>
     
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
 import {line,circle , ColumnCharts} from "@/utils/charts.js"
import Charts from "@/components/chart/index.vue" 
import { useStore } from "vuex";
import { getOrdersMonth } from "../../../../module/ordermont";
const activeDate = ref(1);
const store = useStore();

const overflowProduct = ref(0)
const statistics = reactive({data:""});

const users = computed(()=>{
  return store.getters.getUsersCount
})

const product = computed(()=>{
  return store.getters.GetProdctCount
})

const fetchingOrdersMonht = async()=>{
  return await getOrdersMonth();
}

onMounted(()=>{
  store.dispatch("fetchUsers",{})
  store.dispatch("fetchProduct",{})
  fetchingOrdersMonht().then(res=>{
    console.log(res,"+")
    for(let i = 0; i < 8;i++){
      if(res[i]){
        overflowProduct.value+=res[i].overall_num_of_products
      }
    }
  })
})

</script>

<style lang="scss" scoped></style>
