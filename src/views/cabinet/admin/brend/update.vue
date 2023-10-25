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
          <el-col :md="8" :sm="12" :xs="20">
             <el-form-item >
               <label class="upload" :style="{background: upload && `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat`}">
                    <svgicon :class="{filter: upload}" name="Upload"/>
                    <p>Upload profile image here <br> (JPG, PNG)</p>
                    <h6>Browse</h6>
                    <input type="file"  v-on:change="onChange">
                  </label>
             </el-form-item>
          </el-col>
          <el-col :md="16" :sm="12" :xs="20">
            <el-row :gutter="30">
              <el-col :span="22">
                <el-form-item label="Nomi" prop="name">
                  <el-input v-model="form.name" placeholder="Kategoriya nomi" />
                </el-form-item>
              </el-col>
              
              <el-col :md="16" :sm="12" :xs="20">
                <el-form-item prop="is_main">
                    <el-checkbox label="type" name="type" v-model="form.is_main"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <div style="display: flex; justify-content: end; width: 100%" class="pages-btn">
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

const upload = ref(null)

const formRef = ref();

const form = reactive({
  name: "",
  is_famous: "",
  image:null
});

onMounted(async()=>{
  const res = await store.dispatch("curentId",route.params.id);
  if(res.status){
    Object.keys(form).forEach(key=>{
      if(key == "image"){
        upload.value = res.data[key]
      }else{
        form[key] = res.data[key]
      }
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
  
  is_main: [
    {
      required: false,
      trigger: "change",
    },
  ]
});


const onChange = (event)=>{
        const value1 = event.target.files[0]
        if(value1){
        const reder = new FileReader();
        reder.onload=(e)=>{
         upload.value = e.target.result
         form.image = value1
        }
        reder.readAsDataURL(value1)
      }
}

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async(valid, fields) => {
    if (valid) {
     const dp = new FormData()
       Object.keys(form).forEach((key)=>{
        if(form[key]){
          dp.append(key,form[key]);
        }
       })
      const {status} = await store.dispatch("upditeBrands",{id:route.params.id,form:dp})
      if(!status){
        ElMessage.error("xatolik bor qaytadan harakat qilib ko'ring");
      }else{
      ElMessage.success("ma'lumot yangilandi")
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

<style lang="scss" scoped></style>
