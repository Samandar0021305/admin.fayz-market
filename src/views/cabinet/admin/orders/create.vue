<template>
  <CustomPagesCreate title="buyurtma" pathToBack="/cabinet/admin/orders" @activeLangTab="activeLangTab">
    <template #default>

      <el-form ref="ruleFormRef" label-position="top" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
                   
        <el-row :gutter="20" :align="20">
          <el-col :span="24">
            <el-row :gutter="30">
              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Nomi" prop="name">
                  <el-input v-model="form.name" placeholder="ism kiriting" />
                </el-form-item>
              </el-col>
              
              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="telefon raqami" prop="phone_number">
                  <el-input v-model="form.phone_number" placeholder="telefon raqami" :mask="9989" />
                </el-form-item>
              </el-col>
              
              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="manzil" prop="address">
                  <el-input v-model="form.address" placeholder="manzil" />
                </el-form-item>
              </el-col>
              
            
            </el-row>
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
import { reactive, ref } from 'vue'
import CustomPagesCreate from "@/components/custom/pages/create.vue";
import store from '../../../../store';

function activeLangTab(e) {
  console.log(e);
}


const formSize = ref('default')
const ruleFormRef = ref()

const form = reactive({
 name:"",
 phone_number:"",
 address:""
})

const rules = reactive({
  name: [
    { required: true, message: 'ism kiriting', trigger: 'blur' },
    
  ],
  phone_number: [
    { required: true, message: 'telefon raqam kiriting', trigger: 'blur' },
    
  ],
  address: [
    { required: true, message: 'manzil kiriting', trigger: 'blur' },
    
  ],
  
})



const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      const res =  await store.dispatch("OrderAdminCreate",{data:form})
      ElMessage.success("ma'lumot qo'shildi")
    } else {
      console.log('error submit!', fields)
      ElMessage.success("ma'lumot qo'shilmadi")
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}




</script>

<style lang="scss" scoped></style>
