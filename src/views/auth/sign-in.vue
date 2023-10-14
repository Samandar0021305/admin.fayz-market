<template>
  <div class="signin">
    <div class="signin-header">
      <strong>Sign in to <span>GreatSoft</span></strong>
      <small>Please, enter your details</small>
    </div>
    <div class="signin-body">
      <el-form
        label-position="top"
        ref="formRef"
        :model="form"
        :rules="rules"
        status-icon
      >
        <el-form-item label="phone number" prop="phone_number">
          <el-input
            autofocus
            @keypress.enter="submitForm(formRef)"
            v-model="form.phone_number"
            placeholder="phone_number"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            autofocus
            v-model="form.password"
            type="password"
            @keypress.enter="submitForm(formRef)"
            placeholder="Password"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button class="signin" type="primary" @click="submitForm(formRef)"
        >Sign in</el-button
      >
    </div>
    <div class="signin-footer">
      <span class="forgot"> Forgot password? </span>
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
      message: "validatephone_number",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "validatePassword",
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