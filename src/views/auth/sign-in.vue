<template>
  <div class="signin">
    <div class="signin-header">
      <strong><span>FazyMarket</span> ga kirish</strong>
      <small>Iltimos, maʼlumotlaringizni kiriting</small>
    </div>
    <div class="signin-body">
      <el-form
        label-position="top"
        ref="formRef"
        :model="form"
        :rules="rules"
        status-icon
      >
        <el-form-item label="Telefon raqam" prop="telefon">
          <el-input
            autofocus
            @keypress.enter="submitForm(formRef)"
            v-model="form.phone_number"
            placeholder="Telefon raqam kiriting"
          />
        </el-form-item>
        <el-form-item label="Parol" prop="password">
          <el-input
            autofocus
            v-model="form.password"
            type="password"
            @keypress.enter="submitForm(formRef)"
            placeholder="Parol kiriting"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button class="signin" type="primary" @click="submitForm(formRef)"
        >Kirish</el-button
      >
    </div>
   
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "vuex";
const store = useStore();

const router = useRouter();

const formRef = ref();
const form = reactive({
  phone_number: "",
  password: "",
});


const rules = reactive({
  phone_number: [
    {
      required: true,
      message: "Telefon raqamingizni kiriting",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Parol kiriting",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let { status } = await store.dispatch("login", {phone_number:form.phone_number,password:form.password});
        if (status) {
          router.push("/cabinet/admin/statistics");
        } 
      } catch (error) {
        ElMessage.error("Telefon raqam yoki parol xato");
     
      }
    } else {
      ElMessage.error("Telefon raqam yoki parol xato");
    }
  });
};
</script>

<style lang="scss" scoped></style>