<template>
  <CustomPages  v-loading="loading" title="Kategoriyalar" createPath="/cabinet/admin/category/create" >
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
          <tr v-for="(item, index) in lists" :key="item.id" style="cursor: pointer;">
            <td @click="detail = {status: item}">
              <span>{{ item.name }}</span>
            </td>
            <td @click="detail = {status: item}">
               <span class="image"><img :src="'https://api.fayz-market.uz'+item.image"/></span>
            </td>
            <td width="27%">
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
      </CustomTable >
    </template>
    <!-- <template #footer>
      <div class="showcase">
        <span v-if="count <= 10">{{$t("showing")}} 1 - {{ count }} {{$t("of")}} {{ count }}</span>
        <span v-else>{{$t("showing")}} 1 - 10 {{$t("of")}} {{ count }}</span>
      </div>

      
      <Pagination :limit="params.limit"
        :count="count"
        :page="1"
        @paginate="paginate"
 />
    </template> -->
  </CustomPages>
  <PopopMessages :item="detail"/>
</template>

<script setup>
import { ref, computed,onMounted,reactive } from "vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";
import PopopMessages from "@/components/popup/messages/index.vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const loading = ref(true);


const lists = computed(()=>{
  return  store.getters.categoryDataList.list
})

const count = computed(()=>{
   return  store.getters.categoryDataList.count
})

const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
};

const params = reactive({
  limit: 8,
  offset: 0,
});

onMounted(async() => {
 await getData();
});


const detail = ref(null);
const onDeleting = ref(false);
const deleteItems = ref([]);




const onDelete = async (id) => {
  try {
      const {status} = await store.dispatch("categoryDelete",id)
      await getData();
     ElMessage.success("Ma'lumot o'chirildi")
  } catch (error) {
    ElMessage.error("Ma'lumot o'chirilmadi xatolik bor qaytadan urinib ko'ring")
  }
};


function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}

const handleClick = (id)=>{
  router.push(`/cabinet/admin/category/${id}`)
}

const getData = async () => {
  loading.value = true;
  await store.dispatch("fetchCategory", { });
  loading.value = false;
};

</script>

<style lang="scss" scoped></style>
