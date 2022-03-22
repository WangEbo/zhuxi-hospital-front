<template>
  <!-- 图文详情 -->
  <div class="article doctor-detail" >
    <div class="img-title">
      <img :src="detail.contentImg" alt="">
    </div>
    <div class="title">{{detail.contentTitle}}</div>
    <div class="divide-line"></div>
    <div class="row2">
      简介
    </div>
    <div class="content" v-html="detail.contentDetails"></div>
  </div>
</template>
<script>
import { getArticleById, getArticlesList } from "@/api/content";

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
  name: "DoctorDetail",
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
.doctor-detail{
  margin: 0 20px;
  padding: 20px;
  background-color: rgb(247, 244, 239);
}
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
    
  }
  .row2{
    text-align: left;
    font-size: 14px;
    font-size: 16px;
    margin: 15px;
    span{
      margin: 0 8px;
    }
  }
  .content{
    font-size: 14px;
  }

  .img-title{
    text-align: center;
    margin-bottom: 20px;
    img{
      display: inline-block;
      width: 190px;
      height: 260px;
    }
  }
}
</style>

