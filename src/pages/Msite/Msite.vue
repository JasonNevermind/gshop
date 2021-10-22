<template>
    <div class="on">
      <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="position.name">
          <router-link slot="header_search" to="/search">
            <span class="header_search">
              <i class="iconfont icon-sousuo"></i>
            </span>
          </router-link>

          <router-link slot="header_login" :to=" userinfo._id?'/profile' : '/login'">
              <span class="header_login" v-if="!userinfo._id">登录|注册</span>
              <span class="header_login" v-else>
                <i class="iconfont icon-person"></i>
              </span>
              
          </router-link>

        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorysArr.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(arr,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(el,index) in arr" :key="index">
                  <div class="food_container">
                    <img :src="baseImageURL + el.image_url">
                  </div>
                  <span>{{el.title}}</span>
                </a>
              </div>

            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <ShopList></ShopList>
      </section>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex';
export default {
    name:'Msite',
	data(){
		return {
			baseImageURL:'https://fuss10.elemecdn.com'
		}
	},
    components:{
        HeaderTop,ShopList
    },
	computed:{
		...mapState(['position','categorys','userinfo']),
		// 商品列表的二维数组
		categorysArr(){
			const {categorys}=this.$store.state
			// console.log(categorys)
			let innerArr=[]
			let outerArr=[]
			for(let i=0;i<categorys.length;i++){
				if(i%8==7){
					innerArr.push(categorys[i])
					outerArr.push(innerArr)
					innerArr=[]
				}else{
					innerArr.push(categorys[i])
				}
			}
			// console.log(outerArr)
			return outerArr
		}
	},
	watch:{
		categorysArr(newval){
			// 在食品列表渲染过后才有轮播效果
			this.$nextTick(()=>{
				new Swiper('.swiper-container', {
					loop: true, // 循环模式选项
					// 如果需要分页器
					pagination: {
					el: '.swiper-pagination',
					},
				})
			})
		}
	},
  mounted(){
  this.$store.dispatch('getIndexCategory')
  this.$store.dispatch('getShops')
  },
	
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
.msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    
        
</style>

