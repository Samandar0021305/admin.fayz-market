<template>
  <CustomPagesCreate title="Mijozlar" pathToBack="/cabinet/admin/klentlar" @activeLangTab="(lang) => activeLang = lang"
    @status="(status) => (form.status = status)">
    <template #default>
      <el-form label-position="top" ref="formRef" :model="form" :rules="rules" status-icon>
        <el-row :gutter="20" :align="20">
          <el-col :span="24">
            <el-row :gutter="30">
              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Ism" prop="firstname">
                  <el-input v-model="form.firstname" placeholder="ismingizni kiriting" />
                </el-form-item>
              </el-col>

              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Familiya" prop="lastname">
                  <el-input v-model="form.lastname" placeholder="familiyangizni kiriting" />
                </el-form-item>
              </el-col>

              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Telefon raqam" prop="phone_number">
                  <el-input v-model="form.phone_number" placeholder="tel raqam kiriting" />
                </el-form-item>
              </el-col>

              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item label="Bonus" prop="bonus">
                  <el-input v-model="form.bonus" placeholder="bonus kiriting" type="number"/>
                </el-form-item>
              </el-col>

              <el-col :md="8" :sm="12" :xs="20" class="form--col">
                <el-form-item label="Viloyat" prop="region">
                  <el-select v-model="form.region" placeholder="viloyatingizni kiriting">
                    <el-option v-for="b in regions" :label="b.name" :value="b.id" :key="b.id" />
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :md="8" :sm="12" :xs="20" class="form--col">
                <el-form-item label="shahar" prop="district">
                  <el-select v-model="form.district" placeholder="shaharingizni kiriting">
                    <el-option v-for="b in district" :label="b.name" :value="b.id" :key="b.id" />
                  </el-select>
                </el-form-item>
              </el-col>





              <el-col :md="8" :sm="12" :xs="20">
                <el-form-item prop="is_active">
                  <el-checkbox label="type" name="type" v-model="form.is_active" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <div style="display: flex; justify-content: end; width: 100%" class="pages-btn">
          <el-button class="btn--cancel" @click="resetForm(formRef)">Cancel</el-button>
          <el-button class="btn--info" @click="submitForm(formRef)" type="info" plain>Save</el-button>
        </div>
      </el-form>
    </template>
  </CustomPagesCreate>
  <!-- <CustomPagesUpdate title="Mijozlar" pathToBack="/cabinet/admin/klentlar" @activeLangTab="activeLangTab">
    <template #default>
       
    </template>
  </CustomPagesUpdate> -->
</template>
<!-- 
<script setup>
import CustomPagesUpdate from "@/components/custom/pages/update.vue";

function activeLangTab(e){
  console.log(e);
}

</script>

<style lang="scss" scoped></style> -->


<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import CustomPagesCreate from "@/components/custom/pages/create.vue";
import { useStore } from "vuex";
import { useRoute,useRouter } from "vue-router";
const store = useStore();
const route = useRoute()
const router  = useRouter()

const formRef = ref();
const form = reactive({
  firstname: "",
  lastname: "",
  region: "",
  bonus: "",
  phone_number: "",
  district: "",
  is_active: true
});

const rules = reactive({
  firstname: [
    {
      required: true,
      message: "ism kiriting",
      trigger: "blur",
    },
  ],
  lastname: [
    {
      required: true,
      message: "familya kiriting",
      trigger: "blur",
    },
  ],

  region: [
    {
      required: true,
      message: "adress ni kiriting",
      trigger: "blur",
    },
  ],


  bonus: [
    {
      required: true,
      message: "bonus ni kiriting",
      trigger: "blur",
    },
  ],


  phone_number: [
    {
      required: true,
      message: "telefon raqam kiriting",
      trigger: "blur",
    },
  ],


  district: [
    {
      required: true,
      message: "telefon raqam kiriting",
      trigger: "blur",
    },
  ],



  is_active: [
    {
      required: false,
      trigger: "change",
    },
  ],


});



const regions = computed(() => {
  return store.getters.GETREGIONSLIST.list
})


const district = computed(() => {
  return store.getters.getDistrictsList.list
})

onMounted(() => {
  store.dispatch("fetchDistricts")
  store.dispatch("fetchRegions")
})

onMounted(async () => {
  const res = await store.dispatch("UsersgetById", route.params.id)
  if (res.status) {
    Object.keys(form).forEach((key) => {
      form[key] = res.data[key]
    })
  }
})


const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(form);
      const { status } = await store.dispatch("UsersUpdate", { id: route.params.id, data: form })
      if (!status) {
        ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
      } else {
        ElMessage.success("Ma'lumot yangilandi")
        router.push("/cabinet/admin/klentlar")
      }
    } else {
      ElMessage.error("Xatolik bor qaytadan harakat qilib ko'ring");
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
  
<style lang="scss" scoped>
.el-col {
  margin-bottom: 12px;
}
</style>
  