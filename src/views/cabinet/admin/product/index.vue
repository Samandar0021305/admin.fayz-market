<template>
  <CustomPages title="Mahsulotlar" createPath="/cabinet/admin/product/create">
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
              <span v-if="item.brand">{{ item.brand.name}}</span>
            </td>
            <td @click="detail = {status: item}">
              <span v-if="item.category">{{ item.category.name | "new"}} </span>
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
            <!-- <td width="84px">
              <el-popover placement="bottom" width="120" trigger="click">
                <template #reference>
                  <svgicon class="dots" name="dots-horizontal" />
                </template>
                <div class="table-action">
                  <button
                    class="edit"
                    @click="handleClick(item.id)"
                  >
                    <svgicon name="edit" />
                    <span>Edit</span>
                  </button>
                  <button class="delete" @click="onDelete(item.id)">
                    <svgicon name="delete" />
                    <span>Delete</span>
                  </button>
                  <button class="view" @click="detail = {status: item}">
                    <svgicon name="eye" />
                    <span>View</span>
                  </button>
                </div>
              </el-popover>
            </td> -->
          </tr>
        </template>
        <template #empty v-else>
          <CustomEmpty />
        </template>
      </CustomTable>
    </template>
    <template #footer>
      <div class="showcase">
        <span>Showing 1 - 10 of 350</span>
      </div>
      
      <Pagination :limit="10" :count="count" :page="1" />
    </template>
  </CustomPages>
  <PopopClients :item="detail" />
</template>

<script setup>
import { ref, reactive, computed ,onMounted} from "vue";

import PopopClients from "@/components/popup/clients/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore();

const detail = ref(null);

const lists = computed(()=>{
  return  store.state.product.data.list
})
const count = computed(()=>{
  return store.state.product.data.count
})

onMounted(() => {
  store.dispatch("fetchProduct", { params: { limit: 0, offset: 0 } });
});

const onDeleting = ref(false);
const deleteItems = ref([]);

const onDelete = async (id) => {
  try {
      const data = await store.dispatch("productDelete",id)
      store.dispatch("fetchProduct", { params: { limit: 0, offset: 0 } });
      ElMessage.success("ma'lumot o'chirildi")
       
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

</script>

<style lang="scss" scoped></style>
