<template>
    <CustomPagesCreate title="Mahsulot" pathToBack="/cabinet/admin/product">
       <template #default>
 
          <el-form label-position="top"  ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
             class="demo-ruleForm" status-icon>

             <el-row :gutter="30" :align="20">
               <!-- <el-col  :md="8" :sm="12" :xs="20">
                  <el-form-item prop="image">
                     <label class="upload" :style="{background: upload && `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat`}">
                        <svgicon :class="{filter: upload}" name="Upload"/>
                        <p>Upload profile image here <br> (JPG, PNG)</p>
                        <h6>Browse</h6>
                        <input type="file"  v-on:change="onChange">
                        </label>
                  </el-form-item>
               </el-col> -->
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
                      <el-select v-model="ruleForm.brand"  placeholder="brand nomini kiriting">
                         <el-option v-for="b in brands" :label="b.name" :value="b.id"  :key="b.id"/>
                      </el-select>
                   </el-form-item>
                </el-col>
                
                
                <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Ommabop" prop="is_famous">
                    <el-checkbox label="Ommabop" name="type" v-model="ruleForm.is_famous"/>
                </el-form-item>
              </el-col>

              <el-col>
               <RichTextEditor/>
              </el-col>
             
               <!-- <el-col v-for="value in descriptions">
                  <el-form-item label="description qo'shish" prop="is_famous">
                     <el-input v-model="ruleForm.name"  placeholder="narxi" />
                </el-form-item>
               </el-col>
                <el-col>
                  <el-button @click="++counter" type="success" >description qo'shish</el-button>
                </el-col> 
                 -->
              </el-row>
 
            
            <div style="display:flex; width:100%;margin-top: 20px;" class="pages-btn">
             <el-button class="btn--cancel" @click="resetForm(ruleFormRef)">Cancel</el-button>
             <el-button class="btn--info" @click="submitForm(ruleFormRef)" type="info" plain>Save</el-button>
            </div>
            
          </el-form>
       </template>
    </CustomPagesCreate>
 </template>
 
 <script setup>
 import { ref, reactive , computed, watch ,provide} from "vue"
 import CustomPagesCreate from "@/components/custom/pages/create.vue"
 import { useStore } from 'vuex';

//  import RichTextEditor from "@/components/richtexteditor/index.vue"
 
 const store = useStore()
 
 const brands = computed(()=>{
    return  store.getters.brandsDataList.list
   })
   const category = computed(()=>{
      return  store.getters.categoryDataList.list
})
const counter = ref(1)

const descriptions = computed(()=>{
   return counter.value
})


const data = Promise.allSettled([store.dispatch("fetchBrands", {}),store.dispatch("fetchCategory",{})])

 const ruleFormRef = ref()
 const ruleForm = reactive({
    name: "",
    price: "",
    is_famous: false,
    description: [],
    brand:0,
    category:0
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
   
 })

 const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
       if (valid) {
         
         // console.log(ruleForm);
         const res = store.dispatch("productCreate",ruleForm)
         console.log(res);
         ElMessage.success("ma'lumot qo'shildi")
       } else {
          console.log('error submit!', fields)
          ElMessage.error("ma'lumot hato")
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
    margin-bottom: 20px;
 }

 </style>
 