<template>
    <CustomPages v-loading="loading"  title="Xabarlar" >
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
              <span>{{ "comment" }} </span>
            </th>
            <th>
              <span>{{ "mahsulot raqami" }} </span>
            </th>
            <th>
              <span>{{ "Actions" }} </span>
            </th>
          </template>
          <template #body v-if="lists">
            <tr v-for="(item, index) in lists.value" :key="item.id"  style="cursor: pointer;">
              <td>
                <span>{{ item.user.firstname }}</span>
              </td>
              <td>
                <span>{{ item.comment }}</span>
              </td>
              <td>
                <span>{{ item.product }}</span>
              </td>
           
              <td width="200px">
                <ul class="table--action">
                  <li @click="onDelete(item.id)">
                     <svgicon name="deletebtn" />
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
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import {getMessage , deleteMessage} from "../../../../module/message.api"
  
  import CustomTable from "@/components/custom/table.vue";
  import CustomPages from "@/components/custom/pages/index.vue";
  import Pagination from "@/components/pagination.vue"; 
  
  const lists = reactive({value:""})
  const loading = ref(true)
  const count = ref("")
  
  const paginate = async (page) => {
  params.offset = (page - 1) * params.limit;
  await getData();
  };

  const params = reactive({
  limit: 10,
  offset: 0,
  });



  const fetchingMessage = async()=>{
    return await getMessage(params)
  }

  onMounted(()=>{
    fetchingMessage().then(res=>{
      count.value = res.count
      lists.value = res.results
      loading.value = false
      console.log(res.data);
    })
  })
  

  
  
  const onDelete = async (id) => {
    try {
       const res = await deleteMessage(id)
       fetchingMessage().then(res=>{
       count.value = res.count
       lists.value = res.results
      
    })
       ElMessage.success("Ma'lumot o'chirildi")
     
    } catch (error) {
      console.log(error);
      ElMessage.error("Xatolik yuz berdi")
    }
  };
  
  
  </script>
  
  <style lang="scss" scoped></style>
  
  
  
  
  
  
  
  
  