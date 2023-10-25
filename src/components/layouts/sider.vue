<template>
  <div class="sider" :class="{ 'sider--collapse': isCollapse }">
    <div class="sider-header">
      <div class="logo">
        <!-- <img src="../../assets/images/fayzmarket.jpg" alt=""> -->
        <svgicon name="logo" /> 
      </div>
    </div>
    <el-scrollbar height="100%">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <template v-for="(item, index) in menu" :key="index">
          <el-sub-menu v-if="item.children" :index="index">
            <template #title>
              <svgicon :name="item.icon" />
              <span>{{ item.name.en }}</span>
            </template>

            <router-link
              v-for="(el, idx) in item.children"
              :key="index"
              :to="el.path"
            >
              <el-menu-item :index="index + '-' + idx">
                <template #title>
                  <svgicon :name="el.icon" />
                  <span>{{ el.name.en }}</span>
                </template>
              </el-menu-item>
            </router-link>
          </el-sub-menu>

          <router-link v-else :to="item.path">
            <el-menu-item :index="index">
              <svgicon :name="item.icon" />
              <span>{{ item.name.en }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-scrollbar>
<!-- 
    <div class="sider-footer">
      <router-link to="/cabinet/admin/setting">
        <div class="setting">
          <el-icon><setting /></el-icon>
          <span>Settings</span>
        </div>
      </router-link>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const menu = store.getters.menu;

const isCollapse = ref(false);

const updateViewportWidth = () => {
  isCollapse.value = window.innerWidth <= 992 ? true : false;;
};

onMounted(() => {
  updateViewportWidth();
  window.addEventListener("resize", updateViewportWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateViewportWidth);
});
</script>
