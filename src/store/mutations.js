// 直接更新state的多个方法的对象
import Vue from 'vue'
import{
    DELETE_USER_INFO,
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    INCREASE_FOOD,
    DECREASE_FOOD,
    INCREASE_SHOPCART,
    DECREASE_SHOPCART,
    CLEAR_SHOPCART
} from './mutation-types'
export default {
    [RECEIVE_ADDRESS](state,{position}){
        state.position=position
    },
    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys=categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops=shops
    },
    [RECEIVE_USER_INFO](state,{userinfo}){
        state.userinfo=userinfo
    },
    [DELETE_USER_INFO](state){
        state.userinfo={}
    },
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [INCREASE_FOOD](state,{food}){
        if(!food.count){
            // food.count=1 新增属性（没有数据绑定）
            Vue.set(food,'count',1)
        }else{
            food.count++
        }
    },
    [DECREASE_FOOD](state,{food}){
        if(food.count>0)
            food.count--
    },
    [INCREASE_SHOPCART](state,{food}){
        let find=false
        for(var i=0;i<state.shopCart.length;i++){
            if(state.shopCart[i].name==food.name){
                find=true
            }
        }
        if(find==false){
            state.shopCart.push(food)
        }
    },
    [DECREASE_SHOPCART](state,{food}){
        for(let i=0;i<state.shopCart.length;i++){
            if(state.shopCart[i].name==food.name){
                if(state.shopCart[i].count==0)
                    state.shopCart.splice(i,1)
                break
            }
        }
    },
    [CLEAR_SHOPCART](state){
        for(let i=0;i<state.shopCart.length;i++){
            state.shopCart[i].count=0
        }
        state.shopCart.splice(0)
    }
}