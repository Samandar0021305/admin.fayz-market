import { createStore } from "vuex";

import menu from "./menu";
import functions from "./functions";
import portfolio from "./portfolio";
import product from "./product";
import orders from "./orders";
import  category  from "./category";
import auth from "./auth";
import  brands  from "./brands";
import { users } from "./users";
import payments from "./payments";
import  admin  from "./admin"
import {OrderAdmin} from "./OrderAdmin";
import districts from "./districts";
import regions from "./regions";


const store = createStore({
  modules: {
    namespaced: true,
    menu,
    functions,
    portfolio,
    product,
    orders,
    category,
    auth,
    brands,
    users,
    payments,
    admin,
    OrderAdmin,
    districts,
    regions
  },
});
export default store;

