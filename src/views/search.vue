<template>
  <div class="search route-wrap">
    <div class="search-bar">
      <el-input placeholder="请输入关键字" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
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
      keyword: '',
    };
  },
  computed:{
  },
  watch:{
  },
  mounted() {
    debugger
    this.keyword =  this.$route.query.k
  },
  methods: {
  },
};
</script>

<style lang=''>
  .search-bar{
    margin-bottom: 30px;
  }
</style>
