import { createRouter, createWebHistory } from "vue-router";

import LayoutsAuth from "../layouts/auth.vue";

import AuthSignIn from "../views/auth/sign-in.vue";

import LayoutsDefault from "../layouts/default.vue";

import Statistics from "../views/cabinet/admin/statistics/index.vue";

import Messages from "../views/cabinet/admin/category/index.vue";
import MessagesCreate from "../views/cabinet/admin/category/create.vue";
import MessagesUpdate from "../views/cabinet/admin/category/update.vue";

import Clients from "../views/cabinet/admin/product/index.vue";
import ClientsCreate from "../views/cabinet/admin/product/create.vue";
import ClientsUpdite from "../views/cabinet/admin/product/updite.vue";

import Portfolio from "../views/cabinet/admin/brend/index.vue";
import PortfolioCreate from "../views/cabinet/admin/brend/create.vue";
import PortfolioUpdate from "../views/cabinet/admin/brend/update.vue";

import Blog from "../views/cabinet/admin/orders/index.vue";
import BlogCreate from "../views/cabinet/admin/orders/create.vue";
import BlogUpdate from "../views/cabinet/admin/orders/update.vue";

import Vacancy from "../views/cabinet/admin/klentlar/index.vue";
import VacancyCreate from "../views/cabinet/admin/klentlar/create.vue";
import VacancyUpdate from "../views/cabinet/admin/klentlar/update.vue";

import Candidates from "../views/cabinet/admin/candidates/index.vue";
import CandidatesCreate from "../views/cabinet/admin/candidates/create.vue";

import Payments from "../views/cabinet/admin/payments/index.vue"
import PaymentsUpdate from "../views/cabinet/admin/payments/update.vue"

import Message from "../views/cabinet/admin/message/index.vue"

import Admin from "../views/cabinet/admin/admin/index.vue"
import AdminUpdate from "../views/cabinet/admin/admin/update.vue";
import AdminCreate from "../views/cabinet/admin/admin/create.vue"

import Settings from "../views/cabinet/admin/settings/index.vue";

const routes = [
  {
    path: "/cabinet/admin/statistics",
    name: "Public",
    component: LayoutsDefault,
    redirect: "/",
    children: [
      {
        path: "/cabinet/admin/statistics",
        name: "statistics",
        component: Statistics,
      },
      {
        path: "/cabinet/admin/category",
        name: "messages",
        component: Messages,
      },
      {
        path: "/cabinet/admin/category/create",
        name: "messages create",
        component: MessagesCreate,
      },
      {
        path: "/cabinet/admin/category/:id",
        name: "messages update",
        component: MessagesUpdate,
      },
      {
        path: "/cabinet/admin/message",
        name: "messages ",
        component: Message,
      },
      {
        path: "/cabinet/admin/product",
        name: "clients",
        component: Clients,
      },
      {
        path: "/cabinet/admin/product/:id",
        name: "clients updite",
        component: ClientsUpdite,
      },
      {
        path: "/cabinet/admin/orders",
        name: "blog",
        component: Blog,
      },
      {
        path: "/cabinet/admin/orders/create",
        name: "blog create",
        component: BlogCreate,
      },
      
      {
        path: "/cabinet/admin/brend",
        name: "portfolio",
        component: Portfolio,
      },
      {
        path: "/cabinet/admin/payments",
        name: "Payments",
        component: Payments,
      },
      {
        path: "/cabinet/admin/payments/:id",
        name: "Payments update",
        component: PaymentsUpdate,
      },

      {
        path: "/cabinet/admin/brend/create",
        name: "portfolio create",
        component: PortfolioCreate,
      },
      {
        path: "/cabinet/admin/brend/:id",
        name: "portfolio update",
        component: PortfolioUpdate,
      },
      {
        path: "/cabinet/admin/product/create",
        name: "clients create",
        component: ClientsCreate,
      },
      {
        path: "/cabinet/admin/klentlar",
        name: "vacancy",
        component: Vacancy,
      },
      {
        path: "/cabinet/admin/klentlar/create",
        name: "klentlar create",
        component: VacancyCreate,
      },
      {
        path: "/cabinet/admin/klentlar/:id",
        name: "vacancy update",
        component: VacancyUpdate,
      },
      {
        path: "/cabinet/admin/candidates",
        name: "Candidates",
        component: Candidates,
      },
      {
        path: "/cabinet/admin/candidates/create",
        name: "Candidates create",
        component: CandidatesCreate,
      },
      {
        path: "/cabinet/admin/admin",
        name: "Admin",
        component: Admin,
      },
      {
        path: "/cabinet/admin/admin/create",
        name: "Admin created",
        component: AdminCreate,
      },
      {
        path: "/cabinet/admin/admin/:id",
        name: "Admin Update",
        component: AdminUpdate,
      },
      {
        path: "/cabinet/admin/setting",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/sign-in",
    name: "Auth",
    component: LayoutsAuth,
    redirect: "/sign-in",
    children: [
      {
        path: "/auth/sign-in",
        name: "auth sign in",
        component: AuthSignIn,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "Error",
    component: "",
  },
];

// CandidatesCreate

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const access = localStorage.getItem("access");

  if (!access && to.path != "/auth/sign-in") {
    router.push("/auth/sign-in");
  } else if (to.name == "Error" || to.path == "/") {
    if (access) {
      router.push("/cabinet/admin/statistics");
    } else {
      router.push("/auth/sign-in");
    }
  } else {
    next();
  }
});
export default router;
