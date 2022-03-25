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
  },
  data() {
    return {
      detail: Object.assign({}, defaultDetail)
    };
  },
  computed: {
    ...mapGetters(['curLevel1Menu', 'curMenu']),
  },
  created() {
    this.init()
  },
  mounted(){
    
  },
  methods: {
    async init(){
      let id;
      if(this.curMenu && this.curMenu.childs && this.curMenu.childs[0] && this.curMenu.childs[0].categoryTitle == '科室特色'){
        id = this.curMenu.childs[0].id;
        let { data } = await getArticlesList({categoryId: id})
        if(data.total == 1){
          this.getDetail(data.list[0].id)
        }
      }else{
        id = this.$route.params.id
        this.getDetail(id)
      }
    },
    getDetail(id){
      getArticleById(id).then(res=> {
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
  /deep/ .content{
    font-size: 14px;
    img{
      display: block;
      max-width: 100%;
    }
    video{
      width: 100%;
      height: auto!important;
    }
  }
   
}

@media screen and(max-width: 600px){
  .article{
    flex: none;
    width: 100%;
    margin: 15px 0;
    .title{
      font-size: 16px;
      font-weight: 600;
      line-height: 40px;
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

