<template>
  <div class="doctor-page route-wrap">
    <div class="left-part">
      <ul>
        <li v-for="(doctor, i) in doctorList" :key="i" class="">
          <div class="doctor-card">
            <div class="doctor-img"><img :src="doctor.coverImg" alt=""></div>
            <div class="doctor-des"><strong>{{doctor.title}}，</strong>{{doctor.content}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-part">
      <div class="dep-item"  v-for="(parentItem, pi) in curLevel1Menu.childs" :key="pi">
        <div class="bd-line"></div>
        <h4>{{parentItem.categoryTitle}}</h4>
        <ul>
          <li class="department" v-for="(item, ci) in parentItem" :key="ci">
            >>{{item.categoryTitle}}
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";

export default {
  name: '',
  data() {
    return {
      doctorList: [
        {
          coverImg: "",
          contentDescription: "",
          title: "孙波",
          id: "",
          content: "副院长，主任医师，大学本科毕业，医学学士,第三批全国中医临床优秀人才，十堰市十大名中医、竹溪县十大名中医，十堰市中医学会、十堰市中西结合学会理事，十堰市医疗事故鉴定委员会、十堰市医院评审委员会专家库成员，国家法医司法鉴定人。从事中西结合临床工作20余年。中西医理论基本功扎实，临床技术精湛，在治疗内、儿、妇科常见病、部分疑难病方面积累了丰富的临床经验，在治疗呼吸道疾病、心脑血管病、胃病、肾病、不孕不育症、脱发等疾病尤为擅长。有多篇论文在国家、省级刊物上发表。",
          createTime: "",
        }
      ]
    };
  },
  computed:{
    ...mapGetters(['menus', 'curLevel1Menu', 'curMenu', 'menuPath']),
  },
  watch:{
  },
  methods: {},
};
</script>

<style lang="scss">
.doctor-page{
  display: flex;
  .left-part{
    flex: 1;
    margin-right: 50px;
  }
  .doctor-card{
    padding: 35px;
    font-size: 16px;
    background-image: url('../assets/imgs/doc-bd.png');
    background-size: 100% 100%;
    height: 370px;
    display: flex;
    position: relative;
    &::before, &::after{
      position: absolute;
      content: '';
      width: 140px;
      height: 260px;
      background-image: url('../assets/imgs/sy.png');
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after{
      left: unset;
      right: 0;
      transform-origin: center center;
      transform: rotateZ(180deg);
    }

    .dep-img{
      width: 200px;
      height: 290px;
      img{
        display: block;
        width: 100%;
        height: 100%;
        margin-right: 10px;
      }
    }
    .doctor-des{
      flex: 1;
    }
  }


  .right-part{
    width: 320px;
  }
  .dep-item{
     position: relative;
    h4{
      font-size: 26px;
      font-weight: 500;
      display: inline-block;
      padding: 0;
      line-height: 54px;
      border-bottom: 3px solid rgb(152, 98, 24);
      position: relative;
      z-index: 1;
    }
    .bd-line{
      position: absolute;
      bottom: 0;
      height: 2px;
      background-color: rgb(182, 182, 182);
      width: 100%;
    }
  }
}

</style>
