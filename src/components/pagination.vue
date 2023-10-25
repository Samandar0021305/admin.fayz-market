<template>
  <div class="pagination" v-if="count > limit">
    <div class="pagination-controls">
      <button
        :disabled="!currentPage || currentPage == 1"
        @click="prev"
        class="pagination-item"
      >
      <svgicon name="chevron-right"/>Prev
      </button>
      <template v-for="item in allPages">
        <button
          :key="item"
          @click="clickBtn(item)"
          :disabled="currentPage == item"
          class="pagination-item"
          :class="{ active: currentPage == item }"
          v-if="
            item == 1 ||
            item == allPages ||
            (+currentPage - 1 <= item && +currentPage + 1 >= item)
          "
        >
          {{ item }}
        </button>
        <button
          :key="item + '1'"
          class="pagination-item"
          disabled="ture"
          v-else-if="
            (currentPage + 1 < item && currentPage + 2 >= item) ||
            (currentPage - 1 > item && currentPage - 2 <= item)
          "
        >
          ...
        </button>
      </template>
      <button
        :disabled="!currentPage || currentPage >= allPages"
        @click="next"
        class="pagination-item"
      >
      Next <svgicon name="chevron-right"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: [String, Number],
      default() {
        return 1;
      },
    },
    limit: {
      type: [String, Number],
      default() {
        return 1;
      },
    },
    page: {
      type: [String, Number],
      default() {
        return 1;
      },
    },
  },
  data() {
    return {
      currentPage: 1,
      currentLimit: "10",
    };
  },
  computed: {
    allPages() {
      return Math.ceil(this.count / this.limit);
    },
  },
  mounted() {
    this.currentPage = this.page;
    this.currentLimit = this.limit + "";
  },
  methods: {
    next() {
      this.currentPage++;
      this.currentPage <= this.allPages &&
        this.$emit("paginate", this.currentPage);
      this.$router.replace({
        query: { ...this.$route.query, page: this.currentPage },
      });
    },
    prev() {
      this.currentPage--;
      this.currentPage <= this.allPages &&
        this.$emit("paginate", this.currentPage);
      this.$router.replace({
        query: { ...this.$route.query, page: this.currentPage },
      });
    },
    clickBtn(arg) {
      this.$router.replace({ query: { ...this.$route.query, page: arg } });
      if (arg <= this.allPages) {
        this.currentPage = arg;
        this.$emit("paginate", arg);
      }
    },
  },
};
</script>

<style scoped></style>
