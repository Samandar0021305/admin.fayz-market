const menu = {
  state() {
    return {
      isCollapse: false,
      menu: [
        {
          id:1,
          icon: "activity",
          name: {
            uz: "Statistika",
            oz: "Statistics",
            ru: "Statistics",
            en: "Statistics",
          },
          path: "/cabinet/admin/statistics",
        },
        {
          id:2,
          icon: "mahsulotlar",
          name: {
            uz: "Mahsulotlar",
            oz: "Mahsulotlar",
            ru: "Mahsulotlar",
            en: "Mahsulotlar",
          },
          path: "/cabinet/admin/product"
        },
        {
          id:3,
          icon: "category",
          name: {
            uz: "Kategoriyalar",
            oz: "Kategoriyalar",
            ru: "Kategoriyalar",
            en: "Kategoriyalar",
          },
          path: "/cabinet/admin/category"
        },
        {
          id:4,
          icon: "brend",
          name: {
            uz: "Brendlar",
            oz: "Brendlar",
            ru: "Brendlar",
            en: "Brendlar",
          },
          path: "/cabinet/admin/brend"
        },
        {
          id:5,
          icon: "buyurtma",
          name: {
            uz: "Buyurtmalar",
            oz: "Buyurtmalar",
            ru: "Buyurtmalar",
            en: "Buyurtmalar",
          },
          path: "/cabinet/admin/orders"
        },
        {
          id:6,
          icon: "kilent",
          name: {
            uz: "Mijozlar",
            oz: "Mijozlar",
            ru: "Mijozlar",
            en: "Mijozlar",
          },
          path: "/cabinet/admin/klentlar"
        },
        {
          id:7,
          icon: "money",
          name: {
            uz: "To’lovlar",
            oz: "To’lovlar",
            ru: "To’lovlar",
            en: "To’lovlar",
          },
          path: "/cabinet/admin/payments"
        },
        {
          id:8,
          icon: "news",
          name: {
            uz: "Xabarlar",
            oz: "Xabarlar",
            ru: "Xabarlar",
            en: "Xabarlar",
          },
          path: "/cabinet/admin/message"
        },
        {
          id:9,
          icon: "admin",
          name: {
            uz: "Adminlar",
            oz: "Adminlar",
            ru: "Adminlar",
            en: "Adminlar",
          },
          path: "/cabinet/admin/admin"
        },
        
      ],
    };
  },
  getters: {
    isCollapse(state) {
      return state.isCollapse;
    },
    menu(state) {
      return state.menu;
    },
  },
  mutations: {
    setState(state, { key, value }) {
      state[key] = value;
    },
  },
};

export default menu;

// actions: {
//   fetchRegionList({ commit }) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const res = await this.$axios.get("/region/list");
//         const { status, message, data } = res.data;
//         if (status) {
//           commit("setState", {
//             key: "regionList",
//             value: data.results || [],
//           });
//           resolve({
//             status,
//             error: null,
//           });
//         } else {
//           reject({
//             status,
//             error: message,
//           });
//         }
//       } catch (e) {
//         reject({
//           status: false,
//           error: e,
//         });
//       }
//     });
//   },
// },