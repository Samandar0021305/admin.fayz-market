<template>
  <!-- Width="670px" -->
  <PopopLayout title="Mahsulotlar" v-if="current"  :isVisible="current">
    <template #header>
      <div v-if="current != {}" class="popup-header">
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
            <div class="table-action" v-if="current">
              <button class="edit"  @click="handleClick(current.id)">
                <svgicon name="edit" />
                <span>Edit</span>
              </button>
              <button class="delete" @click="onDelete(current.id)">
                <svgicon name="delete" />
                <span >Delete</span>
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
              <img :src="'https://api.fayz-market.uz'+current.images[0].photo" :alt="item.title" />
            </div>
            
            <a :href="item.url" target="_blank">{{item.url}}</a>
          </el-col>
          <el-col :md="14" :sm="14" :xs="20">
            <div class="content">
              <span
                >
                <h4>{{current?.name}}</h4>
                <ul>
                  <li style="margin-bottom: 2px;">
                    brand nomi: {{current?.brand?.name}}
                  </li>
                  <li style="margin-bottom: 2px;">
                     narxi: {{ current?.price }} so'm
                  </li>
                  <li style="margin-bottom: 2px;">
                    Kategoriya: {{ current?.category?.name }}
                  </li>
                </ul>
                </span
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

import { useRouter } from "vue-router";
import { defineProps, toRefs ,reactive , watch, ref } from "vue";
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()

const onDelete = async (id) => {
  try {
      const data = await store.dispatch("productDelete",id)
      store.dispatch("fetchProduct", { params: { limit: 0, offset: 0 } });
      ElMessage.success("ma'lumot o'chirildi")
      current.value = null
       
  } catch (error) {
    console.log(error);
  }
};
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
const { item } = toRefs(props);

let current =  ref();
watch(item,(newValue,oldValue)=>{
  current.value = newValue.status
  console.log(item);
})

const handleClick = (id)=>{
  current.value = null

  router.push(`/cabinet/admin/product/${id}`)
}

</script>

<style lang="scss" scoped></style>
