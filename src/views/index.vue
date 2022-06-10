<template>
  <div id="index-page" v-cloak>
    <el-row class="row1 page-inner">
      <el-col :span="9">
        <div class="banner">
          <YSwiper :list="news.data" :config="{paginationClickable: true,paginationBulletRender: paginationBulletRender}">
            <div :style="{'background-image': `url('${imgUrlEncode(item.contentImg)}')`}" class="swiper-slide" v-for="(item, i) in news.data.slice(0,5)" :key="i">
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
                      <span class="des" :title="item.contentTitle">{{item.contentTitle}}</span>
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
                <li v-for="(item, i) in notice.data.slice(0, 5)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des" :title="item.contentTitle">{{item.contentTitle}}</span>
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
          <div class="more"><router-link :to="`${bid.categoryPath}`">更多>></router-link></div>
          <el-tabs :value="'bid'" @tab-click="tabChange">
            <el-tab-pane class="news" :label="bid.title" name="bid">
              <ul class="list">
                <li v-for="(item, i) in bid.data.slice(0, 5)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="des">
                      <span class="icnon iconfont icon-arrow-right"></span>
                      <span class="des" :title="item.contentTitle">{{item.contentTitle}}</span>
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

    <el-row class="row2 row3 page-inner">
      <el-col :span="9">
        <div class="y-tab overview-pane">
          <div class="more"><router-link :to="`${overview.categoryPath}`">详情>></router-link></div>
          <el-tabs :value="'overview'">
            <el-tab-pane :label="overview.title" name="overview">
              <SliceCard :max="sliceCardMax" :to="overview.categoryPath" :text="overview.data.contentDescription"></SliceCard>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="14" :offset="1">
        <div class="y-tab">
          <div class="more"><router-link :to="`${doctor.categoryPath}`">更多>></router-link></div>
          <el-tabs :value="'doctor'" @tab-click="tabChange">
            <el-tab-pane class="doctor" :label="doctor.title" name="doctor">
              <ul class="list doctor-list">
                <li v-for="(item, i) in doctor.data.slice(0, 10)" :key="i">
                  <router-link class="fs16 h" :to="getDoctorPath(item)">
                    <div class="doctor-item" >
                      <img :src="item.contentImg" alt="">
                      <p>{{item.contentTitle}}</p>
                    </div>
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
              <ul class="list equipment-list">
                <li v-for="(item, i) in equipment.data.slice(0, 10)" :key="i">
                  <router-link class="fs16 h" :to="`${item.categoryPath}/detail/${item.id}`">
                    <div class="equipment-item" >
                      <img :src="item.contentImg" alt="">
                      <p>{{item.contentTitle}}</p>
                    </div>
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
                  <router-link class="fs16 h" :to="getDepPath(item)">
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
                <li v-for="(item, i) in config.links || []">
                  <a :href="item.url"  target="_blank">{{item.name}}</a>
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
import { imgUrlEncode, findNodeById, getWindowWidth } from "@/utils/common";
import { getArticlesList, getArticleById } from "@/api/content";
import { mapGetters } from 'vuex'

