<template>
  <CustomPages title="Candidates" createPath="/cabinet/admin/candidates/create">
    <template #default>
      <CustomTable
        :deleteItems="deleteItems"
        @closeDeleting="closeDeleting"
        @onDelete="onDelete"
      >
        <template #header>
          <th>
            <input
              type="checkbox"
              v-model="onDeleting"
              @change="onSelectedAll"
            />
          </th>
          <th>
            <span>{{ "Name" }} </span>
          </th>
          <th>
            <span>{{ "E-mail" }} </span>
          </th>
          <th>
            <span>{{ "Phone" }} </span>
          </th>
          <th>
            <span>{{ "CV (file)" }} </span>
          </th>
          <th>
            <span>{{ "Status" }} </span>
          </th>
          <th>
            <span>{{ "Actions" }} </span>
          </th>
        </template>
        <template #body v-if="list && list.length">
          <tr v-for="(item, index) in list" :key="item.id">
            <td>
              <input
                type="checkbox"
                :checked="deleteItems.includes(item.id)"
                :value="item.id"
                @change="toggle($event, item.id)"
              />
            </td>
            <td>
              <span>{{ "Muhammad Ali Mamadjonov" }}</span>
            </td>
            <td>
              <span>{{ "sohibsharipov000@gmail.com" }}</span>
            </td>
            <td>
              <span>{{ "+998 90 325 36 32" }}</span>
            </td>
            <td>
              <span>
                <a href="#" download>{{ "CV Sharipov..." }}</a>
              </span>
            </td>

            <td class="center">
              <span class="status" :class="{ active: index % 2 == 0 }">
                {{ "Active" }}</span
              >
            </td>
            <td width="84px">
              <el-popover placement="bottom" width="120" trigger="click">
                <template #reference>
                  <svgicon class="dots" name="dots-horizontal" />
                </template>
                <div class="table-action">
                  <button
                    class="edit"
                    @click="$router.push(`/cabinet/admin/candidates/update`)"
                  >
                    <svgicon name="edit" />
                    <span>Edit</span>
                  </button>
                  <button class="delete" @click="onDelete(item.id)">
                    <svgicon name="delete" />
                    <span>Delete</span>
                  </button>
                  <button class="view" @click="detail = { status: item.id }">
                    <svgicon name="eye" />
                    <span>View</span>
                  </button>
                </div>
              </el-popover>
            </td>
          </tr>
        </template>
        <template #empty v-else>
          <CustomEmpty />
        </template>
      </CustomTable>
    </template>
    <template #footer>
      <div class="showcase">
        <span>Showing 1 - 10 of 350</span>
      </div>
      <Pagination :limit="10" :count="100" :page="2" />
    </template>
  </CustomPages>
  <PopopCandidates :item="detail" />
</template>

<script setup>
import { ref, reactive, computed } from "vue";

import PopopCandidates from "@/components/popup/candidates/index.vue";

import CustomPages from "@/components/custom/pages/index.vue";
import CustomTable from "@/components/custom/table.vue";
import Pagination from "@/components/pagination.vue";

import { useStore } from "vuex";
const store = useStore();

const detail = ref(null);

const onDeleting = ref(false);
const deleteItems = ref([]);
const list = reactive([
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
]);

// const list = computed(() => {
//   return listData;
// });

const onDelete = async (id) => {
  try {
    let items = [];
    if (id) {
      items.push(id);
    } else {
      items = deleteItems.value;
    }

    ElMessage({
      message: "Congrats, this is a success message.",
      type: "success",
    });

    // const { status, error } = await this.$store.dispatch(
    //   "functions/deleteItems",
    //   {
    //     items,
    //     api: "/user-study",
    //   }
    // );
    // if (status) {
    //   await this.FetchData();
    //   this.$message.success(this.$t("MessageSuccess"));
    //   deleteItems.value = [];
    //   onDeleting.value = false;
    // } else {
    //   this.$message.error(error);
    // }
  } catch (error) {
    console.log(error);
  }
};

function toggle(e, itemId) {
  const f = deleteItems.value.findIndex((item) => item == itemId);

  if (f != -1) {
    deleteItems.value.splice(f, 1);
  } else {
    deleteItems.value.push(itemId);
  }
  if (deleteItems.value.length == list.length) {
    onDeleting.value = true;
  } else {
    onDeleting.value = false;
  }
}

function onSelectedAll(e) {
  deleteItems.value = [];
  onDeleting.value = e.target.checked;
  if (onDeleting.value) {
    deleteItems.value = list.map((el) => el.id);
  } else {
    deleteItems.value = [];
  }
}

function closeDeleting() {
  deleteItems.value = [];
  onDeleting.value = false;
}
</script>

<style lang="scss" scoped></style>
