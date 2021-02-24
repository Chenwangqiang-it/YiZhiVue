<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="邮寄信息填写"></el-step>
                    <el-step title="快递信息填写"></el-step>
                    <el-step title="收件确认"></el-step>
                    <el-step title="完成处理"></el-step>
                </el-steps>
                <div style="text-align:center">
                    <el-divider></el-divider>
                    <div class="mail-li" v-if="active<3" style="display: inline-block;">
                        <h4 v-if="active<3" style="text-align:left;margin-left:40px;margin-top:10px;margin-left:10px;margin-bottom:10px">
                           顾问: {{mail.uname}}
                        </h4>
                        <el-form ref="mail" :model="mail" style="width:1200px;text-align:left;"  :inline="true" :rules="saveRules" label-width="95px"  v-if="active<3">
                            <el-form-item label="客户名称" prop="mailName">
                                <el-input :disabled="active>=1" v-model="mail.mailName" placeholder="请输入名称"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人" prop="recipients">
                                <el-input :disabled="active>=1" v-model="mail.recipients" placeholder="请输入收件人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人电话" prop="mailPhone" >
                                <el-input :disabled="active>=1" v-model="mail.mailPhone" placeholder="请输入收件人电话"></el-input>
                            </el-form-item>
                            <el-form-item label="收件地址" prop="mailAddress">
                                <el-input :disabled="active>=1" v-model="mail.mailAddress" placeholder="请输入收件地址"></el-input>
                            </el-form-item>
                            <el-form-item style="text-align:left" v-if="active==0" label="邮寄内容" prop="mailBody">
                                <el-checkbox-group v-model="mail.mailBody">
                                    <el-checkbox
                                    :disabled="active>=1"
                                    size="mini"
                                    v-for="item in mailOptions"
                                    :key="item.id"
                                    :label="item.id" 
                                    :name="item.id">
                                    {{item.options}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item v-else-if="active>=1" label="邮寄内容">
                                <!-- {{mail.mailBody}} -->
                                <el-tag v-if="mail.mailBody.indexOf(1)>=0" type="success">合同</el-tag>
                                <el-tag v-if="mail.mailBody.indexOf(2)>=0" type="info">发票</el-tag>
                                <el-tag v-if="mail.mailBody.indexOf(3)>=0" type="warning">商标证书</el-tag>
                                <el-tag v-if="mail.mailBody.indexOf(4)>=0" type="danger">版权证书</el-tag>
                                <el-tag v-if="mail.mailBody.indexOf(5)>=0" type="danger">其他</el-tag>
                            </el-form-item>
                            <el-form-item v-if="mail.mailBody.indexOf(5)>=0" label="详细" prop="describes" >
                                <el-input :disabled="active>=1"   v-model="mail.describes" placeholder="详细"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input :disabled="active>=1" type="textarea"  v-model="mail.remark" placeholder="备注"></el-input>
                            </el-form-item>
                            <el-divider></el-divider>
                            <div style="margin-top:5px;font-size:10px" v-if="active>=1">收件人&电话&地址：{{mail.recipients+" "+mail.mailPhone+" "+mail.mailAddress}}</div>
                            <el-form-item label="公司名称" prop="express" v-if="active>=1">
                                <el-input  style="width:110px" :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)||active>=2" v-model="mail.express" placeholder="快递公司"></el-input>
                            </el-form-item>
                            <el-form-item label="快递单号" prop="number" v-if="active>=1">
                                <el-input :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)||active>=2" v-model="mail.number" placeholder="请输入快递单号"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" v-if="active>=1">
                                <el-input :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)||active>=2" type="textarea"  v-model="mail.remarkExpress" placeholder="备注"></el-input>
                            </el-form-item>
                            <el-divider v-if="active>=2"></el-divider>
                            <el-form-item label="备注" v-if="active>=2">
                                <el-input :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)||active>=3" type="textarea"  v-model="mail.remarkConsignee" placeholder="备注"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- <el-form ref="mail" :model="mail" style="width:400px" :rules="saveRules" label-width="95px"  v-if="active<2">
                    <el-form-item :disabled="active==1" label="顾问">
                        {{mail.uname}}
                    </el-form-item>
                    <el-form-item label="公司名称" prop="mailName">
                        <el-input :disabled="active==1" v-model="mail.mailName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item v-if="active==1" label="邮寄内容">
                        <el-tag v-if="mail.mailBody.indexOf(1)>=0" type="success">合同</el-tag>
                        <el-tag v-if="mail.mailBody.indexOf(2)>=0" type="info">发票</el-tag>
                        <el-tag v-if="mail.mailBody.indexOf(3)>=0" type="warning">商标证书</el-tag>
                        <el-tag v-if="mail.mailBody.indexOf(4)>=0" type="danger">版权证书</el-tag>
                        <el-tag v-if="mail.mailBody.indexOf(5)>=0" type="danger">其他</el-tag>
                    </el-form-item>
                    <el-form-item v-if="active==0" label="邮寄内容">
                        <el-checkbox-group v-model="mail.mailBody">
                            <el-checkbox
                            size="mini"
                            v-for="item in mailOptions"
                            :key="item.id"
                            :label="item.id" 
                            :name="item.id">
                            {{item.options}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="收件人" prop="recipients">
                        <el-input :disabled="active==1" v-model="mail.recipients" placeholder="请输入收件人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人电话" prop="mailPhone" >
                        <el-input :disabled="active==1" v-model="mail.mailPhone" placeholder="请输入收件人电话"></el-input>
                    </el-form-item>
                    <el-form-item label="收件地址" prop="mailAddress">
                        <el-input :disabled="active==1" v-model="mail.mailAddress" placeholder="请输入收件地址"></el-input>
                    </el-form-item>
                    <div style="margin-top:5px;margin-left:100px;font-size:10px" v-if="active==1">收件人&电话&地址：{{mail.recipients+" "+mail.mailPhone+" "+mail.mailAddress}}</div>
                    <el-form-item label="详细" v-if="mail.mailBody.indexOf(5)>=0" prop="describe" >
                        <el-input :disabled="active==1"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="mail.describes" placeholder="描述"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input :disabled="active==1" type="textarea"  v-model="mail.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="express" v-if="active==1">
                        <el-input :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)" v-model="mail.express" placeholder="快递公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号" prop="number" v-if="active==1">
                        <el-input :disabled="!(roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==0)" v-model="mail.number" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                </el-form> -->
                <div style="width:300px;margin:0px auto;height:70px;margin-top:12px;text-align:center">
                    <el-button v-if="active==1&&(roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6)" style="margin-top: 12px;float:left" type="warning" @click="last">退回上一步</el-button>
                    <el-button v-if="active==2&&(roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6)" style="margin:0px auto;margin-top: 12px;" type="primary" @click="addressee">下一步</el-button>
                    <el-button v-if="active==0&&(roles.jurisdiction==3||roles.jurisdiction==0)" style="margin-top: 12px" type="primary" @click="next">下一步</el-button>
                    <el-button v-if="active==1&&(roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6)" style="margin-top: 12px;float:right" type="primary" @click="next">下一步</el-button>
                </div>
                <div v-if="active==3" style="color:#67C23A;text-align: center;"><i class="el-icon-circle-check"></i>已完成处理</div>
                <div style="text-align:center" v-if="active==1&&roles.jurisdiction==3">等待财务审核中！</div>
                <div style="text-align:center" v-if="active==0&&(roles.jurisdiction==5||roles.jurisdiction==6)">等待顾问修改中!</div>
                <div style="text-align: center;margin-top:20px">
                    <!-- <el-button v-if="active==2||(active==1&&roles.jurisdiction==3)||(active==0&&(roles.jurisdiction==5||roles.jurisdiction==6))" @click="closeWindows">关闭退出</el-button> -->
                </div>
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
            active: 0,
            mail:{},
            mailOptions:[],
            saveRules:{
                express:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                number:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                // describe:[{ required: true, trigger: 'blur', validator: valiNotNull}],
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
            if(this.$route.params.id){
                this.getMailById(this.$route.params.id)
            }else{
                this.getContract()
            }
        },
        getContract(){
            contract.getContractByCid(this.$route.query.cid)
            .then(res=>{
                this.$set(this.mail,"mailName",res.data.contract.companyName);
                this.$set(this.mail,"mailPhone",res.data.contract.phone);
                this.$set(this.mail,"recipients",res.data.contract.respName);
            })
        },
        getMailById(id){
            mail.getMailById(id)
            .then(res=>{
                this.mail=res.data.mail
                this.$set(this.mail,"mailBody",JSON.parse(this.mail.mailBody))
                this.active=res.data.mail.state
            })
        },
        last(){
            this.mail.state=this.active-1
            if(this.mail.mailBody[0]){
                this.mail.mailBody=JSON.stringify(this.mail.mailBody)
            }
            mail.updateMail(this.roles.uid,this.mail)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.active--
                this.to()
                // window.opener.logoClickBtn()
            })
            .catch(error=>{
                this.active++
                this.$message({
                    type: 'error',
                    message: '提交失败'
                });
            })
        },
        next() {
            this.$refs.mail.validate(valid => {
                if(valid){
                    this.addOrUpdate()
                }
            })
        },
        closeWindows(){
            window.close()
        },
        addMail(){
            this.mail.state=this.active+1
            this.mail.cid=this.$route.query.cid
            mail.saveMail(this.mail)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.active++
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
            countMail(this.roles)
            if(this.roles.jurisdiction!=0){
                setTimeout(function(){
                    that.$router.push({
                        path: '/mail/table'
                    })
                },1000)
            }
        },
        updateMail(){
            this.mail.state=this.active+1
            this.mail.mdate=this.getDAteTime()
            if(this.mail.mailBody[0]){
                this.mail.mailBody=JSON.stringify(this.mail.mailBody)
            }
            mail.updateMail(this.roles.uid,this.mail)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.to()
                this.active++
                // window.opener.logoClickBtn()
            })
            .catch(error=>{
                this.active--
                this.$message({
                    type: 'error',
                    message: '提交失败'
                });
            })
        },
        addressee(){
            this.mail.state=this.active+1
            this.mail.remarkConsigneeDate=this.getDAteTime()
            if(this.mail.mailBody[0]){
                this.mail.mailBody=JSON.stringify(this.mail.mailBody)
            }
            mail.updateMail(this.roles.uid,this.mail)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.to()
                this.active++
                // window.opener.logoClickBtn()
            })
            .catch(error=>{
                this.active--
                this.$message({
                    type: 'error',
                    message: '提交失败'
                });
            })
        },
        getDAteTime(){
            let DateTime=""
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            DateTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            return DateTime
        },
        addOrUpdate(){
            if(this.$route.params.id){
                this.updateMail()
            }else{
                this.addMail()
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