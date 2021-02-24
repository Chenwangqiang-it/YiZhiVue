<template>
    <div class="app-container">
         <template>
            <div class="box">
                <!-- <h3 style="padding-left:140px">邮寄</h3> -->
                <el-steps  :active="active" finish-status="success" align-center>
                    <el-step title="邮寄信息填写"></el-step>
                    <el-step title="快递信息填写"></el-step>
                    <el-step title="收件确认"></el-step>
                    <el-step title="完成处理"></el-step>
                </el-steps>
                <div style="text-align:center">
                    <el-divider></el-divider>
                    <div class="mail-li" style="display: inline-block;" v-for="(mail,i) in mailList" :key="i">
                        <h4 style="text-align:left;margin-left:40px;margin-top:10px;margin-left:10px;margin-bottom:10px">
                            邮寄{{i+1}}
                            <el-button v-if="mailList.length>1" style="float:right;margin-right:0px" @click="remove(i)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                        </h4>
                        <el-form :ref="'mail'+i" :model="mail" style="width:1200px;text-align:left;"  :inline="true" :rules="saveRules" label-width="95px"  v-if="active<2">
                            <el-form-item label="客户名称" prop="mailName">
                                <el-input style="width:240px" :disabled="active==1" v-model="mail.mailName" placeholder="请输入名称"></el-input>
                            </el-form-item>
                            <el-form-item label-width="70px" label="收件人" prop="recipients">
                                <el-input style="width:120px" :disabled="active==1" v-model="mail.recipients" placeholder="请输入收件人"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人电话" prop="mailPhone" >
                                <el-input style="width:140px" :disabled="active==1" v-model="mail.mailPhone" placeholder="请输入电话"></el-input>
                            </el-form-item>
                            <el-form-item label="收件地址" prop="mailAddress">
                                <el-input style="width:230px" :disabled="active==1" v-model="mail.mailAddress" placeholder="请输入收件地址"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align:left" label="邮寄内容" prop="mailBody">
                                <el-checkbox-group v-model="mail.mailBody">
                                    <el-checkbox
                                    :disabled="active==1"
                                    size="mini"
                                    v-for="item in mailOptions"
                                    :key="item.id"
                                    :label="item.id" 
                                    :name="item.id">
                                    {{item.options}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item v-if="mail.mailBody.indexOf(5)>=0" label="详细" prop="describes" >
                                <el-input :disabled="active==1"   v-model="mail.describes" placeholder="详细"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input :disabled="active==1" type="textarea"  v-model="mail.remark" placeholder="备注"></el-input>
                            </el-form-item>
                            <!-- <el-divider style="margin-bottom:0px"></el-divider> -->
                        </el-form>
                    </div>
                </div>
                <div style="height:70px;margin-top:12px;text-align:center">
                    <div style="display:inline-block;margin-left:30px">
                        <el-popover
                        style="margin-right:5px"
                        placement="bottom"
                        width="160"
                        height="150"
                        v-model="vis">
                        请填写数量:<el-input-number v-model="num" style="width:135px;height:40px" controls-position="right" :min="1" :max="10"></el-input-number>
                        <div style="text-align: right;margin-top:10px">
                            <el-button size="mini" type="text" @click="vis = false;num=1">取消</el-button>
                            <el-button type="primary" size="mini" @click="add(num)">确定</el-button>
                        </div>
                        <el-button slot="reference" v-if="active==0" icon="el-icon-plus" style="margin-top: 12px" type="info">添加多个</el-button>
                        </el-popover>
                        <el-button v-if="active==0" icon="el-icon-right" style="margin-top: 12px;margin-left:200px" type="primary" @click="next">下一步</el-button>
                    </div>
                </div>
                <div style="text-align:center;color:#67C23A;height:30px" v-if="active==1"><i class="el-icon-circle-check"></i>提交成功,等待审核中！</div>
            </div>
         </template>
    </div>
</template>
<script>
    //核心代码位置
import contract from '@/api/edu/contract'
import mail from '@/api/edu/mail'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { countMail } from '../layout/components/count'
export default {//定义变量和初始值
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    data(){
        const isNumber = (rule, value, callback) => {
            if(value){
                if (value.length!=11) {
                    callback(new Error('联系电话应为11位'))
                }else{
                    for(let ilen=0;ilen<value.length;ilen++){
                        if(value.charAt(ilen) < '0' || value.charAt(ilen) > '9' ){
                            if((value.charAt(ilen)!='-'))
                            callback(new Error('联系电只能由数字或"-"组成'))
                        } 
                    }
                    callback()
                } 
            }else{
                callback(new Error('该字段不能为空'))
            }
        }
        const valiNotNull = (rule, value, callback) => {
            if (value==''||value==null||value==undefined) {
                callback(new Error('该字段不能为空'))
            } else {
                callback()
            }
        }
        const valiNotChange = (rule, value, callback) => {
            if (value==''||value==null||value==undefined) {
                callback(new Error('请选择邮寄内容'))
            } else {
                callback()
            }
        }
        return{
            vis:false,
            num:1,
            active: 0,
            mailList:[
                {
                    mailBody:[],
                }
            ],
            mailOptions:[],
            saveRules:{
                express:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                number:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                describes:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                mailAddress:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                recipients:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                mailBody:[{ required: true, trigger: 'change', validator: valiNotChange}],
                mailName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                mailPhone:[{ required: true, trigger: 'blur', validator: valiNotNull}],
            },
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      this.getMailOptions()
      this.init()  
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
    methods:{
        init(){

        },
        validate(){//多个表单验证
            // 表单的key为mail+地址值
            //通过key执行表单验证
            let vis=true
            for(let i=0;i<this.mailList.length;i++){
                this.$refs["mail"+i][0].validate(valid => {
                    if(!valid){
                        vis=false
                    }
                })
            }
            return vis
        },
        next() {
            if(this.validate()){
                this.addMail()
            }
        },
        add(i){//添加邮寄记录
            for(let j=0;j<i;j++){
                this.mailList.push(
                    {
                        mailBody:[],
                    }
                )
            }
            this.vis = false;
            this.num=1;
            //添加之后完成之后恢复
        },
        remove(i){
            this.mailList.splice(i,1)
        },
        addMail(){
            for(let i=0;i<this.mailList.length;i++){
                this.mailList[i].state=this.active+1
                this.mailList[i].uid=this.roles.uid
                this.mailList[i].mailBody=JSON.stringify(this.mailList[i].mailBody)
            }
            mail.saveMail(this.mailList)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.active++
                this.to()
            })
            .catch(error=>{
                this.active--
                this.$message({
                    type: 'error',
                    message: '提交失败'
                });
            })
        },
        to(){
            let that=this
            if(this.roles.jurisdiction!=0){
                countMail(this.roles)
                setTimeout(function(){
                    that.$router.push({
                        path: '/mail/table'
                    })
                },1000)
            }
        },
        getMailOptions(){
            mail.getMailOptions()
            .then(res=>{
                this.mailOptions=res.data.options
            })
        }
    }

}
</script>
<style scoped>
.box .el-checkbox{
    margin-right: 10px;
}
.box .el-form-item{
    margin: 0px;
    margin-top:20px;
}
.box .mail-li{
    /*  */
    width: 1220px;
    margin: 0 auto;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    /* width: 450px; */
}
.box{
    /* width: 550px; */
    /* height: 850px; */
    padding: 20px;
    padding-left: 60px;
    padding-top: 50px;
    background-color: #fff;
    /* border: 1px solid #DDDCDC; */
    /* box-shadow: 0px 5px 10px #AFAEAE; */
}
.app-container{
    height: 100%; 
    position: relative;
}
.link-contrainer{
    background-image:none !important;
    /* height: 100%; */
}
.app-wrapper{
    background-color: #f7f7f7;
    /* background:url('../../assets/bgi.png');
    background-size: 100% 100%; */
}
h3{
    /* color: #ffac02; */
    height: 30px;
    position: relative;
    left: 80px;
    /* top:13px; */
}
.li{
    height: 20px;
    width: 110%;
    position: relative;
    /* left: -35px; */
    /* background:url('../../assets/li.png'); */
    background-size: 100% 100%;
}
.el-input__inner{
    /* color: aliceblue; */
    /* background-color: transparent; */
}
.el-form-item__label{
    /* color:aliceblue; */
}
.dialog-footer{
     position: relative;
     left: 80px;
     /* top: 20px; */
}
.el-textarea__inner{
    /* color: aliceblue; */
    /* background-color: transparent; */
}
.upload{
    /* color:aliceblue; */
    /* background-color: #ffac02; */
}
.primary{
    color:aliceblue;
    /* background-color: #91601e; */
}
.el-button--primary{
    /* width: 200px; */
    /* background-color: #ffac02; */
}
.app-container{
    padding: 10px;
}
</style>