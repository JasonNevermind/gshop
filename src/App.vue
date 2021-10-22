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
// import {reqIndexCategory} from './api/index.js'
import {mapActions} from 'vuex'
export default {
	name: 'App',
	components:{
		FooterGuide
	},
	async mounted(){
	// const result = await reqIndexCategory()
	// console.log(result)
	// 两种写法:直接调用和使用mapActions
	// this.$store.dispatch('getAddress')

	await this.getUserInfo()
	await this.getAddress()
	},
	methods:{
		...mapActions(['getAddress','getUserInfo'])
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
