<template>
    <div class="app-container-flow">
        <div v-if="roles.jurisdiction>2">我的流程</div>
        <div v-if="roles.jurisdiction<2">所有流程</div>
         <template>
            <el-form :inline="true" class="demo-form-inline" style="text-align:center;" align="center">
              <el-form-item  >
                  <el-input style="width:150px" v-model="flowQuery.serialNum" placeholder="合同编号"></el-input>
              </el-form-item>
              <el-form-item  >
                  <el-input style="width:220px" v-model="flowQuery.companyName" placeholder="客户名称"></el-input>
              </el-form-item>
              <el-form-item  >
                  <el-input v-model="flowQuery.brandName" placeholder="品牌名称"></el-input>
              </el-form-item>
              <el-form-item v-if="roles.jurisdiction!=3">
                    <el-select style="width:110px" v-model="flowQuery.uid" placeholder="顾问名称">
                        <el-option
                        v-for="item in counselor"
                        :key="item.value"
                        :label="item.uname"
                        :value="item.uid">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item>
                  <el-select style="width:150px" v-model="flowQuery.schedule" placeholder="流程进度">
                      <el-option label="财务审核" value="1"></el-option>
                      <el-option label="流程分案" value="2"></el-option>
                      <el-option label="清单上传" value="3"></el-option>
                      <el-option label="申报材料提供" value="4"></el-option>
                      <el-option label="材料制作" value="5"></el-option>
                      <el-option label="盖章材料提供" value="6"></el-option>
                      <el-option label="盖章材料审核" value="7" ></el-option>
                      <el-option label="管理部门审核" value="7" ></el-option>
                      <el-option label="待商务局审查" value="8"></el-option>
                      <el-option label="材料审核" value="8"></el-option>
                      <el-option label="流程确认" value="9"></el-option>
                      <el-option label="顾问确认" value="10"></el-option>
                      <el-option label="尾款确认" value="11"></el-option>
                      <el-option label="已交付" value="12"></el-option>
                      <el-option label="发起撤案" value="40"></el-option>
                      <el-option label="撤案资料审核" value="41"></el-option>
                      <el-option label="管理审核" value="42"></el-option>
                      <el-option label="流程审核" value="43"></el-option>
                      <el-option label="退款审核" value="44"></el-option>
                      <el-option label="已撤案" value="45"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item >
                <el-select style="width:110px" v-model="flowQuery.agentName" placeholder="代理人">
                      <el-option
                      v-for="item in agent"
                      :key="item.value"
                      :label="item.uname"
                      :value="item.uname">
                      </el-option>
                  </el-select>
              </el-form-item>
              
              <el-form-item >
                <el-date-picker
                style="width:180px"
                v-model="flowQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
              </el-form-item>
              <el-form-item>
                <el-date-picker
                style="width:180px"
                v-model="flowQuery.end"
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
              @cell-contextmenu="cellClick"
              @cell-dblclick="cellClick"
              v-loading="loading"
              element-loading-text="数据加载中"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" style="margin-left:50px" class="demo-table-expand">
                      <el-form-item style="margin: 0px;" label="流程状态:">
                        <span v-if="props.row.schedules==1">财务审核</span>
                        <span v-if="props.row.schedules==2">流程分案</span>
                        <span v-if="props.row.schedules==3">清单上传</span>
                        <span v-if="props.row.schedules==4">申报材料提供</span>
                        <span v-if="props.row.schedules==5">材料制作</span>
                        <span v-if="props.row.schedules==6">盖章材料提供</span>
                        <span v-if="props.row.schedules==7&&props.row.type!=1">盖章材料审核</span>
                        <span v-if="props.row.schedules==7&&props.row.type==1">管理部门审核</span>
                        <span v-if="props.row.schedules==8&&props.row.type!=1">待商务局审查</span>
                        <span v-if="props.row.schedules==8&&props.row.type==1">材料审核</span>
                        <span v-if="props.row.schedules==9">流程确认</span>
                        <span v-if="props.row.schedules==10">顾问确认</span>
                        <span v-if="props.row.schedules==11">尾款确认</span>
                        <span v-if="props.row.schedules==12">已交付</span>
                      </el-form-item>
                      <el-form-item style="margin: 0px" label="报件人姓名:">
                        <span>{{ props.row.uname }}</span>
                      </el-form-item>
                      <el-form-item style="margin: 0px" label="代理人:" v-if="props.row.schedules>2">
                        <span>{{ props.row.agentName }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="尾款金额" v-if="props.row.schedules>4">
                        <span>{{ props.row.lastAmount }}</span>
                      </el-form-item> -->
                      <el-form-item style="margin: 0px" label="创建时间:">
                        <span>{{ props.row.gmtCreate }}</span>
                      </el-form-item>
                      <el-form-item style="margin: 0px" label="附件下载:" v-if="props.row.inventory!=''&&props.row.inventory!=null">
                        <a :href="item.url"  v-for="(item) in props.row.inventory" target="blank" :key="item.value" style="text-decoration:underline;color:#4d90fe;">{{ item.name }}<span style="margin-left:30px"></span></a>
                        <!-- <a >{{props.row.inventory[0].name}}</span> -->
                        
                      </el-form-item>
                      <el-form-item style="margin: 0px" label="申报材料下载:" v-if="props.row.declaration!=''&&props.row.declaration!=null">
                        <span>{{ props.row.declaration }}</span>
                      </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                width="60">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
              <el-table-column
                width="150" 
                align="center"
                label="合同编号">
                <template slot-scope="scope">
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.serialNum}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-if="scope.row.type==1">{{scope.row.serialNum}}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                width="250" 
                align="center"
                label="客户名称">
                <template slot-scope="scope">
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.companyName}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-if="scope.row.type==1">{{scope.row.companyName}}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                width="150" 
                align="center"
                label="品牌名称">
                <template slot-scope="scope">
                    <el-link @click="info(scope.row.cid)" v-if="scope.row.type!=1">{{scope.row.brandName}}</el-link>
                    <el-link @click="projectInfo(scope.row.cid)" v-if="scope.row.type==1">{{scope.row.pname}}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                width="80" 
                align="center"
                label="顾问"
                prop="uname">
              </el-table-column>
              <el-table-column
                width="80" 
                align="center"
                label="代理人"
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.agentName!=null">{{scope.row.agentName}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column
                width="80" 
                align="center"
                label="全款金额">
                <template slot-scope="scope">
                    <span  v-if="scope.row.type!=1">{{scope.row.fullAmount}}</span>
                    <span  v-if="scope.row.type==1">{{scope.row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="120" 
                align="center"
                label="付款方式"
                >
                <tempate slot-scope="scope">
                  <span v-if="scope.row.lastAmount==0">全款支付</span>
                  <span v-if="scope.row.lastAmount!=0">分期支付</span>
                </tempate>
              </el-table-column>
              <el-table-column
                width="80" 
                align="center"
                label="已付金额"
                >
                <tempate slot-scope="scope">
                    {{scope.row.paidFirstAmount+scope.row.paidLastAmount+scope.row.paidInterimAmount}}
                </tempate>
              </el-table-column>
              <el-table-column width="130" align="center" prop="schedule" label="流程状态" >
                <template slot-scope="scope">
                    <span v-if="scope.row.schedules==1" style="color:#17a05d">财务审核</span>
                    <span v-if="scope.row.schedules==2" style="color:#17a05d">流程分案</span>
                    <span v-if="scope.row.schedules==3" style="color:#17a05d">清单上传</span>
                    <span v-if="scope.row.schedules==4" style="color:#00a74a">申报材料提供</span>
                    <span v-if="scope.row.schedules==5" style="color:#00a74a">材料制作</span>
                    <span v-if="scope.row.schedules==6" style="color:#00a74a">盖章材料提供</span>
                    <span v-if="scope.row.schedules==7&&scope.row.type!=1" style="color:#00a74a">盖章材料审核</span>
                    <span v-if="scope.row.schedules==7&&scope.row.type==1" style="color:#00a74a">管理部门审核</span>
                    <span v-if="scope.row.schedules==8&&scope.row.type!=1" style="color:#17a05d">待商务局审查</span>
                    <span v-if="scope.row.schedules==8&&scope.row.type==1" style="color:#17a05d">材料审核</span>
                    <span v-if="scope.row.schedules==9" style="color:#00a74a">流程确认</span>
                    <span v-if="scope.row.schedules==10" style="color:#00a74a">顾问确认</span>
                    <span v-if="scope.row.schedules==11" style="color:#00a74a">尾款确认</span>
                    <span v-if="scope.row.schedules==40" style="color:#ff0000">发起撤案</span>
                    <span v-if="scope.row.schedules==41" style="color:#ff0000">撤案资料审核</span>
                    <span v-if="scope.row.schedules==42" style="color:#ff0000">管理审核</span>
                    <span v-if="scope.row.schedules==43" style="color:#ff0000">流程审核</span>
                    <span v-if="scope.row.schedules==44" style="color:#ff0000">退款审核</span>
                    <span v-if="scope.row.schedules==45" style="color:#ff0000">已撤案</span>
                    <span v-if="scope.row.schedules==12" style="color:#00a74a">已交付</span>
                </template>
              </el-table-column>
              <el-table-column
                width="100" 
                align="center"
                label="立案时间"
                prop="onRecord">
              </el-table-column>
              <el-table-column width="100" align="center" prop="schedule" label="处理人" >
                <template slot-scope="scope">
                  <span v-if="scope.row.schedules==40">{{scope.row.uname}}</span>
                    <span v-if="scope.row.schedules==41">{{scope.row.agentName}}</span>
                    <span v-if="scope.row.schedules==42">欧平安</span>
                    <span v-if="scope.row.schedules==43">吴燕</span>
                    <span v-if="scope.row.schedules==44">吴燕</span>
                    <span v-if="scope.row.schedules==45">无</span>
                    <span v-if="scope.row.schedules==1" >吴燕</span>
                    <span v-if="scope.row.schedules==2" >吴燕</span>
                    <span v-if="scope.row.schedules==3" >{{scope.row.agentName}}</span>
                    <span v-if="scope.row.schedules==4" >{{scope.row.uname}}</span>
                    <span v-if="scope.row.schedules==5" >{{scope.row.agentName}}</span>
                    <span v-if="scope.row.schedules==6" >{{scope.row.uname}}</span>
                    <span v-if="scope.row.schedules==7" >{{scope.row.agentName}}</span>
                    <span v-if="scope.row.schedules==8">{{scope.row.agentName}}</span>
                    <span v-if="scope.row.schedules==9" >吴燕</span>
                    <span v-if="scope.row.schedules==10" >{{scope.row.uname}}</span>
                    <span v-if="scope.row.schedules==11" >吴燕</span>
                    <span v-if="scope.row.schedules==12" >无</span>
                </template>
              </el-table-column>
              <el-table-column  align="right" label="操作">
                <template slot-scope="scope">
                  <el-button  
                    type="primary" 
                    size="mini"  
                    @click="select(scope.row.fid,(page-1)*limit+scope.$index+1)" 
                    v-if="scope.row.disposeshow">
                      处理
                  </el-button>
                  <!-- <el-button type="primary" size="mini">申报书上传</el-button> -->
                  <el-button type="primary" size="mini"  @click="updated(scope.row.fid,(page-1)*limit+scope.$index+1,roles.jurisdiction)" >记录</el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.fid,scope.row.cid)" v-if="roles.jurisdiction==3&&scope.row.schedules<12">删除</el-button>
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
import flow from '@/api/edu/flow'
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
        'roles'
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
          win1:null,
          win2:null,
           loading:false,
            fileAmount:20,
            update:0,
            history:{},
            isfileupdate:false,
            isnoable:true,
            agent:[],
            index:1,
            record:{},
            list:null,//查询之后接口返回集合
            page:1,//当前页
            limit:20,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            flowQuery:{},//条件封装
            dialogVisible: false,
            updateVisible:false,        
            BASE_API:process.env.BASE_API,//端口号
            importBtnDisabled:false,
            fileList: [],
            counselor:[],
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
              paidFirstAmount:'',
              paidFirstAmountDate:'',
              paymentFirstAmount:'',
              gatheringFirstAmount:'',
              paidLastAmount:'',
              paidLastAmountDate:'',
              paymentLastAmount:'',
              gatheringLastAmount:'',
            },
             form2: {
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
              paidFirstAmount:'',
              paidFirstAmountDate:'',
              paymentFirstAmount:'',
              gatheringFirstAmount:'',
              paidLastAmount:'',
              paidLastAmountDate:'',
              paymentLastAmount:'',
              gatheringLastAmount:'',
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
            },
            saveRules2:{
                account:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                agentId:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                paidFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidFirstAmountDate:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paymentFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                gatheringFirstAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paidLastAmountDate:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                paymentLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
                gatheringLastAmount:[{ required: true, trigger: 'blur', validator: valiNotNull2}],
            }
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
        this.getCounselor()
        this.init()
    },
    watch:{//监听
        $route(to,from){//路由变化的方式，路由一变化就执行
            console.log('watch $route')
            this.init()
        }
    },
    methods:{
      projectInfo(id){
            let routeData = this.$router.resolve({
                path: '/contract/projectInfo/'+id
            })
            window.open(routeData.href,"_blank",'width=1500px,height=900px,top=50px,left=330px,resizable=yes,scrollbars')
        },
      getCounselor(){
            user.getCounselor()
            .then(res=>{
                this.counselor=res.data.counselor
            })
        },
      init(){
        let router_path = this.$route.path
        if(router_path=='/case/end'){
          this.flowQuery.beginSchedule=9
          this.flowQuery.endSchedule=12
          this.p=1
        }else if(router_path=='/case/unfinished'){
          this.flowQuery.beginSchedule=1
          this.flowQuery.endSchedule=8
          this.p=2
        }else if(router_path=='/case/unpayment'){
          this.flowQuery.beginSchedule=9
          this.flowQuery.endSchedule=11
          this.p=3
        }else if(router_path=='/case/all'){
          this.flowQuery.beginSchedule=undefined
          this.flowQuery.endSchedule=undefined
          this.p=4
        }
        this.getList()
        this.getAgent()
        this.$nextTick(()=>{
            //浏览器加载完成之后执行
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
      info(id){
            let routeData = this.$router.resolve({
                path: '/contract/info/'+id
            })
            window.open(routeData.href,"_blank",'width=1400px,height=900px,top=50px,left=330px,resizable=yes,scrollbars')
        },
      getAgent(){
            user.getAgent()
            .then(res=>{
                this.agent=res.data.agent
            })
      }, 
      formtoflow(){
          this.flow.paidFirstAmount=this.form.paidFirstAmount
          this.flow.paidFirstAmountDate=this.form.paidFirstAmountDate
          this.flow.paymentFirstAmount=this.form.paymentFirstAmount
          this.flow.gatheringFirstAmount=this.form.gatheringFirstAmount
          this.flow.paidLastAmount=this.form.paidLastAmount
          this.flow.paidLastAmountDate=this.form.paidLastAmountDate
          this.flow.paymentLastAmount=this.form.paymentLastAmount
          this.flow.gatheringLastAmount=this.form.gatheringLastAmount  
      },
      submit(){
        this.$refs.form.validate(valid => {
          if (valid) {
            this.flow=this.list[this.index]
            if(this.SpecialVerify()){
                if(this.fileList.length!=0){
                  this.flow.inventory=JSON.stringify(this.fileList)
                }
                this.formtoflow()
                flow.updateFlow(this.flow)
                .then(res=>{
                    this.$message({
                        type:'success',
                        message:'提交成功'
                    })
                    this.historys(this.flow.schedules,0)
                    this.getList()
                    this.isfileupdate=false
                    this.dialogVisible = false
                })               
            }
          }
        })
      },
      getContract(id){
        contract.getContract(id)
        .then(res=>{
          this.form.lastAmount=res.data.contract.lastAmount
        })
      },
      check(){
        if(this.list[this.index].schedules>1){
             this.form2.agentId=this.list[this.index].agentId
             this.form2.account=true
        }
        if(this.list[this.index].schedules>2){
              this.form2.division=true
        }
        if(this.list[this.index].schedules>3){
              this.form2.inven=true
        }
        if(this.list[this.index].schedules>4){
              this.form2.declara=true
        }
        if(this.list[this.index].schedules>5){
            if(this.list[this.index].lastAmount!=0){
              this.form2.lastamount=true
            }else{
              this.form2.lastamount=false
            }
        }
        if(this.list[this.index].schedules>6){
              this.form2.signature=true
        }
      },
      updated(fid,index,update){
        let routeData = this.$router.resolve({
            path: '/flow/record/'+fid  // 路由的路径
        })
        if(this.win2!=null){
          this.win2.close()
        }
        this.win2=window.open(routeData.href,'win2','width=692px,height=420px,top=300px,left=700px,resizable=yes,scrollbars',false)
        window['logoClickBtn'] = (url) => {
                this.getList()
            }
      },
      select(fid,index){
        let routeData = this.$router.resolve({
            path: '/flow/operation/'+fid  // 路由的路径
        })
        if(this.win1!=null){
          this.win1.close()
        }
       this.win1=window.open(routeData.href,'win1','width=692px,height=420px,top=300px,left=700px,resizable=yes,scrollbars,z-look=yes',false) 
        window['logoClickBtn'] = (url) => {
          // Toast({ message: url, position: 'bottom', duration: 5000 });
          //将init方法公示到window 子页面可以调用该方法
          this.init()
        }
      },
      submitUpload() {
      },
      fileUploadSuccess(response, file, fileList){
        this.fileList=fileList
        this.isfileupdate=true
      },
      fileUploadError(){
      },
      handleRemove(file, fileList) {
        this.fileList=fileList
        this.isfileupdate=true
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      removeDataById(id,cid){
           this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {//点击确定，执行
                flow.deleteById(id)//调用方法执行删除
                .then(res=>{//删除成功
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.msg(cid,0,id)
                    this.getList()//刷新列表
                })
                .catch(error=>{

                })
                
            })
            
        },
      getList(page =1){
        let id=this.$route.params.id;
        if(id!=undefined&&id.length==19){
          this.getUntreated(page)
        }else{
            this.page=page
            this.loading=true
            if(this.roles.jurisdiction==3){
                this.flowQuery.uid=this.roles.uid
            }else if(this.roles.jurisdiction==4){
                this.flowQuery.agentId=this.roles.uid
            }
            this.flowQuery.pname=this.flowQuery.brandName
            flow.getFlowListPage(this.page,this.limit,this.flowQuery)
                .then(res=>{
                    //res返回的数据
                    this.list=res.data.rows
                    for(let i=0;i<this.list.length;i++){
                       this.list[i].inventory=JSON.parse(this.list[i].inventory)
                       this.list[i].disposeshow=this.disposeShow(this.list[i])
                    }
                    this.total=res.data.total
                    this.loading=false
                })//请求成功
                .catch(error=>{
                    console.log(error)
                })//请求失败
          }
        },
        disposeShow(list){//判断处理按钮是否存在
          let j=this.roles.jurisdiction
          let s=list.schedules
          if(s>11){
            return false
          }
          if(j==6){
            if(list.interimAmount!=0&&(list.paidInterimAmount==0||!list.paidInterimAmount)){
              if(s==1||s==2||s==3||s==4||s==5||s==6||s==7||s==8||s==9||s==11){
                return true
              }
            }else{
              if(s==1||s==2||s==9||s==11){
                return true
              }
            }
            return false
          }
          if(j==5){
            if(list.interimAmount!=0&&(list.paidInterimAmount==0||!list.paidInterimAmount)){
              if(s==1||s==2||s==3||s==4||s==5||s==6||s==7||s==8||s==9||s==11){
                return true
              }
            }else{
              if(s==1||s==11){
                return true
              }
            }
            return false
          }
          if(j==4){
            if(s==3||s==5||s==7||s==8){
              return true
            }
            return false
          }
          if(j==3){
            if(s==4||s==10||s==6){
              return true
            }
            return false
          }
          if(j==2){
            if(s==2||s==9){
              return true
            }
            return false
          }
          if(j<1){
            return true
          }
          return false
        },
        resetData(){//清空表单
            //表单输入项数据清空
            this.flowQuery={}
            //查询所有讲师数据
            this.getList()
        },
        browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            window.open('http://view.xdocin.com/xdoc?_xdoc='+encodeURIComponent(url));
        },
        handleClose(done) {
        this.$confirm('是否退出？(上传文件和描述将不会保存)')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getUntreated(page){
        this.page=page
        this.loading=true
        this.flowQuery.jurisdiction=this.roles.jurisdiction
        this.flowQuery.uid=this.roles.uid
        flow.getUntreated(this.page,this.limit,this.flowQuery)
            .then(res=>{
                //res返回的数据
                this.list=res.data.rows
                for(let i=0;i<this.list.length;i++){
                    this.list[i].inventory=JSON.parse(this.list[i].inventory)
                    this.list[i].disposeshow=this.disposeShow(this.list[i].schedules)
                }
                this.total=res.data.total
                this.loading=false
            })//请求成功
            .catch(error=>{
                console.log(error)
            })//请求失败
      }
    }
}
</script>
<style>
.app-container-flow{
  padding: 20px;
}
/* .app-container .el-button+.el-button {
    margin-left: 0px;
} */
.app-container-flow .el-table td, .el-table th,.el-link--inner{
    padding: 1px;
    font-size: 13px;
}
</style>