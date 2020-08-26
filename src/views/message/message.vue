<template>

<el-container >
  <el-container >
    <el-header style="text-align: left;padding-top:10px; font-size: 12px">
        <el-switch
        v-model="messsageQuery.isRead"
        @change='getList'
        inactive-text="只显示未读">
        </el-switch>
        <el-button type="primary" style="float:right;width:70px;margin-top:10px" @click="getList()">搜索</el-button>
        <el-input v-model="messsageQuery.msg" placeholder="请输入内容" style="float:right;width:200px;margin-right:10px" @click="getList()"></el-input>
    </el-header>
    <el-main style="width:95%;margin: 0 auto">
      <el-table
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
        prop="msg"
        label="消息"
        width="500">
        </el-table-column>
        <el-table-column
        align="center"
        prop="gmtCreate"
        label="时间"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        label="类型">
        <template slot-scope="scope">
            <span  style="color:#909399"  v-if="scope.row.category==null">系统</span>
            <span   v-if="scope.row.category==0">合同</span>
            <span  style="color:#4d90fe"  v-if="scope.row.category==1">流程</span>
        </template>
        </el-table-column>
        <el-table-column
        align="center"
        prop="sendName"
        label="发送人">   
        </el-table-column>
        <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
            <el-link type="success" v-if="scope.row.isRead==0" @click="handleChange(scope.row)" >阅读</el-link>
            <el-link type="info" v-if="scope.row.isRead==1">已阅读</el-link>|
            <router-link :to="'/audit/list/'+scope.row.categoryId" v-if="scope.row.category==0">
                <el-link type="primary">查看</el-link>
            </router-link>
            <router-link :to="'/flow/index/'+scope.row.categoryId" v-if="scope.row.category==1">
                <el-link type="primary">查看</el-link>
            </router-link>
                 
        </template>
        </el-table-column>
    </el-table>
      <!-- <el-collapse >
            <el-badge value="new" 
            class="item" 
            style="width:98%"
            v-for="(item,key,index) in list"
            :key="index"
            :hidden='item.isRead==1'
            >
                <span class="type" style="color:#909399"  v-if="item.category==null">系统</span>
                <span class="type"  v-if="item.category==0">合同</span>
                <span class="type" style="color:#4d90fe"  v-if="item.category==1">流程</span>
                <el-collapse-item
                :title="item.msg" 
                :name="index" 
                @click.native="handleChange(item)">
                    <span style="margin-right:30px">时间:{{item.gmtCreate}}</span>
                     <router-link :to="'/flow/index/'+item.categoryId" v-if="item.category==1">
                        <span style="margin-top:10px;text-decoration:underline;color:#4d90fe">点击查看</span>
                    </router-link>
                    <router-link :to="'/audit/list/'+item.categoryId" v-if="item.category==0">
                        <span style="margin-top:10px;text-decoration:underline;color:#4d90fe">点击查看</span>
                    </router-link>
                </el-collapse-item>
            </el-badge>
      </el-collapse> -->
    </el-main>
  </el-container>
</el-container>

</template>
<script>
import { mapGetters } from 'vuex'
import message from '@/api/edu/message'
export default {
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    created(){
       this.getList()
    },
   data() {
      return {
        list:[],
        messsageQuery:{
            isRead:false,
            msg:''
        },
      }
    },
    methods:{
        getList(){
            this.messsageQuery.uid=this.roles.uid
            if(this.messsageQuery.msg.length==19){
                this.messsageQuery.msg=''
                this.messsageQuery.categoryId=this.messsageQuery.msg
            }
            message.getMessageListPage(this.messsageQuery)
            .then(res=>{
                this.list=res.data.rows
            })
        },
        handleChange(val) {
            val.isRead='1'
            val.openid=this.roles.openid
            message.updateMessage(val);
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
 .input-width{
     width: 200px;
 }
.type{
    font-size:13px;
    color:#67C23A;
    float:right;
    position: relative;
    right: 70px;
    top:18px;
}
.el-header {
    line-height: 60px;
}
.el-container{
    height: 100%;
}
.login-container{
    height: 100%;
}
</style>