<template>
  <div class="list-wrap">
    <ul  class="list">
      <li v-for="(item, i) in list" :key="i">
        <div class="list-card" @click="toDetail(item)">
          <div class="intro">· {{item.contentTitle}}</div>
          <div class="time">发布时间：{{item.contentDatetime && item.contentDatetime.substr(0, 10)}}</div>
        </div>
      </li>
    </ul>
    <el-empty description="暂无数据" v-if="!list.length"></el-empty>
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,15,20]" :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";
import { getUrlQuery } from "@/utils/common";


const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};

export default {
  name: "ListCard",
  filter:{
    
  },
  computed: {
    ...mapGetters(['curMenu']),
  },
  components: {
    
  },
  watch: {
    '$route.query': {
      handler(nval){
        this.getList()
      }
    }
  },
  created() {
    this.getList();
    console.log('listcard render');
  },
  data() {
    return {
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      list: [
        {
          contentTitle: null,
          contentDatetime: null,
          categoryId: null,
          contentImg: null,
          contentDescription: null,
        }
      ]
    };
  },
  mounted(){
    
  },
  methods: {
    getList(){
      let params;

      let query = getUrlQuery();
      let keyword = decodeURIComponent(query.k);
      if(this.curMenu && this.curMenu.id){
        params = Object.assign({}, this.listQuery, {categoryId: this.curMenu.id})
      }else if(keyword){
        params = Object.assign({}, this.listQuery, {keyword})
      }
      getArticlesList(params).then(res=> {
        this.$set(this, 'list', res.data.list)
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    toDetail(item){
      let path = item.categoryPath;
      if(path.startsWith('/mingyizhuanjia') || path.startsWith('/tesezhuanke')){
        let lastIndex = path.lastIndexOf('/')
        path = path.substr(0, lastIndex) + '/detail/' + item.id
      }else{
        path = path + '/detail/' + item.id
      }
      this.$router.push(path)
    },
  },
};
</script>
<style lang="scss">
  

  .list-card{
    border-bottom: 1px dashed $greyBd;
    margin-bottom: 12px;
    cursor: pointer;
    .intro{
      font-size: 20px;
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

  @media screen and(max-width: 600px){
    .list-card{
      border-bottom: 1px dashed $greyBd;
      margin-bottom: 12px;
      cursor: pointer;
      .intro{
        font-size: 14px;
        line-height: 26px;
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
  }
</style>

