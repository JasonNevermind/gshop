// 包含n个接口请求的模块
import ajax from './ajax.js'

const BaseURL='/api'
// [1、根据经纬度获取位置详情]
export const reqPosition = (geohash)=>ajax(BaseURL+`/position/${geohash}`)
// [2、获取食品分类列表]
export const reqIndexCategory = ()=>ajax(BaseURL+'/index_category')
// [3、根据经纬度获取商铺列表]
export const reqShopListByGeo = (latitude,longitude)=>ajax(BaseURL+'/shops',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const reqShopListByGeoKeyword = (geohash,keyword)=>ajax(BaseURL+'/search_shops',{geohash,keyword})
// [5、获取一次性验证码]
export const reqcaptcha = ()=>ajax(BaseURL+'/captcha')
// [6、用户名密码登陆]
export const reqLogin_pwd = ({name,pwd,captcha})=>ajax(BaseURL+'/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const reqSendcode = (phone)=>ajax(BaseURL+'/sendcode',{phone})
// [8、手机号验证码登陆]
export const reqLogin_sms = ({phone,code})=>ajax(BaseURL+'/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息]
export const reqUserInfo = ()=>ajax(BaseURL+'/userinfo')
// [10、用户登出]
export const reqLogout = ()=>ajax(BaseURL+'/logout')
// 11、获取商家食品
export const reqShopGoods = ()=>ajax('/goods')
// 12、获取商家评论
export const reqShopRating = ()=>ajax('/rating')
// 13、获取商家信息
export const reqShopInfo = ()=>ajax('/info')

// var test = reqUserInfo().then(val=>{console.log(val)},err=>{console.log(err)})

// async function fn(){
//     var test = await reqIndexCategory()
//     console.log(test)
// }
