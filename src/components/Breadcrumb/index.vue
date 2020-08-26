<template>
  <el-breadcrumb class="app-breadcrumb" separator="|">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="index==is" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
        <span style="color:red;font-size:10px;margin-bottom:5px;cursor:pointer" @click.prevent="remove(item,index)">x</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'
export default {
  computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
  data() {
    return {
      levelList: [],
      is:'',
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // if(this.levelList.indexOf(item)>=0){
          //    this.levelList.splice(this.levelList.indexOf(item),1)
          // }
          if(item.name=="流程待办"){
            item.path='/flow/index/'+this.roles.uid
          }else if(item.name=="合同待办"){
            item.path='/audit/list/'+this.roles.uid
          }
          if((item.path.split('/')).length-1>1&&this.levelList.indexOf(item)<0){
            this.levelList.push(item)
            this.isRedirect(item)
          }else if(this.levelList.indexOf(item)>=0){
            this.isRedirect(item)
          }
          return true
        }
      })
      // const first = matched[0]
      // if (first && first.name !== 'dashboard') {
      //   matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      // }
      // console.log(matched)
      // console.log(this.levelList)
      // this.levelList=matched
      
      // console.log(this.levelList)
    },
    isRedirect(item){
      for(let i=0;i<this.levelList.length;i++){
        if(i==this.levelList.indexOf(item)){
          this.is=i
        }else{
        }
      }
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    remove(item,index){
      let i=this.levelList.indexOf(item)
      this.levelList.splice(i,1)
      if(this.levelList.length==0){
           this.$router.push('/')
      }
      if(this.is==index){
        // item.isredirect=undefined
        if(this.levelList.length==0){
           this.$router.push('/')
        }else{
          if(this.levelList[this.levelList.length-1]!=undefined){
            this.$router.push(this.levelList[this.levelList.length-1].path)
          }else{
            this.$router.push(this.levelList[this.levelList.length+1].path)
          }
         
        }
      }
      // console.log(this.levelList[this.levelList.length-1])
    },
    handleLink(item) {
      // this.levelList.splice(this.levelList.indexOf(item),1)
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
