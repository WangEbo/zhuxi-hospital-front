<template>
  <footer id="foot">
    <div class="page-inner">
      <div class="row1">
      <div class="hotline">
        <img src="" alt="">
        <h4>24小时急诊热线：{{config.hotline}}</h4>
      </div>
      <div class="text p2">
        <span>版权所有</span>
        <span>竹溪县中医院</span>
        <span>未经书面授权禁止使用本站信息</span>
      </div>
      <div class="text">{{config.beianCode}}</div>
      <div class="text p3">
        <span>本站信息仅供参考</span>
        <span>不能作为诊断及医疗的依据</span>
        <span>本站如有转载或引用文章涉及版权及问题</span>
        <span>请速与我们联系</span>
      </div>
      </div>
      <div class="row2">
        <div class="p1"><img :src="config.wxQrCode" alt=""></div>
        <div class="p2 share"></div>
      </div>
    </div>
  </footer>
</template>

<script>
import { getConfig } from "@/utils/common";
import { mapGetters } from 'vuex'

export default {
  name: "YFooter",
  data(){
    return {
    };
  },
  computed: {
    ...mapGetters(['config'])
  },
  created(){
  },
  methods:{
    isArray(ar){
      return ar instanceof Array && Array.isArray(ar);
    },
  },
};
</script>


<style lang="scss">
@import "./style.scss";
</style>