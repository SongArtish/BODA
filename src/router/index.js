import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import AdminListView from "@/views/Admin/AdminListView.vue";
import AdminEdit from "@/views/Admin/AdminEditView.vue";
import AdminAdd from "@/views/Admin/AdminAddView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/admin/list",
    name: "AdminListView",
    component: AdminListView,
  },
  {
    path: "/admin/edit",
    name: "adminedit",
    component: AdminEdit,
  },
  {
    path: "/admin/add",
    name: "adminadd",
    component: AdminAdd,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
