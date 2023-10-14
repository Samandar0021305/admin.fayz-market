<template>
    <CustomPages title="Admin" createPath="/cabinet/admin/admin/create">
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
          <span>Showing 1 - {{ count }} of 10</span>
        </div>
        <Pagination :limit="10" :count="count" :page="2" />
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

const lists = computed(()=>{
  return store.getters.getAdminsList.list
})

const count = computed(()=>{
  return store.getters.getAdminsList.count
})

onMounted(()=>{
  store.dispatch("fetchAdmin",{ params: { limit: 0, offset: 0 } })
  console.log(lists);
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
    const res = store.dispatch("adminDelete",id)
    ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });

   
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
 router.push(`/cabinet/admin/admin/${id}`)
}

</script>
