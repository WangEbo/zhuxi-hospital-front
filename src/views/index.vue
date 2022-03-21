<template>
  <div id="index-page" v-cloak>
    <el-row class="row1 page-inner">
      <el-col :span="9">
        <div class="banner">
          <YSwiper :list="r1BannerList" :config="{
            nextButton: null,
            prevButton: null,
          }">
            <div v-for="(item, i) in news.data.slice(0,5)" :key="i" class="swiper-slide">
              <img :src="item.contentImg" alt="">
              <p class="slide-des">{{item.des}}</p>
            </div>
          </YSwiper>
        </div>
      </el-col>
      <el-col :span="14" :offset="1">
        <div class="y-tab">
          <div class="more"><router-link :to="`${activeTabItem.categoryPath}`">更多>></router-link></div>
          <el-tabs v-model="activeTab" @tab-click="tabChange">

            <el-tab-pane class="com-panel-1" :label="news.title" name="news">
              <div class="top-news">
                <router-link :to="`${news.categoryPath}/detail/${news.topItem().id}`">
                  <h4 class="title">{{news.topItem().contentTitle}}</h4>
                  <div class="ellipsis">
                    <div class="ellipsis-container">
                      <div class="ellipsis-content content">{{news.topItem().contentDescription}}</div>
                      <div class="ellipsis-ghost">
                          <div class="ellipsis-placeholder"></div>
                          <router-link class="detail ellipsis-more" :to="`${news.categoryPath}/detail/${news.topItem().id}`"><span>...</span><span>[详情]</span></router-link>
                      </div>
                    </div>
                  </div>
                </router-link>
                
              </div>
              <ul class="list">
                <li v-for="(item, i) in news.list()" :key="i">
                  <router-link class="fs16 h" :to="`${news.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>

            <el-tab-pane class="com-panel-1" :label="hospitalVideos.title" name="hospitalVideos">
              <div class="top-news">
                <h4 class="title">{{hospitalVideos.topItem().contentTitle}}</h4>
                <div class="ellipsis">
                  <div class="ellipsis-container">
                    <div class="ellipsis-content content">{{hospitalVideos.topItem().contentDescription}}</div>
                    <div class="ellipsis-ghost">
                        <div class="ellipsis-placeholder"></div>
                        <router-link class="detail ellipsis-more" :to="`${hospitalVideos.categoryPath}/detail/${hospitalVideos.topItem().id}`"><span>...</span><span>[详情]</span></router-link>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li v-for="(item, i) in hospitalVideos.list()" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>

            <el-tab-pane class="com-panel-1" :label="wenyuan.title" name="wenyuan">
              <div class="top-news">
                <h4 class="title">{{wenyuan.topItem().contentTitle}}</h4>
                <div class="ellipsis">
                  <div class="ellipsis-container">
                    <div class="ellipsis-content content">{{wenyuan.topItem().contentDescription}}</div>
                    <div class="ellipsis-ghost">
                        <div class="ellipsis-placeholder"></div>
                        <router-link class="detail ellipsis-more" :to="`${wenyuan.categoryPath}/detail/${wenyuan.topItem().id}`"><span>...</span><span>[详情]</span></router-link>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list">
                <li v-for="(item, i) in wenyuan.list()" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
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
          <div class="more"><router-link :to="`${notice.categoryPath}`">更多>></router-link></div>
          <el-tabs :value="'notice'">
            <el-tab-pane :label="notice.title" name="notice">
              <ul class="list">
                <li v-for="(item, i) in notice.data.slice(0, 4)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="14" :offset="1">
        <div class="y-tab">
          <div class="more"><router-link :to="`${notice.categoryPath}`">更多>></router-link></div>
          <el-tabs :value="'bid'" @tab-click="tabChange">
            <el-tab-pane class="news" :label="bid.title" name="bid">
              <ul class="list">
                <li v-for="(item, i) in bid.data.slice(0, 5)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.createTime && item.createTime.substr(0, 7)}}</div>
                  </router-link>
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
          <el-tabs :value="'overview'">
            <el-tab-pane :label="overview.title" name="overview">
              <SliceCard :to="overview.categoryPath" :text="overview.data.contentDescription"></SliceCard>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="14" :offset="1">
        <div class="y-tab">
          <div class="more"><router-link :to="`${doctor.categoryPath}`">更多>></router-link></div>
          <el-tabs :value="'doctor'" @tab-click="tabChange">
            <el-tab-pane class="doctor" :label="doctor.title" name="doctor">
              <ul class="list">
                <li v-for="(item, i) in doctor.data.slice(1, 5)" :key="i">
                  <router-link class="fs16 h" :to="`doctor?id=${item.id}`">
                    
                  </router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <div class="div-bg bg2"></div>

    <div class="row3 page-inner">
      <div class="y-tab">
        <div class="more"><router-link :to="`${activeTabItem2.categoryPath}`">更多>></router-link></div>
        <el-tabs v-model="activeTab2" @tab-click="tabChange2">
          <el-tab-pane class="com-panel-2" :label="equipment.title" name="equipment">
              <ul class="list">
                <li v-for="(item, i) in equipment.data.slice(0, 10)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
          </el-tab-pane>

          <el-tab-pane class="com-panel-2" :label="tech.title" name="tech">
              <ul class="list">
                <li v-for="(item, i) in tech.data.slice(0, 10)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
          </el-tab-pane>

          <el-tab-pane class="com-panel-2" :label="specialty.title" name="specialty">
              <ul class="list">
                <li v-for="(item, i) in specialty.data.slice(0, 10)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des">{{item.contentTitle}}</span>
                    </div>
                    <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 7)}}</div>
                  </router-link>
                </li>
              </ul>
          </el-tab-pane>
        </el-tabs>
      </div>  

    </div>

    <div class="row4 page-inner">
      <div class="y-tab">
          <el-tabs :value="'links'">
            <el-tab-pane :label="'友情链接'" name="links">
              <ul>
                <li>
                  <router-link href="http://www.nhfpc.gov.cn/"  target="_blank">中华人民共和国国家卫生健康委员会</router-link>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
  </div>
 
