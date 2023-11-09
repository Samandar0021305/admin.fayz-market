<template>
  <CustomPagesCreate
    title="Mahsulot yangilash"
    pathToBack="/cabinet/admin/product"
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
              <el-select
                v-model="ruleForm.category"
                placeholder="kategoriya nomi"
              >
                <el-option
                  v-for="c in category"
                  :label="c.name"
                  :value="c.id"
                  :key="c.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="8" :sm="12" :xs="20" class="form--col">
            <el-form-item label="brand nomi" prop="brand.name">
              <el-select
                v-model="ruleForm.brands"
                placeholder="brand nomini kiriting"
              >
                <el-option
                  v-for="b in brands"
                  :label="b.name"
                  :value="b.id"
                  :key="b.id"
                />
              </el-select>
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

          <br />
          <el-col :md="8" :sm="8" :xs="20">
            <el-form-item prop="image">
              <label
                class="upload-img"
                :style="{
                  background:
                    upload &&
                    `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${upload}), lightgray 50% / cover no-repeat`,
                }"
              >
                <svgicon :class="{ filter: upload }" name="Upload" />
                <p>
                  rasin yuklang <br />
                  (JPG, PNG)
                </p>
                <input
                  type="file"
                  ref="fileInput"
                  multiple
                  @change="onFileChange"
                />
              </label>
            </el-form-item>
          </el-col>

          <el-col
            :md="8"
            :sm="12"
            :xs="20"
            v-for="(image, index) in ruleForm.images"
            :key="index"
            :style="{ display: image ? '' : 'none' }"
          >
            <el-form-item
              :style="{ display: !image ? 'none' : '' }"
              v-if="image"
            >
              <div
                v-if="!setter.has(`${index}`)"
                class="upload image-uploader"
                :class="{ 'has-file': image.photo }"
                :style="{
                  background: image.photo
                    ? `url('https://api.fayz-market.uz${image.photo}' ) center/cover no-repeat`
                    : 'lightgray',
                }"
              >
                <div>
                  <el-icon
                    @click="removeimage(index)"
                    class="image-uploader-delete"
                    ><Delete
                  /></el-icon>
                  <label>
                    <el-icon class="image-uploader-update"><EditPen /></el-icon>
                    <input
                      type="file"
                      @change="onChange"
                      class="upload-input"
                      :id="index"
                    />
                  </label>
                </div>
                <svgicon
                  :class="{ filter: upload }"
                  class="icons"
                  name="Upload"
                />

                <p>
                  rasmni bu yerga yuklang<br />
                  (JPG, PNG)
                </p>
                <h6>Browse</h6>
              </div>

              <div
                v-if="setter.has(`${index}`)"
                class="upload image-uploader"
                :class="{ 'has-file': image.photo }"
                :style="{
                  background: image.photo
                    ? `url('${image.photo}') center/cover no-repeat`
                    : 'lightgray',
                }"
              >
                <div>
                  <el-icon
                    @click="removeimage(index)"
                    class="image-uploader-delete"
                    ><Delete
                  /></el-icon>
                  <label>
                    <el-icon class="image-uploader-update"><EditPen /></el-icon>
                    <input
                      type="file"
                      @change="onChange"
                      class="upload-input"
                      :id="index"
                    />
                  </label>
                </div>
                <svgicon :class="{ filter: upload }" name="Upload" />
                <p>
                  rasmni bu yerga yuklang<br />
                  (JPG, PNG)
                </p>
                <h6>Browse</h6>
                <input type="file" @change="onChange" :id="index" />
              </div>
            </el-form-item>
          </el-col>

          <el-col
            :md="8"
            :sm="12"
            :xs="20"
            v-for="(image, index) in uploadedImages"
            :key="index"
            :style="{ display: image ? '' : 'none' }"
          >
            <el-form-item
              :style="{ display: !image ? 'none' : '' }"
              v-if="image"
            >
              <label
                class="upload-img"
                :style="{
                  background:
                    image &&
                    `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%) , url(${image}), lightgray 50% / cover no-repeat`,
                }"
              >
                <svgicon :class="{ filter: upload }" name="Upload" />
                <p>
                  rasin yuklang <br />
                  (JPG, PNG)
                </p>
                <input
                  type="file"
                  ref="fileInput"
                  multiple
                  @change="onFileChange"
                />
              </label>
            </el-form-item>
          </el-col>

          <el-col :md="17" :sm="12" :xs="20">
            <el-form-item label="Ommabop" prop="is_famous">
              <el-checkbox
                label="Ommabop"
                name="type"
                v-model="ruleForm.is_famous"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <div
          style="display: flex; justify-content: end; width: 100%"
          class="pages-btn"
        >
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
import { ref, reactive, computed, onMounted } from "vue";
import CustomPagesCreate from "@/components/custom/pages/create.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import ConfigApi from "../../../../api";
import { isArray } from "lodash";
const FILE_URL = import.meta.env.VITE_FILE_URL;
const route = useRoute();
const store = useStore();
const router = useRouter();
const textarea = ref(null);
const uploadedImages = ref([]);

