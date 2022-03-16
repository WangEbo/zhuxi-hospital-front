<template>
  <!-- 图文详情 -->
  <Layout>
    <div class="route-wrap page-inner">
      <Breadcrumb></Breadcrumb>
      <div class="content-wrap">
        <div class="article">
          <div class="title">{{detail.contentTitle}}</div>
          <div class="time">{{detail.contentDatetime}}</div>
          <div class="content" v-html="detail.contentDetails"></div>
        </div>
        <Recommend></Recommend>
       </div>
    </div>
  </Layout>
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
}
export default {
  name: "Articles",
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
  computed:{
    ...mapGetters(['curLevel1Menu'])
  },
  created() {
    this.init()
  },
  mounted(){
    
  },
  methods: {
    async init(){
      let articleId = this.$route.query.id;
      if(articleId){
        this.getDetail(articleId)
      }else{ // 图文导航的文章id需通过列表参数出第一条文章id后查询详情
        let { data } = await getArticlesList({categoryId: this.curLevel1Menu.id})
        if(data.total == 1){
          this.getDetail(data.list[0].id)
        }
      }
    },
    getDetail(articleId){
      getArticleById(articleId).then(res=> {
        this.$set(this, 'detail', res.data)
      })
    }
  },
};
</script>
<style lang="scss">
.content-wrap{
  display: flex;

}
</style>

