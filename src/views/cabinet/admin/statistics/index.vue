<template>
  <div v-loading="loading" class="statistics">
    <div class="statistics-header">
      <h2>statistika</h2>
      <div class="statistics-header-functions">

        <el-tabs
          v-model="activeDate"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="hafta" :name="1"></el-tab-pane>
          <el-tab-pane label="oy" :name="2"></el-tab-pane>
          <el-tab-pane label="kun" :name="3"></el-tab-pane>
          <el-tab-pane label="yil" :name="4"></el-tab-pane>
        </el-tabs>
        <!-- <button>
          <svgicon name="dots-horizontal" />
        </button> -->
      </div>
    </div>

    <div class="statistics-body" >
        <el-row :gutter="30">
          <el-col :span="24" >
           <Charts  type="bar" :ColumnCharts="ColumnCharts">
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
                <span>Ummumiy mijozlar Soni</span>
                <strong class="big">{{ users }}</strong>
            </div>
        </el-col>

        <el-col :md="8" :sm="12" :xs="24">
            <div class="orders">
                <button>
                    <svgicon name="mahsulotlar" />
                </button>
                <span>Ummumiy mahsulotlar Soni</span>
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
<!-- 
        <el-col :span="24" >
           <Charts :value="circle" type="donut">
            <template #default>
              Buyurtmalar
            </template>
           </Charts>
        </el-col> -->


      </el-row>
     
    </div>
     
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Charts from "@/components/chart/index.vue";
import { useStore } from "vuex";
const activeDate = ref(1);
const store = useStore();

const overflowProduct = ref(0)
const loading = ref(true);
const users = computed(()=>{
  return store.getters.getUsersCount
})

const product = computed(()=>{
  return store.getters.GetProdctCount
})



 
const ColumnCharts = computed(()=>{
  return store.getters.getColumnCharts
 })



onMounted(()=>{
  Promise.all([
  store.dispatch("fetchUsers",{}),
  store.dispatch("fetchChart","weekly"),
  store.dispatch("fetchProduct",{}),
  store.dispatch("fectPayments",{}),
  store.dispatch("fetchChart",localStorage.getItem("time"))
  ]).finally(()=>{
    loading.value = false;
  })
})



const handleClick = (event)=>{
  if(event.paneName == 1){
    store.dispatch("fetchChart","weekly")
  }else if(event.paneName == 2){
    store.dispatch("fetchChart","weekly")
  }else if(event.paneName == 3){
    store.dispatch("fetchChart","daily")
  }else if(event.paneName == 4){
    store.dispatch("fetchChart","yearly")
  }
}



</script>

<style lang="scss" scoped></style>
