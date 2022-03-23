<template>
  <div class="search route-wrap">
    <div class="search-bar">
      <el-input placeholder="请输入关键字" v-model="keywords" class="input-with-select">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <ListCard></ListCard>
  </div>
</template>

<script>
import ListCard from '@/components/ListCard'

export default {
  name: '',
  components: {
    ListCard
  },
  data() {
    return {
      keywords: '',
    };
  },
  computed:{
  },
  watch:{
  },
  mounted() {
    this.keywords =  this.$route.query.k
  },
  methods: {
    search(){
      let k = this.keywords.trim();
      this.$router.push({
        path: '/search', 
        query: {
          k: k
        }
      })
    }
  },
};
</script>

<style lang=''>
  .search-bar{
    margin-bottom: 30px;
  }
</style>
