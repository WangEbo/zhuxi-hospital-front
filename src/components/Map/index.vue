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
      var mp = new BMap.Map(this.$refs.map);  
      if(curLocation.latitude){
        mp.centerAndZoom(new BMap.Point(curLocation.coords.latitude, curLocation.coords.longitude), 11);
      }else{
        mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);  
      }
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