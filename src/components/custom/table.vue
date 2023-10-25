<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <slot name="header"> </slot>
        </tr>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
    <slot name="empty"></slot>
    <slot name="popup" v-if="$slots && $slots.popup"></slot>
    <div class="table-popup" v-else-if="deleteItems && deleteItems.length">
      <svgicon name="close" @click="closeDeleting" />
      <span>
        <small>{{ deleteItems && deleteItems.length }}</small>
        {{ "item was selected" }}
      </span>
      <el-button @click="onDelete">
        <svgicon name="delete" />
        <span>{{ "Delete" }}</span>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { defineProps, toRefs, defineEmits } from "vue";

const props = defineProps({
  deleteItems: {
    type: Array,
    default: [],
  },
});
const { deleteItems } = toRefs(props);

const emit = defineEmits();

function closeDeleting() {
  emit("closeDeleting");
}
function onDelete() {
  emit("onDelete");
}
</script>

<style></style>
