<template>
  <CustomPages v-loading="loading" title="Mijozlar" createPath="/cabinet/admin/klentlar/create">
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
            <span>{{ "familiyasi" }} </span>
          </th>
          <th>
            <span>{{ "telefon raqami" }} </span>
          </th>
          
          <th>
            <span>{{ "Manzili" }} </span>
          </th>
          
          <th>
            <span>{{ "holati" }} </span>
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
              <span class="">{{ item.lastname }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.phone_number }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.region }}</span>
            </td>
            <td width="300px" @click="detail = {status: item}">
              <span class="">{{ item.is_active == true ? "Active" : "no active" }}</span>
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
        <span>Showing 1 - 10 of {{ count }}</span>
      </div>
      <Pagination :limit="10" :count="count" :page="2" />
    </template>
  </CustomPages>
  <PopopVacancy :item="detail" />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

import PopopVacancy from "@/components/popup/vacancy/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const detail = ref(null);
const loading = ref(true)

const lists = computed(()=>{
  return store.getters.getUsersList.list
})

const count = computed(()=>{
  return store.getters.getUsersList.count
})

onMounted(()=>{
  Promise.all([
    store.dispatch("fetchUsers",{})
  ]).finally(()=>{
    loading.value = false;
  })
})


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


const onDelete = async (id) => {
  try {
    const res = await store.dispatch("usersDelete",id)
    store.dispatch("fetchUsers",{});
    ElMessage.success("ma'lumot o'chirildi");
  } catch{ 
    ElMessage.error("ma'lumot o'chirilmadi hatolik bor");
  }
};




function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
  router.push(`/cabinet/admin/klentlar/${id}`)
}

</script>

<style lang="scss" scoped></style>
