<template>
  <!-- Width="670px" -->
  <PopopLayout title="Candidates" :isVisible="item">
    <template #header>
      <div class="popup-header">
        <div class="status">
          <span>{{ item.status && "Active" }}</span>
        </div>
        <div class="links">
          <button>
            <svgicon name="link" />
          </button>
          <button>
            <svgicon name="share" />
          </button>
          <el-popover placement="bottom" width="120" trigger="click">
            <template #reference>
              <button>
                <svgicon name="dots-horizontal" />
              </button>
            </template>
            <div class="table-action">
              <button class="edit">
                <svgicon name="edit" />
                <span>Edit</span>
              </button>
              <button class="delete">
                <svgicon name="delete" />
                <span>Delete</span>
              </button>
              <button class="view">
                <svgicon name="eye" />
                <span>View</span>
              </button>
            </div>
          </el-popover>
        </div>
      </div>
    </template>
    <template #main>
      <div class="clients-popup">
        <el-row :gutter="30">
          <el-col :md="12" :sm="12" :xs="20">
            <ul>
              <li>
                <div class="icon">
                  <svgicon name="user" />
                  <span>Name</span>
                </div>
                <div class="content"><span>Muhammad ali Eshonqulov</span></div>
              </li>
              <li>
                <div class="icon">
                  <svgicon name="phone" />
                  <span>Phone</span>
                </div>
                <div class="content"><span>+998 90 325 36 32</span></div>
              </li>
              <li>
                <div class="icon">
                  <svgicon name="email" />
                  <span>E-mail</span>
                </div>
                <div class="content">
                  <span>sohibsharipov000@gmail.com</span>
                </div>
              </li>
              <li>
                <div class="icon">
                  <svgicon name="clipboard" />
                  <span>tolib.atlassian.net</span>
                </div>
                <div class="content">
                  <button>
                    <a href="@" download>CV Sharipov...</a>
                  </button>
                </div>
              </li>
            </ul>
          </el-col>
          <el-col :md="12" :sm="12" :xs="20">
            <ul>
              <li class="block">
                <div class="icon">
                  <svgicon name="book" />
                  <span>Information</span>
                </div>
                <div class="content">
                  <span
                    >Old fashioned recipe for preventing allergies and chemical
                    sensitivities recipe for preventing allergies and chemical
                    sensitivities. <br> Old fashioned recipe for preventing allergies
                    and chemical sensitivities.</span
                  >
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </template>
  </PopopLayout>
</template>

<script setup>
import PopopLayout from "@/components/popup/layout.vue";

import { defineProps, toRefs } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
const { item } = toRefs(props);
</script>

<style lang="scss" scoped></style>
