<template>
  <div class="layout">
    <y-header></y-header>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
    <y-footer></y-footer>
  </div>
</template>
<script>

import YHeader from "@/components/YHeader/index.vue";
import YFooter from "@/components/YFooter/index.vue";

import { imgUrlEncode } from "@/utils/common";

export default {
  name: "Layout",
  filter:{
    
  },
  components: {
    YHeader, YFooter,
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
    imgUrlEncode,
    yToFixed(n, l){
      if(typeof n == "number"){
        let r = n + "";
        if(r.indexOf(".") == -1){
          return n;
        }else{
          let pointIndex = r.indexOf(".");
          return r.substr(0, (pointIndex + l + 1) );  
        }
      }
      console.error("n is not a number");
      return 0;
    },
    
  },
};
</script>
<style lang="scss">
</style>

