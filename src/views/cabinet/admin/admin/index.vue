<template>
    <CustomPages v-loading="loading" title="Admin" createPath="/cabinet/admin/admin/create">
      <template #default>
        <CustomTable
        :deleteItems="deleteItems"
        @closeDeleting="closeDeleting"
        @onDelete="onDelete"
      >
        <template #header>
          <th>
            <span>{{ "ismi" }} </span>
          </th>
          <th>
            <span>{{ "telefon raqami" }} </span>
          </th>
          
          
          <th>
            <span>{{ "Actions" }} </span>
          </th>
        </template>
        <template #body v-if="lists">
          <tr v-for="(item, index) in lists" :key="item.id"  style="cursor: pointer;">
            <td width="200px" @click="detail = {status: item}">
              <span>{{ item.firstname }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.phone_number }}</span>
            </td>
            
            <td width="200px">
              <ul class="table--action">
                <li @click="onDelete(item.id)">
                   <svgicon name="deletebtn" />
                 </li> 
                <li @click="handleClick(item.id)">
                   <svgicon name="edit" />
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
    <PopopCandidates :item="detail" />
  </template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

import PopopCandidates from "@/components/popup/candidates/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter()
const store = useStore();

const detail = ref(null);

const loading = ref(true)

const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
};

const params = reactive({
  limit: 10,
  offset: 0,
});

const lists = computed(()=>{
  return store.getters.getAdminsList.list
})

const count = computed(()=>{
  return store.getters.getAdminsList.count
})

onMounted(async()=>{
  await getData()
})

const onDeleting = ref(false);
const deleteItems = ref([]);


const onDelete = async (id) => {
  try {
    const res = store.dispatch("adminDelete",id)
    await getData()
    ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });

   
  } catch (error) {
    console.log(error);
  }
};



function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
 router.push(`/cabinet/admin/admin/${id}`)
}



const getData = async () => {
  loading.value = true;
  await store.dispatch("fetchAdmin", { params: params });
  loading.value = false;
};

</script>
