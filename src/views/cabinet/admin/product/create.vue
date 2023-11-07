<template>
   <CustomPagesCreate title="Mahsulot" pathToBack="/cabinet/admin/product">
      <template #default>

         <el-form label-position="top" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
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
                     <el-input v-model="ruleForm.name" placeholder="Nomi" />
                  </el-form-item>
               </el-col>

               <el-col :md="8" :sm="12" :xs="20" class="form--col">
                  <el-form-item label="Mahsulot narxi" prop="price">
                     <el-input v-model="ruleForm.price" placeholder="narxi" />
                  </el-form-item>
               </el-col>

               <el-col :md="8" :sm="12" :xs="20" class="form--col">
                  <el-form-item label="Kategoriya nomi" prop="category.name">
                     <el-select v-model="ruleForm.category" placeholder="kategoriya nomi">
                        <el-option v-for="c in category" :label="c.name" :value="c.id" :key="c.id" />
                     </el-select>
                  </el-form-item>
               </el-col>

               <el-col :md="8" :sm="12" :xs="20" class="form--col">
                  <el-form-item label="brand nomi" prop="brand.name">
                     <el-select v-model="ruleForm.brand" placeholder="brand nomini kiriting">
                        <el-option v-for="b in brands" :label="b.name" :value="b.id" :key="b.id" />
                     </el-select>
                  </el-form-item>
               </el-col>




               <el-col :md="8" :sm="12" :xs="20">
                  <el-form-item label="Ommabop" prop="is_famous">
                     <el-checkbox label="Ommabop" name="type" v-model="ruleForm.is_famous" />
                  </el-form-item>
               </el-col>

               <el-col>
                   <el-form-item>
                     <el-input
                        v-model="textarea"
                        :rows="4"
                        type="textarea"
                        placeholder="Ex: Hamyonbop - Knopkasi sensorli "
                     />
                   </el-form-item>
               </el-col>


               <el-col :md="22" :sm="22" :xs="20" class="form--col">
               <el-row :gutter="20">
                  <el-col :md="6" :sm="8" :xs="20">
                     <el-form-item prop="image">
                        <label class="upload-img"
                           :style="{ background: upload && `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat` }">
                           <svgicon :class="{ filter: upload }" name="Upload" />
                           <p>rasin yuklang <br> (JPG, PNG)</p>
                           <input type="file" ref="fileInput" multiple @change="onFileChange" />
                        </label>
                     </el-form-item>
                  </el-col>

                  <el-col :span="4" v-for="(image, index) in uploadedImages" :key="index">
                     <picture class="uploader">
                        <img :src="image" alt="Uploaded Image" />
                     </picture>
                  </el-col>

               </el-row>


            </el-col>

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
import { ref, reactive, computed, watch, provide } from "vue"
import CustomPagesCreate from "@/components/custom/pages/create.vue"
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

const uploadedImages = ref([]);
let formData = new FormData();
const router = useRouter();;
const textarea = ref('')


const onFileChange = (event) => {
   Array.from(event.target.files).forEach((key)=>{
      formData.append("images",key) 
   })
   uploadedImages.value.push(Array.from(event.target.files).map((file) => URL.createObjectURL(file)));
};



const store = useStore()

const brands = computed(() => {
   return store.getters.brandsDataList.list
})
const category = computed(() => {
   return store.getters.categoryDataList.list
})


const data = Promise.allSettled([store.dispatch("fetchBrands", {}), store.dispatch("fetchCategory", {})])

const ruleFormRef = ref()
const ruleForm = reactive({
   name: "",
   price: "",
   is_famous: false,
   description: [],
   brand: 0,
   category: 0
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
         
         // ruleForm.description = ÷
         console.log(ruleForm);
          Object.keys(ruleForm).forEach(key=>{
            if(key == "description"){
               formData.append("description[]",textarea.value.split("-"))
            }else{ 
               formData.append(key,ruleForm[key])
            }
          });
           
         const res = store.dispatch("productCreate", formData)
         
            ElMessage.success("ma'lumot qo'shildi")
            // router.push("/cabinet/admin/product");
         
      } else {
         console.log('error submit!', fields)
         ElMessage.error("ma'lumot hato qayta harakat qilib ko'ring")
         
      }
   })
}

const resetForm = (formEl) => {
   if (!formEl) return
   formEl.resetFields()
}

</script>
 
<style scoped lang="scss">
.form--col {
   margin-bottom: 20px;
}
</style>
 