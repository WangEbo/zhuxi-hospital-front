<template>
  <div id="index-page" v-cloak>
    <el-row class="row1 page-inner">
      <el-col :span="9">
        <div class="banner">
          <YSwiper :list="r1BannerList" :config="{
            nextButton: null,
            prevButton: null,
          }">
            <div v-for="(item, i) in r1BannerList" :key="i" class="swiper-slide">
              <img :src="item.pic" alt="">
              <p class="slide-des">{{item.des}}</p>
            </div>
          </YSwiper>
        </div>
      </el-col>
      <el-col :span="13" :offset="2">
        <div class="y-tab">
          <div class="more">更多>></div>
          <el-tabs v-model="activeTab" @tab-click="tabChange">
            <el-tab-pane class="news" :label="news.title" name="news">
              <div class="top-news">
                <h4 class="title">{{news.topNews().title}}</h4>
                <div class="ellipsis">
                  <div class="ellipsis-container">
                    <div class="ellipsis-content content">{{news.topNews().contentDescription}}</div>
                    <div class="ellipsis-ghost">
                        <div class="ellipsis-placeholder"></div>
                        <a class="detail ellipsis-more" href=""><span>...</span><span>[详情]</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li v-for="(item, i) in news.list()" :key="i">
                  <a class="fs16 h" :href="`./news?id=${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.title}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </a>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="hospitalVideos.title" name="hospitalVideos">
              <div class="top-news">
                <h4 class="title">{{news.topNews().title}}</h4>
                <div class="ellipsis">
                  <div class="ellipsis-container">
                    <div class="ellipsis-content content">{{news.topNews().contentDescription}}</div>
                    <div class="ellipsis-ghost">
                        <div class="ellipsis-placeholder"></div>
                        <a class="detail ellipsis-more" href=""><span>...</span><span>[详情]</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li v-for="(item, i) in news.list()" :key="i">
                  <a class="fs16 h" :href="`./news?id=${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.title}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </a>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="wenyuan.title" name="wenyuan">
              <div class="top-news">
                <h4 class="title">{{news.topNews().title}}</h4>
                <div class="ellipsis">
                  <div class="ellipsis-container">
                    <div class="ellipsis-content content">{{news.topNews().contentDescription}}</div>
                    <div class="ellipsis-ghost">
                        <div class="ellipsis-placeholder"></div>
                        <a class="detail ellipsis-more" href=""><span>...</span><span>[详情]</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li v-for="(item, i) in news.list()" :key="i">
                  <a class="fs16 h" :href="`./news?id=${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.title}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </a>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <el-row class="row2 page-inner">
      <el-col :span="9">
        <div class="y-tab">
          <div class="more">更多>></div>
          <el-tabs :value="'notice'">
            <el-tab-pane :label="notice.title" name="notice">
              <ul class="list">
                <li v-for="(item, i) in notice.data.slice(1, 5)" :key="i">
                  <a class="fs16 h" :href="`./notice?id=${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.title}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </a>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="13" :offset="2">
        <div class="y-tab">
          <div class="more">更多>></div>
          <el-tabs :value="'bid'" @tab-click="tabChange">
            <el-tab-pane class="news" :label="bid.title" name="bid">
              <ul class="list">
                <li v-for="(item, i) in bid.data.slice(1, 5)" :key="i">
                  <a class="fs16 h" :href="`./bid?id=${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.title}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </a>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <div class="div-bg bg1"></div>


    <el-row class="row2 page-inner">
      <el-col :span="9">
        <div class="y-tab">
          <div class="more">更多>></div>
          <el-tabs :value="'overview'">
            <el-tab-pane :label="overview.title" name="overview">
              <p>{{overview.data.contentDescription}}</p>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="13" :offset="2">
        <div class="y-tab">
          <div class="more">更多>></div>
          <el-tabs :value="'doctor'" @tab-click="tabChange">
            <el-tab-pane class="doctor" :label="doctor.title" name="doctor">
              <ul class="list">
                <li v-for="(item, i) in doctor.data.slice(1, 5)" :key="i">
                  <a class="fs16 h" :href="`./doctor?id=${item.id}`">
                    
                  </a>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <div class="div-bg bg2"></div>
  </div>
 
</template>
<script>

import YSwiper from "@/components/YSwiper";
import { imgUrlEncode, findNodeById } from "@/utils/common";
import { getArticlesList, getArticleById } from "@/api/content";
import { mapGetters } from 'vuex'

