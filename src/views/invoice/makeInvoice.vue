<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-form ref="invoice" :model="invoice" style="width:400px" :rules="saveRules" label-width="80px" >
                    <div class="li">
                        <h3>开票信息</h3>
                    </div> 
                    <el-form-item label="发票类型" prop="itype">
                        <el-select v-model="invoice.itype" @change="change" placeholder="请选择发票类型">
                            <el-option label="普通发票" value="0"></el-option>
                            <el-option label="专用发票" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="普票名义" v-if="invoice.itype==0">
                       <el-switch
                        @change="change"
                        v-model="value1"
                        active-text="个人"
                        inactive-text="公司">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="姓名" prop="iname" v-if="value1&&invoice.itype==0">
                        <el-input v-model="invoice.iname" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="iidNumber" v-if="value1&&invoice.itype==0">
                        <el-input v-model="invoice.iidNumber" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="公司全称" prop="icompany" v-if="!value1||invoice.itype==1">
                        <el-input v-model="invoice.icompany" placeholder="请输入公司全称"></el-input>
                    </el-form-item>
                    <el-form-item label="信用代码" prop="icode" v-if="!value1||invoice.itype==1">
                        <el-input v-model="invoice.icode" placeholder="请输入统一信用代码"></el-input>
                    </el-form-item>
                    <el-form-item label="开票金额" prop="ipayment">
                        <el-input type="number" step="0.0000000001" v-model="invoice.ipayment" placeholder="请输入开票金额"></el-input>
                    </el-form-item>
                    <span style="font-size:10px;margin-left:290px">可开最高金额:{{maxPaymant}}</span>
                    <el-form-item label="开户行" prop="ibankOfDeposit" v-if="invoice.itype==1">
                        <el-input v-model="invoice.ibankOfDeposit" placeholder="请输入开户行"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="iaccount" v-if="invoice.itype==1">
                        <el-input v-model="invoice.iaccount" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="iaddress" v-if="invoice.itype==1">
                        <el-input v-model="invoice.iaddress" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="iphone" v-if="invoice.itype==1">
                        <el-input v-model="invoice.iphone" placeholder="请输入电话"></el-input>
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
                <span slot="footer" class="dialog-footer" style="margin-left:230px">
                    <el-button type="primary" style="width:150px;height:45px;margin-top:35px;" @click.native.prevent="submit" >提 交</el-button>
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
    return{
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
            maxPaymant:'',
            invoice:{
                
            },
            saveRules:{
                itype:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iname:[{ required: true, trigger: 'blur', validator: valiAccessory}],
                iidNumber:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                icompany:[{ required: true, trigger: 'blur', validator: valiAccessory}],
                icode:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                ibankOfDeposit:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iaccount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                iaddress:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                ipayment:[{ required: true, trigger: 'blur', validator: valiPanyment}],
                iphone:[{ required: true, trigger: 'blur', validator: valiPhone}],
                // accessory:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                from:[{ required: true, trigger: 'blur', validator: valiNotNull}],
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
            this.getList(cid)
        },
        getList(cid){
            invoice.getInvoice(cid)
            .then(res=>{
                this.list=res.data.list
                if(this.list.paidFirstAmount!=null){
                    this.maxPaymant=this.list.paidFirstAmount+this.list.paidLastAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                }else{
                    if(this.list.lastAmount==0){
                        this.maxPaymant=this.list.fullAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                    }else{
                        this.maxPaymant=this.list.firstAmount-(this.list.ipayment!=''?this.list.ipayment:0)
                    }
                }
                
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
           if(this.showUpload&&this.fileList2.length==0){
                this.$message({
                    type:'warning',
                    message:'请上传补充协议'
                })
                return false
            }
            return true
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
                    console.log(this.invoice)
                // this.formtoflow()
                    invoice.addInvoice(this.invoice)
                    .then(res=>{
                        this.$message({
                            type:'success',
                            message:'提交成功'
                        })
                            //调用父窗口方法
                        window.opener.logoClickBtn()
                    
                        this.isfileupdate=false
                    })          
                }     
            })
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
        msg(cid,isupdate,i){
            let messages=[]
            this.message={}
            this.message.category=1
            this.message.send=this.roles.uid
                if(isupdate==1){
                    if(this.schedu!=this.flow.schedules){
                        contract.getContract(cid)
                        .then(res=>{
                            if(i==6){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至顾问确认'
                            }else if(i==5){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至尾款确认'
                            }else if(i==4){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至申报材料提交'
                            }else if(i==3){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至清单提交'
                            }else if(i==2){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至流程分案'
                            }else if(i==1){
                                this.message.msg='您的流程'+res.data.contract.serialNum+'已被撤回至财务审核'
                            }
                            this.message.categoryId=this.flow.fid
                            this.message.category=1
                            this.message.uid=res.data.contract.uid;
                            message.addMessage(this.message)
                        })
                    }else{
                        contract.getContract(cid)
                        .then(res=>{
                            if(this.form3.a_desc!=this.form2.a_desc){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'财务审核阶段描述已被修改'
                            }else if(this.form3.agentId!=this.form2.agentId){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'流程分案阶段已被重新分案'
                            }else if(this.form3.i_desc!=this.form2.i_desc){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'清单上传阶段描述已被修改'
                            }else if(this.form3.d_desc!=this.form2.d_desc){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'申报材料上传阶段描述已被修改'
                            }else if(this.form3.l_desc!=this.form2.l_desc){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'尾款确认阶段描述已被修改'
                            }else if(this.form3.s_desc!=this.form2.s_desc){
                            this.message.msg='您的流程'+res.data.contract.serialNum+'顾问确认阶段描述已被修改'
                            }
                            this.message.categoryId=this.flow.fid
                            this.message.category=1
                            this.message.uid=res.data.contract.uid;
                            if(this.message.msg!=''){
                            message.addMessage(this.message)
                            }
                        })
                    }
                }else{
                    if(i.length==19){
                        this.message.msg='您的流程'+this.list.serialNum+'已被删除'
                        this.message.categoryId=i
                    }else {
                        this.message.categoryId=this.flow.fid
                    }
                    // if(i==2){//流程分案
                    //     this.message.msg='您的流程'+this.list.serialNum+'已通过财务审核'
                    //     this.message.uid=this.list.uid;
                    //     messages.push(this.message);
                    // }else if(i==3){//清单上传
                    //     this.message.msg='您的流程'+this.list.serialNum+'已通过流程分案'
                    //     this.message.uid=this.list.uid;
                    //     messages.push(this.message);
                    // }
                    if(i==4){//申报材料上传
                        if(this.materials=='撤回'){
                            this.message.msg='您的流程'+this.list.serialNum+'材料处理问题,流程撤销至补充'
                            this.message.uid=this.list.uid;
                            messages.push(this.message);
                        }else if(this.addOrSubtract==1){//驳回
                            this.message.msg='您的流程'+this.list.serialNum+'被驳回,流程退至申报材料上传，请及时修改'
                            this.message.uid=this.list.uid;
                            messages.push(this.message);
                        }else{
                            this.message.msg='您的流程'+this.list.serialNum+'已通过清单上传,等待您提交申报材料'
                            this.message.uid=this.list.uid;
                            messages.push(this.message);
                        }
                    }else if(i==5){//材料制作
                        if(this.flow.type==1){
                            if(this.addOrSubtract==1){//驳回
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.msg='流程'+this.list.serialNum+'被驳回,需要重新进行材料制作，请确认'
                                m.send=this.roles.uid
                                messages.push(m);
                            }else if(this.materials=='撤回'){
                                this.message.msg='流程'+this.list.serialNum+'材料存在问题,流程已撤回，请重新确认材料'
                                this.message.uid=this.list.agentId
                                messages.push(this.message);
                            }else{
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.send=this.roles.uid
                                m.msg='增加品牌流程'+this.list.serialNum+'已分案给您，需要进行材料制作，请确认'
                                messages.push(m);
                            }
                        }else{
                            if(this.materials=='撤回'){
                                this.message.msg='流程'+this.list.serialNum+'材料制作存在问题,流程撤销至材料制作'
                                this.message.uid=this.list.agentId;
                                messages.push(this.message);
                            }else if(this.addOrSubtract==1){//驳回
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.msg='流程'+this.list.serialNum+'被驳回,需要重新进行材料制作，请确认'
                                m.send=this.roles.uid
                                messages.push(m);
                            }else{
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.send=this.roles.uid
                                m.msg='流程'+this.list.serialNum+'已通过申报材料提供，需要进行材料制作，请确认'
                                messages.push(m);
                            }
                        }
                        
                    }else if(i==6){//盖章材料制作
                        if(this.materials=='撤回'){
                            this.message.msg='流程'+this.list.serialNum+'盖章材料存在问题,流程已撤回，请重新确认盖章材料'
                            this.message.uid=this.list.uid;
                            messages.push(this.message);
                        }else{
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.list.uid
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'已通过材料制作，需要提供盖章材料，请确认'
                            messages.push(m);
                        }
                    }else if(i==7){//盖章材料审核
                        if(this.list.type==1){
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.list.agentId
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'材料已制作完成，等待管理部门审核结果'
                            messages.push(m);
                        }else{
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.list.uid
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'盖章材料已提供，需要审核，请确认'
                            messages.push(m);
                        }
                        
                    }
                    else if(i==10){//顾问确认
                        this.message.msg='您的流程'+this.list.serialNum+'已通过流程确认，需要您确认'
                        this.message.uid=this.list.uid;
                        messages.push(this.message);
                    }
                    // else if(i==6){//商务局审核
                    //     if(this.list.uporadd==''||this.list.uporadd==null){
                    //        this.message.msg='您的流程'+this.list.serialNum+'已通过材料制作'
                    //        this.message.uid=this.list.uid;
                    //        messages.push(this.message);
                    //     }else if(this.list.uporadd==0){
                    //        this.message.msg='您的流程'+this.list.serialNum+'已完成对‘申报材料提供’的修改'
                    //        this.message.uid=this.list.uid;
                    //         messages.push(this.message);
                    //     }else if(this.list.uporadd==1){
                    //         this.message.msg='您的流程'+this.list.serialNum+'已完成对‘材料制作’的修改'
                    //         this.message.uid=this.list.uid;
                    //         messages.push(this.message);
                    //     }
                    // }
                    else if(i==12){//已交互
                        this.message.uid=this.list.uid;
                        if(this.list.lastAmount==0){
                            this.message.msg='您的流程'+this.list.serialNum+'已通过流程确认,进入已交互状态'
                        }else{
                            this.message.msg='您的流程'+this.list.serialNum+'已通过尾款确认,进入已交互状态'
                        }
                        messages.push(this.message)
                    }
                    // else if(i==9){//尾款审核
                    //     this.message.msg='您的流程'+this.list.serialNum+'已通过顾问确认'
                    //     this.message.uid=this.list.uid;
                    //     messages.push(this.message);
                    // }
                    
                    if(i==2){//流程分案
                        for(let i=0;i<this.flowmanager.length;i++){
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.flowmanager[i].uid
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'需要进行流程分案，请确认'
                            messages.push(m);
                        }
                    }else if(i==3){//清单上传
                        let m={}
                        m.category=1
                        m.categoryId=this.flow.fid
                        m.uid=this.list.agentId
                        m.send=this.roles.uid
                        m.msg='流程'+this.list.serialNum+'需要进行清单上传，请确认'
                        messages.push(m);
                    
                    }else if(i==9){//流程审核
                        for(let i=0;i<this.flowmanager.length;i++){
                            if(this.list.type!=1){
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.flowmanager[i].uid
                                m.send=this.roles.uid
                                m.msg='流程'+this.list.serialNum+'已通过商务局审核，需要流程确认，请确认'
                                messages.push(m);
                            }else{
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.flowmanager[i].uid
                                m.send=this.roles.uid
                                m.msg='增加品牌流程'+this.list.serialNum+'已通过材料审核，需要流程确认，请确认'
                                messages.push(m);
                            }
                            
                        }
                    }else if(i==8){//商务局审核
                        if(this.list.uporadd==''||this.list.uporadd==null){
                            if(this.list.type!=1){
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.send=this.roles.uid
                                m.msg='流程'+this.list.serialNum+'已通过盖章材料审核，需要商务局审核，请确认'
                                messages.push(m)
                            }else{
                                let m={}
                                m.category=1
                                m.categoryId=this.flow.fid
                                m.uid=this.list.agentId
                                m.send=this.roles.uid
                                m.msg='流程'+this.list.serialNum+'已通过管理部门审核，等待资料审核中'
                                messages.push(m)
                            }
                        }else if(this.list.uporadd==0){
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.list.agentId
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'申报材料提供已修改（补充），请确认'
                            messages.push(m);
                        }else if(this.list.uporadd==1){
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.list.agentId
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'已完成‘材料制作’的修改，请确认'
                            messages.push(m);
                        }
                    }else if(i==11){//尾款审核
                        for(let i=0;i<this.finance.length;i++){
                            let m={}
                            m.category=1
                            m.categoryId=this.flow.fid
                            m.uid=this.finance[i].uid
                            m.send=this.roles.uid
                            m.msg='流程'+this.list.serialNum+'已通过顾问确认，需要尾款审核，请确认'
                            messages.push(m);
                        }
                    }
                    return messages
                }
        },
        handlePreview(file) {
            console.log(file);
        },
        fileUploadError(){
        },
    }

}
</script>
<style>
.el-form-item{
    margin: 0px;
    margin-top:20px;
}
.box{
    width: 550px;
    /* height: 400px; */
    padding: 20px;
    padding-left: 60px;
    background-color: #fff;
    border: 1px solid #DDDCDC;
    box-shadow: 0px 5px 10px #AFAEAE;
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