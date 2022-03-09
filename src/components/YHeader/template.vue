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
            <el-submenu :popper-append-to-body="false" v-if="item.childs && item.childs.length" :key="i" :index="`${i+1}`" >
              <template slot="title" :class="{active: item.active}">
                <router-link :to="item.path"><span>{{item.categoryTitle}}</span></router-link>
              </template>
              <el-menu-item v-for="(child, ci) in item.childs" :key="ci" class="child-menu" :index="`${i+1}-${ci+1}`">
                <router-link :to="child.path"><span>{{child.categoryTitle}}</span></router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="i" :class="{active: item.active}" :index="`${i+1}`">
              <router-link  :to="item.path"> <span>{{item.categoryTitle}}</span></router-link>
            </el-menu-item>
          </template>
            
        </el-menu>
      </div>
      <div class="banner">
        <YSwiper :list="r1BannerList" :config="{pagination: null}">
          <div v-for="(item, i) in r1BannerList" :key="i" :style="{'background-image': `url('${imgUrlEncode(item.pic)}')`}" class="swiper-slide">
          </div>
        </YSwiper>
      </div>
    </div>
  </header>

</template>

<script>
import { getMenus, imgUrlEncode, getConfig } from "@/utils/common";
import { getIndexList } from "@/api/carousel";
import YSwiper from "@/components/YSwiper";

export default {
  name: "YHeader",
  components: {
    YSwiper,  
  },
  data(){
    return{
      info: {
        tel: "0719-2127895",
        logo: "",
      },
      activeIndex: "1",
      menus: [
        {
          categoryTitle: "首页",
          categoryId: 0,
          path: '',
          childs: [
            {
              categoryTitle: "",
              path: '',
              categoryId: 0,
              childs: [
              ],
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

  },
  created(){
    this.getR1BannerList();
    this.getMenu();
  },
  mounted(){
    
    getConfig().then(config=> {
      this.info.logo = config.logo
    });
  },
  methods: {
    imgUrlEncode,
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
      let menus = await getMenus()
      console.log(menus);
      this.$set(this, 'menus', menus)
      // this.setActiveMenu();
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