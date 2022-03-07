<template>
  <div :class="['swiper-container', `swiper-${id}`]">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!--  如果需要分页器 -->
     <div class="swiper-pagination"></div>
    <!--  导航按钮 -->
    <div class="swiper-button-prev btn swiper-button-black"></div>
    <div class="swiper-button-next btn swiper-button-black"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  //轮播图
  name: "YSwiper",
  props: {
    config: {
      type: Object,
      default(){
        return {};
      },
    },
    list: {
      type: Array,
      default(){
        return [
          {
            url: "",
            href: "",
          },
        ];
      },
    },
  },
  data() {
    return {
      swiper: null,
      id: this._uid,
    };
  },
  watch: {
    list: {
      handler(){
        this.$nextTick(()=> {
          this.renderSwiper();
        });
      },
      deep: true,
    },
  },
  mounted() {
    
  },
  methods: {
    renderSwiper(){
      console.log(this.list);
      const defaultOptions = {
        loop: true,
        speed: 500,
        autoplay: 3000,
        direction: "horizontal",
        // 如果需要分页器
        pagination: ".swiper-pagination",
        // 如果需要前进后退按钮
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
      };
      let opts = Object.assign({}, defaultOptions, this.config);
      this.swiper = new Swiper(`.swiper-${this.id}`, opts);
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>