<template>
  <header class="y-header">
    <div class="row1">
      <div class="row1-content">
        <div class="logo"><img @click="toIndex" :src="config.logo" alt=""></div>
        <div class="func-part">
          <p>急诊热线：{{config.hotline}}</p>
          <el-input placeholder="请输入搜索内容" v-model="keywords" class="input-with-select">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="row2">
      <div class="nav">
        <el-menu
          :default-active="activeIndex"
          class="ElMenu-demo page-inner"
          mode="horizontal"
          :router="true"
          background-color="#986218"
          text-color="#fff"
          active-text-color="#fff">
          <template v-for="(item, i) in menus">
            <el-submenu :popper-append-to-body="false" :class="{active: curPage.path === item.path}" v-if="item.childs && item.childs.length" :key="i" :index="`${i+1}`" >
              <template slot="title"  v-if="item.categoryTitle">
                <router-link :to="item.categoryPath">{{item.categoryTitle}}</router-link>
              </template>
              <el-menu-item v-show="child.categoryTitle" v-for="(child, ci) in item.childs" :route="child.categoryPath" :key="ci" class="child-menu" :index="`${i+1}-${ci+1}`">
                <span>{{child.categoryTitle}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-show="item.categoryTitle" v-else :key="'level1-'+i" :route="item.categoryPath" :class="{active: curPage.path === item.path }" :index="`${i+1}`">
              <span>{{item.categoryTitle}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="banner">
        <YSwiper :list="bannerList" :config="{pagination: null}">
          <div v-for="(item, i) in bannerList" :key="i" :style="{'background-image': `url('${imgUrlEncode(item.pic)}')`}" class="swiper-slide">
          </div>
        </YSwiper>
      </div>
    </div>
    <div id="app-menu" @click="appOn = true" class="app">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav-app app" :class="{on: appOn}">
      <div class="mask" @click="appOn = false"></div>
      <div class="child">
        <ul>
          <li v-if="item.categoryTitle" @click="showChild(item)" :class="{active: routeActive(item), current: routeActive(item)}" class="go-child"  v-for="(item,i) in menus" :key="i">
            <div>
              <a :href="'#' + item.categoryPath || 'javascript: viod(0)'">{{item.meta.title}}</a><i  v-show="item.childs && item.childs.length" class="icon iconfont icon-arrow-right"></i>
            </div>
            <ol v-show="item.childs && item.childs.length" class="nav-down" :style="{height: item.active ? getShowChildsLength(item) * 38 +'px' : '0'}">
              <li :class="{active: routeActive(child)}" v-if="child.categoryTitle" v-for="(child, cIndex) in item.childs" :key="cIndex"><a :href="'#' + child.categoryPath || 'javascript: void(0)'" :target="child.target || '_self'">{{child.meta.title}}</a></li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  </header>

</template>

<script>
import { imgUrlEncode } from "@/utils/common";
import { getUrlQuery } from "@/utils/common";
import YSwiper from "@/components/YSwiper";
import { mapGetters } from 'vuex'

import { getIndexList } from "@/api/carousel";
import { getArticlesList } from "@/api/content";
export default {
  name: "YHeader",
  components: {
    YSwiper,  
  },
  computed: {
    ...mapGetters(['menus', 'config', 'curMenu', 'curLevel1Menu',]),
    curPage(){
      return this.curLevel1Menu || {}
    },
    
  },
  data(){
    return{
      activeIndex: "1",
      appOn: false,
      // menus: [
      //   {
      //     categoryTitle: "首页",
      //     categoryId: 0,
      //     path: '',
      //     childs: [
      //       {
      //         categoryTitle: "",
      //         path: '',
      //         categoryId: 0,
      //         childs: [
      //         ],
      //       },
      //     ],
      //   },
      // ],
      keywords: "",
      bannerList: [
        {url: "",href: ""},
      ],
    };
  },
  beforeCreate(){

  },
  created(){
    this.getBannerList();
  },
  mounted(){
    this.setActiveMenu()
  },
  methods: {
    imgUrlEncode,
    routeActive(item){
      return this.$route.path.includes(item.path)
    },
    getShowChildsLength(item){
      return item.childs.filter(item=> item.categoryTitle).length
    },
    showChild(curItem){
      try{
        this.menus.forEach(item=> {
          this.$set(item, "active", item == curItem ? !curItem.active : false);
        });
      }catch (err){
        console.log(err);
      }
    },
    search(e){
      console.log("搜索", this.keywords);
      let k = this.keywords.trim();
      let query = getUrlQuery();
      let keyword = decodeURIComponent(query.k);
      if(k == keyword){
        return
      }
      if(!k){
        return;
      }
      this.$router.push({
        path: '/search', 
        query: {
          k: k
        }
      })
    },
    setActiveMenu(){
      let index1 = this.menus.indexOf(this.curLevel1Menu) + 1
      this.activeIndex = index1+'';
      console.log(this.activeIndex);
      this.$set(this.curLevel1Menu, 'active', true)
    },
    goTarget(menu){
      this.$router.push(menu.categoryPath)
    },
    getBannerList(){
      getIndexList().then(res=> {
        this.bannerList = res.data;
      });
    },
    toIndex(){
      this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
  $inputHeight: 30px;

.el-submenu__title{
  a{
    line-height: 30px;
  }
}

.y-header{
  .row1{
    @include adptiveBg;
    background-image: url('../../assets/imgs/header-bg1.jpg');
    .row1-content{
      width: 1680px;
      height: 180px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo, .func-part{
        height: 120px;
      }
      .logo{
        width: 1200px;
        img{
          cursor: pointer;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .func-part{
        width: 380px;
        height: 90px;
        p{
          font-size: 22px;
          line-height: 1;
          text-align: center;
          margin-bottom: $moduleMargin;
        }
        .el-input-group{
          font-size: 16px;
          .el-input-group__append{
            border-color: $mainTheme;
            background-color: $mainTheme;
            color: rgb(206, 204, 207);
          }
          input{
            background-color: transparent;
            border-color: $mainTheme;
            border-right: 0;
            &:focus{
              border-color: $mainTheme;
            }
          }
        }
      }
    }
    
  }

  .row2{
    .nav{
      background-color: $mainTheme;
      $navH: 50px;
      height: $navH;
      .el-menu{
        &.el-menu--horizontal{
          border-color: $mainTheme;
        }
        
        .el-menu-item, .el-submenu__title{
          height: $navH;
          line-height: $navH;
          a, span{
            line-height: 30px;
            font-size: 17px;
          }
        }
        .el-menu-item{
          &.active{
            border-bottom: 0;
            background-color: rgb(129, 39, 41)!important;
          }
        }

        .el-submenu{
          &.active{
            >.el-submenu__title{
              border-bottom: 0;
              background-color: rgb(129, 39, 41)!important;
            }
          }
          .el-icon-arrow-down{
            display: none;
          }
          .el-menu--popup{
            min-width: auto;
            .child-menu{
              min-width: auto;
              padding: 0 25px;
            }
          }
          
        }
        
      }
    }

    .banner{
      .swiper-container{
        padding: 0!important;
      }
      .swiper-slide{
        width: 100%;
        height: 550px;
        @include adptiveBg;
      }
    }
  }
}

#app-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    height: 20px;/*no*/
    position: absolute;
    top: 24px;/*no*/
    bottom: 0;
    right: 24px;/*no*/
    z-index: 13;
    display: none;
    span {
      background-color: $mainTheme;
      height: 2px;/*no*/
      border-radius: 50px;/*no*/
      transition: all 0.3s ease-in-out;
      transition: all 1s ease-in-out;
      &:nth-of-type(1) {
        width: 25px;/*no*/
      }
      &:nth-of-type(2) {
        width: 25px;/*no*/
      }
      &:nth-of-type(3) {
        width: 25px;/*no*/
      }
    }
    &.on {
      span {
        transition: all 0.6s ease-in-out;
        &:nth-of-type(1) {
          width: 27px;
          transform-origin: 100% 50%;
        }
        &:nth-of-type(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        &:nth-of-type(3) {
          width: 27px;
          transform-origin: 100% 50%;
          transform: rotate(45deg);
        }
      }
    }
  }

.nav-app {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10000;
    width: 0;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .child {
      position: absolute;
      height: 100%;
      width: 60%;
      transition: all 0.3s ease-in-out;
      transform: translateX(100%);
      background-color: #fff;
      top: 0;
      right: 0;
      z-index: 5;
      color: $textColor;
      overflow-y: scroll;
      a, i{
        color: $textColor;
      }
      ul {
        padding-top: 36px;
        li {
          position: relative;
          i {
            height: 44px; /*no*/
            line-height: 44px; /*no*/
            position: absolute;
            right: 24px; /*no*/
            top: 0;
            font-size: 12px; /*no*/
            width: 44px; /*no*/
            text-align: center;
            transition: all 0.3s ease-in-out;
          }
          a {
            box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
            text-shadow: none;
            display: inline-block;
            width: 100%;
            height: 44px; /*no*/
            line-height: 44px; /*no*/
            font-weight: bold;
            font-size: 18px; /*no*/
            padding: 0 24px; /*no*/
          }

          ol {
            overflow: hidden;
            background-color: $mainTheme;
            transition: all .3s ease-in;
            background: inherit;
            li {
              a {
                width: 100%;
                display: inline-block;
                height: 38px; /*no*/
                line-height: 38px; /*no*/
                padding: 0 24px; /*no*/
                text-indent: 10px; /*no*/
                opacity: 0.9;
                font-size: 14px;/*no*/
                // font-weight: normal;
              }
              &.active{
                a{
                  color: $mainTheme;
                }
              }
            }
          }
          &.current{
            >div>a {
              color: $mainTheme !important;
              &:after {
                opacity: 1;
              }
            }
          }
          &.active {
            i {
              transform: rotate(90deg);
            }
          }
          
        }
        
      }
    }
    &.on {
      width: 100%;
      opacity: 1;
      pointer-events: auto;
      .child {
        transform: translateX(0);
      }
    }
  }


@media screen and(max-width: 1366px) {
  .y-header{
    .row1{
      .row1-content{
        width: 1260px;
        height: 180px;
        .logo, .func-part{
          height: 120px;
        }
        .logo{
          width: 800px;
        }
        .func-part{
          width: 280px;
          height: 90px;
          p{
            font-size: 22px;
            line-height: 1;
            text-align: center;
            margin-bottom: $moduleMargin;
          }
          .el-input-group{
            font-size: 16px;
            .el-input-group__append{
              border-color: $mainTheme;
              background-color: $mainTheme;
              color: rgb(206, 204, 207);
            }
            input{
              background-color: transparent;
              border-color: $mainTheme;
              border-right: 0;
              &:focus{
                border-color: $mainTheme;
              }
            }
          }
        }
      }
      
    }
  }
}


@media screen and(max-width: 600px) {
  .y-header{
    .row1{
      .row1-content{
        width: 90%;
        margin: 0 auto;
        display: block;
        .logo, .func-part{
          height: 50px;
          margin-top: 15px;
          display: block;
        }
        .logo{
          width: calc(100% - 50px);
          img{
            cursor: pointer;
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .func-part{
          width: 280px;
          height: 90px;
          p{
            font-size: 14px;
            line-height: 1;
            text-align: left;
            margin-bottom: $moduleMargin;
          }
          .el-input-group{
            width: 100%;
            font-size: 12px;
            line-height: $inputHeight;
            .el-input-group__append{
              height: $inputHeight;
              border: 0;
              button{
                line-height: 28px;
                height: 28px;
                padding: 0 5px;
                margin: 0;
              }
            }
            input{
              height: $inputHeight;
              line-height: $inputHeight;
              &:focus{
              }
            }
          }
        }
      }
      
    }

    .row2{
      .nav{
        display: none;
        overflow-x: scroll;
        white-space: nowrap;
        .el-menu{
          width: auto;
          white-space: nowrap;
          display: inline-block;
          height: 50px;
          .el-menu-item{
            float: none;
            display: inline-block;
          }
        }
      }
  
      .banner{
        .swiper-container{
          padding: 0!important;
          .swiper-button-next, .swiper-button-prev{
            width: 15px;
            height: 22px;
            background-size: contain;
          }
        }
        .swiper-slide{
          width: 100%;
          height: 300px;
          @include adptiveBg;
        }
      }
    }

    #app-menu{
      display: flex;
    }
  }
}


</style>