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
        <div class="text">{{config.copyRright}}</div>
        <div class="text p3">
          <span>本站信息仅供参考</span>
          <span>不能作为诊断及医疗的依据</span>
          <span>本站如有转载或引用文章涉及版权及问题</span>
          <span>请速与我们联系</span>
        </div>
        <div class="text">{{config.beianCode}}</div>
      </div>
      <div class="row2">
        <div class="p1">
          <ul>
            <li>
              <div class="li-img"><img :src="config.wxQrCode" alt=""></div>
              <div class="desc">关注“竹溪中医”获取健康知识{{config.wxQrCodeDesc}}</div>
            </li>
            <li>
              <div class="li-img"><img :src="config.wxQrCodeTwo" alt=""></div>
              <div class="desc">关注“竹溪县中医院” 为您提供“一站式”诊疗服务{{config.wxQrCodeTwoDesc}}</div>
            </li>
          </ul>
        </div>
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
#foot{
  padding: 36px 0;
  background-color: rgb(152, 98, 24);
  .page-inner{
    display: flex;
    color: #fff;
  }
  .row1{
    flex: 1;
    .hotline{
      h4{
        font-size: 40px;
      }
    }
    div.text{
      font-size: 16px;
      line-height: 36px;
      span{
        font-size: 16px;
        line-height: 36px;
      }
    }
    .p2{
      margin-top: 35px;
    }
  }
  .row2{
    width: 500px;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-around;
      li{
        width: 170px;
        .desc{
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
    .p1{
      img{
        display: block;
        width: 100%;
        height: 170px;
        margin-top: 30px;
      }
    }
  }
}
@media screen and (max-width: 1500px) {
    #foot{
      .page-inner{
        width: 80%;
      }
    }
}
@media screen and (max-width: 600px) {
    #foot{
      padding: 15px 0;
    }
}
@media screen and (max-width: 600px) {
    #foot{
    padding: 15px 0;
    .page-inner{
      display: block;
    }
    .row1{
      display: block;
      .hotline{
        h4{
          font-size: 14px;
        }
      }
      div.text{
        font-size: 12px;
        line-height: 20px;
        span{
          font-size: 12px;
          line-height: 22px;
        }
      }
      .p2{
        margin-top: 10px;
      }
    }
    .row2{
      width: 100%;
      .p1{
        ul{
          justify-content: space-between;
        }
        .li-img{
          text-align: center;
        }
        img{
          display: inline-block;
          width: 80px;
          height: 80px;
          margin-top: 15px;
          margin-left: 0;
        }
      }
    }
  }
}
</style>