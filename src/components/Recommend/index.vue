<template>
  <div class="recommend">
    <div class="row1 row">
      <div class="r-title">
        <div class="bd-line"></div>
        <h4>{{curLevel1Menu.categoryTitle}}</h4>
      </div>
      <ul class="child-menu">
        <li @click="toPage(item)" v-show="item.categoryTitle" v-for="(item, i) in curLevel1Menu.childs" :key="i">
          <span class="icon iconfont icon-bxs-right-arrow"></span>&nbsp;&nbsp;<span class="menu-link" :to="item.path">{{item.categoryTitle}}</span>
        </li>
      </ul>
    </div>
    <div class="row2 row">
      <div class="r-title">
        <div class="bd-line"></div>
        <h4>{{news.title}}</h4>
      </div>
      <ul class="news">
        <li v-show="item.categoryTitle"  v-for="(item, i) in news.list.slice(0,3)" :key="i">
          <div class="news-card" @click="toDetail(item, 'news')">
            <div class="left-part"><img :src="item.contentImg" alt=""></div>
            <div class="right-part">
              <div class="intro">{{item.contentDescription}}</div>
              <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 10)}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="row3 row">
      <div class="r-title">
        <div class="bd-line"></div>
        <h4>{{notice.title}}</h4>
      </div>
      <ul class="notices">
        <li v-show="item.categoryTitle"  v-for="(item, i) in notice.list.slice(0,5)" :key="i">
          <div class="notice-card" @click="toDetail(item, 'notice')">
            <div class="intro">·{{item.contentTitle}}</div>
            <div class="time">{{item.contentDatetime && item.contentDatetime.substr(0, 10)}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";
import { findNodeById } from "@/utils/common";

require('../../assets/imgs/child-menu.png')
export default {
  name: '',
  data() {
    return {
      // menu: {
      //   categoryTitle: "",
      //   categoryId: 0,
      //   path: '',
      //   childs: [
      //     {
      //       categoryTitle: "",
      //       path: '',
      //       categoryId: 0,
      //       childs: [
      //       ],
      //     },
      //   ],
      // },
      news: {
        title: '热门新闻',
        targetTitle: '新闻动态',
        categoryId: null,
        list: [
          {
            contentImg: null,
            contentTitle: null,
            contentDatetime: null,
            categoryId: null,
            contentDescription: null,
          }
        ]
      },
      notice: {
        title: '热门公告',
        targetTitle: '通知公告',
        categoryTitle: '',
        categoryId: null,
        list: [
          {
            contentTitle: null,
            contentDatetime: null,
            categoryId: null,
            contentImg: null,
            contentDescription: null,
          }
        ]
      },
      moduleNames: ['news', 'notice']
    };
  },
  computed:{
    ...mapGetters(['menus', 'curLevel1Menu', 'curMenu', 'menuPath']),

  },
  watch:{
  },
  mounted(){
    this.getLists()
  },
  methods: {
    getLists(){
      this.moduleNames.forEach(name=> {
        let m = this[name];

        let { matchNode } = findNodeById(this.menus, m.targetTitle, 'childs', 'categoryTitle')

        Object.assign(m, {
          path: matchNode.path,
          categoryPath: matchNode.categoryPath
        })
        if(matchNode){
          let params = Object.assign({}, m.params, { // 根据模块名称查找对应的 参数 categoryId值
            pageNum: 1,
            pageSize: 5,
            categoryId: matchNode.id,
            categoryTitle: matchNode.categoryTitle,
          })
          getArticlesList(params).then(res=> {
            this.$set(m, "list", res.data.list);
          });
        }
      });
    },
    toDetail(item, type){
      let path;
      if(type == 'news'){
        path = this.news.categoryPath
      }else{
        path = this.notice.categoryPath
      }
      this.$router.push(path + '/detail/' + item.id)
    },
    toPage(item){
      this.$router.push(item.categoryPath)
    }
  },
};
</script>

<style lang='scss' scoped>
.recommend{
  width: 340px;
  .row{
    width: 100%;
  }
}

.r-title{
  position: relative;
  margin-bottom: 30px;
    h4{
      font-size: 26px;
      font-weight: 500;
      display: inline-block;
      padding: 0;
      line-height: 54px;
      border-bottom: 3px solid rgb(152, 98, 24);
      position: relative;
      z-index: 1;
    }
    .bd-line{
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: rgb(182, 182, 182);
      width: 100%;
    }
  }
.row1{
  li{
    line-height: 46px;
    margin-bottom: 15px;
  }
  .child-menu{
    margin-top: 20px;
    li{
      width: 100%;
      line-height: 34px;
      text-align: center;
      background-image: url('../../assets/imgs/child-menu.png');
      background-position:  center center;
      background-repeat: no-repeat;
      background-size: 120% 120%;
      cursor: pointer;
      span{
        display: inline-block;
        font-size: 16px;
        color: $mainTheme;
        &.menu-link{
          font-weight: 600;
        }
      }
    }
  }
}

.row2{
  li{
    height: 100px;  
  }
}

.news-card{
  display: flex;
  height: 90px;
  margin-top: 20px;
  .left-part{
    width: 120px;
    height: 100%;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .right-part{
    flex: 1;
    margin-left: 10px;
  }
}

.news-card, .notice-card{
  .intro{
      font-size: 16px;
      line-height: 32px;
      font-weight: 600;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .time{
      margin-top: 4px;
      color: rgb(200, 200, 200);
      font-size: 14px;
    }
}
.news li+li{
  margin-top: 20px;
}
.notice-card .intro{
  height: 32px;
  line-height: 32px;
  overflow: hidden;
}

.child-menu li, .news li,.notices li{
  cursor: pointer;
}
@media screen and(max-width: 600px){
  .recommend{
    display: none;
  }
}
</style>