</template>
<script>

import YSwiper from "@/components/YSwiper";
import { imgUrlEncode, findNodeById } from "@/utils/common";
import { getArticlesList, getArticleById } from "@/api/content";
import { mapGetters } from 'vuex'

const articelItem = {
  coverImg: "",
  contentDescription: "",
  contentTitle: '',
  title: "",
  id: "",
  content: "",
  createTime: "",
  categoryPath: '',
}
export default {
  filter:{
    
  },
  components: {
    YSwiper,
  },
  created() {
    this.init();
    window.indexVM = this
  },
  computed: {
    ...mapGetters(['menus']),
    activeTabItem(){
      return this[this.activeTab]
    },
    activeTabItem2(){
      return this[this.activeTab2]
    },
  },
  data() {
    let self = this;
    return {
      r1BannerList: [
        {url: "",href: "", des: ""},
      ],
      activeTab: "news",
      activeTab2: 'equipment',

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
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
        topItem(){
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
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
        topItem(){
          return this.data && this.data.length && this.data.slice(0, 1)[0];
        },
        list(){
          return this.data && this.data.length && this.data.slice(1, 6);
        },
      },
      wenyuan: {
        title: "中医文苑",
        targetTitle: '医院文化',
        req: getArticlesList,
        params: {},
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
        topItem(){
          return this.data && this.data.length && this.data.slice(0, 1)[0];
        },
        list(){
          return this.data && this.data.length && this.data.slice(1, 6);
        },
      },
      notice: {
        title: "通知公告",
        req: getArticlesList,
        params: {},
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
      },
      bid: {
        title: "招投标",
        targetTitle: '招投标公告',
        req: getArticlesList,
        params: {},
        categoryPath: "",
        data: [
          Object.assign({}, articelItem)
        ],
      },
      overview: {
        title: "医院简介",
        req: getArticleById,
        params: {},
        categoryPath: "", 
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
        categoryPath: "", 
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
        categoryPath: "", 
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
        categoryPath: "", 
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
        categoryPath: "", 
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

        //优先根据 targetTitle 匹配
        console.log('menus:xxxxx');
        console.log(this.menus);
        let { matchNode } = findNodeById(this.menus, (m.targetTitle || m.title), 'childs', 'categoryTitle')

        if(matchNode){
          m.categoryPath = matchNode.categoryPath
          console.log(matchNode);
          this.sendQeq(m, matchNode)
        }else{
          console.log('no-matchNode');
        }
      });
    },
    sendQeq(m, matchNode){
      let params;

      params = Object.assign({}, m.params, { // 根据模块名称查找对应的 参数 categoryId值
        pageNum: 1,
        pageSize: 10,
        categoryId: matchNode.id,
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
    tabChange(tabItem){
      this.activeTab = tabItem.name
    },
    tabChange2(tabItem){
      this.activeTab2 = tabItem.name
    }
  },
};
</script>
<style lang="scss">
$verticelMargin: 32px;
#index-page{
  margin-top: 50px;
  .el-row{
    margin-top: $verticelMargin;
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

  .swiper-wrapper {
    height: 100%;
    .swiper-slide{
      height: 100%;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
 
  .div-bg{
    height: 93px;
    margin: $verticelMargin 0;
    @include adptiveBg;
    &.bg1{
      background-image: url('../assets/imgs/div-1.jpg');
    }
    &.bg2{
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
      height: 332px;
    }

    .com-panel-1{
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
      padding: 30px 40px;
    }
  }
  
   .row4{
    margin: $verticelMargin auto;
    .el-tab-pane{
      background-color: transparent;
      border: 0;
    }
  }
  
}
</style>

