<template>
  <div class="recommend">
    <div class="row1">
      <div class="r-title">{{menu.categoryTitle}}</div>
      <ul class="child-menu">
        <li v-for="(item, i) in menu.childs" :key="i">
          <router-link :to="item.path">{{item.categoryTitle}}</router-link>
        </li>
      </ul>
    </div>
    <div class="row2">
      <div class="r-title">热门新闻</div>
      <ul class="news">
        <li v-for="(item, i) in news" :key="i">
          <router-link >

          </router-link>
        </li>
      </ul>
    </div>
    <div class="row3">
      <div class="r-title">热门公告</div>
      <ul class="news">
        <li v-for="(item, i) in notice" :key="i">
          <router-link >

          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      menu: {
        categoryTitle: "",
        categoryId: 0,
        path: '',
        childs: [
          {
            categoryTitle: "",
            path: '',
            categoryId: 0,
            childs: [
            ],
          },
        ],
      },
      news: [
        {
          contentTitle: null,
          contentDatetime: null,
          categoryId: null,
          contentDescription: null,
        }
      ],
      notice: [
        {
          contentTitle: null,
          contentDatetime: null,
          categoryId: null,
          contentDescription: null,
        }
      ]
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {},
};
</script>

<style lang=''>

</style>
