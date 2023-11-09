<!-- <template>
  <main class="pages">
    <div class="pages-wrapper">
      <div class="pages-header">
        <div class="pages-header-title">
          <h2>{{ title }}</h2>
        </div>
        <div class="pages-header-right-side">
          <div class="filter">
            <el-input
              v-model="search"
              :placeholder="$t('search')"
              prefix-icon="Search"
            />
          </div>

          <div class="create" v-show="createPath">
            <el-button type="primary" @click="$router.push(createPath)">
              <svgicon name="add-plus" />
              <span>{{ title }} qo'shish</span>
            </el-button>
          </div>
        </div>
      </div>
      <el-scrollbar height="100%">
        <div class="pages-body">
          <div class="pages-body-header">
            <button
              class="dropdown"
              :class="{ open: !isOpenFilter }"
              @click="isOpenFilter = !isOpenFilter"
            >
              <div class="dropdown-header">
                <svgicon name="filter" />
                <span>{{ $t("filters") }}</span>
                <svgicon class="chevron-down" name="chevron-down" />
              </div>
              <div class="dropdown-body">
                <ul>
                  <li>option 1</li>
                  <li>option 2</li>
                </ul>
              </div>
              <span
                class="close-dropdown"
                :class="{ open: !isOpenFilter }"
                @click="isOpenFilter = false"
              >
              </span>
            </button>
            <button class="export">
              <svgicon name="export" />
              <span>{{ $t("export") }}</span>
            </button>
          </div>
          <slot></slot>
        </div>
      </el-scrollbar>
      <div class="pages-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from "vue";

import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  createPath: {
    type: String,
    default: "",
  },
});
const { title, createPath } = toRefs(props);

const search = ref("");
const isOpenFilter = ref(true);

const emit = defineEmits();

watch(search, (value) => {
  emit("onSearch", search.value || "");
});
</script> -->



<template>
  <main class="pages">
    <div class="pages-wrapper">
      <div class="pages-header">
        <div class="pages-header-title">
          <h2>{{ title }}</h2>
        </div>
        <div class="pages-header-right-side">
          <!-- <div class="filter">
            <el-input
              v-model="search"
              :placeholder="$t('search')"
              prefix-icon="Search"
            />
          </div> -->

          <div class="create" v-show="createPath">
            <el-button type="primary" @click="$router.push(createPath)">
              <svgicon name="add-plus" />
              <!-- <span v-if="locale != 'uz'"> {{ title }} {{ $t("Qo'shish") }}</span> -->
              <span> {{ title }} {{ $t("Qo'shish") }}</span>
            </el-button>
          </div>
        </div>
      </div>
      <el-scrollbar height="100%">
        <div class="pages-body">
          <div class="pages-body-header">
            <button
              class="dropdown"
              :class="{ open: !isOpenFilter }"
              @click="isOpenFilter = !isOpenFilter"
            >
              <div class="dropdown-header">
                <svgicon name="filter" />
                <span>{{ $t("filters") }}</span>
                <svgicon class="chevron-down" name="chevron-down" />
              </div>
              <div class="dropdown-body">
                <ul>
                  <li>option 1</li>
                  <li>option 2</li>
                </ul>
              </div>
              <span
                class="close-dropdown"
                :class="{ open: !isOpenFilter }"
                @click="isOpenFilter = false"
              >
              </span>
            </button>
            <button class="export">
              <svgicon name="export" />
              <span>{{ $t("export") }}</span>
            </button>
          </div>
          <slot></slot>
        </div>
      </el-scrollbar>
      <div class="pages-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps, ref, toRefs, watch } from "vue";

import { useI18n } from "vue-i18n";
const { locale } = useI18n({ useScope: "global" });

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  createPath: {
    type: String,
    default: "",
  },
});
const { title, createPath } = toRefs(props);

const search = ref("");
const isOpenFilter = ref(true);

const emit = defineEmits();

watch(search, (value) => {
  console.log(value);
  emit("onSearch", search.value || "");
});
</script>
