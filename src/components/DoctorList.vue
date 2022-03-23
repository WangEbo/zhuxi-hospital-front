<template>
    <div id="doctor-list">
      <div v-if="menuPath.length<4">
        <ul>
          <li v-for="(doctor, i) in doctorList" :key="i" class="">
            <div class="doctor-card">
              <div class="doctor-img"><img :src="doctor.contentImg" alt=""></div>
              <div class="doctor-des"><strong>{{doctor.contentTitle}}，</strong>
                <SliceCard :to="`${curMenu.categoryPath}/detail/${doctor.id}`" :text="doctor.contentDescription"></SliceCard>
              </div>
            </div>
          </li>
        </ul>
        <el-empty description="暂无数据" v-if="!doctorList.length"></el-empty>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes,prev, pager, next,jumper" :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[10,15,20]" :total="total">
        </el-pagination>
      </div>
      
      <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArticlesList } from "@/api/content";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
export default {
  name: 'DoctorList',
  data() {
    return {
      total: 0,
      listQuery: Object.assign({}, defaultListQuery),
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
  created(){
    this.getList()
  },
  methods: {
    getList(){
      let id =  this.curMenu.childs && this.curMenu.childs[0] && this.curMenu.childs[0].id;
      if(!id){
        this.$set(this, 'doctorList', res.data.list)
        return
      }
      let params = Object.assign({}, this.listQuery, {categoryId: id})
      getArticlesList(params).then(res=> {
        this.$set(this, 'doctorList', res.data.list)
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
  }
};
</script>

<style lang="scss" scoped>
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
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &::after{
      left: unset;
      right: 10px;
      transform-origin: center center;
      transform: translateY(-50%) rotateZ(180deg);
    }
    .doctor-img{
      width: 200px;
      height: 280px;
      img{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 9;
      }
    }
    .doctor-des{
      margin-left: 10px;
      flex: 1;
    }
  }


</style>
