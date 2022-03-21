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
          background-color="#986218"
          text-color="#fff"
          active-text-color="#fff">
          <template v-for="(item, i) in menus">
            <el-submenu :popper-append-to-body="false" :class="{active: curPage.path === item.path}" v-if="item.childs && item.childs.length" :key="i" :index="`${i+1}`" >
              <template slot="title"  v-if="item.categoryTitle">
                <span @click="goTarget(item)">{{item.categoryTitle}}</span>
              </template>
              <el-menu-item v-show="child.categoryTitle" v-for="(child, ci) in item.childs" :key="ci" class="child-menu" :index="`${i+1}-${ci+1}`">
                <span @click="goTarget(child)">{{child.categoryTitle}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-show="item.categoryTitle" v-else :key="'level1-'+i" :class="{active: curPage.path === item.path }" :index="`${i+1}`">
              <span @click="goTarget(item)">{{item.categoryTitle}}</span>
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
  </header>

</template>

<script>
import { imgUrlEncode } from "@/utils/common";

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
    }
  },
  data(){
    return{
      activeIndex: "1",
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
    search(e){
      console.log("搜索", this.keywords);
      let k = this.keywords.trim();
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
@import "./style.scss";
</style>