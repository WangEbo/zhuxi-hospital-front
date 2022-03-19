<template>
  <!-- 图文详情 -->
  <div class="article" >
    <div class="title">{{detail.contentTitle}}</div>
    <div class="divide-line"></div>
    <div class="row2">
      <span class="time" >{{detail.contentDatetime}}</span>
      <span>{{detail.contentAuthor}}</span>
    </div>
    <div class="content" v-html="detail.contentDetails"></div>
  </div>
</template>
<script>
import { getArticleById, getArticlesList } from "@/api/content";
import Recommend from '../Recommend'
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'

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
  contentAuthor: null,//作者
}
export default {
  name: "ArticleCard",
  filter:{
    
  },
  components: {
    Recommend, Breadcrumb
  },
  data() {
    return {
      detail: Object.assign({}, defaultDetail)
    };
  },
  computed: {
  },
  created() {
    this.getDetail()
  },
  mounted(){
    
  },
  methods: {
    getDetail(){
      getArticleById(this.$route.params.id).then(res=> {
        this.$set(this, 'detail', res.data)
      })
    }
  },
};
</script>
<style lang="scss">
.content-wrap{
  display: flex;
  img{
    display: block;
    width: 100%;
  }
}
.article{
  flex: 1;
  margin-right: 40px;
  .title{
    font-size: 32px;
    font-weight: 600;
    line-height: 60px;
    text-align: center;
  }
  .divide-line{
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, #666 0%, #ccc 50%, transparent 50%);
    background-size: 8px 1px;
    background-repeat: repeat-x;
  }
  .row2{
    text-align: center;
    font-size: 14px;
    color: $lightTextColor;
    margin: 15px;
    span{
      margin: 0 8px;
    }
  }
  .content{
    font-size: 14px;
  }
}
</style>

