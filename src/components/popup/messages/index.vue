<template>
  <!-- Width="670px" -->
  <PopopLayout title="categoriya" :isVisible="item">
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
              <button class="edit">
                <svgicon name="edit" />
                <span>Edit</span>
              </button>
              <button class="delete">
                <svgicon name="delete" />
                <span>Delete</span>
              </button>
              <button class="view">
                <svgicon name="eye" />
                <span>View</span>
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
              <img :src="current.image" :alt="item.title" />
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

import { defineProps, toRefs, watch, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// console.log(router.path);

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
const { item } = toRefs(props);
let current=  reactive({});
watch(item,(newValue,oldValue)=>{
  current = newValue.status
   console.log(newValue.status);
})



</script>

<style lang="scss" scoped></style>
