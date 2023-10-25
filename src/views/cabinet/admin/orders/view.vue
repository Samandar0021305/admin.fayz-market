<template>
    <main class="pages pages-create">
        <div class="pages-wrapper">
            <div class="pages-header">
                <div class="pages-header-title">
                    <h4>
                 
                        <span>
                             
                        </span>
                    </h4>
                </div>
                <div class="pages-header-right-side">
                
                </div>
            </div>
            <el-scrollbar height="100%">
                <div class="pages-body">
                    <div class="pages-body-create">
                        <div class="order-view--header">

                            <el-row>
                                <el-col :span="8">
                                    <div class="order-view--header-top">
                                        <span>Umumiy summa:</span>
                                        <p>
                                            {{ data.data.overall_cost }}
                                        </p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="order-view--header-top">
                                        <span>Mijoz ismi:</span>
                                        <p>{{ data.data.name }}</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="order-view--header-top">
                                        <span>Tel raqami:</span>
                                        <p>{{ data.data.phone_number }}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="order-view order-view--card">
                            <el-row>
                                <el-col v-for="(value, index) in data.data.items" :key="index" :span="6" class="cards--box">
                                    <el-card class="cards--wrapper" :body-style="{ padding: '0px' }">
                                        <img :src="value.product.images" class="cards--wrapper--image" />
                                        <div>

                                            <h5 class="cards--wrapper--name">{{ value.product.name }}</h5>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>

                        </div>
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

import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import PopopBlog from "@/components/popup/blog/index.vue";
import Pagination from "@/components/pagination.vue";

const data = reactive({ data: "" })
const store = useStore();
const route = useRoute();


onMounted(async () => {
    const res = await store.dispatch("OrderAdmingetbyId", route.params.id);
    data.data = res.data
    console.log(data.data);

})

</script>