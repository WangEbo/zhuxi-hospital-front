<template>
  <!-- 图文详情 -->
  <layout>
    <div class="list-wrap">
      <Recommend></Recommend>
      <div class="articles">
        <div class="title">{{detail.contentTitle}}</div>
        <div class="time">{{detail.contentDatetime}}</div>
        <div class="content" v-html="detail.contentDetails"></div>
      </div>
    </div>
  </layout>
</template>
<script>
import { getArticlesById } from "@/api/content";

const defaultDetail = {
  contentTitle: null,//标题
  contentDatetime: null,//发布时间
  categoryId: null,
  contentDescription: null,//描述
  contentDetails: null,//内容
  initalContent: null,//初始内容值
  contentKeyword: null,//关键字
  contentImg: null,//缩略图
  contentSort: null,
}
export default {
  name: "Articles",
  filter:{
    
  },
  components: {
  },
  created() {
    this.getDetail()
  },
  data() {
    return {
      detail: Object.assign({}, defaultDetail)
    };
  },
  mounted(){
    this.$nextTick(()=> {

    });
  },
  methods: {
    getDetail(){
      getArticlesById(this.$route.id).then(res=> {
        
        this.$set(this, 'detail', res.data)
      })
    }
  },
};
</script>
<style lang="scss">
</style>

