<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left"></div>
      <div class="login-right">
          <div class="login-right-title">
            <h1>登录</h1>
            <h2>/ LOGIN</h2>
          </div>
          <div class="login-right-from">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
              <!-- <h3 class="title">欢迎使用YiZhi管理系统</h3> -->
              <el-form-item  prop="phoneNum" >
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input 
                style="height:52px"  
                v-model="loginForm.phoneNum" 
                name="phoneNum" 
                type="text" 
                auto-complete="on" placeholder="手机号" />
              </el-form-item>
              <el-form-item prop="upassword" >
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  style="height:52px"
                  :type="pwdType"
                  v-model="loginForm.upassword"
                  name="upassword"
                  auto-complete="on"
                  placeholder="请输入密码"
                  @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon icon-class="eye" />
                </span>
              </el-form-item>
              <el-form-item style="width:300px;margin-left:30px">
                <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="logo"></div>
      </div>
      <div class="light" style="height: 60px;">
        <div class="light-wire"></div>
        <div  v-drag="contain" class=light-light></div>
      </div>
    </div>
    <div class="login-foot">
      Powered by YiZhi v1.0 2020 <u>www.yizhitexu.com</u>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length!=11) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      contain:{
        xx:500,
        yy:500,
      },
      loginForm: {
        phoneNum: '',
        upassword: ''
      },
      loginRules: {
        phoneNum: [{ required: true, trigger: 'blur', validator: validateUsername }],
        upassword: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
        this.initAnimation()
      },
      immediate: true
    }
  },
  methods: {
    initAnimation(){
      setTimeout(function(){
        let box=document.getElementsByClassName("login-box")[0];
        box.style="margin-top:200px"
      },800)
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  directives:{
    drag:{//拉伸，绑定事件
      bind:function(el,binding,vnode){
        el.onmousedown=function(e){
          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
          var disy= e.clientY - el.offsetTop;
          document.onmousemove=function(e){
            let top =e.clientY -disy;
            if(top<60){
              top=60
            }
            let light=document.getElementsByClassName("light")[0];
            if(top>500){
              top=500
              light.style.height=parseInt(top)+'px';
            }else{
              light.style.height=parseInt(top)+'px';
            }
          }
          document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
          }
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.logo{
  margin-top:20px;
  position: relative;
  right: 10px;
  width:100%;
  height:160px;
  background:url('../../assets/logo.gif');
  background-size: 100% 100%;
}
.login-foot{
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 30px;
  margin: 0 auto;
  color: #fff;
  font-size: 13px;
}
.light{
  cursor: pointer;
  z-index: 555;
  float:right;
  width:40px;
  position: relative;
  top: -20px;
}
.light-light{
  // -webkit-transition: all .2s ease-in .1s;
  transition: all 1s ease-in 1s;
  width:40px;
  height:30px;
  background:url('../../assets/light-light.jpg');
  background-size: 120% 100%;
}
.light-wire{
  width:100%;
  height:100%;
  background:url('../../assets/light-wire.jpg');
  background-size: 120% 100%;
}
.login-right-title{
  height: 80px;
}
.login-right-from{
  width: 100%;
  height: 200px;
  margin-top: 30px;
}
.login-right-from input{
  width:300px;
  height: 40px;
  border-radius: 20px;
  background-color:#f6f6f6 ;
}
.login-right-from button{
  // width:280px;
  margin-top: 30px;
  height: 40px;
  border-radius: 20px;
  background-color:#222a37 ;
}
.login-right{
  //  pointer-events:none;
  float: left;
  margin-left:20px ;
  width: 380px;
  height: 100%;
  padding-top:30px;
}
.login-right h1{
  float:left;
}
.login-right h2{
  padding-top: 10px;
  padding-left: 5px;
  float:left;
}
.login-left{
  float: left;
  background: url('../../assets/login-left.jpg') no-repeat;
  background-size: 100% 100%;
  width: 470px;
  height: 90%;
  margin-top:20px;
}
.login-box{
  overflow: hidden;
  transition: all 1s ease-in-out;
  padding: 20px;
  width: 950px;
  height: 530px;
  background-color: #fff;
  border-radius: 15px;
  margin: 0px auto;
  margin-top:220px;
}
.login-container {
  background: url('../../assets/logobgm.jpg') no-repeat;
  background-size: 100% 100%;
  .el-input {
    display: inline-block;
    height: 100%;
    width: 85%;
    // input {
    //   // background: transparent;
    //   border: 0px;
    //   -webkit-appearance: none;
    //   border-radius: 20px;
    //   padding: 12px 5px 12px 15px;
    //   color: $light_gray;
    //   height: 100%;
    //   &:-webkit-autofill {
    //     -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
    //     -webkit-text-fill-color: #fff !important;
    //   }
    // }
  }
  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
