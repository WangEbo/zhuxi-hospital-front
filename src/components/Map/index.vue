<template>
  <div class="map-warp" >
    <div class="map-container" ref="map"></div>
  </div>
</template>

<script>
import { getLocation } from "@/utils/common";
let curLocation = {};
export default {
  data(){
    return {

    };
  },
  emits: ["acceptPosition"],
  mounted(){
    this.initMap();
  },
  methods: {
    initMap(){
      var map = new BMap.Map(this.$refs.map);  
      if(curLocation.latitude){
        map.centerAndZoom(new BMap.Point(curLocation.coords.latitude, curLocation.coords.longitude), 11);
      }else{
        map.centerAndZoom(new BMap.Point(109.733204,32.319597), 16);  
      }
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
      map.addControl(scaleCtrl);
      var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
      map.addControl(zoomCtrl);
      return mp;
    },
  },
};
</script>

<style lang="scss">
.map-warp{
  height: 500px;
  .map-container{
    width: 100%;
    height: 100%;
  }
}
</style>