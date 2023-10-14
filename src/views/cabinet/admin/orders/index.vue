<template>
  <CustomPages   title="Buyurtmalar" createPath="/cabinet/admin/orders/create">
    <template #default>
      <CustomTable
        :deleteItems="deleteItems"
        @closeDeleting="closeDeleting"
        @onDelete="onDelete"
      >
        <template #header>
          <th>
            <span>{{ "Nomi" }} </span>
          </th>
          <th>
            <span>{{ "telefon raqami" }} </span>
          </th>
          <th>
            <span>{{ "Manzil" }} </span>
          </th>
          
          <th>
            <span>{{ "ummumiy narh" }} </span>
          </th>
          <th>
            <span>{{ "mahsulot soni" }} </span>
          </th>
          
          
          
          <th>
            <span>{{ "Actions" }} </span>
          </th>
        </template>
        <template #body v-if="lists">
          <tr v-for="(item, index) in lists" :key="item.id"  style="cursor: pointer;">
            <td width="200px" @click="detail = {status: item}">
              <span>{{ item.name }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.phone_number }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.address }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.overall_cost }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.overall_num_of_products }}</span>
            </td>
            <td width="200px">
              <ul class="table--action">
                <li @click="onDelete(item.id)">
                   <svgicon name="deletebtn" />
                 </li> 
                
              </ul>
            </td>
          </tr>
        </template>
        <template #empty v-else>
          <CustomEmpty />
        </template>
      </CustomTable>
    </template>
    <template #footer>
      <div class="showcase">
        <span>Showing 1 - 10 of {{ count }}</span>
      </div>
      <Pagination :limit="10" :count="count" :page="1" />
    </template>
  </CustomPages>
  <PopopOrder :item="detail" />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from "vuex"
import PopopOrder from "@/components/popup/order/index.vue";

import CustomTable from "@/components/custom/table.vue";
import CustomPages from "@/components/custom/pages/index.vue";
import Pagination from "@/components/pagination.vue";


const detail = ref(null);
const data = reactive({current:false})

const store = useStore();

const lists = computed(()=>{
  return store.getters.getOrderAdminList.list;
})

const count = computed(()=>{
  return store.getters.getOrderAdminList.count;
})
onMounted(()=>{
  store.dispatch("fetchOrderAdmin",{ params: { limit: 0, offset: 0 } })
})



const onDelete = async (id) => {
  try {
    const {status} = await store.dispatch("OrderAdminDelete",id);
    store.dispatch("fetchOrderAdmin");
    if(status){
      ElMessage.success("ma'lumot o'chirildi")
    }
   
  } catch (error) {
    console.log(error);
    ElMessage.error("xatolik yuz berdi")
  }
};


</script>

<style lang="scss" scoped></style>








<!-- <div class="cards">
  <el-row>
    <el-col
      v-for="(o, index) in 6"
      :key="index"
      :span="6"
      class="cards--box"
    >
      <CardsBlog :value="o" @click="detail = { status: index }" />
    </el-col>
  </el-row>
</div> -->