<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-steps :active="0" finish-status="success" align-center>
                    <el-step title="开票信息填写"></el-step>
                    <el-step title="开票审核"></el-step>
                    <el-step title="完成开票"></el-step>
                </el-steps>
                <div style="text-align:center">
                    <el-divider></el-divider>
                    <div class="mail-li"  style="display: inline-block;">
                        <h4  style="text-align:left;margin-left:40px;margin-top:10px;margin-left:10px;margin-bottom:10px">
                           <span v-if="addOrUpdate">开票信息</span>
                            <span v-else>发票修改</span>
                            <span v-if="addOrUpdate" style="font-size:10px;float:right">可开最高金额:{{maxPaymant}}</span>
                            <span v-else style="font-size:10px;float:right">可开最高金额:{{maxPaymant}}</span>
                        </h4>
                        <el-form ref="invoice" :model="invoice" style="text-align:left"  :inline="true" :rules="saveRules" label-width="80px" >
                            <el-form-item label="发票类型" prop="itype">
                                <el-select style="width:120px" v-model="invoice.itype" @change="change" placeholder="请选择发票类型">
                                    <el-option label="普通发票" value="0"></el-option>
                                    <el-option label="专用发票" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <div></div> -->
                            <el-form-item label="普票名义" v-if="invoice.itype==0">
                            <el-switch
                                @change="change"
                                v-model="value1"
                                active-text="个人"
                                inactive-text="公司">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="姓名" prop="iname" v-if="value1&&invoice.itype==0">
                                <el-input  style="width:120px" v-model="invoice.iname" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="iidNumber" v-if="value1&&invoice.itype==0">
                                <el-input v-model="invoice.iidNumber" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item label="公司全称" prop="icompany" v-if="!value1||invoice.itype==1">
                                <el-input  style="width:230px" v-model="invoice.icompany" placeholder="请输入公司全称"></el-input>
                            </el-form-item>
                            <el-form-item label="信用代码" prop="icode" v-if="!value1||invoice.itype==1">
                                <el-input  style="width:120px" v-model="invoice.icode" placeholder="统一信用代码"></el-input>
                            </el-form-item>
                            <el-form-item label="开票金额" prop="ipayment">
                                <el-input  style="width:100px" type="number" step="0.0000000001" v-model="invoice.ipayment" placeholder="请输入开票金额"></el-input>
                            </el-form-item>
                            <!-- <div></div> -->
                            <el-form-item label="开户行" prop="ibankOfDeposit" v-if="invoice.itype==1">
                                <el-input v-model="invoice.ibankOfDeposit" placeholder="请输入开户行"></el-input>
                            </el-form-item>
                            <el-form-item label="账号" prop="iaccount" v-if="invoice.itype==1">
                                <el-input style="width:110px" v-model="invoice.iaccount" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop="iaddress" v-if="invoice.itype==1">
                                <el-input style="width:220px" v-model="invoice.iaddress" placeholder="请输入地址"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="iphone" v-if="invoice.itype==1">
                                <el-input style="width:120px" v-model="invoice.iphone" placeholder="请输入电话"></el-input>
                            </el-form-item>
                            <el-form-item label="类型" prop="brandOrRecords">
                                <el-radio-group v-model="invoice.brandOrRecords">
                                    <el-radio label="0" >商标</el-radio>
                                    <el-radio label="1" >备案</el-radio>
                                </el-radio-group>
                                <!-- <el-radio v-model="invoice.brandOrRecords" label="0"></el-radio> -->
                                <!-- <el-radio v-model="invoice.brandOrRecords" label="1">备案</el-radio> -->
                            </el-form-item>
                            <el-form-item label="业务明细" v-if="isVis" prop="detail">
                                <el-input type="textarea" v-model="invoice.detail"></el-input>
                            </el-form-item>
                            <el-form-item label="业务明细" v-else >
                                <el-input type="textarea" v-model="invoice.detail"></el-input>
                            </el-form-item>
                            <el-form-item label="补充协议" prop="accessory" v-if="showUpload">
                                <el-upload
                                    class="upload-demo"
                                    :action="BASE_API+'/eduservice/state/upcontract'"
                                    list-type="text"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :on-success="fileUploadSuccess"
                                    :on-error="fileUploadError"
                                    :disabled="importBtnDisabled"
                                    multiple
                                    :limit="fileAmount"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList2">
                                <el-button size="small" type="primary" >点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                
                <span slot="footer" class="dialog-footer" style="margin-left:170px">
                    <el-button type="primary" style="width:150px;height:45px;margin-top:0px;" @click.native.prevent="subOrUpdate()" >提 交</el-button>
                </span>
            </div>
         </template>
    </div>
