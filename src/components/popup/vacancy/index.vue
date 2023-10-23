<template>
  <!-- Width="670px" -->
  <PopopLayout title="to'lovlar" :isVisible="item">
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
      <div class="vacancy-popup payments">
          <el-row :gutter="30">
        <el-col :md="12" :sm="12" :xs="20" class="right-line">
          <ul class="payments--list">
            <li>
              <div class="icon">
                <svgicon name="user" />
                <span>Name</span>
              </div>
              <div class="content"><span>{{ current.firstname }}</span></div>
            </li>
            <li>
              <div class="icon">
                <svgicon name="phone" />
                <span>Phone</span>
              </div>
              <div class="content"><span>{{ current.phone_number }}</span></div>
            </li>
            
          </ul>
        </el-col>
        <el-col :md="12" :sm="12" :xs="20">
          <ul>
            <li class="block">
              <div class="icon">
                <svgicon name="book" />
                <span>Information</span>
              </div>
              <div class="content payments--wrap">
                  <span>Manzil : {{ current.region || "Tashkent" }}</span>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
      </div>
    </template>
  </PopopLayout>
</template>

<script setup>
import PopopLayout from "@/components/popup/layout.vue";

import { defineProps, toRefs, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

})



</script>

<style lang="scss" scoped></style>
