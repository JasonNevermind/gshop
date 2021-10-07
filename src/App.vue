<template>
  <div id="app">
    
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
export default {
  name: 'App',
  components:{
    FooterGuide,HeaderTop
  },
  beforeMount:function(){
    
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
