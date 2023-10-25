const portfolio = {
  state() {
    return {};
  },
  getters: {},
  mutations: {
    setState(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    async fetchData({ commit }, { params }) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await this.$axios.get(`portfolio/`, { params });

          const { data, status } = res;

          if (status == 200) {
            commit("setState", {key: "count", value: data && data.count})
            commit("setState", {key: "list", value: data && data.results})

            resolve({
              status: true,
            });
          }
        } catch (e) {
          reject({
            status: false,
            error: e,
          });
        }
      });
    },

    async deleteItems(_, { items, api }) {
      return new Promise(async (resolve, reject) => {
        try {
          let promises = [];
          items.forEach((el) => {
            if (!el) {
              return false;
            }
            let promise = new Promise(async (resolve, reject) => {
              try {
                await this.$axios.delete(`${api}/${el}`);
                resolve({
                  status: true,
                });
              } catch (e) {
                reject({
                  status: false,
                  error: e,
                });
              }
            });
            promises.push(promise);
          });
          await Promise.all(promises);
          resolve({ status: true });
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
};

export default portfolio;
