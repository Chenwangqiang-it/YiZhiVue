<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-steps :active="1" finish-status="success" align-center>
                    <el-step title="开票信息填写"></el-step>
                    <el-step title="开票审核"></el-step>
                    <el-step title="完成开票"></el-step>
                </el-steps>
                <div style="text-align:center">
                    <el-divider></el-divider>
                    <div class="mail-li"  style="display: inline-block;">
                        <h4  style="text-align:left;margin-left:40px;margin-top:10px;margin-left:10px;margin-bottom:10px">
                           <span >开票审核</span>
                            <span style="font-size:10px;float:right;text-align:right;">{{invoice.uname}}:顾问<div></div>{{invoice.accountName}}:开票名义</span>
                        </h4>
                        <el-form ref="invoice" :model="invoice" style="text-align:left"  :inline="true" :rules="saveRules" label-width="80px" >
                            <el-form-item label="发票类型" prop="itype">
                                <el-select style="width:120px" disabled v-model="invoice.itype" @change="change" placeholder="请选择发票类型">
                                    <el-option label="普通发票" value="0"></el-option>
                                    <el-option label="专用发票" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="普票名义" v-if="invoice.itype==0">
                            <el-switch
                            disabled
                                @change="change"
                                v-model="value1"
                                active-text="个人"
                                inactive-text="公司">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="姓名" prop="iname" v-if="value1&&invoice.itype==0">
                                <el-input style="width:120px" disabled v-model="invoice.iname" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="iidNumber" v-if="value1&&invoice.itype==0">
                                <el-input disabled v-model="invoice.iidNumber" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item label="公司全称" prop="icompany" v-if="!value1||invoice.itype==1">
                                <el-input style="width:230px" disabled v-model="invoice.icompany" placeholder="请输入公司全称"></el-input>
                            </el-form-item>
                            <el-form-item label="信用代码" prop="icode" v-if="!value1||invoice.itype==1">
                                <el-input style="width:120px" disabled v-model="invoice.icode" placeholder="统一信用代码"></el-input>
                            </el-form-item>
                            <el-form-item label="开票金额" prop="ipayment">
                                <el-input style="width:100px" disabled type="number" step="0.0000000001" v-model="invoice.ipayment" placeholder="请输入开票金额"></el-input>
                            </el-form-item>
                            <el-form-item label="开户行" prop="ibankOfDeposit" v-if="invoice.itype==1">
                                <el-input disabled v-model="invoice.ibankOfDeposit" placeholder="请输入开户行"></el-input>
                            </el-form-item>
                            <el-form-item label="账号" prop="iaccount" v-if="invoice.itype==1">
                                <el-input style="width:110px" disabled v-model="invoice.iaccount" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item  label="地址" prop="iaddress" v-if="invoice.itype==1">
                                <el-input style="width:220px" disabled v-model="invoice.iaddress" placeholder="请输入地址"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="iphone" v-if="invoice.itype==1">
                                <el-input style="width:120px" disabled v-model="invoice.iphone" placeholder="请输入电话"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" prop="brandOrRecords">
                                <el-radio-group disabled v-model="invoice.brandOrRecords">
                                    <el-radio label="0" >商标</el-radio>
                                    <el-radio label="1" >备案</el-radio>
                                </el-radio-group>
                                <!-- <el-radio v-model="invoice.brandOrRecords" label="0"></el-radio> -->
                                <!-- <el-radio v-model="invoice.brandOrRecords" label="1">备案</el-radio> -->
                            </el-form-item>
                            <el-form-item label="业务明细" prop="detail">
                                <el-input disabled type="textarea" v-model="invoice.detail"></el-input>
                            </el-form-item>
                            <el-form-item label="补充协议" prop="accessory" v-if="showUpload">
                                <div style="float:left;margin-left:20px">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            资料列表<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(filelist) in fileList2" :key="filelist.value">
                                                <el-link @click="dowload(filelist.url)" type="primary">{{filelist.name}}</el-link>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </el-form-item>
                            <el-divider></el-divider>
                            <div style="font-size:10px" v-if="invoice.itype==0">信用代码|身份证号:{{invoice.icode+" "+invoice.iidNumber}}</div>
                             <div style="font-size:10px" v-if="invoice.itype==1">开户行&账号:{{invoice.ibankOfDeposit+" "+invoice.iaccount}}</div>
                             <div style="font-size:10px" v-if="invoice.itype==1">地址&电话:{{invoice.iaddress+" "+invoice.iphone}}</div>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer" style="width:1450px;text-align:center;">
                    <el-button type="danger" @click.native.prevent="successOrFailure(false)">退回修改</el-button>
                    <el-button type="primary" @click.native.prevent="successOrFailure(true)">完成开票</el-button>
                </div>
            </div>
         </template>
    </div>
</template>
<script>
import invoice from '@/api/edu/invoice'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { countInvoice } from '../layout/components/count'
export default {//定义变量和初始值
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    data(){
    return{
            addOrUpdate:true,
            showUpload:false,
            flowmanager:{},
            finance:{},
            company:{},
            no:false,
            addOrSubtract:0,
            fileAmount:20,
            update:0,
            history:{},
            isfileupdate:false,
            isnoable:true,
            agent:[],
            record:{},
            list:{},//查询之后接口返回集合
            page:1,//当前页
            limit:3,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            flowQuery:{},//条件封装
            dialogVisible: false,
            updateVisible:false,
            BASE_API:process.env.BASE_API,//端口号
            importBtnDisabled:false,
            fileList: [],
            value1:false,
            mesg:[],
            message:{},
            schedu:'',
            agentId2:'',
            maxPaymant:0,
            invoice:{
                
            },
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      this.init()  
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
    methods:{
        dowload(url){
            window.location.href=url
        },
        init(){
            invoice.getInvoiceById(this.$route.params.id)
            .then(res=>{
                this.$set(this,"invoice",res.data.invoice);
                this.fileList2=JSON.parse(this.invoice.accessory)
                if(this.fileList2.length!=0){
                    this.showUpload=true
                }
                if(this.invoice.iidNumber){
                    this.value1=true
                }else{
                    this.value1=false
                }
                this.$set(this.invoice,"brandOrRecords",res.data.invoice.brandOrRecords+"");
                this.$set(this.invoice,"itype",res.data.invoice.itype+"");
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
        successOrFailure(d){
            if(d){
                this.invoice.istate=true
                this.invoice.idate=this.getDAteTime()
            }else{
                this.invoice.withdraw=true
            }
            this.updateInvoice()
        },
        updateInvoice(){
            if(this.fileList2.length!=0){
                this.invoice.accessory=JSON.stringify(this.fileList2)
            }else {
                this.invoice.accessory='[]'
            }
            invoice.updateInvoice(this.invoice)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'提交成功'
                })
                //调用父窗口方法
                this.to()
                this.isfileupdate=false
            }) 
        },
        to(){
            let that=this
            countInvoice(this.roles)
            setTimeout(function(){
                that.$router.push({
                    path: '/history/invoice'
                })
            },100)
        },
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