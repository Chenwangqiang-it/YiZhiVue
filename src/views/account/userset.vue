<template>
  <div class="app-container">
    用户修改
     <el-form label-width="120px">
      <el-form-item label="原密码">
        <el-input v-model="orpassword" :type="pwdType"
          name="orpassword"
          auto-complete="on"
          placeholder="请输入密码"
          style="width:30%" 
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="user.upassword" :type="pwdType"
          name="upassword"
          auto-complete="on"
          placeholder="请输入密码"
          style="width:30%" 
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="affirm" :type="pwdType"
          name="affirm"
          auto-complete="on"
          placeholder="请输入密码"
          style="width:30%" 
        />
      </el-form-item>
      <!-- <el-form-item label="电话号码">
        <el-input v-model="user.phoneNum" style="width:30%" />
      </el-form-item> -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
 <script>
 import user from '@/api/edu/user'
 import ImageCropper from '@/components/ImageCropper'
 import PanThumb from '@/components/PanThumb'
 import { mapGetters } from 'vuex'
 
 export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
  components:{ImageCropper,PanThumb},
  data(){
    return{
      user:{
        upassword:'',
        phoneNum:'',
      },
      orpassword:'',
      oripassword:'',
      affirm:'',
      BASE_API:process.env.BASE_API,//端口号
      imagecropperKey: 0,//上传组件的key
      imagecropperShow:false,//上传组件是否显示
      saveBtnDisabled:false,//预防重复提交
      pwdType: 'password'
    }
  },
  created(){
    this.init()
  },
  watch:{//监听
    $route(to,from){//路由变化的方式，路由一变化就执行
      console.log('watch $route')
      this.init()
    }
  },
  methods:{
      showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    close(){//关闭上传弹框的方法
      this.imagecropperShow=false
      this.imagecropperKey=this.imagecropperKey+1//每次做一个变化，以免关闭之后再次开启不做初始化
    },
    cropSuccess(data){
     this.imagecropperShow=false
     this.imagecropperKey=this.imagecropperKey+1
      //上传成功后返回图片路径
      this.teacher.avatar=data.url//相当于res.data.url，自动封装
    },
    init(){//页面初始化方法
      this.getInfo(this.roles.uid)
    },
    //根据讲师id查询的方法
    getInfo(id){
      user.getUserInfo(id)
      .then(res=>{    
        this.user=res.data.user
        this.oripassword=res.data.user.upassword
      })
    },
    updateUser(){
      if(this.orpassword!=this.oripassword){
        this.$message({
        //  type: 'success',
         message: '请确认原始密码！'
        });
      }else if(this.user.upassword==''&&this.user.phoneNum==''){
          this.$message({
        //  type: 'success',
         message: '密码和电话号码至少填一个!'
        });
      }else if(this.user.upassword!=this.affirm){
          this.$message({
        //  type: 'success',
         message: '两次输入密码不一致!'
        });
      }else{
          user.updateUser(this.user)
        .then(res=>{
            this.$message({
            type: 'success',
            message: '修改成功!'
            });
        })
      }
      
    },
    saveOrUpdate(){
      //判断修改还是添加
       if(this.user.uid){
         //修改
         this.updateUser()
       }else{
         Message.error('userid is not defind')
       }
    }
  }
}
 </script>
