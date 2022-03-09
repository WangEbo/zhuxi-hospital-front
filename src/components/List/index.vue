<template>
  <layout>
    <div class="list-wrap">
      <Recommend></Recommend>
      <ul  class="list">
        <li></li>
      </ul>
    </div>
  </layout>
</template>
<script>
import Recommend from '@/components/Recommend'
import { getArticlesList } from "@/api/content";

export default {
  name: "List",
  filter:{
    
  },
  components: {
    Recommend
  },
  created() {
    
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
      getArticlesList({categoryId: this.$route.id}).then(res=> {
        this.$set(this, 'detail', res.data)
      })
    }
  },
};
</script>
<style lang="scss">

</style>

