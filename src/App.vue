<template>
  <div id="app">
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app .main-container{
  width: calc(100% - 180px);
}
</style>
