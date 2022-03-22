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

import DoctorListWrap from '@/components/DoctorListWrap.vue'
import DoctorList from '@/components/DoctorList.vue'
import DoctorDetail from '@/components/DoctorDetail.vue'

import DepartmentList from '@/components/DepartmentList.vue'
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

const DOCTOR_MENU_TITLE = '名医专家'
const DEPARTMENT_MENU_TITLE = '医院科室'

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
    case '地理位置':
      return () => import("@/views/overview/location")
  }
}

//医生组件对应层级
let doctorLevelComponentMap = {
  '1': DoctorListWrap,
  '2': DoctorList,
  '3': DoctorDetail,
}
//科室特色组件对应层级
let departmentLevelComponentMap = {
  '1': DoctorListWrap,
  '2': DepartmentList,
  '3': ArticleCard,
}
const getDoctorRoute = (doctorRoute, parentMenu, childrenWrap, level, type)=> {
  let childs = doctorRoute.childs
  if(!childs || !childs.length || doctorRoute._useFlag){
    return
  }
  if(parentMenu && level < 4){
    parentMenu.redirect = parentMenu.childs[0].categoryPath
  }
  
  for(let i =0; i<childs.length;i++){

    let childRoute = childs[i]
    //获取对应 组件与路由对应映射
    const COMPONENTMAP = type == DOCTOR_MENU_TITLE ? doctorLevelComponentMap : departmentLevelComponentMap

    childrenWrap.push(Object.assign(childRoute,{
      path: childRoute.categoryPath,
      breadcrumb: childRoute.categoryTitle,
      name:  childRoute.categoryPinyin,
      meta: { title: childRoute.categoryTitle, },
      component: COMPONENTMAP[level+''],//获取对应层级路由组件
      children: [],
    }))
    if(level == 3){
      if(childRoute.categoryPath && childRoute.categoryPath.includes('/null')){
        childRoute.categoryPath = childRoute.categoryPath.replace('/null', '/detail')
      }else{
        let lastSlashIndex = childRoute.categoryPath.lastIndexOf('/')
        childRoute.categoryPath = childRoute.categoryPath.substr(0, lastSlashIndex) + '/detail'
      }
      childRoute.path = doctorRoute.categoryPath+'/detail/:id'
    }
    getDoctorRoute(childRoute, doctorRoute, childRoute.children, level+1, type)
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

      //科室特色与名医专家路由需特殊处理
      if(level == 1 && (childRoute.categoryTitle == DOCTOR_MENU_TITLE || childRoute.categoryTitle == DEPARTMENT_MENU_TITLE)){
        getDoctorRoute(childRoute, parentMenu, childRoute.children, level, childRoute.categoryTitle)
        console.log(childRoute.categoryTitle, childRoute);
        continue
      }

      //正常列表->详情路由处理
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

