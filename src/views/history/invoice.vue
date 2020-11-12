<template>
    <div class="app-container" >
        <div>
            <el-radio-group @change="getList(page)" v-model="value1">
                <el-radio-button label="普票"></el-radio-button>
                <el-radio-button label="专票"></el-radio-button>
            </el-radio-group>
        </div>
         <template>
            <el-form :inline="true" style="text-align:center;" class="demo-form-inline" align="center">
                <el-form-item label="合同编号">
                    <el-input v-model="historyQuery.serialNum" placeholder="合同编号"></el-input>
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
            v-if="value1=='普票'"
            :data="list"
            border
            v-loading="loading"
            :span-method="objectSpanMethod"
            element-loading-text="数据加载中"
            @selection-change="handleSelectionChange"
            style="width: 98.1%">
            <el-table-column
                label="序号"
                width="60"
                align="center">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
            <el-table-column width="140" align="center"  label="合同编号">
                 <template slot-scope="scope">
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.serialNum}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-else>{{scope.row.serialNum}}</el-link>
                </template>
            </el-table-column>
            <el-table-column width="120" align="center"  label="发票类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.iname!=null" >普通发票(个人)</span>
                    <span v-else>普通发票(公司)</span>
                </template>
            </el-table-column>
            <el-table-column width="90" align="center" label="发票金额">
                <tempate slot-scope="scope">
                    {{scope.row.ipayment==null?"无":scope.row.ipayment}}
                </tempate>
            </el-table-column>
            <el-table-column width="100" align="center"  label="个人姓名">
                <template slot-scope="scope">
                    {{scope.row.iname==null?"无":scope.row.iname}}
                </template>
            </el-table-column>
            <el-table-column width="160" align="center" label="身份证号">
                <template slot-scope="scope">
                    {{scope.row.iidNumber==null?"无":scope.row.iidNumber}}
                </template>
            </el-table-column>
            <el-table-column width="230" align="center"  label="公司全称">
                <template slot-scope="scope">
                    {{scope.row.icompany==null?'无':scope.row.icompany}}
                </template>
            </el-table-column>
            <el-table-column width="160" align="center" label="统一信用代码">
                <template slot-scope="scope">
                    {{scope.row.icode==null?'无':scope.row.icode}}
                </template>
            </el-table-column>
            <el-table-column width="90" align="center" prop="uname" label="顾问"></el-table-column>
            <el-table-column width="170" align="center" prop="gmtCreate" label="开票时间" ></el-table-column>
            <el-table-column width="100" align="center" prop="iuname" label="开票人姓名" ></el-table-column>
            <el-table-column width="120" align="center" label="补充协议">
                <template slot-scope="scope">
                    <span v-if="scope.row.accessory.length==0">无</span>
                    <span v-if="scope.row.accessory.length==1">
                        <a :href="scope.row.accessory[0].url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">协议下载</a>
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
                                        <a :href="scop.row.url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">下载</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <span slot="reference" style="text-decoration:underline;color:#4d90fe" >点击选择下载</span>
                        </el-popover>
                    </span>
                </template>
            </el-table-column>
            <el-table-column width="130" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="to2(scope.row.sid,scope.row.cid,scope.row.url,0)" type="primary" size="mini" v-if="scope.row.sstate>=3">开票</el-button>
                    <el-button type="primary" @click="to(scope.row.cid,scope.row.sstate,'/audit/schedule/')" size="mini">开票记录</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-table
            v-else
            :data="list"
            border
            v-loading="loading"
            element-loading-text="数据加载中"
            @selection-change="handleSelectionChange"
            style="width: 100%">
                <el-table-column
                    label="序号"
                    width="60"
                    align="center">
                    <tempate slot-scope="scope">
                        {{(page-1)*limit+scope.$index+1}}
                    </tempate>
                </el-table-column>
                <el-table-column width="128" align="center"  label="合同编号">
                    <template slot-scope="scope">
                        <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.serialNum}}</el-link>
                        <el-link @click="projectInfo(scope.row.cid)" v-else>{{scope.row.serialNum}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column width="90" align="center"  label="发票类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.itype==0" >普通发票</span>
                        <span v-else>专用发票</span>
                    </template>
                </el-table-column>
                <el-table-column width="90" align="center" label="发票金额">
                    <tempate slot-scope="scope">
                        {{scope.row.ipayment}}
                    </tempate>
                </el-table-column>
                <el-table-column width="230" align="center"  label="公司全称">
                    <template slot-scope="scope">
                        {{scope.row.icompany}}
                    </template>
                </el-table-column>
                <el-table-column width="110" align="center" label="统一信用代码">
                    <template slot-scope="scope">
                        {{scope.row.icode}}
                    </template>
                </el-table-column>
                <el-table-column width="125" align="center" label="开户行">
                    <template slot-scope="scope">
                        {{scope.row.ibankOfDeposit}}
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" label="账号">
                    <template slot-scope="scope">
                        {{scope.row.iaccount}}
                    </template>
                </el-table-column>
                <el-table-column width="150" align="center" label="地址">
                    <template slot-scope="scope">
                        {{scope.row.iaddress}}
                    </template>
                </el-table-column>
                <el-table-column width="110" align="center" label="电话">
                    <template slot-scope="scope">
                        {{scope.row.iphone}}
                    </template>
                </el-table-column>
                <el-table-column width="80" align="center" prop="uname" label="顾问"></el-table-column>
                <el-table-column width="150" align="center" prop="gmtCreate" label="开票时间" ></el-table-column>
                <el-table-column width="100" align="center" prop="iuname" label="开票人姓名" ></el-table-column>
                <el-table-column width="80" align="center" label="补充协议">
                    <template slot-scope="scope">
                        <span v-if="scope.row.accessory.length==0">无</span>
                        <span v-if="scope.row.accessory.length==1">
                            <a :href="scope.row.accessory[0].url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">协议下载</a>
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
                                            <a :href="scop.row.url[0]" download target="_blank" style="text-decoration:underline;color:#4d90fe">下载</a>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <span slot="reference" style="text-decoration:underline;color:#4d90fe" >点击选择下载</span>
                            </el-popover>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="to2(scope.row.sid,scope.row.cid,scope.row.url,0)" type="primary" size="mini" v-if="scope.row.sstate>=3">开票</el-button>
                        <el-button type="primary" @click="to(scope.row.cid,scope.row.sstate,'/audit/schedule/')" size="mini">开票记录</el-button>
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
            historyQuery:{},//条件封装
            flow:{},
            loading:false,
            value1:"普票"
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
                path: '/invoice/make/',query: {id,cid,url,isaudit}
            })
            // this.$router.push({name:'/audit/update/',query: {id,cid,url,isaudit}})
            if(this.win4!=null){
                 this.win4.close()
            }
            this.win4=window.open(routeData.href,'win4','width=570px,height=800px,top=0px,left=0px,resizable=yes,scrollbars')
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
        getList(page =1){
            let id=this.$route.params.id;
            if(this.value1=="普票"){
                this.historyQuery.itype=0
            }else{
                this.historyQuery.itype=1
            }
            this.loading=true
            this.page=page
            invoice.pageHistoryInvoiceCondition(this.page,this.limit,this.historyQuery)
            .then(res=>{
                //res返回的数据
                this.list=res.data.rows
                for(let i=0;i<this.list.length;i++){
                    this.list[i].accessory=JSON.parse(this.list[i].accessory)
                    console.log(this.list[i].accessory)
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