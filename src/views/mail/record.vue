<template>
    <div class="app-container">       
        <div class="block">
            <el-timeline>
                <div v-if="list.length!=0">
                    <el-timeline-item :timestamp="list[0].createDate" placement="top">
                    <el-card>
                        <h4>发起邮寄</h4>
                        <div><span>发起人:{{list[0].createUser}}</span><span style="float:right">日期:{{list[0].createDate}}</span></div>
                        <div>邮寄内容:
                            <el-tag v-if="list[0].mailBody.indexOf('1')>=0" type="success">合同</el-tag>
                            <el-tag v-if="list[0].mailBody.indexOf('2')>=0" type="info">发票</el-tag>
                            <el-tag v-if="list[0].mailBody.indexOf('3')>=0" type="warning">商标证书</el-tag>
                            <el-tag v-if="list[0].mailBody.indexOf('4')>=0" type="danger">版权证书</el-tag>
                            <el-tag v-if="list[0].mailBody.indexOf('5')>=0" type="danger">其他</el-tag>
                        </div>
                        <p>备注:{{list[0].remark}}</p>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item v-for="(mail,i) in list"  :key="mail.mailId" :timestamp="mail.gmtCreate" placement="top">
                        <el-card>
                            <h4 v-if="mail.state==0">邮寄回退</h4>
                            <h4 v-if="mail.state==1">邮寄修改</h4>
                            <h4 v-if="mail.state==2">快递信息填写</h4>
                            <h4 v-if="mail.state==3">收件确认</h4>
                            <div><span>处理人:{{mail.uname}}</span><span style="float:right">日期:{{mail.gmtCreate}}</span></div>
                            <p v-if="mail.state==1">备注:{{mail.remark}}</p>
                            <p v-if="mail.state==2">备注:{{mail.remarkExpress}}</p>
                            <p v-if="mail.state==3">备注:{{mail.remarkConsignee}}</p>
                        </el-card>
                    </el-timeline-item>
                </div>
                <el-timeline-item v-else placement="top">
                    <el-card>
                        <h4>暂无邮寄记录</h4>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>     
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import mail from '@/api/edu/mail'
export default {//定义变量和初始值
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    data(){
        return{
            list:[]
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
            let id=this.$route.params.id
            this.getMailById(id)
        },
        getMailById(id){
            mail.getMailRecordListById(id)
            .then(res=>{
                // this.mail=res.data.mail
                // this.$set(this.mail,"mailBody",JSON.parse(this.mail.mailBody))
                this.list=res.data.list
                console.log(this.list)
            })
        },
    }

}
</script>
<style>
    .block{
        width: 550px;
        padding: 30px 0px;
    },
    p {
         word-wrap:break-word; 
    }
    .el-dialog__body{
        padding-bottom:0px;
        padding-top:0px
    }
    .el-textarea textarea{
        height:80px;
    }
    .addHistory{
        float:right;
        color:#909399;
        cursor: pointer;
    }
    .app-container{
        padding: 0%;
    }
    i:hover{
        color:#409EFF
    }
    .el-input.is-disabled .el-input__inner{
        cursor: text;
    }
    .el-textarea.is-disabled .el-textarea__inner{
        cursor: text;
    }
    .update{
        cursor: pointer;
        position: relative;
        top: -10px;
        left: 5px;
        float:right
    }
    .el-card{
        cursor: pointer;
        transition: all 0.2s ease-in;
    }
    .el-card:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
    }
</style>