<template>
  <Layout>
    <div class="route-wrap">
      <Breadcrumb></Breadcrumb>
      <div class="list-page">
        <div class="list-content">
          <div class="list-wrap">
            <ul  class="list">
              <li v-for="(item, i) in list" :key="i">
                <div class="list-card" @click="toDetail(item)">
                  <div class="intro">· {{item.contentTitle}}</div>
                  <div class="time">发布时间：{{item.contentDatetime && item.contentDatetime.substr(0, 10)}}</div>
                </div>
              </li>
            </ul>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,15,20]" :total="total">
            </el-pagination>
          </div>
        </div>
        <Recommend></Recommend>
      </div>
    </div>
  </Layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Recommend from '@/components/Recommend'
import Breadcrumb from '@/components/Breadcrumb'
import { getArticlesList } from "@/api/content";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};

export default {
  name: "List",
  filter:{
    
  },
  computed: {
    ...mapGetters(['curMenu']),
  },
  components: {
    Recommend, Breadcrumb
  },
  created() {
    this.getList();
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
    this.$nextTick(()=> {

    });
  },
  methods: {
    getList(){
      getArticlesList({categoryId: this.curMenu.id}).then(res=> {
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
      let path = this.curMenu.categoryPath
      this.$router.push(path + '/detail?id=' + item.id)
    },
  },
};
</script>
<style lang="scss">
  
  .list-page{
    display: flex;
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: $mainTheme;
    }
    .el-pagination.is-background .el-pager li:not(.disabled):hover{
      color: $mainTheme;
    }
  }
  .list-content{
    flex: 1;
    margin-right: 50px;
  }

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
</style>