const deviceWidth = getWindowWidth()
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
    ...mapGetters(['menus', 'config']),
    activeTabItem(){
      return this[this.activeTab]
    },
    activeTabItem2(){
      return this[this.activeTab2]
    },
    sliceCardMax(){
      if(deviceWidth>= 1366){
        return 360
      }else{
        return 220
      }
    }
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
          Object.assign({}, articelItem)
        ],
      },
      equipment: {
        title: "高新设备",
        targetTitle: '设备展示',
        req: getArticlesList,
        params: {},
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
      },
      tech: {
        title: "特色技术",
        targetTitle: '科研成果',
        req: getArticlesList,
        params: {},
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
        ],
      },
      specialty: {
        title: "特色专科",
        targetTitle: '医院科室',
        req: getArticlesList,
        params: {},
        categoryPath: "", 
        data: [
          Object.assign({}, articelItem)
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
    getDepPath(item){
      let lastIndex = item.categoryPath.lastIndexOf('/');
      return item.categoryPath.substr(0, lastIndex)
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
    },
    getDoctorPath(doctor){
      let lastIndex = doctor.categoryPath.lastIndexOf('/')
      return doctor.categoryPath.substr(0,lastIndex) + '/detail/' + doctor.id
    },
    paginationBulletRender(swiper, index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
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
      @include adptiveBg;
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
      .swiper-pagination-bullet{
        width: 18px;
        height: 18px;
        line-height: 18px;
        color: #fff;
        background-color: rgba(0,0,0,0.4);
        opacity: 0.8;
        &.swiper-pagination-bullet-active{
          background-color: $mainTheme;
          opacity: 1;
        }
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
        padding-bottom: 28px;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 28px;
        a.detail{
          width: 70px;
          margin-top: -26px;
          span:nth-child(2){
            color: #e74142;
          }
        }
        h4.title, .content{
          font-size: 18px;
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
      height: 210px;
      padding: 30px 40px;
    }
  }
  
   .row4{
    margin: $verticelMargin auto;
    .el-tab-pane{
      background-color: transparent;
      padding: 20px 0;
      border: 0;
      li{
        display: inline-block;
        margin-right: 20px;
        color: $mainTheme;
      }
      a{
        font-size: 18px;
      }
    }
  }
  
  .equipment-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 250px;
      display: inline-block;
    }
  }
  .equipment-item{
    width: 250px;
    margin: 0 20px 20px 0;
    img{
      display: block;
      width: 100%;
      height: 160px;
      border-radius: 6px;
    }
    p{
      font-size: 18px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .doctor-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      display: inline-block;
      width: 140px;
      text-align: center;
      a{
        display: inline-block;
      }
    }
  }
  .doctor-item{
    width: 138px;
    margin-bottom: 15px;
    img{
      display: block;
      width: 100%;
      height: 160px;
      border-radius: 6px;
    }
    p{
      font-size: 18px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
 
 .row3{
   .el-tab-pane{
     height: 440px;
     &.doctor{
       li{
         p{
           color: $mainTheme;
         }
       }
     }
   }
 }

 .overview-pane{
   a{
     font-size: 18px;
   }
   .el-tab-pane{
     position: relative;
      &::before, &::after{
        position: absolute;
        content: '';
        width: 30%;
        height: 50%;
        background-image: url('../assets/imgs/sy.png');
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.6;
        background-position: center center;
      }
      &::after{
        left: unset;
        right: 10px;
        transform-origin: center center;
        transform: translateY(-50%) rotateZ(180deg);
      }
   }
 }
}


@media screen and (max-width: 600px){
  $verticelMargin: 15px;
  $panePadding: 10px 15px;
  #index-page{
    margin-top: 20px;
    .el-row{
      margin-top: 0;
      .el-col{
        margin-top: $verticelMargin;
        width: 100%;
        float: none;
        display: block;
        height: auto;
        margin-left: 0;
      }
    }

    .el-tab-pane{
      background-color: #fff;
      padding: $panePadding;
      border: 1px solid #ccc;
    }


    .list{
      .des, .time{
        font-size: 12px;
        color: #4e4e4e;
      }
    }

    .div-bg{
      height: 40px;
      margin: $verticelMargin 0 0 0;
      @include adptiveBg;
      background-size: 130% 70%;
      &.bg1{
        background-image: url('../assets/imgs/div-1.jpg');
      }
      &.bg2{
        background-image: url('../assets/imgs/div-2.jpg');
      }
    }
    .row1{
      .el-col:nth-child(1){
        margin-top: 0;
      }
      .el-col{
        margin-top: $verticelMargin;
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
  
    
      .banner{
        height: 100%;
        .swiper-container{
          height: 100%;
        }
      }

      .el-tab-pane{
        height: auto;
      }

      .com-panel-1{
        span.iconfont{
          color: #676767;
          font-weight: 600;
        }
        .top-news{
          
          a.detail{
            width: 70px;
            margin-top: -26px;
            span:nth-child(2){
              color: #e74142;
            }
          }
          h4.title, .content{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            margin: 0 5px;
            text-indent: 8px;
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
        height: auto;
        padding: $panePadding;
      }
    }
    
    .row4{
      margin: $verticelMargin auto;
      .el-tab-pane{
        background-color: transparent;
        padding: $panePadding;
        border: 0;
        li{
          display: inline-block;
          margin-right: 12px;
          color: $mainTheme;
        }
        a{
          font-size: 18px;
        }
      }
    }
    
    .equipment-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        width: 80px;
        display: inline-block;
      }
    }
    .equipment-item{
      width: 80px;
      margin-bottom: 10px;
      img{
        display: block;
        width: 100%;
        height: 80px;
        border-radius: 6px;
      }
      p{
        font-size: 12px;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .doctor-list{
      li{
        width: 60px;
      }
    }
    .doctor-item{
      width: 60px;
      margin: 0 10px 10px 0;
      img{
        display: block;
        width: 100%;
        height: 80px;
        border-radius: 6px;
      }
      p{
        font-size: 12px;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  
  .row3{
    margin-top: $verticelMargin;
    .el-tab-pane{
      height: 250px;
      &.doctor{
        li{
          p{
            color: $mainTheme;
          }
        }
      }
    }
  }

  .overview-pane{
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    .more, .more a{
        line-height: 32px;
        font-size: 18px;
      }
    }

    .el-tabs__content{
      a{
        font-size: 12px;
      }
    }
  }
}
</style>

