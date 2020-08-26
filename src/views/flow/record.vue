<template>
    <div class="app-container">
         <div class="block" style="padding:10px;width:600px">
            <el-timeline>
                <el-timeline-item 
                placement="top"
                color="#0bbd87">
                    <el-card>
                        <h4>发起立案<span style="float:right;color:#0bbd87">成功</span></h4>
                        <p>立案时间:{{list[0].gmtCreate}}<span style="float:right">立案人:{{list[0].fname}}</span></p>
                        <p>描述:{{list[0].describes}}</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item 
                v-for="(lists,index) in list"
                :key="index"
                :timestamp="lists.gmtCreate"
                placement="top"
                color="#0bbd87"
                v-if="lists.schedules!=0"
                >
                <el-card>
                    <h4 v-if="lists.schedules==1">财务审核<span style="float:right;color:#0bbd87">成功</span></h4>
                    <h4 v-if="lists.schedules==2">流程分案<span style="float:right;color:#0bbd87">成功</span></h4>
                    <h4 v-if="lists.schedules==3">清单上传<span style="float:right;color:#0bbd87">成功</span></h4>
                    <h4 v-if="lists.schedules==4">申报材料提供<span style="float:right;color:#0bbd87">成功</span></h4>
                    <h4 v-if="lists.schedules==5&& lists.result==8">材料制作<span style="float:right;color:#0bbd87">已报送商务局</span></h4>
                    <h4 v-if="lists.schedules==5&& lists.result==6">材料制作<span style="float:right;color:#0bbd87">已制作</span></h4>
                    <h4 v-else-if="lists.schedules==5 && lists.result==4">材料制作<span style="float:right;color:#ec2303">撤回</span></h4>

                    <h4 v-if="lists.schedules==6&& lists.result==7">盖章材料提供<span style="float:right;color:#0bbd87">已提供</span></h4>
                    <h4 v-else-if="lists.schedules==6 && lists.result==5">盖章材料提供<span style="float:right;color:#ec2303">撤回</span></h4>

                    <h4 v-if="lists.schedules==7 && lists.result==8">盖章材料审核<span style="float:right;color:#0bbd87">已报送商务局</span></h4>
                    <h4 v-else-if="lists.schedules==7 && lists.result==6">盖章材料审核<span style="float:right;color:#ec2303">撤回</span></h4>

                    <h4 v-if="lists.schedules==8">已报送商务局
                        <span style="float:right;color:#0bbd87" v-if="lists.result==9">已公示</span>
                        <span style="float:right;color:#ec2303" v-else>驳回</span>
                    </h4>
                    <h4 v-if="lists.schedules==11">尾款确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                    <h4 v-if="lists.schedules==9">流程确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                    <h4 v-if="lists.schedules==10">顾问确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                    <h4 v-if="lists.schedules==12">交付<span style="float:right;color:#0bbd87">已公示</span></h4>
                    <h4 v-if="lists.schedules==19">文件上传<span style="float:right;color:#0bbd87">成功</span></h4>
                    <p>操作者:{{lists.uname}}</p>
                    <p v-if="lists.schedules==2">代理人:{{lists.agentName}}</p>
                    <p v-if="lists.schedules!=19">描述:{{lists.describes}}</p>
                    <p v-else>上传文件:
                         <el-link :href="li.url" target="_blank" v-for="(li,index2) in lists.describes" :key="index2">{{li.name}}</el-link>
                    </p>
                    <!-- <p v-if="lists.schedules==6&&lists.result!=7">
                        处理人:<span v-if="lists.result==5">{{lists.agentName}}(代理人)</span>
                               <span v-else>{{lists.uname}}(顾问)</span>
                    </p> -->
                    <el-collapse v-if="lists.schedules==1">
                        <el-collapse-item title="更多" name="1">
                            <p>付款金额:{{lists.paidFirstAmount}}</p>
                            <p>付款日期:{{lists.paidFirstAmountDate}}</p>
                            <p>付款方:{{lists.paymentFirstAmount}}</p>
                            <p>收款方:{{lists.gatheringFirstAmount}}</p>
                        </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-if="lists.schedules==11">
                        <el-collapse-item title="更多" name="1">
                            <p>付款金额:{{lists.paidLastAmount}}</p>
                            <p>付款日期:{{lists.paidLastAmountDate}}</p>
                            <p>付款方:{{lists.paymentLastAmount}}</p>
                            <p>收款方:{{lists.gatheringLastAmount}}</p>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
                </el-timeline-item>
                <el-timeline-item 
                placement="top"
                color="#0bbd87">
                    <el-card>
                        <h4 v-if="list[list.length-1].result==''||list[list.length-1].result==null">财务审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==2">流程分案<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==3">清单上传<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==4">申报材料提供<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==5">材料制作<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==6">盖章材料提供<span style="float:right;color:#909399">待提供</span></h4>
                        <h4 v-if="list[list.length-1].result==7">盖章材料审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==8">已报送商务局<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==9">流程确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==10">顾问确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==11">尾款确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="list[list.length-1].result==12">已交付<span style="float:right;color:#0bbd87">完成交付</span></h4>
                        <p></p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<script>
import flow from '@/api/edu/flow'
import user from '@/api/edu/user'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

import record from '@/api/edu/record'
import history from '@/api/edu/history'
import contract from '@/api/edu/contract'
import message from '@/api/edu/message'
export default {//定义变量和初始值
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    data(){
        return{
            list:{}
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
    methods:{
        init(){
            let fid=this.$route.params.id
            this.getList(fid)
        },
        getList(id){
            history.getHistorysByfid(id)
            .then(res=>{
                this.list=res.data.list
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i].describes.indexOf("[")>-1&&this.list[i].describes.length>50){
                        this.list[i].describes=JSON.parse(this.list[i].describes)
                    }
                    
                }
                console.log(this.list)
            })
        }
    }

}
</script>
<style>
    .app-container{
        padding: 0%;
    }
</style>