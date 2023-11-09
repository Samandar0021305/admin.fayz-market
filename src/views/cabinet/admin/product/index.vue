<template>
  <CustomPages v-loading="loading" title="Mahsulotlar" createPath="/cabinet/admin/product/create">
    <template #default>
      <CustomTable
        :deleteItems="deleteItems"
        @closeDeleting="closeDeleting"
        @onDelete="onDelete"
      >
        <template #header>
          <th>
            <span>{{ "Name" }} </span>
          </th>
          <th>
            <span>{{ "Narxi" }} </span>
          </th>
          <th>
            <span>{{ "Brand nomi" }} </span>
          </th>
          <th>
            <span>{{ "Kategoriya" }} </span>
          </th>
          <th>
            <span>{{ "Actions" }} </span>
          </th>
        </template>
        <template #body v-if="lists">
          <tr v-for="(item, index) in lists" :key="item.id">
            <td @click="detail = {status: item}">
              <span>{{ item?.name }}</span>
            </td>
            <td @click="detail = {status: item}">
              <span>{{ item.price }}</span>
            </td>
            <td @click="detail = {status: item}">
              <span v-if="item.brand">{{ item.brand?.name}}</span>
            </td>
            <td @click="detail = {status: item}">
              <span v-if="item.category">{{ item.category?.name}} </span>
            </td>
            <td width="84px">
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
  <PopopClients :item="detail" />
</template>

<script setup>
import { ref, computed ,onMounted,reactive} from "vue";

import PopopClients from "@/components/popup/clients/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore();

const detail = ref(null);
const loading = ref(true);

const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
};

const params = reactive({
  limit: 10,
  offset: 0,
});


const lists = computed(()=>{
  return  store.state.product.data.list
})
const count = computed(()=>{
  return store.state.product.data.count
})

onMounted(async() => {
    await getData()
});

const onDeleting = ref(false);
const deleteItems = ref([]);

const onDelete = async (id) => {
  try {
      const data = await store.dispatch("productDelete",id)
      store.dispatch("fetchProduct", { params: { limit: 0, offset: 0 } });
      ElMessage.success("Ma'lumot o'chirildi")
       
  } catch (error) {
    console.log(error);
  }
};


function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}


const router = useRouter()

const handleClick = (id)=>{
  router.push(`/cabinet/admin/product/${id}`)
}

const getData = async () => {
  loading.value = true;
  await store.dispatch("fetchProduct", { params: params });
  loading.value = false;
};


</script>

<style lang="scss" scoped></style>
