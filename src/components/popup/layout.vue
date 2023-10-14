<template>
  <el-dialog v-model="isVisible"  draggable :show-close="false">
    <template #header>
      <slot name="header"></slot>
    </template>

    <div class="el-dialog-body">
      <h2>{{ title }}</h2>
      <main>
        <slot name="main"></slot>
      </main>
    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, toRefs } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "title",
  },
 
  status: {
    type: Boolean,
    String,
    default: "Avtive",
  },
});
const { isVisible, title, Width, status } = toRefs(props);
</script>

<style lang="scss" scoped></style>