export default {
  filter:{
    
  },
  components: {
    YSwiper,
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(['menus'])
  },
  data() {
    let self = this;
    return {
      r1BannerList: [
        {url: "",href: "", des: ""},
      ],
      activeTab: "news",
      moduleNames: [
        "news",
        "hospitalVideos",
        "wenyuan",
        "notice",
        "bid",
        "overview",
        "doctor",
        "equipment",
        "tech",
        "specialty",
      ],

      news: {
        title: "新闻动态",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            coverImg: "",
            contentDescription: "",
            title: "",
            id: "",
            content: "",
            createTime: "",
          },
        ],
        topNews(){
          return this.data && this.data.length && this.data.slice(0, 1)[0];
        },
        list(){
          return this.data && this.data.length && this.data.slice(1, 6);
        },
      },
      hospitalVideos: {
        title: "医院视频",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
        list(){
          return this.data && this.data.length && this.data.slice(1, 6);
        },
      },
      wenyuan: {
        title: "中医文苑",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
        list(){
          return this.data && this.data.length && this.data.slice(1, 6);
        },
      },
      notice: {
        title: "通知公告",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
      bid: {
        title: "招投标",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
      overview: {
        title: "医院简介",
        req: getArticleById,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            contentDetails: "",
          },
        ],
      },
      doctor: {
        title: "名医专家",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
      equipment: {
        title: "高新设备",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
      tech: {
        title: "特色技术",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
      specialty: {
        title: "特色专科",
        req: getArticlesList,
        params: {},
        moreLink: "", 
        data: [
          {
            id: "",
            contentDescription: "",
            time1: "",
          },
        ],
      },
    };
  },
  mounted(){
    this.$nextTick(()=> {

    });
  },
  methods: {
    imgUrlEncode,
    yToFixed(n, l){
      if(typeof n == "number"){
        let r = n + "";
        if(r.indexOf(".") == -1){
          return n;
        }else{
          let pointIndex = r.indexOf(".");
          return r.substr(0, (pointIndex + l + 1) );  
        }
      }
      console.error("n is not a number");
      return 0;
    },

    async init(){
      this.moduleNames.forEach(name=> {
        let m = this[name];

        let { matchNode } = findNodeById(this.menus, m.title, 'childs', 'categoryTitle')
        console.log(matchNode);
        if(matchNode){
          this.sendQeq(m, matchNode)
        }
      });
    },
    sendQeq(m, matchNode){
      let params;

      params = Object.assign({}, m.params, { // 根据模块名称查找对应的 参数 categoryId值
        pageNum: 1,
        pageSize: 10,
        categoryId: matchNode.categoryId,
        categoryTitle: matchNode.categoryTitle,
      })
      getArticlesList(params).then(res=> {
        console.log(matchNode);
        if(matchNode.categoryType == '1'){// 列表类型模块
          this.$set(m, "data", res.data.list);
        }else if(matchNode.categoryType == '2' && res.data.total == 1){ //  图文类型模块
          getArticleById(res.data.list[0].id).then(res=> {
            this.$set(m, "data", res.data);
          })
        }
      })
    },
    tabChange(){

    },
  },
};
</script>
<style lang="scss">
#index-page{
  margin-top: 50px;
  .el-row{
    margin-top: $moduleMargin;
  }

  .el-tab-pane{
    background-color: #fff;
    padding: 20px 35px;
    border: 1px solid #ccc;
  }


  .list{
    .des, .time{
      color: #4e4e4e;
    }
  }

  .div-bg{
    height: 93px;
    margin: $moduleMargin 0;
    @include adptiveBg;
    &.bg1{
      background-image: url('../assets/imgs/div-1.jpg');
    }
    &.bg1{
      background-image: url('../assets/imgs/div-2.jpg');
    }
  }

  .row1{
    .el-col{
      height: 380px;
    }
    .banner{
      height: 100%;
      .swiper-container{
        height: 100%;
      }
    }

    .el-tab-pane{
      height: 300px;
    }

    .news{
      span.iconfont{
        color: #676767;
        font-weight: 600;
      }
      .top-news{
        padding-bottom: 15px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 15px;
        a.detail{
          width: 70px;
          margin-top: -26px;
          span:nth-child(2){
            color: #e74142;
          }
        }
        h4.title, .content{
          font-size: 16px;
          margin: 10px;
          text-indent: 32px;
        }
        .content{
          margin-top: 0;
          line-height: 26px;
        }
        
      }
    }
  }

  .row2{ 
    .el-tab-pane{
      height: 186px;
      padding: 50px 70px;
    }
  }
  

  
}
</style>

