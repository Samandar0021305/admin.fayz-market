<template>
    <CustomPagesCreate title="Mahsulot yangilash" pathToBack="/cabinet/admin/product">
       <template #default>
 
          <el-form label-position="top"  ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
             class="demo-ruleForm" :size="formSize" status-icon>

             <el-row :gutter="30" :align="20">
                <el-col :md="8" :sm="12" :xs="20" class="form--col">
                   <el-form-item label="Mahsulot nomini kiriting" prop="name">
                      <el-input  v-model="ruleForm.name"  placeholder="Nomi" />
                   </el-form-item>
                </el-col>
 
                <el-col :md="8" :sm="12" :xs="20" class="form--col">
                   <el-form-item label="Mahsulot narxi" prop="price">
                      <el-input v-model="ruleForm.price"  placeholder="narxi" />
                   </el-form-item>
                </el-col>
 
                <el-col :md="8" :sm="12" :xs="20" class="form--col">
                   <el-form-item label="Kategoriya nomi" prop="category.name">
                      <el-select   v-model="ruleForm.category" placeholder="kategoriya nomi" >
                        <el-option v-for="c in category" :label="c.name" :value="c.id" :key="c.id"/>
                      </el-select>
                   </el-form-item>
                </el-col>
            
                <el-col :md="8" :sm="12" :xs="20" class="form--col">
                   <el-form-item label="brand nomi" prop="brand.name">
                      <el-select v-model="ruleForm.brands"  placeholder="brand nomini kiriting">
                         <el-option v-for="b in brands" :label="b.name" :value="b.id"  :key="b.id"/>
                      </el-select>
                   </el-form-item>
                </el-col>
                
                <el-col :span="8" :md="8" :sm="12" :xs="20">
                <el-form-item label="Ommabop" prop="is_famous">
                    <el-checkbox label="Ommabop" name="type" v-model="ruleForm.is_famous"/>
                </el-form-item>
              </el-col>
              </el-row>
 
            <div style="display: flex;justify-content: end; width:100%;" class="pages-btn">
             <el-button class="btn--cancel" @click="resetForm(ruleFormRef)">Cancel</el-button>
             <el-button class="btn--info" @click="submitForm(ruleFormRef)" type="info" plain>Save</el-button>
            </div>
          </el-form>
       </template>
    </CustomPagesCreate>
 </template>
 
 <script setup>
 import { ref, reactive, computed, onMounted } from 'vue';
 import CustomPagesCreate from "@/components/custom/pages/create.vue"
 import {useRoute, useRouter} from "vue-router"
 import { useStore } from 'vuex';
const route = useRoute()
const store = useStore()
const router = useRouter()

const value = computed(()=>{
    return store.state.product.current
})

   const category = computed(()=>{
      return  store.getters.categoryDataList.list
})

const brands = computed(()=>{
    return  store.getters.brandsDataList.list
})




onMounted(() => {
   store.dispatch("fetchCategory", { });
   store.dispatch("fetchBrands", { });
});


const formSize = ref('100%')
 const ruleFormRef = ref()
 const ruleForm = reactive({
    name: "",
    price:"",
    is_famous: false,
    description: [],
    brands:{
       name:"",
       is_famous:false
     },
    category:{
      name:"",
      is_main:false
    }
 })
 


 onMounted(async()=>{
   let res = await store.dispatch("curentProduct",route.params.id)
   Object.keys(ruleForm).forEach(key=>{
     ruleForm[key] = res.data[key];
   })
})

 
 const rules = reactive({
   name: [
       { 
          required: true,
           message: 'mahsulot nomini kiriting', 
           trigger: 'blur' 
          },
       
    ],
    price: [
       {
          required: true,
          message: 'narxini kiriting',
          trigger: 'change',
       },
    ],
    is_famous: [
       {
          required: false,
          message: '',
          trigger: 'change',
       },
    ],
    'brand.name': [
       {
          required: false,
          message: 'brand nomini kirgiting',
          trigger: 'change',
       },
    ],
    'category.name': [
       {
          required: false,
          message: 'Malumot kirgizing',
          trigger: 'change',
       },
    ],
 })

 const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
       if (valid) {
          
         const data = new FormData();
         Object.keys(ruleForm).forEach(key=>{
           data.append(key,ruleForm[key]);
         })
         
           const res = store.dispatch("productUpdite",{id:route.params.id,form:data})
           
            ElMessage.success("ma'lumot yangilandi")
            router.push("/cabinet/admin/product");
         
       } else {
          console.log('error submit!', fields)
          ElMessage.error("ma'lumot qo'shilmadi")
       }
    })
 }
 
 const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
 }
 
 </script>
 
 <style scoped lang="scss">
 .form--col{
    margin-bottom: 10px;
 }
 </style>
 