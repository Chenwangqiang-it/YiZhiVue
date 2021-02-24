<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
    <div class="rebox" v-show="$route.meta.show==true" v-if="messages.length!=0">
      <div class="remind" v-show="$route.meta.show==true" v-for="(item,i) in messages" :key="i">
        <div class="remind_top">
          提醒
          <span @click="close(i)">
            <i class="el-icon-error" ></i>
          </span>
        </div>
        <div class="remind_main">
          <div class="remind_main_title" v-if="messages[i].category==1">
            您有一个流程需要处理：
          </div>
          <div class="remind_main_title" v-else>
            您有一个合同需要处理：
          </div>
          <div class="remind_main_content">
            {{messages[i].msg}}
          </div>
        </div>
        <div class="remind_link">
          <router-link :to="'flow/agency'" v-if="messages[i].category==1">
            <span  @click="isRead(i)">点击处理</span>
          </router-link>
          <router-link  :to="'/audit/list/'+messages[i].categoryId" v-else>
            <span @click="isRead(i)">点击处理</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import message from '@/api/edu/message'
import merge from 'webpack-merge'
export default {
  computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
  name: 'AppMain',
  data(){
    return{
      messages:[],
      invoice:0,
    }
  },
  methods: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }

    remind(){
      
    },
    isRead(i){
      let msg=this.messages[i];
      msg.isRead=1
      message.updateMessage(msg)
      .then(res=>{
        this.close(i)
      })
    },
    close(i){
      if(timeout!=undefined){
        clearTimeout(timeout)
      }
      let remind=document.getElementsByClassName("remind")[i]
      let main=document.getElementsByClassName("app-main")[0]
      let that=this
      if(!!window.ActiveXObject||"ActiveXObject" in window){//ie浏览器不支持动画
        that.messages.splice(i,1)
        var timeout=setTimeout(function(){
          that.getremind();
        },36000)
      }else{
        remind.style="transform: translateY(200px);"
        setTimeout(function(){
          that.messages.splice(i,1)
        },300)
        var timeout=setTimeout(function(){
          that.getremind();
          if(that.messages.length!=0){
            setTimeout(function(){
              remind.style="transform: translateY(0px);"
            },300)
          }
        },36000)
      }
    },
    getremind(){
      message.getNewest(this.roles.uid)
      .then(res=>{
        this.messages=res.data.message
      })
    },
    init(){
      // this.$router.push({
      //     query:merge(this.$route.mate,{'count':'1'})
      // })
      // console.log(router)
    },
    
  },
  created(){
      this.getremind()
      // this.openSocket()
      this.init()
  },
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  height: 100%;
  overflow: hidden;
  /* background:url('../../../../assets/bgi.png'); */
}
.rebox{
  z-index: 444;
  box-shadow: -5px -2px 10px rgba(0, 0, 0,.3);
  position:fixed;
   right: 0px;
  bottom: 0px;
  width: 350px;
  height: 200px;
}
.remind{
  z-index: 555;
  transition: all 0.3s ease-in;
  position:fixed;
  right: 0px;
  bottom: 0px;
  width: 350px;
  height: 200px;
  border-radius: 0px;
  background-color: #f6f6f6;
}
.remind_main{
  padding-top: 25px;
}
.remind_main_title{
  height: 30px;
  padding: 10px;
  font-weight: bolder;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.remind_main_content{
  font-size: 16px;
  padding: 10px;
  text-indent: 27px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.remind_link{
  width: 100%;
  font-size: 15px;
  line-height: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color:#fff;
  height:30px;
  text-align: right;
  color: #409EFF;
  padding-right:10px;
}
.remind_link:hover{
  cursor: pointer;
  text-decoration: underline;
}
.el-icon-error{
  color: #686666;
  margin-top:5px ;
  float: right;
}
.el-icon-error:hover{
  color: red;
  cursor: pointer;
}
.remind_top{
  width: 350px;
  height:30px;
  line-height: 30px;
  color: #686666;
  padding-left:10px ;
  padding-right:10px ;
  background-color:#fff;
}
</style>
