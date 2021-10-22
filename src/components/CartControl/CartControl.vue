<template>
  <div class="cartcontrol">
      <transition name="move">
        <div class="iconfont icon-remove_circle_outline" v-show="food.count" @click.stop="decreaseFood(food)"></div>
      </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="increaseFood(food)"></div>
  </div>
</template>

<script>
export default {
    props:['food'],
    methods:{
        increaseFood(food){
            this.$store.dispatch('changeFoodNum',{isAdd:true,food})
            this.$store.dispatch('changeShopCart',{isAdd:true,food})
        },
        decreaseFood(food){
            this.$store.dispatch('changeFoodNum',{isAdd:false,food})
            this.$store.dispatch('changeShopCart',{isAdd:false,food})
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol
    font-size: 0
    position absolute
    right: 0
    bottom: 12px
    .icon-remove_circle_outline
        display: inline-block
        padding 6px
        line-height 24px
        font-size 24px
        color rgb(0, 172, 0)
        &.move-enter-active,&.move-leave-active
            transition: all .5s
        &.move-enter,&.move-leave-to
            opacity 0
            transform: translateX(20px) rotate(90deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
    .icon-add_circle
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color rgb(0, 172, 0)
</style>

