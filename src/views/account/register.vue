<template>
  <div class="login-container">
    <el-form ref="user" :model="user" :rules="loginRules"  class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">注册</h3>
      <el-form-item prop="uname" >
        <span class="svg-container">
          <i class="el-icon-user-solid" />
        </span>
        <el-input name="uname" v-model="user.uname" type="text" auto-complete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="idnumber"  >
        <span class="svg-container">
          <i class="el-icon-key" />
        </span>
        <el-input name="idnumber" v-model="user.idnumber" type="text" auto-complete="on" placeholder="身份证号" />
      </el-form-item>
      <el-form-item prop="phoneNum"  >
        <span class="svg-container">
          <i class="el-icon-phone" />
        </span>
        <el-input name="phoneNum" v-model="user.phoneNum" type="text" auto-complete="on" placeholder="联系电话" />
      </el-form-item>
      <el-form-item prop="higherAuthority" >
        <span class="svg-container">
          <i class="el-icon-s-custom" />
        </span>
        <el-input name="higherAuthority" v-model="user.higherAuthority" type="text" auto-complete="on" placeholder="上级主管" />
      </el-form-item>
      <el-form-item prop="dept">
        <span class="svg-container">
          <i class="el-icon-s-grid" />
        </span>
          <el-select style="width:92%" v-model="user.dept" type="text" auto-complete="on" placeholder="部门">
              <el-option label="财务部" value="1"></el-option>
              <el-option label="市场部" value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="identity">
        <span class="svg-container">
          <i class="el-icon-s-cooperation" />
        </span>
          <el-select style="width:92%" v-model="user.identity" type="text" auto-complete="on" placeholder="职位">
              <el-option label="经理" value="1"></el-option>
              <el-option label="总经理" value="2"></el-option>
          </el-select>
      </el-form-item>
       <el-form-item prop="jurisdiction">
        <span class="svg-container">
          <i class="el-icon-s-operation" />
        </span>
          <el-select style="width:92%" v-model="user.jurisdiction" type="text" auto-complete="on" placeholder="权限级别">
              <el-option label="root" value="0"></el-option>
              <el-option label="管理者" value="1"></el-option>
              <el-option label="流程管理者" value="2"></el-option>
              <el-option label="顾问" value="3"></el-option>
              <el-option label="代理" value="4"></el-option>
              <el-option label="财务" value="5"></el-option>
          </el-select>
      </el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="register">
          注册
        </el-button>
    </el-form>
  </div>
</template>

<script>
 import user from '@/api/register'
 import { mapGetters } from 'vuex'
 import { Message } from 'element-ui'
 import { isvalidUsername } from '@/utils/validate'

export default {
  computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
  },
  created(){
      if(this.roles.jurisdiction>1){
        Message.error('你的权限不够')
        this.$router.go(-1)
      }
  },
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value.length!=11) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (value.length==0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validateIdnum = (rule, value, callback) => {
      if (value.length!=18) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    const validateHa = (rule, value, callback) => {
      if (value.length==0) {
        callback(new Error('上级主管不能为空'))
      } else {
        callback()
      }
    }
    const validateDept = (rule, value, callback) => {
      if (value.length==0) {
        callback(new Error('上级主管不能为空'))
      } else {
        callback()
      }
    }
    const validateIdentity = (rule, value, callback) => {
      if (value.length==0) {
        callback(new Error('请选择身份'))
      } else {
        callback()
      }
    }
    const validateJurisdiction = (rule, value, callback) => {
      console.log(value>this.roles.jurisdiction)
      if (value.length==0) {
        callback(new Error('请选择权限级别'))
      } else if(this.roles.jurisdiction>value){
        callback(new Error('您的权限不够'))
      }else {
        callback()
      }
    }
    return {
      user: {
        uname:'',
        idnumber:'',
        phoneNum:'',
        higherAuthority:'',
        dept:'',
        identity:'',
        jurisdiction:'',
      },
      loginRules: {
        uname: [{ required: true, trigger: 'blur', validator: validateName}],
        idnumber:[{required: true, trigger: 'blur', validator: validateIdnum}],
        phoneNum: [{ required: true, trigger: 'blur', validator: validatePhone }],
        higherAuthority: [{ required: true, trigger: 'blur', validator:validateHa}],
        dept: [{ required: true, trigger: 'blur', validator: validateDept }],
        identity: [{ required: true, trigger: 'blur', validator: validateIdentity}],
        jurisdiction:[{ required: true, trigger: 'blur', validator: validateJurisdiction}]
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    register(){
      this.$refs.user.validate(valid => {
        if (valid) {
          user.addUser(this.user)
          .then(res=>{
          this.$message({
          type: 'success',
          message: '注册成功!'
          });
          this.$router.push({path:'/account/list'})
        })
      }else {
          console.log('error submit!!')
          return false
      }
    })
   }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
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
