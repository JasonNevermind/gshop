// 包含n个接口请求的模块
import ajax from './ajax.js'
// [1、根据经纬度获取位置详情]
export const reqPosition = (geohash)=>ajax(`/position/${geohash}`)
// [2、获取食品分类列表]
export const reqIndexCategory = ()=>ajax('/index_category')
// [3、根据经纬度获取商铺列表]
export const reqShopListByGeo = (latitude,longitude)=>ajax('/shops',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const reqShopListByGeoKeyword = (geohash,keyword)=>ajax('/search_shops',{geohash,keyword})
// [5、获取一次性验证码]
export const reqcaptcha = ()=>ajax('/captcha')
// [6、用户名密码登陆]
export const reqLogin_pwd = (name,pwd,captcha)=>ajax('/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const reqSendcode = (phone)=>ajax('/sendcode',{phone})
// [8、手机号验证码登陆]
export const reqLogin_sms = (phone,code)=>ajax('/login_msm',{phone,code},'POST')
// [9、根据会话获取用户信息]
export const reqUserInfo = ()=>ajax('/userinfo')
// [10、用户登出]
export const reqLogout = ()=>ajax('/logout')

var test = reqUserInfo().then(val=>{console.log(val)},err=>{console.log(err)})
