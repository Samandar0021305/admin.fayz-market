<template>
  <header class="header">
    <div class="collapse">
    </div>
    <div class="header-functions">
      <el-switch v-model="theme" />
      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button circle> <svgicon name="bell" /> </el-button>
        </template>
        <el-scrollbar>
          <ul class="notification-list">
            <li v-for="(value,index) in data.data">
              <span class="title"> {{ value?.user?.firstname }} </span>
              <span class="description">
                {{ value.comment }}
              </span>
            </li>
          </ul>
        </el-scrollbar>
      </el-popover>

      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-button circle>
            <img src="@/assets/images/user.png" alt="flag" />
          </el-button>
        </template>
        <el-button class="func-btn logout" @click="logout">
          chiqish
          <svgicon name="export" />
        </el-button>
      </el-popover>
    </div>
  </header>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getMessage } from "../../module/message.api";

const router = useRouter();
const theme = ref(false);

watch(theme, (value) => {
  const body = document.querySelector("body");
  body.classList.add("dark", "light");

  if (value) {
    body.classList.remove("light");
  } else {
    body.classList.remove("dark");
  }
});

function logout() {
  localStorage.removeItem("role");
  router.push(`/auth/sign-in`);
}

const data = reactive({data:""})

const fetchingMessage = async()=>{
    return await getMessage()
  }

  onMounted(()=>{
    fetchingMessage().then(res=>{
      data.data = res.results.reverse().splice(0,3)
    })
  })

</script>

<style lang="scss" scoped></style>
