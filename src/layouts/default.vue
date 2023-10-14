<template>
  <div class="wrapper">
    <LayoutsSider />
    <div class="wrapper-inner">
      <LayoutsHeader />
      <router-view />
    </div>
  </div>
</template>

<script setup>

import LayoutsHeader from "../components/layouts/header.vue";
import LayoutsSider from "../components/layouts/sider.vue";

</script>

<style lang="scss" scoped></style>
