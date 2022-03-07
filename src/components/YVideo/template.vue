<template>
  <video ref="video" id="example_video" class="video-js vjs-default-skin vjs-big-play-centered" muted="muted" autoplay controls poster="">
    <source v-if="src" :src="src" :type="`video/${getFileSuffix(src)}`">
  </video>
</template>
<script>
require("video.js/dist/video.min.js");
require("video.js/dist/video-js.min.css");
import { getFileSuffix } from "@util/common";
export default {
  name: "YSwiperSlide",
  props: {
    src: {
      type: String,
    },
    autoplay: {
      type: Boolean,
    },
    loop: {
      type: Boolean,
    },
    muted: {
      type: Boolean,
      default: true,
    },
    controls: {
      type: Boolean,
    },
    poster: {
      type: String,
    },
  },
  data(){
    return{ 
      player: null,
    };
  },
  mounted(){
    this.$nextTick(()=> {
      let ele = this.$refs.video;
      window.player = this.player = videojs(ele, {
        autoplay: this.autoplay,
        loop: this.loop,
        muted: this.muted,
        controls: this.controls,
        poster: this.poster,
        bgcolor: "#fff",
        volume: 0.5,//音量
      }, function onPlayerReady() {
        videojs.log("播放器已准备好!");
        // In this context, `this` is the player that was created by Video.js.<br>  // 注意，这个地方的上下文， `this` 指向的是Video.js的实例对像player
        this.play();
        this.on("ended", function() {
          videojs.log("播放结束了!");
        });
      });
      
    });
  },
  methods: {
    getFileSuffix,
    getControlBar(){
      let eles = document.querySelector(".vjs-control-bar");
      console.log(eles);

      return eles;
    },
  },
};
</script>