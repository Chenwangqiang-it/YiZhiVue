<template>
  <el-menu class="navbar" mode="horizontal" v-show="this.$route.meta.show==true">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <span class="loginout"  @click="logout">退出系统</span>
    <router-link class="inlineBlock" to="/">
      <span class="loginout" style="margin-right:15px;font-size:12px" >欢迎你:{{name}}</span>
    </router-link>
    <router-link class="inlineBlock" to="/message/message">
      <span class="loginout" style="margin-right:15px;font-size:12px" >消息  <span style="color:red">{{size}}</span></span>
    </router-link>
    <router-link class="inlineBlock" :to="'/unreviewed/unreviewed'">
      <span class="loginout" style="margin-right:15px;font-size:12px" >待办事项</span>
    </router-link>
    <router-link class="inlineBlock" :to="'/audit/drafts'">
      <span class="loginout" style="margin-right:15px;font-size:12px" >草稿箱</span>
    </router-link>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import message from '@/api/edu/message'
import { initCount } from './count'
export default {
  data(){
      return{
        size:0,
        socket:undefined,
        BASE_API:process.env.BASE_API,//端口号
      }
  },
  inject:["reload"],
  created(){
    // this.sidebar.opened=true
    if(this.$route.meta.show==true){
      this.msg()
      this.openSocket()
      initCount(this.roles)
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'device',
      'token',
      'roles'
    ])
  },
  methods: {
    openSocket() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else{
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
            //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
            var socketUrl=
            this.BASE_API+"/imserver/"+this.roles.openid;
            // https:协议使用wsshppt使用ws
            socketUrl=socketUrl.replace("https","wss").replace("http","ws");
            console.log(socketUrl);
            if(this.socket!=null){
                this.socket.close();
                this.socket=null;
            }
            this.socket = new WebSocket(socketUrl);
            //打开事件
            this.socket.onopen = function() {
                console.log("websocket已打开");
                //socket.send("这是来自客户端的消息" + location.href + new Date());
            };
            //获得消息事件
            let that=this;
            this.socket.onmessage = function(msg) {
                let data=JSON.parse(msg.data)
                console.log(data);
                if(data.data.count!=undefined){
                  that.size=data.data.count
                }
                if(data.data.fush){
                  // 更新数据
                  initCount(that.roles)
                }
                if(that.size!=0){
                  document.title = "一帜管理系统    --您有新消息";
                }else{
                  document.title = "一帜管理系统";
                }
                if(data.data.message!=undefined)
                that.reload()
                //发现消息进入    开始处理前端触发逻辑
            };
            //关闭事件
            this.socket.onclose = function() {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            this.socket.onerror = function() {
                console.log("websocket发生了错误");
            }
        }
    },
    msg(){
      message.getCount(this.roles.uid)
      .then(res=>{
        this.size=res.data.count
        if(that.size!=0){
          document.title = "一帜管理系统    --您有新消息";
        }else{
          document.title = "一帜管理系统";
        }
      })
      let that=this
      setInterval(function(){
        that.openSocket()
      },36000)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .loginout{
    float:right;
    color:#97a8be;
    margin-right:90px;
    font-size:15px;
  }
  .loginout:hover{
   color: #000000;
   cursor:pointer
  }
}
</style>

