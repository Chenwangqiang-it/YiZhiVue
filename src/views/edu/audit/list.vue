<template>
    <div class="app-container" >
        <div v-if="roles.jurisdiction>2" >我的合同</div>
        <div v-if="roles.jurisdiction<2" >所有合同</div>
         <template>
            <el-form :inline="true" style="text-align:center;" class="demo-form-inline" align="center">
                <el-form-item >
                    <el-input v-model="stateQuery.serialNum" placeholder="合同编号"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="stateQuery.companyName" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="stateQuery.brandName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="stateQuery.sstate" placeholder="合同状态">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="被驳回" value="1"></el-option>
                        <el-option label="待签订" value="2"></el-option>
                        <el-option label="待立案" value="3"></el-option>
                        <el-option label="已立案" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加时间">
                <el-date-picker
                v-model="stateQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
                </el-form-item>
                <el-form-item>
                <el-date-picker
                v-model="stateQuery.end"
                type="datetime"
                placeholder="选择截至时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList()">查询</el-button>
                    <el-button type="default" @click="resetData()">重置</el-button>
                </el-form-item>
            
            </el-form>
            <el-table
            :data="list"
            border
            v-loading="loading"
            :span-method="objectSpanMethod"
            element-loading-text="数据加载中"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
                align="center"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="序号"
                width="60"
                align="center">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
            <el-table-column width="130" align="center"  label="合同编号">
                 <template slot-scope="scope">
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.serialNum}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-else>{{scope.row.serialNum}}</el-link>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" prop="fullAmount" label="合同金额"></el-table-column>
            <el-table-column width="100" align="center" prop="lastAmount" label="付款方式">
                <template slot-scope="scope">
                    <span v-if="scope.row.lastAmount==0" >全款支付</span>
                    <span v-else>分期支付</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="已付金额">
                <tempate slot-scope="scope">
                    {{scope.row.paidFirstAmount+scope.row.paidLastAmount}}
                </tempate>
            </el-table-column>
            <el-table-column width="230" align="center"  label="客户名称">
                <template slot-scope="scope">
                    <el-link style="width:220px" @click="info(scope.row.cid)"  v-if="scope.row.type!=1">{{scope.row.companyName}}</el-link>
                    <el-link style="width:210px" @click="projectInfo(scope.row.cid)" v-else>{{scope.row.companyName}}</el-link>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center" label="项目名称">
                <template slot-scope="scope">
                    <!-- {{scope.row}} -->
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.brandName}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-else>查看更多</el-link>
                </template>
            </el-table-column>
            <el-table-column width="78" align="center" prop="uname" label="顾问"></el-table-column>
            <el-table-column width="80" align="center" prop="sstate" label="状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.sstate==0" style="color:#17a05d">待审核</span>
                    <el-popover
                        title="驳回原因"
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        :content=scope.row.cause>
                       <span v-if="scope.row.sstate==1" slot="reference" style="color:#f43907">驳回</span>
                    </el-popover>               
                    <span v-if="scope.row.sstate==2" style="color:#17a05d">待签订</span>
                    <span v-if="scope.row.sstate==3" style="color:#00a74a">待立案</span>
                    <el-popover
                        title="立案描述"
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        :content=scope.row.cause>
                        <span v-if="scope.row.sstate==4" slot="reference" style="color:#00a74a">已立案</span>
                    </el-popover>  
                </template>
            </el-table-column>
            <el-table-column width="130" align="center" label="合同下载">
                <template slot-scope="scope">
                    <a :href="scope.row.url" download target="_blank" style="text-decoration:underline;color:#4d90fe" v-if="JSON.stringify(scope.row.url).indexOf('[{')<0">点击下载合同</a>
                    <el-popover
                        placement="right"
                        width="400"
                        trigger="click"
                        v-else
                        >
                        <el-table :data="scope.row.url">
                            <el-table-column width="300" property="name" @click="download(url)" style="text-decoration:underline;color:#4d90fe" label="姓名"></el-table-column>
                            <el-table-column width="100" label="下载">
                                <template slot-scope="scop">
                                    <a :href="scop.row.url" download target="_blank" style="text-decoration:underline;color:#4d90fe">下载</a>
                                </template>
                            </el-table-column>
                        </el-table>
                        <span slot="reference" style="text-decoration:underline;color:#4d90fe" >点击选择下载</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column width="170" align="center" prop="gmtCreate" label="创建时间" ></el-table-column>
            <el-table-column width="360" label="操作" align="right">
                <template slot-scope="scope">
                    <router-link :to="{path:'/audit/update/',query: {id:scope.row.sid,cid:scope.row.cid,url:scope.row.url,isaudit:2}}" v-if="scope.row.sstate<3&&(roles.jurisdiction==3||roles.jurisdiction==0)">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <router-link  :to="{path:'/audit/audit/',query: {id:scope.row.sid,cid:scope.row.cid,url:scope.row.url,isaudit:1}}" v-if="roles.jurisdiction<2&&scope.row.sstate==0&&scope.row.type==0">
                        <el-button  type="primary" size="mini">审核</el-button>
                    </router-link>
                    <router-link  :to="{path:'/audit/auditpro',query: {id:scope.row.sid,cid:scope.row.cid,url:scope.row.url,isaudit:1}}" v-if="roles.jurisdiction<2&&scope.row.sstate==0&&scope.row.type==1">
                        <el-button  type="primary" size="mini">审核</el-button>
                    </router-link>
                    <el-button @click="to2(scope.row.sid,scope.row.cid,scope.row.url,0)" v-if="scope.row.sstate==2&&(roles.jurisdiction==3||roles.jurisdiction==0)" type="primary" size="mini">签订</el-button>

                    <el-button type="primary" size="mini" v-if="scope.row.sstate==3&&(roles.jurisdiction==3||roles.jurisdiction==0)&&scope.row.type!=1" @click="open(scope.row.sid,scope.row.uid,scope.row.cid,scope.row.fid)">发起立案</el-button>
                    <el-button type="primary" size="mini" v-if="scope.row.sstate==3&&(roles.jurisdiction==3||roles.jurisdiction==0)&&scope.row.type==1" @click="open2(scope.row.sid,scope.row.uid,scope.row.cid)">发起立案</el-button>
                    <el-button type="primary" size="mini"  @click="browse(scope.row.url)" v-if="JSON.stringify(scope.row.url).indexOf('[{')<0">浏览</el-button>
                    <el-popover
                        placement="right"
                        width="200"
                        trigger="click"
                        v-else
                        >
                        <el-table :data="scope.row.url">
                            <el-table-column width="200"  label="点击选择文件浏览">
                                <template slot-scope="scop">
                                   <span style="cursor:pointer" @click="browse(scop.row.url)" >{{scop.row.name}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button slot="reference" type="primary" size="mini">浏览</el-button>
                    </el-popover>
                    <el-button type="primary" @click="to(scope.row.cid,scope.row.sstate,'/audit/schedule/')" size="mini">记录</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"  @click="removeDataById(scope.row.sid,scope.row.cid)" v-if="scope.row.sstate<3&&(roles.jurisdiction==3||roles.jurisdiction==0)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="pading: 30px 0;text-align:center;"
                layout="total,prev,pager,next,jumper"
                @current-change="getList"
            />
         </template>
    </div>
</template>
<script>
import state from '@/api/edu/state'
import flow from '@/api/edu/flow'
 import contract from '@/api/edu/contract'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import record from '@/api/edu/record'
import history from '@/api/edu/history'
import message from '@/api/edu/message'
import user from '@/api/edu/user'
export default {//定义变量和初始值
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    data(){
        return{
            divisionMsg:'',
            win3:null,
            win4:null,
            finance:{},
            multipleSelection:[],
            message:{},
            record:{},
            list:null,//查询之后接口返回集合
            page:1,//当前页
            limit:18,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            stateQuery:{},//条件封装
            flow:{},
            state,
            loading:false
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
    },
    watch:{//监听
        $route(to,from){//路由变化的方式，路由一变化就执行
            console.log('watch $route')
            this.init()
        }
    },
    methods:{
        open(sid,uid,cid,fid) {
            this.$prompt('', '描述（可选）', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                this.divisionMsg=value
                this.division(sid,uid,cid,fid)
            })
        },
        open2(sid,uid,cid) {
            this.$prompt('', '描述（可选）', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                this.divisionMsg=value
                this.ProjectDivision(sid,uid,cid)
            })
        },
        ProjectDivision(sid,uid,cid){
            this.flow.uid=uid
            this.flow.sid=sid
            this.flow.cid=cid
            this.flow.schedules=1
            this.flow.isFlow=1
            this.flow.onRecord=(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            flow.updateProjectFlow(this.flow)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '立案成功!'
                });
                this.state.sstate=4
                this.state.sid=sid
                this.state.cause=this.divisionMsg
                state.update(this.state)
                this.record.sstate=5
                this.record.cid=cid
                this.record.uid=this.roles.uid
                record.addRecord(this.record)
                this.msg(cid,1)
                for(let i=0;i<res.data.flows.length;i++){
                    this.historys(res.data.flows[i].fid)
                }
                this.$router.push({path:'/flow/index'})
            })
        },
        init(){
            if(this.list!=null){
                this.loading=false
            }
            this.getList()
            this.getFinance()
        },
        info(id){
            let routeData = this.$router.resolve({
                path: '/contract/info/'+id
            })
            window.open(routeData.href,"_blank",'width=1500px,height=900px,top=50px,left=330px,resizable=yes,scrollbars')
        },
        projectInfo(id){
            let routeData = this.$router.resolve({
                path: '/contract/projectInfo/'+id
            })
            window.open(routeData.href,"_blank",'width=1500px,height=900px,top=50px,left=330px,resizable=yes,scrollbars')
        },
        to(cid,sstate){
            let routeData = this.$router.resolve({
                path: '/audit/schedule/',query: {cid:cid,sstate:sstate}
            })
            if(this.win3!=null){
                 this.win3.close()
            }
            this.win3=window.open(routeData.href,'win3','width=692px,height=420px,top=300px,left=700px,resizable=yes,scrollbars')
        },
        to2(id,cid,url,isaudit){
            let routeData = this.$router.resolve({
                path: '/audit/sign/',query: {id,cid,url,isaudit}
            })
            // this.$router.push({name:'/audit/update/',query: {id,cid,url,isaudit}})
            if(this.win4!=null){
                 this.win4.close()
            }
            this.win4=window.open(routeData.href,'win4','width=692px,height=420px,top=300px,left=700px,resizable=yes,scrollbars')
            window['logoClickBtn'] = (url) => {
                // Toast({ message: url, position: 'bottom', duration: 5000 });
                //将init方法公示到window 子页面可以调用该方法
                this.init()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 13) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: this.limit,
                        colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    };
                }
            }
        },
        download(url){
            window.location.href=url
        },
        divisions(index){
            let li=this.multipleSelection
            let li2=[]
            let fl=[]
            for(let i=0;i<li.length;i++){
                if(li[i].sstate==3){
                    li[i].url=JSON.stringify(li[i].url)
                    let fl2={}
                    fl2.fid=li[i].fid
                    fl2.sid=li[i].sid
                    fl2.uid=li[i].uid
                    fl2.schedules=1
                    fl2.isFlow=1
                    fl2.onRecord=(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
                    fl.push(fl2)
                    li[i].sstate=4
                    li2.push(li[i])
                }
            }
            if(li2.length==0){
                this.$message({
                    type: 'warning',
                    message: '已签订的合同才可以发起立案!'
                });
            }else{
                flow.updateFlows(fl)
                .then(res=>{   
                    state.updates(li2)
                    .then(res=>{
                        let records=[]
                        let messages=[]
                        for(let i=0;i<li2.length;i++){
                            let re={}
                            let ms={}
                            let sid=li2[i].sid
                            let cid=li2[i].cid
                            let fid=li2[i].fid
                            this.state.sid=sid
                            re.sstate=5
                            re.cid=cid
                            re.uid=this.roles.uid
                            records.push(re)
                            this.historys(fid)
                            for(let i=0;i<this.finance.length;i++){
                                let m={}
                                m.category=1
                                m.categoryId=fid
                                m.uid=this.finance[i].uid
                                m.send=this.roles.uid
                                m.msg='流程'+this.list.serialNum+'已发起立案，需要进行财务审核，请确认'
                                messages.push(m);
                            }
                        }
                        record.addRecords(records)
                        this.msgs(messages)
                        this.$message({
                            type: 'success',
                            message: '立案成功!'
                        });
                        this.$router.push({path:'/flow/index'})
                    })
                })
            }
        },
        division(sid,uid,cid,fid){
            this.flow.fid=fid
            this.flow.uid=uid
            this.flow.sid=sid
            this.flow.schedules=1
            this.flow.isFlow=1
            this.flow.onRecord=(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate())
            flow.updateFlow(this.flow)
            .then(res=>{
                this.$message({
                    type: 'success',
                    message: '立案成功!'
                });
                this.state.sstate=4
                this.state.sid=sid
                console.log(this.divisionMsg)
                this.state.cause=this.divisionMsg
                state.update(this.state)
                this.record.sstate=5
                this.record.cid=cid
                this.record.uid=this.roles.uid
                record.addRecord(this.record)
                this.msg(cid,1)
                this.historys(this.flow.fid)
                 this.$router.push({path:'/flow/index'})
            })
        },
        getFinance(){
            user.getFinance()
            .then(res=>{
                this.finance=res.data.finance
            })
        },       
        msg(cid,i){
            contract.getContract(cid)
            .then(res=>{
                let messages=[];
                if(i==1){
                    // this.message.msg='您的合同'+res.data.contract.serialNum+'已发起立案'
                    for(let i=0;i<this.finance.length;i++){
                        let m={}
                        m.category=1
                        m.categoryId=this.flow.fid
                        m.uid=this.finance[i].uid
                        m.send=this.roles.uid
                        m.msg='流程'+res.data.contract.serialNum+'已发起立案，需要进行财务审核，请确认'
                        messages.push(m);
                    }
                }else{
                    this.message.msg='您的合同'+res.data.contract.serialNum+'已被删除'
                    this.message.categoryId=cid
                    this.message.category=0
                    this.message.uid=this.roles.uid;
                    this.message.send=this.roles.uid
                    messages.push(this.message);
                }
                
                message.addMessages(messages)
            })
        },
        msgs(messages){
            message.addMessages(messages)
        },
        getList(page =1){
            let id=this.$route.params.id;
            if(id!=undefined&&id.length==19){
                this.getUntreated(page)
            }else{
                this.loading=true
                this.page=page
                if(this.roles.jurisdiction>=2&&this.roles.jurisdiction!=5){
                    this.stateQuery.uid=this.roles.uid
                }
                state.getStateListPage(this.page,this.limit,this.stateQuery)
                    .then(res=>{
                        //res返回的数据
                        this.list=res.data.rows
                        this.listUtil()
                        this.total=res.data.total
                        this.loading=false
                    })//请求成功
                    .catch(error=>{
                        console.log(error)
                    })//请求失败
            }
        },
        getUntreated(page){
            this.loading=true
            this.page=page
            this.stateQuery.uid=this.roles.uid
            this.stateQuery.jurisdiction=this.roles.jurisdiction
            state.getUntreated(this.page,this.limit,this.stateQuery)
                .then(res=>{
                    //res返回的数据
                    this.list=res.data.rows
                    this.listUtil()
                    this.total=res.data.total
                    this.loading=false
                })//请求成功
                .catch(error=>{
                    console.log(error)
                })//请求失败
        },
        listUtil(){
            let l=this.list
            for(let i=0;i<l.length;i++){
                if(this.list[i].url.indexOf('[{')<0){
                }else{
                    this.list[i].url=JSON.parse(this.list[i].url)
                    for(let j=0;j<this.list[i].url.length;j++){
                        let w=this.list[i].url[j].name.indexOf("yizhi")
                        if(w>=0){
                            this.list[i].url[j].name=this.list[i].url[j].name.substring(w,13)
                        }
                    }
                }
            }
        },
        resetData(){//清空表单
            //表单输入项数据清空
            this.stateQuery={}
            //查询所有讲师数据
            this.getList()
        },
        browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(url));
            window.open('http://ow365.cn/?i=22376&ssl=1&furl='+encodeURIComponent(url));
        },
        historys(fid){
            let historys=[]
            let account={}
            account.isUpdate=0
            account.uid=this.roles.uid
            account.fid=fid
            account.schedules=0
            account.describes=this.divisionMsg
            historys.push(account)
            history.addHistory(historys)
        },
        removeDataById(id,cid){//删除讲师
           this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {//点击确定，执行
                state.deleteStateId(id)//调用方法执行删除
                .then(res=>{//删除成功
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.record.cid=cid
                    this.record.uid=this.roles.uid
                    this.record.sstate=-1
                    record.addRecord(this.record)
                    this.msg(cid,0)
                    this.getList()//刷新列表
                })
                .catch(error=>{

                })
                
            })
            
        }
    }
}
</script>
<style >
.app-container .el-button+.el-button {
    margin-left: 0px;
}
.app-container .el-table td, .el-table th,.el-link--inner{
    padding: 3px;
    font-size: 13px;
}
.app-container{
    background:url('https://yizhitexu.oss-cn-beijing.aliyuncs.com/static/%E6%9C%AA%E6%A0%87%E9%A2%98-1.jpg?Expires=1595917874&OSSAccessKeyId=TMP.3Kf5TDCjKYC8eEb2SoNydCB7ARcFnRK9fPk8agvfbo67Ns71K1DZM4uJRohN6LEFsCUSVt5G9c3WLeSQ7pMxXN4RSqn8hB&Signature=GuO9LerWVQWbjYaQZ7EXfuWbK8A%3D');
    background-size: 100% 100%;
}

.el-table,
.el-table_expanded-cell{
    background-color: transparent;
}
.el-table th, .el-table tr {
    /* color: aliceblue; */
    background-color: transparent;
}
.el-pagination__total{
    /* color: aliceblue; */
}
.el-input__inner{
    /* color: aliceblue; */
    background-color: unset;
}
.el-pagination__jump{
    /* color: aliceblue; */
}
.btn-prev{
    background-color: unset;
}
</style>