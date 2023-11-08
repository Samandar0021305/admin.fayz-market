<template>
  <!-- Width="670px" -->
  <PopopLayout title="Candidates"  v-if="current" :isVisible="item">
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
            <div class="table-action" v-if="current">
              <button class="edit"  @click="handleClick(current.id)">
                <svgicon name="edit" />
                <span>Edit</span>
              </button>
              <button class="delete" @click="onDelete(current.id)">
                <svgicon name="delete" />
                <span>Delete</span>
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
                <div class="content"><span>{{ item.status.firstname }}</span></div>
              </li>
              <li>
                <div class="icon">
                  <svgicon name="phone" />
                  <span>Phone</span>
                </div>
                <div class="content"><span>{{ item.status.phone_number }}</span></div>
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
         
        </el-row>
      </div>
    </template>
  </PopopLayout>
</template>

<script setup>
import PopopLayout from "@/components/popup/layout.vue";


import { useStore } from "vuex";
import { defineProps, toRefs, watch, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore()

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});

const onDelete = async (id) => {
  try {
      const data = await store.dispatch("adminDelete",id)
      store.dispatch("fetchBrands", { params: { limit: 0, offset: 0 } });
      ElMessage.success("Ma'lumot o'chirildi")
      current.value = null
       
  } catch (error) {
    console.log(error);
  }
};


const { item } = toRefs(props);

let current=  ref();
watch(item,(newValue,oldValue)=>{
  current.value = newValue.status
})

const handleClick = (id)=>{
  current.value = null
  router.push(`/cabinet/admin/admin/${id}`)
}

</script>

<style lang="scss" scoped></style>
