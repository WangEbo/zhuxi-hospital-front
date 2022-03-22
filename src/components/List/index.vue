<template>
  <div class="route-wrap">
    <Breadcrumb></Breadcrumb>
    <div class="list-page">
      <div class="list-content">
        <router-view :key="$route.path"></router-view>
      </div>
      <Recommend></Recommend>
    </div>
  </div>
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
    max-width: calc(100% - 410px);
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

