<template>
    <div class="app-container" >
         <template>
            <el-form :inline="true" style="text-align:center;" class="demo-form-inline" align="center">
                <el-form-item label="邮寄内容">
                    <el-select  style="width:120px" v-model="historyMailQuery.mailBody" placeholder="邮寄内容">
                        <el-option
                        v-for="item in mailOptions"
                        :key="item.id"
                        :label="item.options"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input style="width:220px" v-model="historyMailQuery.mailName" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item label="顾问">
                    <el-select style="width:120px" v-model="historyMailQuery.uid" placeholder="顾问名称">
                      <el-option
                      v-for="item in counselor"
                      :key="item.value"
                      :label="item.uname"
                      :value="item.uid">
                      </el-option>
                  </el-select>
              </el-form-item>
                <el-form-item label="添加时间">
                <el-date-picker
                style="width:180px"
                v-model="historyMailQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
                </el-form-item>
                <el-form-item>
                <el-date-picker
                style="width:180px"
                v-model="historyMailQuery.end"
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
            :style="style">
            <el-table-column
                v-if="historyMailQuery.state==1"
                label="序号"
                width="60"
                align="center">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
            <el-table-column width="70" align="center" prop="uname" label="顾问"></el-table-column>
            <el-table-column width="250" align="left" prop="mailName" show-overflow-tooltip="true" label="公司名称"></el-table-column>
            <el-table-column  align="center" show-overflow-tooltip="true" label="邮寄内容">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.mailBody.indexOf('1')>=0" type="success">合同</el-tag>
                    <el-tag v-if="scope.row.mailBody.indexOf('2')>=0" type="info">发票</el-tag>
                    <el-tag v-if="scope.row.mailBody.indexOf('3')>=0" type="warning">商标证书</el-tag>
                    <el-tag v-if="scope.row.mailBody.indexOf('4')>=0" type="warning">版权证书</el-tag>
                    <el-tag v-if="scope.row.mailBody.indexOf('5')>=0" type="danger">其他</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="450" align="left" show-overflow-tooltip="true" label="收件人&电话&地址">
                <template slot-scope="scope">
                    {{scope.row.recipients+" "+scope.row.mailPhone+" "+scope.row.mailAddress}}
                </template>
            </el-table-column>
            <el-table-column width="110" align="center" v-if="historyMailQuery.state==2" show-overflow-tooltip="true" prop="express" label="快递公司"></el-table-column>
            <el-table-column width="110" align="center" v-if="historyMailQuery.state==2" show-overflow-tooltip="true" prop="number" label="快递单号"></el-table-column>
            <el-table-column width="160" align="left" show-overflow-tooltip="true" prop="describes" label="详细"></el-table-column>
            <el-table-column width="80" align="center" label="状态">
                <tempate slot-scope="scope">
                    {{scope.row.state==0?"待修改":scope.row.state==1?"待邮寄":scope.row.state==2?"完成邮寄":""}}
                </tempate>
            </el-table-column>
            <el-table-column align="center" width="150" show-overflow-tooltip="true" prop="gmtCreate" label="发起时间"></el-table-column>
            <el-table-column align="center" width="150" v-if="historyMailQuery.state==2" show-overflow-tooltip="true" prop="gmtCreate" label="邮寄时间"></el-table-column>
            <el-table-column width="80" align="center" label="操作" v-if="roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6||roles.jurisdiction==3">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.state==0&&(roles.jurisdiction==3||roles.jurisdiction==0)" @click="to(scope.row.mailId)" type="warning" size="mini">修改</el-button>
                    <el-link v-if="scope.row.state==0&&(roles.jurisdiction!=3&&roles.jurisdiction!=0)" type="success">待修改</el-link>
                    <el-button v-if="scope.row.state==1&&(roles.jurisdiction==0||roles.jurisdiction==5||roles.jurisdiction==6)" @click="to(scope.row.mailId)" type="primary" size="mini">处理</el-button>
                    <el-link v-if="scope.row.state==1&&(roles.jurisdiction!=5&&roles.jurisdiction!=6&&roles.jurisdiction!=0)" type="success">待处理</el-link>
                    <el-link v-if="scope.row.state==2" type="success">已处理</el-link>
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

import mail from '@/api/edu/mail'
import user from '@/api/edu/user'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { countMail } from '../layout/components/count'
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
            historyMailQuery:{},//条件封装
            flow:{},
            loading:false,
            counselor:{},
            mailOptions:{},
            style:"width:85%",
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
        this.getCounselor()
        this.getMailOptions()
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
            if(this.$route.path=="/mail/table"){
                this.style="width:90%"
            }else{
                this.style="width:95%"
            }
            this.getList()
            this.$nextTick(()=>{
                // 禁止表格右键浏览器默认菜单
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
        getMailOptions(){
            mail.getMailOptions()
            .then(res=>{
                this.mailOptions=res.data.options
            })
        },
        getCounselor(){
            user.getCounselor()
            .then(res=>{
                this.counselor=res.data.counselor
            })
        },
        getList(page =1){
            if(this.$route.path=="/mail/table"){
                this.historyMailQuery.state=1
            }else{
                this.historyMailQuery.state=2
            }
            if(this.roles.jurisdiction==3||this.roles.jurisdiction==4){
                this.historyMailQuery.uid=this.roles.uid
            }
            this.loading=true
            this.page=page
            mail.pageHistoryMailCondition(this.page,this.limit,this.historyMailQuery)
            .then(res=>{
                //res返回的数据
                this.list=res.data.rows               
                this.total=res.data.total
                this.loading=false
            })//请求成功
            .catch(error=>{
                this.loading=false
                console.log(error)
            })//请求失败
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
        to(id){
             this.$router.push({
                path: '/mail/make/'+id
            })
            // this.$router.push({name:'/audit/update/',query: {id,cid,url,isaudit}})
            // if(this.win4!=null){
            //      this.win4.close()
            // }
            // this.win4=window.open(routeData.href,'win7','width=570px,height=800px,top=100px,left=700px,resizable=yes,scrollbars')
            // window['logoClickBtn'] = (url) => {
            //     // Toast({ message: url, position: 'bottom', duration: 5000 });
            //     //将init方法公示到window 子页面可以调用该方法
            //     this.init()
            //     // console.log(countMail())
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
        resetData(){//清空表单
            //表单输入项数据清空
            this.historyMailQuery={}
            //查询所有讲师数据
            this.getList()
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