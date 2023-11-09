<template>
  <CustomPagesUpdate title="Kategoriya" pathToBack="/cabinet/admin/category" @activeLangTab="activeLangTab">
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
            <el-form-item>
              <label
                class="upload"
                :class="{ 'has-file': upload }"
                :style="{
                  background:
                    upload &&
                    `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat`,
                }"
              >
                <svgicon :class="{ filter: upload }" name="Upload" />
                <p>
                  rasmni bu yerga yuklang<br />
                  (JPG, PNG)
                </p>
                <h6>Browse</h6>
                <input type="file" @change="onChange" />
              </label>
            </el-form-item>
          </el-col>

          <el-col :md="16" :sm="12" :xs="20">
            <el-row :gutter="30">
              <el-col :md="16" :sm="12" :xs="20">
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
import {  ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter} from "vue-router"
const store = useStore();
const route = useRoute();
const router = useRouter()

const upload = ref(null)
const formRef = ref();
const form = reactive({
  name: "",
  is_famous: false,
  image:null
});

onMounted(async()=>{
 const res = await store.dispatch("curentCategory",route.params.id);
  if(res.status){
     Object.keys(form).forEach(key=>{
       if(key=="image"){
         upload.value = 'https://api.fayz-market.uz'+res.data[key];
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
  ],
  
  image: [
    {
      required: true,
      message: "rasim yuklang",
      trigger: "blur",
    },
  ],
});

const onChange = (event) => {
  const value1 = event.target.files[0];
  if (value1) {
    const reder = new FileReader();
    reder.onload = (e) => {
      upload.value = e.target.result;
      form.image = value1;
    };
    reder.readAsDataURL(value1);
  }
}


const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      const fd = new FormData();
       Object.keys(form).forEach(key=>{
        if(form[key]){
          fd.append(key,form[key])
        }
       })
      const res = await store.dispatch("upditecat",{id:route.params.id,form:fd})

      ElMessage.success("Ma'lumot yangilandi")
      router.push("/cabinet/admin/category")
    } else {
      ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
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
