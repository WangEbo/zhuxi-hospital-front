<template>
  <router-link v-if="isLink" :to="to" :tag="tag">
    {{showText}}
    <slot>
      <span v-if="text && text.length>max" style="">...[详情]</span>
    </slot>
  </router-link>
  <div v-else>
    {{showText}}
    <slot>
      <span v-if="text && text.length>max" style="">...[详情]</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SliceCard',
  props: {
    to: {
      type: String,
    },
    isLink: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 300
    },
    text: {
      type: String,
    },
    tag: {
      type: String,
    },
  },
  data() {
    return {
    };
  },
  computed:{
    showText(){
      if(this.text && this.text.length>this.max){
        return this.text.substr(0, this.max)
      }else{
        return this.text
      }
    }
  },
  watch:{
  },
  methods: {},
};
</script>

<style lang=''>

</style>
