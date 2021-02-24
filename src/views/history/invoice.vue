<template>
    <div class="app-container" >
         <template>
            <el-form :inline="true" style="text-align:center;" class="demo-form-inline" align="center">
                <el-form-item label="合同编号">
                    <el-input v-model="historyQuery.serialNum" placeholder="合同编号"></el-input>
                </el-form-item>
                <el-form-item label="发票类型">
                    <el-select v-model="historyQuery.itype" placeholder="合同状态">
                        <el-option label="普通发票" value="0"></el-option>
                        <el-option label="专用发票" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="顾问名称">
                    <el-input v-model="historyQuery.companyName" placeholder="顾问名称"></el-input>
                </el-form-item>
                <el-form-item label="添加时间">
                <el-date-picker
                v-model="historyQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
                </el-form-item>
                <el-form-item>
                <el-date-picker
                v-model="historyQuery.end"
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
            @cell-contextmenu="cellClick"
            @cell-dblclick="cellClick"
            v-loading="loading"
            element-loading-text="数据加载中"
            @selection-change="handleSelectionChange"
            style="width: 100%">
                <!-- <el-table-column
                    label="序号"
                    width="60"
                    align="center">
                    <tempate slot-scope="scope">
                        {{(page-1)*limit+scope.$index+1}}
                    </tempate>
                </el-table-column> -->
                <el-table-column width="130" align="center"  label="合同编号">
                    <template slot-scope="scope">
                        <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.serialNum}}</el-link>
                        <el-link @click="projectInfo(scope.row.cid)" v-else>{{scope.row.serialNum}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column width="200" align="center" show-overflow-tooltip="true"  label="客户全称">
                    <template slot-scope="scope">
                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center"  label="发票类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==0">
                            <span v-if="scope.row.iname!=null&&scope.row.iname!=''">普通发票(个人)</span>
                            <span v-else-if="scope.row.icompany">普通发票(公司)</span>
                            <span v-else>未知</span>
                        </span>
                        <span v-else>专用发票</span>
                    </template>
                </el-table-column>
                <el-table-column width="85" align="center" label="发票金额">
                    <tempate slot-scope="scope">
                        {{scope.row.ipayment}}
                    </tempate>
                </el-table-column>
                <el-table-column width="120" align="center" show-overflow-tooltip="true"  label="开票名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==0&&scope.row.iname">{{scope.row.iname}}</span>
                        <span v-else>{{scope.row.icompany}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="210" align="center" show-overflow-tooltip="true" label="信用代码&身份证号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==0&&scope.row.iidNumber">{{scope.row.iidNumber}}</span>
                        <span v-else>{{scope.row.icode}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180" align="center" show-overflow-tooltip="true" label="开户行&账号">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==1">{{scope.row.ibankOfDeposit+" "+scope.row.iaccount}}</span>
                        <span v-else>无</span>
                    </template>
                </el-table-column>
                <el-table-column width="190" align="center" show-overflow-tooltip="true" label="地址&电话">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==1">{{scope.row.iaddress+" "+scope.row.iphone}}</span>
                        <span v-else>无</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column width="70" align="center" prop="uname" label="顾问"></el-table-column> -->
                <el-table-column align="center" prop="gmtCreate" show-overflow-tooltip="true" label="开票时间" ></el-table-column>
                <el-table-column align="center" prop="iDate" v-if="historyQuery.istate==1" show-overflow-tooltip="true" label="处理时间" ></el-table-column>
                <el-table-column width="100" align="center" prop="iuname" label="顾问" ></el-table-column>
                <el-table-column width="85" align="center" label="补充协议">
                    <template slot-scope="scope">
                        <span v-if="scope.row.accessory.length==0">无</span>
                        <span v-if="scope.row.accessory.length==1">
                            <a v-if="scope.row.accessory[0].url" :href="scope.row.accessory[0].url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">协议下载</a>
                            <a v-else :href="scope.row.accessory[0].response.data.url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">协议下载</a>
                        </span>
                        <span v-if="scope.row.accessory.length>1">
                            <el-popover
                                placement="right"
                                width="400"
                                trigger="click"
                                >
                                <el-table :data="scope.row.accessory">
                                    <el-table-column width="300" property="name" @click="download(url)" style="text-decoration:underline;color:#4d90fe" label="名称"></el-table-column>
                                    <el-table-column width="100" label="协议下载">
                                        <template slot-scope="scop">
                                            <!-- {{scop}} -->
                                            <a :href="scope.row.accessory[0].response.data.url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">下载</a>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <span slot="reference" style="text-decoration:underline;color:#4d90fe" >点击选择下载</span>
                            </el-popover>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" label="操作" v-if="historyQuery.istate==0">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.istate&&!scope.row.withdraw&&(roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6)" @click="to(scope.row.iid)" type="primary" size="mini">处理</el-button>
                        <el-button v-if="scope.row.withdraw&&(roles.jurisdiction==3||roles.jurisdiction==0)" @click="to2(scope.row.sid,scope.row.iid,scope.row.cid,scope.row.url,0)" type="warning" size="mini">修改</el-button>
                        <el-link v-if="scope.row.istate" type="success">已处理</el-link>
                        <el-link v-if="!scope.row.istate&&!scope.row.withdraw&&roles.jurisdiction==3" type="success">待处理</el-link>
                        <el-link v-if="scope.row.withdraw&&(roles.jurisdiction==5||roles.jurisdiction==6)" type="success">待修改</el-link>
                    </template>
                </el-table-column>
                <el-table-column width="80" align="center" label="状态" v-else>
                    <template slot-scope="scope">
                        <el-link v-if="scope.row.istate&&!scope.row.withdraw" type="success">已处理</el-link>
                        <el-link v-if="scope.row.withdraw" type="success">待修改</el-link>
                        <el-link v-if="!scope.row.istate" type="warning">待处理</el-link>
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
import invoice from '@/api/edu/invoice'
import flow from '@/api/edu/flow'
 import contract from '@/api/edu/contract'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import record from '@/api/edu/record'
import history from '@/api/edu/history'
import message from '@/api/edu/message'
import { countInvoice } from '../layout/components/count'
//抽取
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
            limit:20,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            historyQuery:{},//条件封装
            flow:{},
            loading:false,
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
        init(){
            if(this.list!=null){
                this.loading=false
            }
            this.getList()
            this.$nextTick(()=>{
                this.prohibitContextmenu();
            });
        },
        prohibitContextmenu(){
            //禁止浏览器默认右键事件
            let table=document.getElementsByClassName("el-table")[0]
            table.oncontextmenu = function(){
            　　return false;
            }
        },
        cellClick(row, column, cell, event){
            this.copy(event.srcElement.innerText)
        },
        copy(data){
            let url = data;
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$message({
            message: '复制成功',
            type: 'success'
            });
            oInput.remove()
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
        to(iid){
            let routeData = this.$router.push({
                path: '/history/make/'+iid
            })
            // if(this.win3!=null){
            //      this.win3.close()
            // }
            // this.win3=window.open(routeData.href,'win3','width=570px,height=800px,top=100px,left=700px,resizable=yes,scrollbars')
            // window['logoClickBtn'] = (url) => {
            //     // Toast({ message: url, position: 'bottom', duration: 5000 });
            //     //将init方法公示到window 子页面可以调用该方法
            //     this.init()
            //     countInvoice(this.roles)
            // }
        },
        to2(id,iid,cid,url,isaudit){
            let routeData = this.$router.push({
                path: '/invoice/make/'+iid,query: {id,cid,url,isaudit}
            })
            // this.$router.push({name:'/audit/update/',query: {id,cid,url,isaudit}})
            // if(this.win4!=null){
            //      this.win4.close()
            // }
            // this.win4=window.open(routeData.href,'win4','width=570px,height=800px,top=100px,left=700px,resizable=yes,scrollbars')
            // window['logoClickBtn'] = (url) => {
            //     // Toast({ message: url, position: 'bottom', duration: 5000 });
            //     //将init方法公示到window 子页面可以调用该方法
            //     this.init()
            // }
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
        getList(page =1){
            if(this.$route.path=="/invoice/registered"){
                this.historyQuery.istate=0
            }else{
                this.historyQuery.istate=1
            }
            let id=this.$route.params.id;
            if(this.roles.jurisdiction==3){
                this.historyQuery.uid=this.roles.uid
            }
            this.loading=true
            this.page=page
            console.log(this.page)
            invoice.pageHistoryInvoiceCondition(this.page,this.limit,this.historyQuery)
            .then(res=>{
                //res返回的数据
                this.list=res.data.rows
                for(let i=0;i<this.list.length;i++){
                    this.list[i].accessory=JSON.parse(this.list[i].accessory)
                }
                this.total=res.data.total
                this.loading=false
            })//请求成功
            .catch(error=>{
                this.loading=false
                console.log(error)
            })//请求失败
        },
        resetData(){//清空表单
            //表单输入项数据清空
            this.historyQuery={}
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
    }
}
</script>
<style >
.el-table{
    margin: 0px auto;
}
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