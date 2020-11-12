<template>
    <div class="app-container">
        <el-timeline>
            <el-timeline-item 
              v-for="(lists,index) in list"
              :key="index"
              :timestamp="lists.gmtCreate"
              placement="top"
              color="#0bbd87"
            >
              <el-card>
                  <h4>
                    <span v-if="lists.sstate==-1">删除合同</span>
                    <span v-if="lists.sstate==0">合同提交</span>
                    <span v-if="lists.sstate==1||lists.sstate==2">合同审核</span>
                    <span v-if="lists.sstate==3">合同签订</span>
                    <span v-if="lists.sstate==4&&lists.accessory==null">合同修改</span>
                    <span v-if="lists.sstate==4&&lists.accessory!=null">非标合同修改</span>
                    <span v-if="lists.sstate==5">发起立案</span>
                    <span style="float:right;margin-right:50px;">提交状态:
                      <span style="color:#e82816" v-if="lists.sstate==-1">删除成功</span>
                      <span style="color:#0bbd87" v-else-if="lists.sstate!=1">同意</span>
                      <span style="color:#e82816" v-else-if="lists.sstate==1">不同意</span>
                    </span>
                  </h4>
                  <p>{{user[index].uname}} 提交于 {{lists.gmtCreate}}</p>
                  <pre v-if="lists.notStandardMsg!=null&&lists.notStandardMsg!=''">非标合同描述:{{lists.notStandardMsg}}</pre>
                  <p v-if="lists.accessory!=null">
                    附件:
                    <el-link :href="li.url" target="_blank" v-for="(li,index2) in lists.accessory" :key="index2">{{li.name}}</el-link>
                  </p>
              </el-card>
            </el-timeline-item>
        </el-timeline>

    </div>
</template>
<script>
import state from '@/api/edu/state'
import user from '@/api/edu/user'
import record from '@/api/edu/record'

  export default {
    data() {
      return {
        list:[],
        user:{},
      };
    },
    created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
    methods:{//创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        //意思是如果不传page的值默认就是1，如果传了就是传了的
        init(){
          this.getList()
        },
        getList(){
            record.getRecord(this.$route.query.cid)
                .then(res=>{
                    //res返回的数据
                    this.list=res.data.record
                    this.user=res.data.user
                    for(let i=0;i<this.list.length;i++){
                      if(this.list[i].accessory!=null){
                        this.list[i].accessory=JSON.parse(this.list[i].accessory)
                       
                      }
                    }
                    
                })//请求成功
                .catch(error=>{
                    console.log(error)
                })//请求失败
        },
    }
  };
</script>
<style>
  pre{
       font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
</style>