</template>
<script>
import flow from '@/api/edu/flow'
import company from '@/api/edu/company'
import user from '@/api/edu/user'
import invoice from '@/api/edu/invoice'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import record from '@/api/edu/record'
import history from '@/api/edu/history'
import contract from '@/api/edu/contract'
import message from '@/api/edu/message'
import { countInvoice } from '../layout/components/count'
export default {//定义变量和初始值
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    data(){
      const valiNotNull = (rule, value, callback) => {
            if (value==''||value==null) {
               callback(new Error("该字段不能为空"))
            } else {
                callback()
            }
      }
      const valiPhone = (rule, value, callback) => {
            if (value==''||value==null||value.length!=11) {
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
      }
      const valiPanyment = (rule, value, callback) => {
            if (value==''||value==null) {
               callback(new Error("该字段不能为空"))
            } else {
                if(value>this.maxPaymant){
                    callback(new Error("最高金额不可大于"+this.maxPaymant))
                }
                callback()
            }
      }
      const valiAccessory = (rule, value, callback) => {
            if (value==''||value==null) {
               callback(new Error("该字段不能为空"))
            } else {
                this.showAccessory()
                callback()
            }
      }
      const valiDetail = (rule, value, callback) => {
            if (value==''||value==null||value==undefined) {
               callback(new Error("该字段不能为空"))
            } else {
                
                if(value=="1"){
                    this.isVis=false
                }else{
                    this.isVis=true
                }
                callback()
            }
      }
      const valiIcode = (rule, value, callback) => {
            if (value==''||value==null||value==undefined) {
               callback(new Error("该字段不能为空"))
            } else {
                this.invoice.icode = value.toUpperCase()
                callback()
            }
      }
    return{
            isVis:false,
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
            saveRules:{
                itype:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iname:[{ required: true, trigger: 'blur', validator: valiAccessory}],
                iidNumber:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                icompany:[{ required: true, trigger: 'blur', validator: valiAccessory}],
                icode:[{ required: true, trigger: 'blur', validator: valiIcode}],
                ibankOfDeposit:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iaccount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iaddress:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                ipayment:[{ required: true, trigger: 'blur', validator: valiPanyment}],
                iphone:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                // accessory:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                from:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                detail:[{ required: true, blur: 'blur', validator: valiNotNull}],
                brandOrRecords:[{ required: true, blur: 'change', validator: valiDetail}],
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
        change(){
            this.$set(this.invoice,"iphone",'');
            this.$set(this.invoice,"iaddress",'');
            this.$set(this.invoice,"iaccount",'');
            this.$set(this.invoice,"ibankOfDeposit",'');
            this.$set(this.invoice,"icompany",'');
            this.$set(this.invoice,"icode",'');
            this.$set(this.invoice,"iidNumber",'');
            this.$set(this.invoice,"iname",'');
        },
        showAccessory(){
            if(!this.value1){
                if(this.list.companyName!=this.invoice.icompany){
                    this.showUpload=true
                }else{
                    this.showUpload=false
                }
            }else{
                if(this.list.paymentLastAmount!=this.invoice.iname||this.list.paymentFirstAmount!=this.invoice.iname){
                    this.showUpload=true
                }else{
                    this.showUpload=false
                }
            }
            
        },
        browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(url));
            window.open('http://ow365.cn/?i=22376&ssl=1&furl='+encodeURIComponent(url));
        },
        init(){
            let cid=this.$route.query.cid
            this.fileList2=[]
            this.$set(this.invoice,"itype",'1');
            if(this.$route.params.id){
                this.addOrUpdate=false
                invoice.getInvoiceById(this.$route.params.id)
                .then(res=>{
                    // console.log(res.data.invoice)
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
                    this.maxPaymant=this.invoice.ipayment
                    this.$set(this.invoice,"brandOrRecords", res.data.invoice.brandOrRecords+"");
                    this.$set(this.invoice,"ipayment", res.data.invoice.ipayment);
                    this.$set(this.invoice,"itype",res.data.invoice.itype+"");
                })
            }else{
                this.getList(cid)
                this.getContract()
            }
        },
        getContract(){
            contract.getContractByCid(this.$route.query.cid)
            .then(res=>{
                this.$set(this.invoice,"icompany",res.data.contract.companyName);
            })
        },
        getList(cid){
            invoice.getInvoice(cid)
            .then(res=>{
                this.list=res.data.list
                if((this.list.firstAmount!=null&&this.list.firstAmount!=0)&&(this.list.schedules>8&&this.list.schedules<13)){
                    this.maxPaymant=this.list.firstAmount+this.list.interimAmount+this.list.lastAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                }else if((this.list.firstAmount!=null&&this.list.firstAmount!=0)&&this.list.schedules<=8){
                    this.maxPaymant=this.list.firstAmount+this.list.interimAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                }else{
                    this.maxPaymant=this.list.fullAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                }
                if(this.invoice.ipayment){
                    this.maxPaymant+=this.invoice.ipayment
                }
                this.$set(this.invoice,"ipayment",this.maxPaymant)
                // this.getHistorys(fid)
                this.isfileupdate=false
            })
        },
        getFlow(){
            user.getFlow()
            .then(res=>{
                this.flowmanager=res.data.flow
            })
        },
        getFinance(){
            user.getFinance()
            .then(res=>{
                this.finance=res.data.finance
            })
        },
        filesw(){
            if(this.list.schedules==9||this.list.schedules==10){
           for(let i=0;i<this.fileList.length;i++){
                    if(this.fileList[i].name.indexOf("商务部")>=0){
                        this.fileList4.push(this.fileList[i])
                    }
                }
            }
        },
        SpecialVerify(){
        //    if(this.showUpload&&this.fileList2.length==0){
        //         this.$message({
        //             type:'warning',
        //             message:'请上传补充协议'
        //         })
        //         return false
        //     }
            return true
        },
        subOrUpdate(){
            if(this.addOrUpdate){
                this.submit()
            }else{
                this.updateInvoice()
            }
        },
        updateInvoice(){
            this.$refs.invoice.validate(valid => {
                if (valid&&this.SpecialVerify()) {
                    this.invoice.withdraw=false//取消回撤字段
                    if(this.fileList2.length!=0){
                        this.invoice.accessory=JSON.stringify(this.fileList2)
                    }else {
                        this.invoice.accessory='[]'
                    }
                    invoice.updateInvoice(this.invoice)
                    .then(res=>{
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        })
                        this.to()
                    }) 
                }
            })
        },
        submit(){
            this.$refs.invoice.validate(valid => {
                if (valid&&this.SpecialVerify()) {
                    this.invoice.cid=this.$route.query.cid
                    this.invoice.uid=this.roles.uid
                    if(this.fileList2.length!=0){
                        this.invoice.accessory=JSON.stringify(this.fileList2)
                    }else {
                        this.invoice.accessory='[]'
                    }
                // this.formtoflow()
                    invoice.addInvoice(this.invoice)
                    .then(res=>{
                        this.$message({
                            type:'success',
                            message:'提交成功'
                        })
                            //调用父窗口方法
                        this.to()
                        this.isfileupdate=false
                    })          
                }     
            })
        },
        to(){
            let that=this
            countInvoice(this.roles)
            setTimeout(function(){
                that.$router.push({
                    path: '/invoice/registered'
                })
            },100)
        },
        fileUploadSuccess(response, file, fileList){
            this.fileList2.push({
                name:file.name,
                url:response.data.url
            })
            this.isfileupdate=true
        },
        handleRemove(file,fileList) {
            this.fileList2=fileList
            this.isfileupdate=true
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList2.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handlePreview(file) {
            console.log(file);
        },
        fileUploadError(){
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