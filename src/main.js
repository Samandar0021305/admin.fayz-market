import { createApp } from "vue";
import  VueApexCharts from "vue3-apexcharts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";

// import {registerLicense} from '@syncfusion/ej2-base';
// import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';
// registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1NpR2JGfV5yd0VDallXTnJaUiweQnxTdEZiWX5acHFQQGRZVEJ/Vw==");

// import { ButtonPlugin } from '@syncfusion/ej2-vue-buttons';

// import {ButtonPlugin} from "@syncfusion/ej2-vue-buttons"
// import { FormValidator } from '@syncfusion/ej2-inputs';

// import API from "./service";
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
// app.use(RichTextEditorPlugin);
// app.use(ButtonPlugin);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.use(API);
app.config.globalProperties.$axios = ConfigApi;

app.mount("#app");