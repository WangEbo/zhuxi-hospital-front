<template>
  <header class="y-header">
    <div class="row1">
      <div class="row1-content">
        <div class="logo"><img :src="info.logo" alt=""></div>
        <div class="func-part">
          <p>急诊热线：{{info.tel}}</p>
          <el-input placeholder="请输入搜索内容" v-model="keywords" class="input-with-select">
            <el-button slot="append">搜索</el-button>
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
            <el-submenu :popper-append-to-body="false" v-if="item.childs && item.childs.length" :index="`${i+1}`" >
              <template slot="title" :class="{active: item.active}"><a :href="item.url">{{item.name}}</a></template>
              <el-menu-item class="child-menu" v-for="(child, ci) in item.childs" :key="ci" :index="`${i+1}-${ci+1}`"><a :href="child.url">{{child.name}}</a></el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="i" :index="`${i+1}`" :class="{active: item.active}" ><a :href="item.url">{{item.name}}</a></el-menu-item>
          </template>
            
        </el-menu>
      </div>
      <div class="banner">
        <YSwiper :list="r1BannerList" :config="{pagination: null}">
          <div v-for="(item, i) in r1BannerList" :key="i" class="swiper-slide">
            <img :src="item.pic" alt="">
          </div>
        </YSwiper>
      </div>
    </div>
  </header>

</template>

<script>
import { getMenu } from "@/api/global";
import { getConfig } from "@/api/global";
import { getIndexList, getCateList, getNewsList } from "@/api/carousel";
import YSwiper from "@/components/YSwiper";

require("../../assets/imgs/logo.png");

export default {
  name: "YHeader",
  components: {
    YSwiper,  
  },
  data(){
    return{
      info: {
        tel: "0719-2127895",
        logo: "./img/logo.png",
      },
      activeIndex: "1",
      menus: [
        {
          name: "首页",
          url: "/",
          childs: [
          ],
        },
        {
          name: "医院概况",
          url: "overview.html",
          childs: [
            {
              name: "品牌简介",
              url: "overview.html",
            },
            {
              name: "领导介绍",
              url: "leaders.html",
            },
            {
              name: "设备展示",
              url: "equipments.html",
            },
            {
              name: "科研成果",
              url: "equipments.html",
            },
            {
              name: "地理位置",
              url: "locaiton.html",
            },
          ],
        },
        {
          name: "医院动态",
          url: "notice.html",
          childs: [
            {
              name: "通知公告",
              url: "notice.html",
            },
            {
              name: "招投标公告",
              url: "bidding.html",
            },
            {
              name: "新闻动态",
              url: "news.html",
            },
            {
              name: "医院专题",
              url: ".html",
            },
            {
              name: "医院视频",
              url: "news.html",
            },
          ],
        },
        {
          name: "官方商城",
          url: "goods.html",
          childs: [
            {
              name: "跑步系列",
              url: "goods_cate.html?id=1",
            },
          ],
        },
      ],
      keywords: "",
      r1BannerList: [
        {url: "",href: ""},
      ],
    };
  },
  beforeCreate(){
    localStorage.removeItem("config");
  },
  created(){
    this.getR1BannerList();
    this.getMenu();
  },
  mounted(){
    
    getConfig().then(res=> {
      // localStorage.setItem("config", JSON.stringify(res.data));
      // this.logo = res.data.logo;
    });
  },
  methods: {
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
      if(!k){
        return;
      }
      location.href = `./search.html?k=${k}`;
    },
    async getMenu(){
      // let res = await getMenu()
      // this.menus = res.data;
      this.setActiveMenu();
    },
    setActiveMenu(){
      let pathname = location.pathname,
        activeIndex = [];
      for(let i =0;i< this.menus.length;i++){
        let item = this.menus[i];
        if(item.url === "/"){
          if(pathname === item.url){
            item.active = true;
            activeIndex.push(`${i+1}`);
          }
        }else{
          pathname = pathname.split(".")[0];
          let menuPath = item.url && item.url.split(".")[0];
          if(!item.childs)return;
          for(let ci = 0;ci< item.childs.length; ci++){
            let child = item.childs[ci];
            let childPath = child.url && child.url.split(".")[0];
            if(childPath && pathname.includes(childPath)){
              activeIndex.push(`${i+1}`);
              activeIndex.push(`${ci+1}`);
            }
          }
        }
      }
      this.activeIndex = activeIndex.join("-");
      console.log(this.activeIndex);
    },

    getR1BannerList(){
      getIndexList().then(res=> {
        this.r1BannerList = res.data;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>