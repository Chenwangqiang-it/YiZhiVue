<template>
  <div class="app-container">
    账号修改
     <el-form style="width:450px" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="user.uname"/>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="user.identity" clearable placeholder="请选择">
          <el-option
          v-for="(item,i) in identity"
          :key="i"
          :label="item.identityName"
          :value="item.identity">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="user.dept" placeholder="请选择">
          <el-option
          v-for="(item,i) in dept"
          :key="i"
          :label="item.deptName"
          :value="item.deptId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限级别">
        <el-select v-model="user.jurisdiction" placeholder="请选择">
          <el-option
          v-for="(item,i) in permitsaccess"
          :key="i"
          :label="item.jurisdictionName"
          :value="item.jurisdiction">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级主管">
        <el-select v-model="user.higherAuthority" placeholder="请选择">
          <el-option
          v-for="(item,i) in use"
          :key="i"
          :label="item.uname"
          :value="item.uid">
          </el-option>
        </el-select>
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
 import identity from '@/api/edu/identity'
 import dept from '@/api/edu/dept'
 import permitsaccess from '@/api/edu/permitsaccess'
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
        jurisdiction:'',
      },
      identity:{},
      dept:{},
      permitsaccess:{},
      use:{},
      BASE_API:process.env.BASE_API,//端口号
      imagecropperKey: 0,//上传组件的key
      imagecropperShow:false,//上传组件是否显示
      saveBtnDisabled:false,//预防重复提交
    }
  },
  created(){
      if(this.roles.jurisdiction>1){
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
        user.getList()
        .then(res=>{
          this.use=res.data.list
        })
        identity.getList()
        .then(res=>{
          this.identity=res.data.list
        })
        dept.getList()
        .then(res=>{
          this.dept=res.data.list
        })
        permitsaccess.getList()
        .then(res=>{
          this.permitsaccess=res.data.list
        })
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
        let iden=res.data.user.identity
        this.$set(this.user,"identity",parseInt(iden));
        this.$set(this.user,"dept",parseInt(res.data.user.dept));
        this.$set(this.user,"jurisdiction",parseInt(res.data.user.jurisdiction));
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
