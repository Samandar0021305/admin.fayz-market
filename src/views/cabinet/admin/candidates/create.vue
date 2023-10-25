<template>
  <CustomPagesCreate
    title="Candidates"
    pathToBack="/cabinet/admin/candidates"
    @activeLangTab="activeLangTab"
  >
    <template #default>
      <el-form
        label-position="top"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-row :gutter="30" :align="20">
          <el-col :span="8">
            <el-form-item label="name" prop="name">
              <el-input v-model="ruleForm.name" placeholder="Write text" />
            </el-form-item>
          </el-col>

               <el-col :span="8">
                  <el-form-item label="Phone" prop="phone">
                     <el-input v-model="ruleForm.phone" placeholder="Write text" v-mask="'+998 ## ### ## ##'" masked="true" />
                  </el-form-item>
               </el-col>
            
               <el-col :span="8" >
                  <el-form-item label="E-mail" prop="gmail">
                     <el-input v-model="ruleForm.gmail"  placeholder="Write text" />
                  </el-form-item>
               </el-col>
         
               <el-col :span="8">
                 <el-form-item label="Upload CV" prop="file">
                    <label class="demo-ruleForm--input">
                      <p>Upload your CV or Resume</p>
                      <svgicon name="uzs"/>
                      <input type="file" @change="handleChange">
                    </label>
                 </el-form-item>
               </el-col>

               <el-col :span="16" >
                 <el-form-item label="Information">
                    <el-input
                        v-model="ruleForm.information"
                        :rows="4"
                        type="textarea"
                        placeholder="Enter additional information"
                     />
                 </el-form-item>
               </el-col>

             </el-row>

        <div style="display: flex; justify-content: end; width: 100%">
          <el-button class="btn--cancel" @click="resetForm(ruleFormRef)"
            >Cancel</el-button
          >
          <el-button
            class="btn--info"
            @click="submitForm(ruleFormRef)"
            type="info"
            plain
            >Save</el-button
          >
        </div>
      </el-form>
    </template>
  </CustomPagesCreate>
</template>

<script setup>
import { ref, reactive } from "vue"
import CustomPagesCreate from "@/components/custom/pages/create.vue"

const formSize = ref('100%')
const ruleFormRef = ref()
const ruleForm = reactive({
   name:"",
   phone: "",
   gmail: "",
   information:"",
   file:ref(null)
})

const rules = reactive({
    name: [
      { 
         required: true,
          message: 'ismingizni kiriting', 
          trigger: 'blur' 
         },
      
   ],
   phone: [
      {
         required: true,
         message: 'Telefon raqamingizni kiriting',
         trigger: 'change',
      },
   ],
   gmail: [
      {
         type:"email",
         required: true,
         message: 'gmail kirgiting',
         trigger: 'change',
      },
   ],
   information: [
      {
         required: true,
         message: 'Malumot kirgizing',
         trigger: 'change',
      },
   ],
   file: [
      {
         required: true,
         message: 'Malumot kirgizing',
         trigger: 'change',
      },
   ]
})


const handleChange = (event)=>{
   ruleForm.file = event
}

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>


<style scoped lang="scss">
.demo-ruleForm{
  &--input{
    height: 48px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid rgba(34, 34, 34, 0.20);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    p{
      color: #638FFF;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;

    }
     input{
      width: 100%;
      height: 100%;
      display: none;
      
    }
  }
}

</style>