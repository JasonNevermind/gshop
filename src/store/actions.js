// 通过mutations间接更新state的多个方法的对象
import{
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    DELETE_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    INCREASE_FOOD,
    DECREASE_FOOD,
    CLEAR_SHOPCART,
    INCREASE_SHOPCART,
    DECREASE_SHOPCART
} from './mutation-types'
import {
    reqPosition,
    reqIndexCategory,
    reqShopListByGeo,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRating
} from '../api'

export default {
    // 异步获取位置
    async getAddress({commit,state}){
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqPosition(geohash)
        // 提交一个mutation
        if(result.code == 0){
            const position = result.data
            // console.log(position)
            commit(RECEIVE_ADDRESS,{position})
        }
    },
    // 异步获取食品分类列表
    async getIndexCategory({commit}){
        // 发送异步ajax请求
        const result = await reqIndexCategory()
        // 提交一个mutation
        if(result.code == 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    // 异步获取商家列表
    async getShops({commit,state}){
        // 发送异步ajax请求
        const {latitude,longitude}=state
        const result = await reqShopListByGeo(latitude,longitude)
        // 提交一个mutation
        if(result.code == 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops})
        }
    },
    // 同步记录用户信息
    recordUserInfo({commit},userinfo){
        commit(RECEIVE_USER_INFO,{userinfo})
    },
    // 异步获取用户信息(从session)
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code==0){
            const userinfo = result.data
            commit(RECEIVE_USER_INFO,{userinfo})
        }
    },
    // 用户登出
    async logout({commit}){
        // 删除session中的用户信息
        const reslut = await reqLogout()
        if(reslut.code==0){
            // 删除vuex中的用户信息
            commit(DELETE_USER_INFO)
        }
    },
    // 异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if(result.code===0) {
            const info = result.data
            commit(RECEIVE_INFO, {info})
        }
    },
    // 异步获取商家评价列表
    async getShopRatings({commit},cb){
        const result = await reqShopRating()
        if(result.code===0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, {ratings})
        }
        cb&&cb()
    },
    async getShopGoods({commit}, cb){
        const result = await reqShopGoods()
        if(result.code===0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            cb && cb()
        }
    },
    // 同步修改食品数量
    changeFoodNum({commit},{isAdd,food}){
        if(isAdd)
            commit(INCREASE_FOOD,{food})
        else    commit(DECREASE_FOOD,{food})
    },
    // 添加购物车
    changeShopCart({commit},{isAdd,food}){
        if(isAdd)
            commit(INCREASE_SHOPCART,{food})
        else    commit(DECREASE_SHOPCART,{food})
    },
    // 清空购物车
    clearShopCart({commit}){
        commit(CLEAR_SHOPCART)
    },
}