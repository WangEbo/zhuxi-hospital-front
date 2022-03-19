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

// 获取路由排版类型
const getCustomerType = (menu)=> {
  switch(menu.categoryTitle){
    case '首页': 
      Object.assign(menu, {
        component: () => import("@/views/index"),
      })
      break
    case '院长信箱':
      Object.assign(menu, {
        component: () => import("@/views/email"),
      })
      break
    case '名医专家':
      Object.assign(menu, {
        component: () => import("@/views/doctors"),
      })
      break
    case '地理位置':
      Object.assign(menu, {
        component: () => import("@/views/overview/location"),
        meta: { title: "地理位置", },
      })
      break
  }
}


const generateRouter = async ()=> {
  let menus = await getMenu();
  menus = menus.data
  console.log(menus);
  //根据配置生成路由
  let _generateRouter = (menus, level)=> {
    for(let i = 0;i< menus.length;i++){
      let item = menus[i];
  
      let pathArr = item.categoryPath.split('/')
      Object.assign(item, {//路径/名称处理
        path: level == 1 ? '/'+ pathArr[pathArr.length - 1] : pathArr[pathArr.length - 1],
        name: item.categoryPinyin,
        meta: { title: item.categoryTitle, },
      })
      let childIsDetailRoute;
      switch(item.categoryType){
        case '1'://列表
          item.component = List;
          item.children = [
            {
              path: 'detail/:id',
              name: item.categoryPinyin + '-detail',
              meta: { title: item.categoryTitle + '详情', },
              component: Articles,
              categoryPath: item.categoryPath+'/detail'
            }
          ]
          if(!item.childs || !item.childs.length){
            item.childs = item.children
            childIsDetailRoute = true
          } 
          break
        case '2'://图文详情
          item.component = Articles;
          break
        case '3'://自定义
          getCustomerType(item)
          break
      }
      
      if(item.childs && item.childs.length && !childIsDetailRoute){
        item.children = item.childs;
        _generateRouter(item.children, level+1)
      }
    }
  }
  _generateRouter(menus, 1)

  //缓存菜单
  store.dispatch('CacheMenus', menus)
  localStorage.setItem('menus', JSON.stringify(menus))

  let routers = [
    ...menus,
    { path: "/", redirect: menus[0].path },
    // { path: "/doctors", component: () => import("@/views/doctors"), },
    
    { path: "/404", component: () => import("@/views/404"), hidden: true },
  ]

  console.log(routers);

  const router = new VueRouter({
    mode: "history", //后端支持可开
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

    let curLevel1Menu = matchPath[0] ? matchPath[0] : matchPath[1];
    if(matchPath.length == 1){
      curLevel1Menu = matchNode
    }
    store.commit('SetcurLevel1Menu', curLevel1Menu)
    store.commit('SetCurMenu', matchNode)
    store.commit('SetMenuPath', matchPath)

    next()
  })
  
  return router
}


export default generateRouter;

