<template>
  <div class="app-container">
    账号修改
     <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="user.uname"/>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="user.identity" clearable placeholder="请选择">
          <el-option value="1" label="经理"/>
          <el-option value="2" label="总经理"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="user.dept" placeholder="请选择">
          <el-option label="市场部" value="1" />
          <el-option label="财务部" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="权限级别">
        <el-select v-model="user.jurisdiction" placeholder="请选择">
          <el-option label="管理者" value="1" />
          <el-option label="流程管理者" value="2" />
          <el-option label="顾问" value="3" />
          <el-option label="代理" value="4" />
          <el-option label="财务" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="上级主管">
        <el-input v-model="user.higherAuthority"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.upassword"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="user.phoneNum"/>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="user.idnumber"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
 <script>
 import { Message } from 'element-ui'
 import { mapGetters } from 'vuex'
 import user from '@/api/edu/user'
 import ImageCropper from '@/components/ImageCropper'
 import PanThumb from '@/components/PanThumb'
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
        uname:'',
        upassword:'',
        idnumber:'',
        phoneNum:'',
        dept:'',
        higherAuthority:'',
        identity:'',
        jurisdiction:''
      },
      BASE_API:process.env.BASE_API,//端口号
      imagecropperKey: 0,//上传组件的key
      imagecropperShow:false,//上传组件是否显示
      saveBtnDisabled:false,//预防重复提交
    }
  },
  created(){
      if(this.roles.jurisdiction!=0){
        Message.error('你的权限不够')
        this.$router.go(-1)
      }else{
        this.init()
      }
  },
  watch:{//监听
    $route(to,from){//路由变化的方式，路由一变化就执行
      console.log('watch $route')
      this.init()
    }
  },
  methods:{
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
      if(this.$route.params && this.$route.params.id){
        const id = this.$route.params.id
        this.getInfo(id)
      }else{//路径中没有id，做添加
        // console.log(this.$route.params.id)
        Message.error('userid is not defind')
      }
    },
    //根据讲师id查询的方法
    getInfo(id){
      user.getUserInfo(id)
      .then(res=>{    
        this.user=res.data.user
      })
    },
    updateUser(){
      if(this.user.idnumber.length!=18){
        this.$message({
          // type: 'success',
          message: '请输入正确的身份证！'
        });
      }else{
         user.updateUser(this.user)
        .then(res=>{
          this.$message({
          type: 'success',
          message: '修改成功!'
          });
          //回到列表页面  
          //路由跳转 ，前端重定向
          this.$router.push({path:'/account/list'})
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
