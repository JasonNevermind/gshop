import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Msite = ()=> import ('../pages/Msite/Msite')
const Order = ()=> import ('../pages/Order/Order')
const Profile = ()=> import ('../pages/Profile/Profile')
const Search = ()=> import ('../pages/Search/Search')
const Login = ()=> import ('../pages/Login/Login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path: '/msite',
      component: Msite,
      // 标识属性
      meta:{showFooter:true}
    },
    {
      path: '/order',
      component: Order,
      meta:{showFooter:true}
    },
    {
      path: '/profile',
      component: Profile,
      meta:{showFooter:true}
    },
    {
      path: '/search',
      component: Search,
      meta:{showFooter:true}
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
