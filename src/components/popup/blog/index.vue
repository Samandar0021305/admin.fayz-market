<template>
  <!-- Width="670px" -->
  <PopopLayout title="Blog" :isVisible="item">
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
      <div class="vacancy-popup">
        <el-row :gutter="60">
          <el-col :md="10" :sm="10" :xs="20" class="right-line">
            <div class="image">
              <img src="@/assets/images/blog.jpg" alt="image" />
            </div>
            <h4>Backend Developer</h4>
            <small>$500 to $1,000</small>
          </el-col>
          <el-col :md="14" :sm="14" :xs="20">
            <div class="content">
              <span
                >To manage the project successfully and achieve smooth project
                completion, the importance of soft skills cannot be
                underestimated To manage the project successfully and achieve
                smooth project completion, the importance of soft skills cannot
                be underestimated.
                <br />
                To manage the project successfully and achieve smooth project
                completion, the importance of soft skills cannot be
                underestimated To manage the project successfully and achieve
                smooth project completion, the importance of soft skills cannot
                be underestimated.</span
              >
            </div>
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
