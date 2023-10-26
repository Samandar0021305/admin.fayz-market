<template>
  <main class="pages pages-create">
    <div class="pages-wrapper">
      <div class="pages-header">
        <div class="pages-header-title">
          <h4>
            <router-link :to="pathToBack"> {{ title }} |</router-link>
            <span>
               <span>{{ title }}</span></span
            >  qo'shish
          </h4>
        </div>
       
      </div>
      <el-scrollbar height="100%">
        <div class="pages-body">
          <div class="pages-body-create">
            <slot></slot>
          </div>
        </div>
      </el-scrollbar>
      <div class="pages-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps, ref, toRefs, defineEmits } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  pathToBack: {
    type: String,
    default: "#",
  },
});
const { title, pathToBack } = toRefs(props);

const emit = defineEmits();

const activeLangTab = ref("uz");


</script>
