<template>
  <Layout>
    <div class="route-wrap page-inner">
      <Breadcrumb></Breadcrumb>

      <div class="content-wrap">
        <div class="list-wrap">
          <ul  class="list">
            <li></li>
          </ul>
        </div>
      </div>
      <Recommend></Recommend>
    </div>
    
  </Layout>
</template>
<script>
import Recommend from '@/components/Recommend'
import Breadcrumb from '@/components/Breadcrumb'
import { getArticlesList } from "@/api/content";

export default {
  name: "List",
  filter:{
    
  },
  components: {
    Recommend, Breadcrumb
  },
  created() {
    this.getArticlesList();
  },
  data() {
    return {
      
    };
  },
  mounted(){
    this.$nextTick(()=> {

    });
  },
  methods: {
    getList(){
      getArticlesList({categoryId: this.$route.query.id}).then(res=> {
        this.$set(this, 'detail', res.data)
      })
    }
  },
};
</script>
<style lang="scss">
  .content-wrap{
    display: flex;

  }
</style>

