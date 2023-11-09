

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
            <span>{{ "Telefon raqami" }} </span>
          </th>
          <th>
            <span>{{ "Ummumiy narh" }} </span>
          </th>
          <th>
            <span>{{ "Mahsulot soni" }} </span>
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
        <span v-if="count <= 10">{{$t("showing")}} 1 - {{ count }} {{$t("of")}} {{ count }}</span>
        <span v-else>{{$t("showing")}} 1 - 10 {{$t("of")}} {{ count }}</span>
      </div>

      
      <Pagination :limit="params.limit"
        :count="count"
        :page="1"
        @paginate="paginate"
 />
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


const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
};

const params = reactive({
  limit: 10,
  offset: 0,
});



const lists = computed(()=>{
  return  store.getters.PaymentsList.list
})

const count = computed(()=>{
  return store.getters.PaymentsList.count
})

onMounted(async() => {
  await getData()
});


const onDelete = async (id) => {
  try {
    const {status} = await store.dispatch("paymentsDelete",id);
     await getData()
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

const getData = async () => {
  loading.value = true;
  await store.dispatch("fectPayments", { params: params });
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
