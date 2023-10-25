import ConfigApi from "../api";

const auth = {
    state() {
      return {
        access: "",
        role: 0,
      };
    },
    getters: {
      role(state) {
        return state.role;
      },
      access(state) {
        return state.access;
      },
    },
    mutations: {
      setState(state, { key, value }) {
        value && localStorage.setItem(key, value);
        !value && localStorage.removeItem(key);
        state[key] = value;
      },
    },
    actions: {
      login({ commit }, form) {
        return new Promise(async (resolve, reject) => {
          try {
            // const res = await this.$axios.post("token/", form);
            const res = await ConfigApi.post("token/",form)
           if(res){
            const { access } = res ;
  
            const token = access;
  
            const token_split = token && token.split(".");
            const fields_str =
              token_split &&
              token_split.length > 1 &&
              JSON.parse(window.atob(token_split[1]));
  
            commit("setState", { key: "access", value: token });
            commit("setState", { key: "role", value: 1 });
  
            resolve({
              status: true,
              error: null,
            });
           }
          } catch  {
            reject({
              status: false,
              error: e,
            });
          }
        });
      },
    },
  };
  
  export default auth;