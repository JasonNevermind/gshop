<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <!--currentIndex-->
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: currentIndex === index }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsWarpperUl">
          <li
            class="food-list food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <!-- <div class="cartcontrol-wrapper">
                    CartControl
                  </div> -->
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <Food :food="food" ref="foodRef"></Food>
      <ShopCart></ShopCart>
    </div>
</template>

<script>
import { mapState } from "vuex"
import BScroll from '@better-scroll/core'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue';
export default {
  data() {
    return {
      scrollY: 0, //右侧 Y 轴滑动的坐标
      tops: [], // 包含右侧所有分类小列表的 top 值
      food:{} //需要显示的Food
    }
  },
  components:{CartControl,Food,ShopCart},
  mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        // 重新更新DOM时触发
        this.$nextTick(()=>{
          this._initScroll()
          this._initTops()
        })
      })
  },
  computed:{
      ...mapState(['goods']),
      currentIndex(){
        const {scrollY,tops}=this
        // 根据ScrollY计算currentIndex
        const index = tops.findIndex((curVal,Index)=>{
          return curVal>=scrollY && curVal<this.tops[Index+1]
        })
        return index
      }
  },
  methods:{
    showFood(food){
      // 设置Food
      this.food=food
      // 显示Food组件
      this.$refs.foodRef.toggle()
    },
    clickMenuItem(index){
      // 使右侧列表滑动到对应位置
      // this.scrollY=-this.tops[index]
      this.foodScroll.scrollTo(0,-this.tops[index])
    },
    _initScroll(){
      // 列表显示之后创建
      new BScroll('.menu-wrapper',{scrollY:true,click:true})
      
      this.foodScroll = new BScroll('.foods-wrapper',{probeType:3,click:true})
      // 滚动执行的监听
      this.foodScroll.on('scroll',(pos)=>{
        // this.scrollY = Math.abs(pos.y)
      })
      // 滚动结束的监听
      this.foodScroll.on('scrollEnd',(pos)=>{
        this.scrollY = Math.abs(pos.y)
        // console.log(this.scrollY)
        }
      )
    },
    _initTops(){
      let top=0
      let tops=[]
      tops.push(top)
      const lis = this.$refs.foodsWarpperUl.getElementsByClassName('food-list')
      // Array.prototype.slice.call(arguments)将传入的arguments转化为数组
      Array.prototype.slice.call(lis).forEach((el)=>{
        top += el.clientHeight
        tops.push(top)
      })
      
      this.tops=tops
      
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
            display: table
            height: 54px
            width: 56px
            padding: 0 12px
            line-height: 14px
            &.current
                position: relative
                z-index: 10
                margin-top: -1px
                background: #fff
                color: green
                font-weight: 700
                .text
                    border-none()
            .icon
                display: inline-block
                vertical-align: top
                width: 12px
                height: 12px
                margin-right: 2px
                background-size: 12px 12px
                background-repeat: no-repeat
            .text
                display: table-cell
                width: 56px
                vertical-align: middle
                bottom-border-1px(rgba(7, 17, 27, 0.1))
                font-size: 12px
    .foods-wrapper
        flex: 1
        .title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: rgb(147, 153, 159)
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
            border-none()
            margin-bottom: 0
        .icon
            flex: 0 0 57px
            margin-right: 10px
        .content
            flex: 1
            .name
                margin: 2px 0 8px 
                height: 14px
                line-height: 14px
                font-size: 14px
                color: rgb(7, 17, 27)
            .desc, .extra
                line-height: 10px
                font-size: 10px
                color: rgb(147, 153, 159)
            .desc
                line-height: 12px
                margin-bottom: 8px
            .extra
                .count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)

</style>

