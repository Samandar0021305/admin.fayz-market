<template>
    <CustomPagesUpdate title="brend" pathToBack="/cabinet/admin/brend" @activeLangTab="activeLangTab">
      <template #default>
        
        <el-form
          label-position="top"
          ref="formRef"
          :model="form"
          :rules="rules"
          status-icon
        >
          <el-row :gutter="20" :align="20">
            
            <el-col :span="16">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="Nomi" prop="name">
                    <el-input v-model="form.name" placeholder="mahsulot nomi" />
                  </el-form-item>
                </el-col>
                
                <el-col :span="12">
                  <el-form-item label="telefon raqami" prop="phone_number">
                    <el-input v-model="form.phone_number" placeholder="telefon raqami" />
                  </el-form-item>
                </el-col>
                
              
              </el-row>
            </el-col>
          </el-row>
  
          <div style="display: flex; justify-content: end; width: 100%">
            <el-button class="btn--cancel" @click="resetForm(formRef)"
              >Cancel</el-button
            >
            <el-button
              class="btn--info"
              @click="submitForm(formRef)"
              type="info"
              plain
              >Save</el-button
            >
          </div>
        </el-form>
     
      </template>
    </CustomPagesUpdate>
  </template>


<script setup>
import CustomPagesUpdate from "@/components/custom/pages/update.vue";
import { useStore } from 'vuex';
import { computed, ref, reactive, onMounted } from 'vue';
import { useRoute} from "vue-router"
const store = useStore()
const route = useRoute()


const formRef = ref();

const form = reactive({
  name: "",
  phone_number: "",
 
});

onMounted(async()=>{
  const res = await store.dispatch("paymentsBYID",route.params.id);
  if(res.status){
      Object.keys(form).forEach(key=>{
        form[key] = res.data[key]
    })
  }
})

const rules = reactive({
  name: [
    {
      required: true,
      message: "kategoriya nomini kiriting",
      trigger: "blur",
    },
  ],
  
  phone_number: [
    {
      required: true,
      trigger: "blur",
      message:"telefon raqam kiriting"
    },
  ]
});




const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async(valid, fields) => {
    if (valid) {
     
      const {status} = await store.dispatch("updatePayments",{id:route.params.id,data:form})
      if(!status){
        ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
      }else{
      ElMessage.success("Ma'lumot yangilandi")
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};


function activeLangTab(e){
console.log(e);  
}

</script>
