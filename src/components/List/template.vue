<template>
  <ul>
    <li></li>
  </ul>
</template>
<script>


export default {
  name: "List",
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
@import "./style.scss";
#r4{
  height: 200px!important;
  .fp-tableCell{
    height: 100%!important;
  }
}
</style>

