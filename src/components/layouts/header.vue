<template>
  <header class="header">
    <div class="collapse"></div>
    <div class="header-functions">
      <el-switch v-model="theme" />
      <!-- <el-dropdown trigger="click">
        <el-button circle class="lang">
          <img
            v-if="locale == `uz`"
            src="@/assets/images/lang-oz.png"
            alt="oz"
          />
          <img
            v-else-if="locale == `ru`"
            src="@/assets/images/lang-ru.png"
            alt="ru"
          />
          <img v-else src="@/assets/images/lang-en.png" alt="en" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="lang">
            <el-dropdown-item
              v-for="item in langs"
              :key="item.value"
              @click="chooseLang(item.value)"
              :value="item.value"
            >
              <div class="image">
                <img
                  v-if="item.value == `uz`"
                  src="@/assets/images/lang-oz.png"
                  :alt="item.value"
                />
                <img
                  v-else-if="item.value == `ru`"
                  src="@/assets/images/lang-ru.png"
                  :alt="item.value"
                />
                <img
                  v-else
                  src="@/assets/images/lang-en.png"
                  :alt="item.value"
                />
              </div>
              <div class="title">{{ item.title }}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->

      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button circle> <svgicon name="bell" /> </el-button>
        </template>
        <el-scrollbar>
          <ul class="notification-list">
            <li>
              <span class="title"> Notf. title </span>
              <span class="description">
                Notf. description Lorem ipsum dolor sit amet consectetur
              </span>
            </li>
            <li>
              <span class="title"> Notf. title </span>
              <span class="description">
                Notf. description Lorem ipsum dolor sit amet consectetur
              </span>
            </li>
            <li>
              <span class="title"> Notf. title </span>
              <span class="description">
                Notf. description Lorem ipsum dolor sit amet consectetur
              </span>
            </li>
          </ul>
        </el-scrollbar>
      </el-popover>

      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button circle>
            <img src="@/assets/images/user.png" alt="flag" />
          </el-button>
        </template>
        <el-button class="func-btn logout" @click="logout">
          Logout
          <svgicon name="export" />
        </el-button>
      </el-popover>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });

const router = useRouter();
const theme = ref(false);

// LANGUAGE SETTINGS
const langs = ref({});
const selected = ref({});
const allLangs = reactive({
  ru: {
    title: "Pусский",
    short_title: "Pус",
    value: "ru",
  },
  uz: {
    title: "O'zbek",
    short_title: "O'z",
    value: "uz",
  },
  en: {
    title: "English",
    short_title: "Eng",
    value: "en",
  },
});

// MOUNTED
onMounted(() => {
  selected.value = allLangs[locale.value];
  langs.value = { ...allLangs };

  delete langs.value[locale.value];
});

// METHODS
const chooseLang = async (lang) => {
  selected.value = allLangs[lang + ""];
  langs.value = { ...allLangs };

  delete langs.value[lang + ""];

  localStorage.setItem("lang", lang);

  locale.value = lang;
};

watch(theme, (value) => {
  const body = document.querySelector("body");
  body.classList.add("dark", "light");

  if (value) {
    body.classList.remove("light");
  } else {
    body.classList.remove("dark");
  }
});

function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("access");
  router.push(`/auth/sign-in`);
}
</script>

<style lang="scss" scoped></style>
