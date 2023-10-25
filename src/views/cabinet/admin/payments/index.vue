

<template>
    <CustomPages v-loading="loading" title="To'lovlar" >
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
            <span>{{ "ummumiy narh" }} </span>
          </th>
          <th>
            <span>{{ "mahsulot soni" }} </span>
          </th>
          
        </template>
        <template #body v-if="lists">
          <tr v-for="(item, index) in lists" :key="item.id"  style="cursor: pointer;">
            <td width="300px" @click="detail = {status: item}">
              <span>{{ item.name }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.phone_number }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.overall_cost }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.overall_num_of_products }}</span>
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
    <PopopPayments  :item="detail" />
  </template>

<script setup>
import { ref, reactive, computed ,onMounted} from "vue";
import {useRouter} from "vue-router"
import PopopPayments from "@/components/popup/payments/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
const store = useStore();
const router = useRouter()
const detail = ref(null);
const loading = ref(true)
const onDeleting = ref(false);
const deleteItems = ref([]);
const list = reactive([
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
]);



const lists = computed(()=>{
  return  store.getters.PaymentsList.list
})

const count = computed(()=>{
  return store.getters.PaymentsList.count
})

onMounted(() => {
  Promise.all([
    store.dispatch("fectPayments", { params: { limit: 0, offset: 0 } })
  ]).finally(()=>{
    loading.value= false;
  })
});


const onDelete = async (id) => {
  try {
    const {status} = await store.dispatch("paymentsDelete",id);
    store.dispatch("fectPayments", { params: { limit: 0, offset: 0 } });
    if(status){
      ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });
    }

  } catch (error) {
    console.log(error);
  }
};

function toggle(e, itemId) {
  const f = deleteItems.value.findIndex((item) => item == itemId);

  if (f != -1) {
    deleteItems.value.splice(f, 1);
  } else {
    deleteItems.value.push(itemId);
  }
  if (deleteItems.value.length == list.length) {
    onDeleting.value = true;
  } else {
    onDeleting.value = false;
  }
}

function onSelectedAll(e) {
  deleteItems.value = [];
  onDeleting.value = e.target.checked;
  if (onDeleting.value) {
    deleteItems.value = list.map((el) => el.id);
  } else {
    deleteItems.value = [];
  }
}

function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
  router.push(`/cabinet/admin/payments/${id}`)
 }

</script>

<style lang="scss" scoped></style>
