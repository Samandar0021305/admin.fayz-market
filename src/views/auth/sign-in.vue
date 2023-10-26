<template>
  <div class="signin">
    <div class="signin-header">
      <strong><span>FazyMarket</span> ga kirish </strong>
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
        <el-form-item label="telefon raqam" prop="telefon">
          <el-input
            autofocus
            @keypress.enter="submitForm(formRef)"
            v-model="form.phone_number"
            placeholder="telefon raqam kiriting"
          />
        </el-form-item>
        <el-form-item label="parol" prop="password">
          <el-input
            autofocus
            v-model="form.password"
            type="password"
            @keypress.enter="submitForm(formRef)"
            placeholder="parol kiriting"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button class="signin" type="primary" @click="submitForm(formRef)"
        >Kirish</el-button
      >
    </div>
    <div class="signin-footer">
      <span class="forgot">parol esingizda yo'qmi?</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

import { useStore } from "vuex";
const store = useStore();

import { useRouter } from "vue-router";
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
      message: "telefon raqamingizni kiriting",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "parol kiriting",
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
        ElMessage.error("phone_number or password is wrong!");
        console.error(error);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped></style>