<template>
  <!-- Width="670px" -->
  <PopopLayout title="categoriya" v-if="current" :isVisible="item">
    <template #header>
      <div v-if="current != {}" class="popup-header">
        <div class="status">
          <span>{{ item.status && "Active" }}</span>
        </div>
        <div class="links">
          <button>
            <svgicon name="link" />
          </button>
          <button>
            <svgicon name="share" />
          </button>
          <el-popover placement="bottom" width="120" trigger="click">
            <template #reference>
              <button>
                <svgicon name="dots-horizontal" />
              </button>
            </template>
            <div class="table-action">
              <button class="edit" @click="handleClick(current.id)">
                <svgicon name="edit" />
                <span>Edit</span>
              </button>
              <button class="delete"  @click="onDelete(current.id)">
                <svgicon name="delete"/>
                <span>Delete</span>
              </button>
            
            </div>
          </el-popover>
        </div>
      </div>
    </template>
    <template #main>
      <div class="vacancy-popup">
        <el-row :gutter="60">
          <el-col :md="10" :sm="10" :xs="20" class="right-line">
            <div class="image">
              <img :src="'https://api.fayz-market.uz'+current.image" :alt="item.title" />
            </div>
            
            <a :href="item.url" target="_blank">{{item.url}}</a>
          </el-col>
          <el-col :md="14" :sm="14" :xs="20">
            <div class="content">
              <span
                >
                <h4>{{current.name}}</h4>
                </span
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </PopopLayout>
</template>

<script setup>
import PopopLayout from "@/components/popup/layout.vue";

import { defineProps, toRefs, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
const router = useRouter();
// console.log(router.path);

let current=  ref();
const store = useStore()


const onDelete = async (id) => {
  try {
      const data = await store.dispatch("categoryDelete",id)
      store.dispatch("fetchCategory", { params: { limit: 0, offset: 0 } });
      ElMessage.success("Ma'lumot o'chirildi")
      current.value = null
       
  } catch (error) {
    console.log(error);
  }
};
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
const { item } = toRefs(props);
watch(item,(newValue,oldValue)=>{
  current.value = newValue.status
})

const handleClick = (id)=>{
  current.value = null

  router.push(`/cabinet/admin/category/${id}`)
}


</script>

<style lang="scss" scoped></style>
