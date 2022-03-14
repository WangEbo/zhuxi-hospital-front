<template>
  <div class="recommend">
    <div class="row1">
      <div class="r-title">{{curLevel1Menu.categoryTitle}}</div>
      <ul class="child-menu">
        <li v-for="(item, i) in curLevel1Menu.childs" :key="i">
          <router-link :to="item.path">{{item.categoryTitle}}</router-link>
        </li>
      </ul>
    </div>
    <div class="row2">
      <div class="r-title">{{news.list}}</div>
      <ul class="news">
        <li v-for="(item, i) in news" :key="i">
            <div class="news-card" @click="toDetail(item)"></div>
        </li>
      </ul>
    </div>
    <div class="row3">
      <div class="r-title">{{notice.title}}</div>
      <ul class="news">
        <li v-for="(item, i) in notice.list" :key="i">
          <div class="notice-card" @click="toDetail(item)"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";
import { findNodeById } from "@/utils/common";

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
        categoryId: null,
        list: [
          {
            contentTitle: null,
            contentDatetime: null,
            categoryId: null,
            contentDescription: null,
          }
        ]
      },
      notice: {
        title: '热门新闻',
        categoryId: null,
        list: [
          {
            contentTitle: null,
            contentDatetime: null,
            categoryId: null,
            contentDescription: null,
          }
        ]
      },
      moduleNames: ['news', 'notice']
    };
  },
  computed:{
    ...mapGetters(['menus', 'curLevel1Menu', 'curMenu', 'menuPath'])
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

        let { matchNode } = findNodeById(this.menus, m.title, 'childs', 'categoryTitle')
        console.log(matchNode);
        if(matchNode){
          let params = Object.assign({}, m.params, { // 根据模块名称查找对应的 参数 categoryId值
            pageNum: 1,
            pageSize: 10,
            categoryId: matchNode.categoryId,
            categoryTitle: matchNode.categoryTitle,
          })
          getArticlesList(params).then(res=> {
            this.$set(m, "data", res.data.list);
          });
        }
      });
    },
    toDetail(card){
      // this.$router.push(card ,'/detail')
    }
  },
};
</script>

<style lang=''>

</style>
