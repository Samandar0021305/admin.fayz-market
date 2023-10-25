<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() =>
  import(`../assets/icons/${props.name}.svg`)
);
</script>

<template>
  <div class="svg">
    <component :is="icon" class="fill-current" />
  </div>
</template>

<style>
.svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
