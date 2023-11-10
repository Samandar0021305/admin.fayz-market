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
            <span>{{ "Ismi" }} </span>
          </th>
          <th>
            <span>{{ "Familiyasi" }} </span>
          </th>
          <th>
            <span>{{ "Telefon raqami" }} </span>
          </th>
          
          <th>
            <span>{{ "Manzili" }} </span>
          </th>
          
          <th>
            <span>{{ "Holati" }} </span>
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
              <span class="">{{ item.region_name }}  {{ item.district_name }}</span>
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
        <span v-if="count <= 10">{{$t("showing")}} 1 - {{ count }} {{$t("of")}} {{ count }}</span>
        <span v-else>{{$t("showing")}} 1 - 8 {{$t("of")}} {{ count }}</span>
      </div>

      
      <Pagination :limit="params.limit"
        :count="count"
        :page="1"
        @paginate="paginate"
 />
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


const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
};

const params = reactive({
  limit: 8,
  offset: 0,
});


const lists = computed(()=>{
  return store.getters.getUsersList.list
})

const count = computed(()=>{
  return store.getters.getUsersList.count
})

onMounted(async()=>{
 await getData()
 console.log(lists);
})


const onDeleting = ref(false);
const deleteItems = ref([]);


const onDelete = async (id) => {
  try {
    const res = await store.dispatch("usersDelete",id)
     await getData();
    ElMessage.success("Ma'lumot o'chirildi");
  } catch{ 
    ElMessage.error("Ma'lumot o'chirilmadi hatolik bor");
  }
};




function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
  router.push(`/cabinet/admin/klentlar/${id}`)
}



const getData = async () => {
  loading.value = true;
  await store.dispatch("fetchUsers", { params: params });
  loading.value = false;
};

</script>

<style lang="scss" scoped></style>
