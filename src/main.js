import { createApp } from "vue";
import  VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";



import ConfigApi from "./api/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/scss/index.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";


createApp(App).mount("#app");

store.$axios = ConfigApi;


const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(ElementPlus);
app.use(VueApexCharts);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.use(API);
app.config.globalProperties.$axios = ConfigApi;

app.mount("#app");