<template>
  <main class="pages pages-create">
    <div class="pages-wrapper">
      <div class="pages-header">
        <div class="pages-header-title">
          <h4>
            <router-link :to="pathToBack"> {{ title }} |</router-link>
            <span>
               <span>{{ title }}</span> Tahrirlash</span
            >
          </h4>
        </div>
        <div class="pages-header-right-side">
          <el-switch v-model="createStatus" size="large" />
          <span>Status</span>
        </div>
      </div>
      <el-scrollbar height="100%">
        <div class="pages-body">
          <div class="pages-body-create">
            <!-- <div class="lang-tabs">
              <button
                @click="changeLangTabs('uz')"
                :class="{ active: (activeLangTab == 'uz') }"
              >
                <img src="@/assets/images/lang-oz.png" alt="lang tab image" /><span
                  >O'z</span
                >
              </button>
              <button
                @click="changeLangTabs('oz')"
                :class="{ active: (activeLangTab == 'oz') }"
              >
                <img src="@/assets/images/lang-oz.png" alt="lang tab image" /><span
                  >Ўз</span
                >
              </button>
              <button
                @click="changeLangTabs('ru')"
                :class="{ active: (activeLangTab == 'ru') }"
              >
                <img src="@/assets/images/lang-ru.png" alt="lang tab image" /><span
                  >Ру</span
                ></button
              ><button
                @click="changeLangTabs('en')"
                :class="{ active: (activeLangTab == 'en') }"
              >
                <img src="@/assets/images/lang-en.png" alt="lang tab image" /><span
                  >En</span
                >
              </button>
            </div> -->
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
const createStatus = ref(false);

const activeLangTab = ref("uz");

function changeLangTabs(event) {
  activeLangTab.value = event;
  emit("activeLangTab", event);
}
</script>
