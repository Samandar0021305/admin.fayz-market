<template>
  <CustomPages v-loading="loading" title="Brendlar" createPath="/cabinet/admin/brend/create">
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
            <span>{{ "Rasmi" }} </span>
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
              <span class="image"><img :src="item.image" alt=""></span>
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
        <span v-if="count <= 10">Showing 1 - {{count}} of {{count}}</span>
        <span v-else>Showing 1 - 10 of {{count}}</span>
      </div>
      <Pagination :limit="10" :count="count" :page="1" />
    </template>
  </CustomPages>
  <PopopPrtfolio :item="detail" />

</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import PopopPrtfolio from "@/components/popup/brend/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter()
const loading = ref(true)
const detail = ref(null);

const onDeleting = ref(false);
const deleteItems = ref([]);

const lists = computed(()=>{
  return  store.getters.brandsDataList.list
})

const count = computed(()=>{
  return  store.getters.brandsDataList.count
})


onMounted(() => {
  Promise.all([
    store.dispatch("fetchBrands", { params: { limit: 0, offset: 0 } })
  ]).finally(()=>{
    loading.value = false
  })
});



const onDelete = async (id) => {
  try {
    const {status} = await store.dispatch("brandDelete",id)
    store.dispatch("fetchBrands", { params: { limit: 0, offset: 0 } });
      
    ElMessage.success("ma'lumot o'chirildi")
    }
     catch (error) {
    console.log(error);
    ElMessage.error("xatolik bor qaytadan harakat qilib ko'ring");
  }
};


function onSelectedAll(e) {
  deleteItems.value = [];
  onDeleting.value = e.target.checked;
  if (onDeleting.value) {
    deleteItems.value = list.value.map((el) => el.id);
  } else {
    deleteItems.value = [];
  }
}

function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
  router.push(`/cabinet/admin/brend/${id}`)
 }
</script>

<style lang="scss" scoped></style>
