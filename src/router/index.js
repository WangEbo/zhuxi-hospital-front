import Vue from "vue";
import VueRouter from "vue-router";
import { getMenu } from "@/api/global";


Vue.use(VueRouter);

/* Layout */
import Layout from "@/views/Layout";

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

const menus = getMenu();
export const constantRouterMap = [
  { path: "/404", component: () => import("@/views/404"), hidden: true },
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [{
      path: "index",
      name: "index",
      component: () => import("@/views/index"),
      meta: { title: "首页", icon: "index" },
    }],
  },
  {
    path: "/overview",
    component: Layout,
    redirect: "/overview",
    name: "overview",
    meta: { title: "医院概况", icon: "overview" },
    children: [
      {
        path: "overview",
        name: "overview-location",
        component: () => import("@/views/overview/location"),
        meta: { title: "地理位置", icon: "overview-location" },
      },
    ],
  },
];

//其他异步路由
export const asyncRouterMap = [


  { path: "*", redirect: "/404", hidden: true },
  { path: "/", redirect: "/set/universal" },
];

export default new VueRouter({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

