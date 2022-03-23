<template>
  <div class="breadcrumb">
    <span style="font-weight: 600;">您当前的位置：</span>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
  
</template>

<script>
export default {
  name: 'Breadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (first && first.name !== 'home') {
        // matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
        matched = matched
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    vertical-align: middle;
    display: inline-block;
    font-size: 16px;
    line-height: 50px;
    margin-left: 10px;
    color: #000;
    .no-redirect {
      color: #000;
    }
  }

  .breadcrumb{
    line-height: 50px;
    border-bottom: 2px solid $mainTheme;
    margin-bottom: 100px;
    font-size: 16px;
    >span{
      display: inline-block;
      vertical-align: middle;
    }
  }

  @media screen and(max-width: 600px){
    .app-breadcrumb.el-breadcrumb {
      vertical-align: middle;
      display: inline-block;
      font-size: 12px;
      line-height: 30px;
      margin-left: 5px;
      color: #000;
      .no-redirect {
        color: #000;
      }
    }
    .breadcrumb{
      line-height: 30px;
      border-bottom: 2px solid $mainTheme;
      margin-bottom: 30px;
      font-size: 12px;
      >span{
        display: inline-block;
        vertical-align: middle;
      }
    }

    /deep/ .el-breadcrumb__separator{
      margin: 0 4px;
    }
  }
</style>
