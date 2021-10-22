<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginMod==1}" @click="loginMod=1">短信登录</a>
          <a href="javascript:;" :class="{on:loginMod==2}" @click="loginMod=2">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <!-- 取消表单默认提交 -->
        <form @submit.prevent="login">
          <div :class="{on:loginMod==1}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone"/>
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="clcikButton">
                {{ deadline>0? `已发送${deadline}s`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:loginMod==2}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-if="showpwd" v-model="pwd"/>
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="{on:showpwd,off:!showpwd}" @click="showpwd=!showpwd">
                  <div class="switch_circle" :class="{right:showpwd}"></div>
                  <span class="switch_text">{{showpwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText" v-if="showAlert" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqLogin_pwd,reqLogin_sms,reqSendcode} from '../../api/index'
export default {
  name: "Login",
  data(){
    return {
      loginMod:1, //登录方式
      deadline:0, //倒计时
      phone:'', //手机号
      name:'',  //用户名
      pwd:'',   //密码
      code:'',  //短信验证码
      captcha:'',  //图形验证码
      showpwd:true,  //显示密码
      alertText:'',  //提示弹窗字符串
      showAlert:false,  //是否弹窗
    }
  },
  components:{AlertTip},
  computed:{
    rightPhone(){
      let reg_tel=/^1\d{10}$/
      return reg_tel.test(this.phone)
    }
  },
  methods:{
    alert(text){
      this.showAlert=true
      this.alertText=text
    },
    // 异步获取短信验证码
    async clcikButton(event){
      if(this.deadline==0){
        // 启动倒计时
        this.deadline=60
        this.intervalId = setInterval(()=>{
          this.deadline--
          if(this.deadline==0)
            // 停止记录
            clearInterval(intervalId)
        },1000)
        // 发送ajax请求到后台
        const result = await reqSendcode(this.phone)
        if(result.code==1){   //失败
          // 显示提示
          this.alert(result.msg)
          // 停止倒计时
          if(this.deadline){
            this.deadline=0
            clearInterval(this.intervalId)
            this.intervalId=undefined
          }
        }
      }
    },
    // 异步登录
    async login(){
      let result
      // 前台表单验证
      if(this.loginMod==1){ //短信登录
        const {rightPhone,phone,code}=this
        if(!this.rightPhone){
            //手机号错误
            this.alert('手机号错误')
            return
        }else if(!/^\d{6}$/.test(code)){
            // 验证码必须是6位数
            this.alert('验证码必须是6位数')
            return
        }
        // 发送短信登录ajax请求
        result = await reqLogin_sms({phone,code})
      }else{  //密码登录
        const {name,pwd,captcha}=this
          if(!this.name){
            // 用户名必须指定
            this.alert('用户名必须指定')
            return
          }else if(!this.pwd){
            // 密码必须指定
            this.alert('密码必须指定')
            return
          }else if(!this.captcha){
            // 验证码必须指定
            this.alert('验证码必须指定')
            return
          }
          // 发送密码登录ajax请求
        result = await reqLogin_pwd({name,pwd,captcha})
      }
      // 停止倒计时
      if(this.deadline){
        this.deadline=0
        clearInterval(this.intervalId)
        this.intervalId=undefined
      }

      if(result.code==0){
          const user = result.data
          // 将user保存到vuex
          this.$store.dispatch('recordUserInfo',user)
          // 跳转路由
          this.$router.replace('/profile')
      }else{
          const msg = result.msg
          // 弹窗
          this.alert(msg)
        }
      // 刷新验证码
      this.getCaptcha()
    },
    // 关闭警告框
    closeTip(){
      this.showAlert=false
      this.alertText=''
    },
    // 获取验证码
    getCaptcha(){
      // 路径有变化src才变，加时间戳
      this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()
    }
  }
};
</script>

<style lang="stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                // transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>