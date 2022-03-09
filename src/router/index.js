import Vue from "vue";
import VueRouter from "vue-router";
import { getMenu } from "@/api/global";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/views/Layout";

/* List */
import List from '@/components/List/index.vue'
/* Articles */
import Articles from '@/components/Articles/index.vue'
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

const getCustomerType = (menu)=> {
  switch(menu.categoryTitle){
    case '首页': 
      Object.assign(menu, {
        path: "/index",
        name: "index",
        component: () => import("@/views/index"),
        meta: { title: "首页", icon: "index" },
      })
      break
    case '院长信箱':
      Object.assign(menu, {
        path: "/email",
        name: 'email',
        component: () => import("@/views/email"),
        meta: { title: "院长信箱",  },
      })
      break
    case '地理位置':
      Object.assign(menu, {
        path: "/location",
        name: 'location',
        component: () => import("@/views/overview/location"),
        redirect: "/location",
        meta: { title: "地理位置", },
      })
      break
  }
}


const generateRouter = async ()=> {
  let menus = await getMenu();
  menus = menus.data
  console.log(menus);

  let _generateRouter = (menus)=> {
    for(let i = 0;i< menus.length;i++){
      let item = menus[i];
  
      Object.assign(item, {//路径/名称处理
        path: item.categoryPath,
        name: item.categoryPinyin,
        meta: { title: item.categoryTitle, },
      })
      switch(item.categoryType){
        case '1'://列表
          item.component = List;
          break
        case '2'://图文详情
          item.component = Articles;
          break
        case '3'://自定义
          getCustomerType(item)
          break
      }
  
      if(item.childs && item.childs.length){
        item.children = item.childs;
        _generateRouter(item.children)
      }
    }
  }
  _generateRouter(menus)

  localStorage.setItem('menus', JSON.stringify(menus))

  let routers = [
    ...menus,
    { path: "/", redirect: '/index' },
    { path: "/404", component: () => import("@/views/404"), hidden: true },
  ]

  console.log(routers);

  return new VueRouter({
    mode: "history", //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: routers,
  })
}

// export const constantRouterMap = [
  // { path: "/404", component: () => import("@/views/404"), hidden: true },
  // {
  //   path: "",
  //   component: Layout,
  //   redirect: "/index",
  //   children: [
  //     {
  //       path: "index",
  //       name: "index",
  //       component: () => import("@/views/index"),
  //       meta: { title: "首页", icon: "index" },
  //     }
  //   ],
  // },
  // {
  //   path: "/overview",
  //   component: Layout,
  //   redirect: "/overview",
  //   name: "overview",
  //   meta: { title: "医院概况", icon: "overview" },
  //   children: [
  //     {
  //       path: "overview",
  //       name: "overview-location",
  //       component: () => import("@/views/overview/location"),
  //       meta: { title: "地理位置", icon: "overview-location" },
  //     },
  //   ],
  // },
// ];

export default generateRouter;

