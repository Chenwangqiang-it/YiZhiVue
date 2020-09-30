<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-form ref="form" :model="form" style="width:350px" :rules="saveRules2" label-width="80px" v-if="permission">
                    <div class="li">
                        <h3 v-if="list.schedules<41">发起撤案</h3>
                        <h3 v-if="list.schedules==41">撤案资料审核</h3>
                        <h3 v-if="list.schedules==42">管理审核</h3>
                        <h3 v-if="list.schedules==43">流程审核</h3>
                        <h3 v-if="list.schedules==44">财务退款</h3>
                    </div>
                    <el-form-item style="margin:0px;margin-top:30px;width:400px" label="材料审核" prop="materials" v-if="list.schedules>40">
                        <el-radio-group fill="#E6A23C" v-model="materials">
                            <el-radio-button  label="通过"></el-radio-button>
                            <el-radio-button  label="撤回"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin-bottom:0px;margin-top:10px;width:400px" label="撤回选择" v-if="this.materials=='撤回'&&this.list.schedules>41">
                        <el-select v-model="handlerValue"  placeholder="请选择撤回的流程">
                                <el-option
                                v-for="item in handler"
                                :key="item.name"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="退款日期" style="margin-bottom:0px;margin-top:10px" v-if="this.materials=='通过'&&this.list.schedules==44">
                        <el-date-picker
                        style="width:185px"
                        v-model="form.reDate"
                        type="date"
                        placeholder="选择退款日期"
                        value-format="yyyy-MM-dd"
                        name="reDate"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin:0;margin-top:10px;width:280px" label="浏览" v-if="list.schedules>40">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="click"
                            >
                            <el-table :data="fileList">
                                <el-table-column width="200"  label="点击选择文件浏览">
                                    <template slot-scope="scop">
                                    <span style="cursor:pointer" @click="browse(scop.row.url[0])" >{{scop.row.name}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="success" size="mini"  >附件浏览</el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="退款情况" v-if="list.schedules<41">
                        <el-switch
                        style="margin-bottom:3px"
                        v-model="value1"
                        active-text="退款"
                        inactive-text="不退款">
                        </el-switch>
                    </el-form-item>
                    <el-form-item  style="margin:0px;margin-top:15px;width:400px" label="打款单位"   v-if="value1&&this.list.schedules<41">
                        <el-select v-model="form.reCompany"  name="reCompany" placeholder="请输入打款单位">
                                <el-option
                                v-for="item in company"
                                :key="item.value"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收款单位"  style="margin-top:15px" v-if="value1&&this.list.schedules<41">
                        <el-input v-model="form.reReceive" placeholder="请输入收款单位" name="reReceive"></el-input>
                    </el-form-item>
                    <el-form-item label="退款金额" style="margin-bottom:0px;margin-top:15px;" v-if="value1&&this.list.schedules<41">
                        <el-input v-model="form.reAmount" placeholder="请输入退款金额" name="reAmount"></el-input>
                    </el-form-item>
                     <span style="font-size:10px;margin-left:240px" v-if="value1&&this.list.schedules<41">金额不能大于{{list.paidFirstAmount+list.paidLastAmount}}</span>
                    <el-form-item  label="资料上传" style="width:300px;margin:0;margin-top:20px" v-if="list.schedules<41">
                        <el-upload
                        class="upload-demo"
                        :action="BASE_API+'/eduservice/state/upcontract'"
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
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.a_desc"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button style="width:150px;height:40px" @click="submit()" type="primary">提交</el-button>
                    </el-form-item>
                </el-form>
                <h2 v-if="list.schedules==45">流程撤案已完成</h2>
            </div>
         </template>
    </div>
</template>
<script>
import flow from '@/api/edu/flow'
import company from '@/api/edu/company'
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
        'roles',
        ])
    },
    data(){
      const valiNotNull = (rule, value, callback) => {
            if (value=='') {
               callback()
            } else {
                callback()
            }
      }
      const valiNotNull2 = (rule, value, callback) => {
            if (value==''||value==null) {
               callback(new Error("该字段不能为空"))
            } else {
                callback()
            }
      }
    return{
            handlerValue:'',
            handler:[], 
            value1:true,
            materials:'通过',
            flowmanager:{},
            finance:{},
            company:{},
            no:false,
            status:'',
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
            fileList2:[],
            fileList3:[],
            fileList4:[],
            form3:{},
            form: {
              account:false,
              a_desc:'',
              a_username:'',
              a_date:'',
              division:false,
              agentId: '',
              di_username:'',
              di_date:'',
              inven:false,
              i_desc:'',
              i_username:'',
              i_date:'',
              declara:false,
              d_desc:'',
              d_username:'',
              d_date:'',
              lastAmount:0,
              lastamount:false,
              l_desc:'',
              l_username:'',
              l_date:'',
              signature:false,
              s_desc:'',
              s_username:'',
              s_date:'',
              audit:-1,
              permission:false,
              bulletinTime:'',
              b_desc:'',
              b_username:'',
              b_date:'',
              ia_desc:'',
              ia_username:'',
              ia_date:'',
              uporadd:'',
              sumPaidLastAmount:'',
              sumPaidFirstAmount:0,
              paidFirstAmount:'',
              paidFirstAmountDate:'',
              paymentFirstAmount:'',
              gatheringFirstAmount:'',
              paidLastAmount:'',
              paidLastAmountDate:'',
              paymentLastAmount:'',
              gatheringLastAmount:'',
              reCompany:'',
              reReceive:'',
              reAmount:'',
              reDate:'',
              end:false
            },
            mesg:[],
            message:{},
            schedu:'',
            agentId2:'',
            saveRules: {
                inven:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                declara:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                signature:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                lastamount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                agentId:[{ required: true, trigger: 'blur', validator: valiNotNull}],
            },
            saveRules2:{
                account:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                agentId:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                paidFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidFirstAmountDate:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paymentFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                gatheringFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                sumPaidfirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                sumPaidLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidLastAmountDate:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paymentLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                gatheringLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
            }
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      this.init()  
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
    methods:{
        browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(url));
            window.open('http://ow365.cn/?i=22376&ssl=1&furl='+encodeURIComponent(url));
        },
        init(){
            let fid=this.$route.params.id
            this.fileList2=[]
            this.getList(fid)
            this.getAgent()
            this.getCompany()
            this.getFlow()
            this.getFinance()
            this.getManagement()
        },
        permissionAssignment(){
            let jur=this.roles.jurisdiction
            let stats=this.list.schedules
            
            if(jur==0){
                return true
            }
            if(stats<41){
                if(jur==3){
                    return true;
                }
            }
            if(stats==41){
                if(jur==4){
                    return true;
                }
            }
            if(stats==42){
                if(jur==1){
                    return true;
                }
            }
            if(stats==43){
                if(jur==6||jur==2){
                    return true;
                }
            }
            if(stats==44){
                if(jur==6||jur==5){
                    return true;
                }
            }
            return false
        },
        addHandler(){
            if(this.list.schedules==42){
                this.handler.push({
                    name:'撤案资料审核('+this.list.agentName+')',
                    value:41
                })
                this.handler.push({
                    name:'发起撤案('+this.list.uname+')',
                    value:40
                })
            }
            if(this.list.schedules==43){
                this.handler.push({
                    name:'管理者审核',
                    value:42
                })
                this.handler.push({
                    name:'撤案资料审核('+this.list.agentName+')',
                    value:41
                })
                this.handler.push({
                    name:'发起撤案('+this.list.uname+')',
                    value:40
                })
            }
            if(this.list.schedules==44){
                this.handler.push({
                    name:'流程审核('+this.flowmanager[0].uname+')',
                    value:43
                })
                this.handler.push({
                    name:'管理者审核',
                    value:42
                })
                
                this.handler.push({
                    name:'撤案资料审核('+this.list.agentName+')',
                    value:41
                })
                this.handler.push({
                    name:'发起撤案('+this.list.uname+')',
                    value:40
                })
            }
        },
        getCompany(){
            company.getCompany()
            .then(res=>{
                this.company=res.data.company
            })
        },
        notoper(){
            if(this.roles.jurisdiction==5&&this.list.schedules==1){
                this.no=true
            }else if(this.roles.jurisdiction==2&&this.list.schedules==2){
                this.no=true
            }else if(this.roles.jurisdiction==4&&this.list.schedules==3){
                this.no=true
            }else if(this.roles.jurisdiction==3&&this.list.schedules==4){
                this.no=true
            }else if(this.roles.jurisdiction==4&&this.list.schedules==5){
                this.no=true
            }else if(this.roles.jurisdiction==3&&this.list.schedules==6){
                this.no=true
            }else if(this.roles.jurisdiction==4&&this.list.schedules==7){
                this.no=true
            }else if(this.roles.jurisdiction==4&&this.list.schedules==8){
                this.no=true
            }else if(this.roles.jurisdiction<3&&this.list.schedules==9){
                this.no=true
            }else if(this.roles.jurisdiction<=3&&this.list.schedules==10){
                this.no=true
            }else if(this.roles.jurisdiction==5&&this.list.schedules==11&&this.list.lastAmount!=0){
                this.no=true
            }else if(this.roles.jurisdiction==6&&(this.list.schedules==1||this.list.schedules==2||this.list.schedules==9||(this.list.schedules==11&&this.list.lastAmount!=0))){
                this.no=true
            }else if(this.roles.jurisdiction<2){
                this.no=true
            }else{
                this.no=false
            }
        },
        getAgent(){
                user.getAgent()
                .then(res=>{
                    this.agent=res.data.agent
                })
        }, 
        getList(fid){
            flow.getFlowById(fid)
            .then(res=>{
                this.list=res.data.flow
                // this.getHistorys(fid)
                this.listToform()
                let li=this.list
                if(li.declaration==null){
                    this.fileList=[]
                }else{
                    this.list.declaration=JSON.parse(this.list.declaration)
                    this.fileList=this.list.declaration
                }
                this.filesw()
                this.notoper()
                this.addHandler()
                this.permission=this.permissionAssignment()
                console.log(this.permissionAssignment())
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
            this.flow.schedules=this.list.schedules
            this.status=this.list.schedules
            let schedule=this.list.schedules
            if(schedule>41){
                if(this.materials=='撤回'){
                    if(this.handlerValue==''){
                        this.$message({
                        type:'warning',
                        message:'请选择撤回的流程'
                        })
                        return false
                    }
                }
            }
            if(schedule==41){
                if(this.materials==''){
                    this.$message({
                    type:'warning',
                    message:'选择材料审核情况'
                    })
                    return false
                }
                if(this.materials=='撤回'){
                    this.flow.schedules=this.flow.schedules-2
                }
            }
            if(schedule<41){
                if(this.value1){
                    console.log(this.form.reCompany)
                    if(this.form.reCompany==''||this.form.reCompany==null){
                        this.$message({
                            type:'warning',
                            message:'请选择打款单位'
                        })
                        return false
                    }
                    if(this.form.reReceive==''||this.form.reReceive==null){
                        this.$message({
                            type:'warning',
                            message:'请填写收款单位'
                        })
                        return false
                    }
                    if(this.form.reAmount==''||this.form.reAmount==null){
                        this.$message({
                            type:'warning',
                            message:'请填写退款金额'
                        })
                        return false
                    }
                    if(this.form.reAmount>this.list.paidFirstAmount+this.list.paidLastAmount){
                        this.$message({
                            type:'warning',
                            message:'退款金额不能大于已收金额'
                        })
                        return false
                    }
                }
                if(!this.isfileupdate){
                    this.$message({
                    type:'warning',
                    message:'必须上传文件'
                    })
                    return false
                }
                
                this.flow.schedules=40
            }
            if(schedule>41){
                if(this.materials=='撤回'){
                    this.flow.schedules=this.handlerValue-1//因为后面要+1
                }
            }
            if(schedule==43){
                if(!this.list.isRefund){//是否退款
                    this.flow.schedules=this.flow.schedules+1
                }
            }
            if(schedule==44){
                if(this.materials=='通过'){
                    if(this.form.reDate==''||this.form.reDate==null){
                        this.$message({
                        type:'warning',
                        message:'请选择到款日期'
                        })
                        return false
                    }
                }
            }
            this.flow.schedules=this.flow.schedules+1
            this.flow.agentId=this.form.agentId
            for(let i=0;i<this.agent.length;i++){
                if(this.flow.agentId==this.agent[i].uid){
                    this.flow.agentName=this.agent[i].uname
                }
            }
            return true
        },
        formtoflow(){
            this.flow.isRefund=this.value1
            this.flow.uporadd=this.form.uporadd
            this.flow.paidFirstAmount=this.form.paidFirstAmount
            this.flow.paidFirstAmountDate=this.form.paidFirstAmountDate
            this.flow.paymentFirstAmount=this.form.paymentFirstAmount
            this.flow.gatheringFirstAmount=this.form.gatheringFirstAmount
            this.flow.paidLastAmount=this.form.paidLastAmount
            this.flow.paidLastAmountDate=this.form.paidLastAmountDate
            this.flow.paymentLastAmount=this.form.paymentLastAmount
            this.flow.gatheringLastAmount=this.form.gatheringLastAmount  
            this.flow.bulletinTime=this.form.bulletinTime
            this.flow.reCompany=this.form.reCompany
            this.flow.reReceive=this.form.reReceive
            this.flow.reAmount=this.form.reAmount
            this.flow.reDate=this.form.reDate
        },
        getManagement(){
            user.getManagement()
            .then(res=>{
                this.management=res.data.Management
            })
        },
        submit(){
            this.$refs.form.validate(valid => {
            if (valid) {
                this.flow=this.list
                if(this.SpecialVerify()){
                    this.no=false
                    if(this.fileList3.length!=0&&this.form.audit==0){
                        for(let i=0;i<this.fileList3.length;i++){
                            this.fileList.push(this.fileList3[i])
                        }
                    }else if(this.fileList2.length!=0&&this.form.audit!=0){
                        for(let i=0;i<this.fileList2.length;i++){
                            this.fileList.push(this.fileList2[i])
                        }
                    }
                    if(this.fileList.length!=0){
                        this.flow.declaration=JSON.stringify(this.fileList)
                    }else {
                        this.flow.declaration='[]'
                    }
                    this.formtoflow()
                    console.log(this.flow)
                    flow.updateFlow(this.flow)
                    .then(res=>{
                        this.$message({
                            type:'success',
                            message:'提交成功'
                        })
                        //调用父窗口方法
                        window.opener.logoClickBtn()
                        this.getList(this.flow.fid)
                        this.isfileupdate=false
                        let messages=this.msg(this.flow.cid,0,this.flow.schedules)
                        let historys=this.historys(this.flow.schedules,0)
                        history.addHistory(historys)
                        .then(res=>{
                            message.addMessages(messages)
                            .then(res=>{
                                this.fileList2=[]
                                window.close()
                            })
                        })
                    })               
                }
            }
            })
        },
        historys(schedules,isUpdate){
            let historys=[]
            let account={}
            account.isUpdate=isUpdate
            account.uid=this.roles.uid
            account.fid=this.list.fid
            account.schedules=this.status
            account.result=schedules
            account.describes=this.form.a_desc
            historys.push(account)
            if(this.fileList2.length!=0){//如果有文件上传添加记录和文件地址
                let isfileupdate={}
                isfileupdate.uid=this.roles.uid
                isfileupdate.fid=this.list.fid
                isfileupdate.schedules=19
                isfileupdate.describes=JSON.stringify(this.fileList2)
                isfileupdate.result=schedules
                historys.push(isfileupdate)
            }else if(this.fileList3.length!=0){
                let isfileupdate={}
                isfileupdate.uid=this.roles.uid
                isfileupdate.fid=this.list.fid
                isfileupdate.schedules=19
                isfileupdate.describes=JSON.stringify(this.fileList3)
                isfileupdate.result=schedules
                historys.push(isfileupdate)
            }
            return historys
        },
        listToform(){
            // this.form.uporadd=this.list.uporadd
            this.value1=this.list.isRefund
            if(this.list.lastAmount==0){
                this.form.sumPaidFirstAmount=this.list.fullAmount
            }
            else
            this.form.sumPaidFirstAmount=this.list.firstAmount
            this.form.reCompany=this.list.reCompany
            this.form.reReceive=this.list.reReceive
            this.form.reAmount=this.list.reAmount
            this.form.reDate=this.list.reDate
            this.form.sumPaidLastAmount=this.list.lastAmount
            this.form.agentId=this.list.agentId
            this.form.paidFirstAmount=this.list.paidFirstAmount
            this.form.paidFirstAmountDate=this.list.paidFirstAmountDate
            this.form.paymentFirstAmount=this.list.paymentFirstAmount
            this.form.gatheringFirstAmount=this.list.gatheringFirstAmount
            this.form.paidLastAmount=this.list.paidLastAmount
            this.form.paidLastAmountDate=this.list.paidLastAmountDate
            this.form.paymentLastAmount=this.list.paymentLastAmount
            this.form.gatheringLastAmount=this.list.gatheringLastAmount
            this.form.bulletinTime=this.list.bulletinTime
        },
        fileUploadSuccess(response, file, fileList){
            if(this.list.schedules==8&&this.form.audit==1){
                this.fileList2.push({
                    name:file.name,
                    url:response.data.url
                })
                for(let i=0;i<this.fileList2.length;i++){
                    this.fileList2[i].name="商务部"+i+1
                }
            }else if(this.list.schedules==8&&this.form.audit==0){
                this.fileList3.push({
                    name:file.name,
                    url:response.data.url
                })
            }else{
                this.fileList2.push({
                    name:file.name,
                    url:response.data.url
                })
            }
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
                    
                }else{
                    this.message.categoryId=this.flow.fid
                    this.message.category=2
                    this.message.categoryId=this.flow.fid
                    this.message.send=this.roles.uid
                    if(i==40&&this.status==41){
                        this.message.msg='撤案流程'+this.list.serialNum+'材料出现问题，请重新提交'
                        this.message.uid=this.list.uid;
                        messages.push(this.message);
                    }
                    if(i==40&&this.status==42){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被管理者撤回，请确认'
                        this.message.uid=this.list.uid;
                        messages.push(this.message);
                    }
                    if(i==40&&this.status==43){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被流程撤回，请确认'
                        this.message.uid=this.list.uid;
                        messages.push(this.message);
                    }
                    if(i==40&&this.status==44){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被财务撤回，请确认'
                        this.message.uid=this.list.uid;
                        messages.push(this.message);
                    }

                    if(i==41&&this.status==40){
                        this.message.msg='流程'+this.list.serialNum+'发起了撤案，请及时审核'
                        this.message.uid=this.list.agentId;
                        messages.push(this.message);
                    }
                    if(i==41&&this.status==42){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被管理者撤回，请确认'
                        this.message.uid=this.list.agentId;
                        messages.push(this.message);
                    }
                    if(i==41&&this.status==43){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被流程撤回，请确认'
                        this.message.uid=this.list.agentId;
                        messages.push(this.message);
                    }
                    if(i==41&&this.status==44){
                        this.message.msg='撤案流程'+this.list.serialNum+'已被财务撤回，请确认'
                        this.message.uid=this.list.agentId;
                        messages.push(this.message);
                    }
                    
                    if(i==42&&this.status==41){
                        for(let i=0;i<this.management.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已通过撤案材料审核，请确认'
                            this.message.uid=this.management[i].uid
                            messages.push(this.message);
                        }
                    }
                    if(i==42&&this.status==43){
                        for(let i=0;i<this.management.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已被流程撤回，请确认'
                            this.message.uid=this.management[i].uid
                            messages.push(this.message);
                        }
                    }
                    if(i==42&&this.status==44){
                        for(let i=0;i<this.management.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已被财务撤回，请确认'
                            this.message.uid=this.management[i].uid
                            messages.push(this.message);
                        }
                    }

                    if(i==43&&this.status==42){
                        for(let i=0;i<this.flowmanager.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已通过管理审核，请确认'
                            this.message.uid=this.flowmanager[i].uid
                            messages.push(this.message);
                        }
                    }
                    if(i==43&&this.status==44){
                        for(let i=0;i<this.flowmanager.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已被财务撤回，请确认'
                            this.message.uid=this.flowmanager[i].uid
                            messages.push(this.message);
                        }
                    }
                    if(i==44&&this.status==43){
                        for(let i=0;i<this.finance.length;i++){
                            this.message.msg='撤案流程'+this.list.serialNum+'已通过流程审核，请确认'
                            this.message.uid=this.finance[i].uid
                            messages.push(this.message);
                        }
                    }    
                    if(i==45&&this.status==44){
                        this.message.msg='撤案流程'+this.list.serialNum+'已完成撤案'
                        this.message.uid=this.list.uid
                        messages.push(this.message);
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
.box{
    width: 650px;
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
.el-form-item{
    margin-top: 30px;
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
</style>