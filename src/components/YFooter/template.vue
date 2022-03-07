<template>
  <footer id="foot">
    底部
  </footer>
</template>

<script>
import { getConfig } from "@/utils/common";

export default {
  name: "YFooter",
  data(){
    return {
      info: {
        telPhone: [""],
        shoppingPlatforms: [{}],
        largeTelPhone: [""],
        weiboLink: "",  
      },
    };
  },
  created(){
    this.getConfig();
  },
  methods:{
    isArray(ar){
      return ar instanceof Array && Array.isArray(ar);
    },
    getConfig(){
      getConfig().then(config=> {
        this.$set(this, "info", config);
        this.$nextTick(()=> {
          this.generateQrCode();
        });
      });
    },
    generateQrCode(){
      // jQuery(".wxQrCode").qrcode({ width: 60, height: 60, text: this.info.wechatQr});
    },
  },
};
</script>


<style lang="scss">
@import "./style.scss";
</style>