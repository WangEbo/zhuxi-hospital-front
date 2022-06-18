<template>
  <!-- 图文详情 -->
  <div class="route-wrap page-inner">
    <Breadcrumb></Breadcrumb>
    <div class="content-wrap">
      <div class="article" >
        <div class="content ql-editor" v-html="detail.contentDetails"></div>
      </div>
      <Recommend></Recommend>
      </div>
  </div>
</template>
<script>
import { getArticleById, getArticlesList } from "@/api/content";
import Recommend from '../Recommend'
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
import '../../styles/quill.core.css';
import '../../styles/quill.snow.css';
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
    ...mapGetters(['curLevel1Menu', 'curMenu']),
  },
  created() {
    console.log('init');
    this.init()
  },
  mounted(){
    
  },
  methods: {
    async init(){
      let articleId = this.$route.params.id;
      if(articleId){
        this.getDetail(articleId)
      }else{ // 图文导航的文章id需通过列表参数出第一条文章id后查询详情
        let { data } = await getArticlesList({categoryId: this.curMenu.id})
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
<style lang="scss" scoped>
.content-wrap{
  display: flex;
}
.article{
  flex: 1;
  margin-right: 40px;
}
/deep/ .content{
  font-size: 16px;
  img{
    display: block;
    max-width: 100%;
  }
  video{
    width: 100%;
    height: auto!important;
  }
  a{
      color: #4994df;
    }
}
@media screen and(max-width: 600px){
  .article{
    flex: none;
    width: 100%;
    margin: 15px 0;
    /deep/ .content{
       p{
        line-height: 24px!important;
      }
      span{
        line-height: 24px!important;
        font-size: 14px!important;
      }
    }
  }
}
</style>

