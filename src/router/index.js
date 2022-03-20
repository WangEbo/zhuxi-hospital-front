import Vue from "vue";
import VueRouter from "vue-router";
import { getMenu } from "@/api/global";
import store from "@/store";
import { findNodeById } from "@/utils/common";
Vue.use(VueRouter);

/* Layout */
import Layout from "@/views/Layout";
/* List */
import List from '@/components/List/index.vue'
import ListCard from '@/components/ListCard/index.vue'
import TestCard from '@/components/TestCard.vue'
/* Articles */
import Articles from '@/components/Articles/index.vue'
/* list item detail */
import ArticleCard from '@/components/ArticleCard/index.vue'
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

const getTypeRoute = (route, parentWrap)=> {
  let childrenWrap = parentWrap && parentWrap.children
  switch(route.categoryType){
    case '1':
      if(childrenWrap && parentWrap.component.name == 'Layout'){
        childrenWrap.push({
          path: route.categoryPinyin,
          component: List,
          children: [
            {
              path: '/',
              component: ListCard,
              meta: { title: route.categoryTitle, },
            },
            {
              path: 'detail/:id',
              component: ArticleCard
            }
          ]
        })
      }
      route.childs.push({
        categoryPath: route.categoryPath+'/detail',
        _useFlag: true,
        path: 'findMenuInfoUse'
      })

      break
    case '2':
      if(childrenWrap && parentWrap.component.name == 'List'){
        route.component = ArticleCard
      }else if(childrenWrap && parentWrap.component.name == 'Layout'){
        route.component = Articles  
      }else if(!childrenWrap){
        route.children = []
      }
      
      break
    case '3':
      route.children = [
        {
          path: '/',
          component: getCustomerComponent(route)
        }
      ]
  }
}

// 获取路由排版类型
const getCustomerComponent = (menu)=> {
  switch(menu.categoryTitle){
    case '首页': 
    return () => import("@/views/index")
    case '院长信箱':
      return () => import("@/views/email")
    case '名医专家':
      return () => import("@/views/doctors")
    case '地理位置':
      return () => import("@/views/overview/location")
  }
}


const generateRouter = async ()=> {
  let menus = await getMenu();
  menus = menus.data
  console.log(menus);
  //根据配置生成路由

  const _generateRouter = (menus, parentMenu, childrenWrap, level)=> {
    //一级路由生成Layout 再将对应子路由添加至children中
    for(let i=0; i<menus.length;i++){
      let childRoute = menus[i]
      if(childRoute._useFlag){
        continue
      }
      Object.assign(childRoute, {//路径/名称处理
        path: level == 1 ? '/'+childRoute.categoryPinyin : childRoute.categoryPinyin,
        // name: childRoute.categoryPinyin,
        breadcrumb: childRoute.categoryTitle,
        meta: { title: childRoute.categoryTitle, },
      })

      childRoute.level = level
      if(level == 1){
        childRoute.component = Layout;
        childRoute.children = []
        if(childRoute.childs && childRoute.childs.length && childRoute.categoryType != '3'){
          childRoute.redirect = childRoute.childs[0].categoryPath
        }
      }

      getTypeRoute(childRoute, parentMenu)

      if(childrenWrap){
        childrenWrap.push(childRoute)
      }
      if(childRoute.childs && childRoute.childs.length){
        _generateRouter(childRoute.childs, childRoute, childRoute.children, level+1)
      }
    }
  }
  
  _generateRouter(menus, null, null, 1)

  //缓存菜单
  store.dispatch('CacheMenus', menus)
  localStorage.setItem('menus', JSON.stringify(menus))

  let routers = [
    ...menus,
    { path: "/", redirect: menus[0].path },
    // { path: "/doctors", component: () => import("@/views/doctors"), },
    { 
      path: "/search", 
      component: Layout, 
      hidden: true,
      children: [
        {
          path: '/',
          component: () => import("@/views/search")
        }
      ]
    },

    { path: "/404", component: () => import("@/views/404"), hidden: true },
  ]

  console.log(routers);

  const router = new VueRouter({
    // mode: "history", //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: routers,
  })

  //查找当前激活菜单
  router.beforeEach((to, from ,next)=> {
    let path;
    if(to.params.id){
      let nextRoute = to.matched[to.matched.length-1]
      path = nextRoute.path.split(':')[0];
      path = path.substr(0, path.length-1) 
    }else{
      path = to.path
    }
    let { matchNode, matchPath } = findNodeById(menus, path, 'childs', 'categoryPath', null)

    let curLevel1Menu = matchPath[matchPath.length - 1];

    store.commit('SetcurLevel1Menu', curLevel1Menu)
    store.commit('SetCurMenu', matchNode)
    store.commit('SetMenuPath', matchPath)

    next()
  })
  
  return router
}


export default generateRouter;