const category = computed(() => {
  return store.getters.categoryDataList.list;
});

const brands = computed(() => {
  return store.getters.brandsDataList.list;
});

onMounted(() => {
  store.dispatch("fetchCategory", {});
  store.dispatch("fetchBrands", {});
});

const formData = new FormData();
const formSize = ref("100%");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  price: "",
  is_famous: false,
  description: "",
  brands: [],
  category: [],
  images: [],
});

const setter = new Set();
const imagesUp = {};

const onChange = (event) => {
  const value1 = event.target.files[0];
  const getid = ruleForm.images[event.target.getAttribute("id")];
  if (value1) {
    setter.add(event.target.getAttribute("id"));
    const reder = new FileReader();
    imagesUp[getid.id] = value1;
    reder.onload = (e) => {
      getid.photo = e.target.result;
    };
    reder.readAsDataURL(value1);
  }
};

onMounted(async () => {
  let res = await store.dispatch("curentProduct", route.params.id);
  Object.keys(ruleForm).forEach((key) => {
    if (key == "description") {
      ruleForm[key] = res.data.description.join(",");
      textarea.value = res.data.description.join("-");
    } else if (key == "brands" && res.data[key]) {
      ruleForm[key] = res.data[key];
      
    } else if (key == "category" && res.data[category]) {
      ruleForm[key] = res.data[key];
    } else {
      ruleForm[key] = res.data[key];
    }
  });
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "mahsulot nomini kiriting",
      trigger: "blur",
    },
  ],
  price: [
    {
      required: true,
      message: "narxini kiriting",
      trigger: "change",
    },
  ],
  is_famous: [
    {
      required: false,
      message: "",
      trigger: "change",
    },
  ],
  "brand.name": [
    {
      required: false,
      message: "brand nomini kirgiting",
      trigger: "change",
    },
  ],
  "category.name": [
    {
      required: false,
      message: "Malumot kirgizing",
      trigger: "change",
    },
  ],
});

const removeimagesid = [];
const removeimage = (index) => {
  removeimagesid.push(ruleForm.images[index].id);
  ruleForm.images[index] = null;
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      Object.keys(ruleForm).forEach((key) => {
        if (key != "images") {
          if (!isArray(ruleForm.category) &&  key == "category" ) {
            formData.append(key, ruleForm[key]);
          }
          if (!isArray(ruleForm.brands) && key == "brands") {
            formData.append(key, ruleForm[key]);
            console.log(ruleForm[key])
          } else if (key != "brands" && key != "category") {
            formData.append(key, ruleForm[key]);
          
          }
        }
      });

      const photo = new FormData();
      Object.keys(imagesUp).forEach(async (values) => {
        photo.append("photo", imagesUp[values]);
        console.log(imagesUp[values]);
        try {
          const cur = await ConfigApi.patch(`product-images/${values}/`, photo);
          photo.delete();
        } catch {
          photo.delete();
        }
      });

      removeimagesid.forEach(async (val) => {
        try {
          const cur = await ConfigApi.delete(`product-images/${val}/`);
        } catch {}
      });

      try {
        const res = store.dispatch("productUpdite", {
          id: route.params.id,
          formData,
        });

        ElMessage.success("Ma'lumot yangilandi");
        router.push("/cabinet/admin/product");
      } catch {
        ElMessage.error("Ma'lumot qo'shilmadi");
      }
    } else {
      ElMessage.error("Ma'lumot qo'shilmadi");
    }
  });
};

const onFileChange = (event) => {
  Array.from(event.target.files).forEach((key) => {
    formData.append("images", key);
  });
  uploadedImages.value.push(
    Array.from(event.target.files).map((file) => URL.createObjectURL(file))
  );
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
.form--col {
  margin-bottom: 10px;
}
</style>
