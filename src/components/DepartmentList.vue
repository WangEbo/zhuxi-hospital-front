<template>
    <div class="doctor-list">
      <div v-if="menuPath.length<3">
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
      
      <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
export default {
  name: 'DepartmentList',
  components: { },
  data() {
    return {
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
      list: [],

    };
  },
  computed:{
    ...mapGetters(['menus', 'curLevel1Menu', 'curMenu', 'menuPath']),
  },
  watch:{
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      let id =  this.curMenu.id;
      if(!id){
        this.$set(this, 'list', [])
        return
      }
      let params = Object.assign({}, this.listQuery, {categoryId: id})
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
      this.$router.push(`${item.categoryPath}`)
    },
  }
};
</script>

<style lang="scss" scoped>
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
