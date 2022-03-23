<template>
  <div class="map-warp" >
    <div class="map-container" ref="map"></div>
  </div>
</template>

<script>
import { getLocation } from "@/utils/common";
let curLocation = {};
import { mapGetters } from 'vuex'

let map;
export default {
  name: 'ZxMap',
  data(){
    return {

    };
  },
  computed:{
    ...mapGetters(['config']),
  },
  emits: ["acceptPosition"],
  mounted(){
    this.$nextTick(()=> {
      this.initMap();
    })
  },
  methods: {
    initMap(){
        map = new BMapGL.Map(this.$refs.map);  
        map.centerAndZoom(new BMapGL.Point(109.733204, 32.319597), 19);
        map.enableScrollWheelZoom(true);
        // 创建点标记
        var marker1 = new BMapGL.Marker(new BMapGL.Point(109.733204, 32.319597));
        // 添加点标记
        map.addOverlay(marker1);

        var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        map.addControl(zoomCtrl);

        let timer = setInterval(() => {
          if(this.config.hotline){
            let text = [
              '竹溪县中医院',
              `电话：${this.config.hotline}`,
              '地址：十堰市竹溪县鄂陕大道476号'
            ]
            var opts = {
              position: new BMapGL.Point(109.733204, 32.319597), // 指定文本标注所在的地理位置
              offset: new BMapGL.Size(30, -30) // 设置文本偏移量
            };
            var label = new BMapGL.Label(text.join('<br/>'), opts);
            // 自定义文本标注样式
            label.setStyle({
                color: '#666',
                borderRadius: '5px',
                borderColor: '#ccc',
                padding: '5px',
                fontSize: '14px',
                lineHeight: '24px',
                fontFamily: '微软雅黑'
            });
            map.addOverlay(label);
            clearInterval(timer)
          }
        }, 300);
        return map;
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