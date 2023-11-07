<template>
    <!-- Width="670px" -->
    <PopopLayout title="to'lovlar" v-if="current" :isVisible="item">
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
        <div class="vacancy-popup payments">
            <el-row :gutter="30">
          <el-col :md="12" :sm="12" :xs="20" class="right-line">
            <ul class="payments--list">
              <li>
                <div class="icon">
                  <svgicon name="user" />
                  <span>Name</span>
                </div>
                <div class="content"><span>{{ current.name }}</span></div>
              </li>
              <li>
                <div class="icon">
                  <svgicon name="phone" />
                  <span>Phone</span>
                </div>
                <div class="content"><span>{{ current.phone_number }}</span></div>
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
                <div class="content payments--wrap" style="margin-top: 10px;" >
                    <span>soni :  {{ current.overall_num_of_products }}</span>
                    <span>ummumiy narhi : {{ current.overall_cost  }}</span>
                    <span>manzil : {{ current.address }}</span>
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
  
  import { defineProps, toRefs, watch, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from "vuex";
  const router = useRouter();
  
  const props = defineProps({
    item: {
      type: Object,
      default: null,
    },
  });
  const { item } = toRefs(props);
  let current=  ref();
  watch(item,(newValue,oldValue)=>{
    current.value = newValue.status
  })
  
  const store = useStore()

const onDelete = async (id) => {
  try {
      const data = await store.dispatch("OrderAdminDelete",id)
      store.dispatch("fetchOrderAdmin", { params: { limit: 0, offset: 0 } });
      ElMessage.success("ma'lumot o'chirildi")
      current.value = null
       
  } catch (error) {
    console.log(error);
  }
};
  
  </script>
  
  <style lang="scss" scoped></style>
  