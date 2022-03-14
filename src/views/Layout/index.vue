<template>
  <div class="layout">
    <y-header></y-header>
    <transition name="fade" mode="out-in">
      <slot></slot>
    </transition>
    <y-footer></y-footer>
  </div>
</template>
<script>

import YHeader from "@/components/YHeader";
import YFooter from "@/components/YFooter";

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

