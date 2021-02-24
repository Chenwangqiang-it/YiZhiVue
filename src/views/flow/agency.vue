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
                <el-select style="width:100px" v-model="flowQuery.agentName" placeholder="代理人">
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
              v-loading="loading"
              @cell-contextmenu="cellClick"
              @cell-dblclick="cellClick"
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
import { getUntreatedCount } from '../layout/components/count'
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
          this.init()
    },
    methods:{
      projectInfo(id){
            let routeData = this.$router.resolve({
                path: '/contract/projectInfo/'+id
            })
            window.open(routeData.href,"_blank",'width=1500px,height=900px,top=50px,left=330px,resizable=yes,scrollbars')
        },
      init(){
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
      SpecialVerify(){
        if(this.list[this.index].schedules==1){
          if(this.form.paidFirstAmount==null||this.form.paidFirstAmount==''){
            this.$message({
              type:'warning',
              message:'到款金额不能为空'
            })
            return false
          }
          if(this.form.paidFirstAmountDate==null||this.form.paidFirstAmountDate==''){
            this.$message({
              type:'warning',
              message:'请填写到款日期'
            })
            return false
          }
          if(this.form.paymentFirstAmount==null||this.form.paymentFirstAmount==''){
            this.$message({
              type:'warning',
              message:'打款单位不能为空'
            })
            return false
          }
          if(this.form.gatheringFirstAmount==null||this.form.gatheringFirstAmount==''){
            this.$message({
              type:'warning',
              message:'收款单位不能为空'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==2){
          if(this.form.agentId==''||this.form.agentId==null){
            this.$message({
              type:'warning',
              message:'请选择代理人'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==3){
          if(!this.isfileupdate){
            this.$message({
              type:'warning',
              message:'必须上传文件'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==4){
          if(!this.isfileupdate){
            this.$message({
              type:'warning',
              message:'必须上传文件'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==5){
          if(this.form.paidLastAmount==null||this.form.paidLastAmount==''){
            this.$message({
              type:'warning',
              message:'到款金额不能为空'
            })
            return false
          }
          if(this.form.paidLastAmountDate==null||this.form.paidLastAmountDate==''){
            this.$message({
              type:'warning',
              message:'请填写到款日期'
            })
            return false
          }
          if(this.form.paymentLastAmount==null||this.form.paymentLastAmount==''){
            this.$message({
              type:'warning',
              message:'打款单位不能为空'
            })
            return false
          }
          if(this.form.gatheringLastAmount==null||this.form.gatheringLastAmount==''){
            this.$message({
              type:'warning',
              message:'收款单位不能为空'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==4){
          if(this.list[this.index].lastAmount==0){
            this.flow.schedules=this.list[this.index].schedules+1
          }
        }
        this.flow.schedules=this.list[this.index].schedules+1
        this.msg(this.flow.cid,0,this.list[this.index].schedules+1)
        this.flow.agentId=this.form.agentId
        for(let i=0;i<this.agent.length;i++){
          if(this.flow.agentId==this.agent[i].uid){
            this.flow.agentName=this.agent[i].uname
          }
        }
        return true
      },
      SpecialVerify2(){
         if(this.list[this.index].schedules>1){
          if(this.form2.paidFirstAmount==null||this.form2.paidFirstAmount==''){
            this.$message({
              type:'warning',
              message:'到款金额不能为空'
            })
            return false
          }
          if(this.form2.paidFirstAmountDate==null||this.form2.paidFirstAmountDate==''){
            this.$message({
              type:'warning',
              message:'请填写到款日期'
            })
            return false
          }
          if(this.form2.paymentFirstAmount==null||this.form2.paymentFirstAmount==''){
            this.$message({
              type:'warning',
              message:'打款单位不能为空'
            })
            return false
          }
          if(this.form2.gatheringFirstAmount==null||this.form2.gatheringFirstAmount==''){
            this.$message({
              type:'warning',
              message:'收款单位不能为空'
            })
            return false
          }
        }
        if(this.list[this.index].schedules==5){
          if(this.form2.paidLastAmount==null||this.form2.paidLastAmount==''){
            this.$message({
              type:'warning',
              message:'到款金额不能为空'
            })
            return false
          }
          if(this.form2.paidLastAmountDate==null||this.form2.paidLastAmountDate==''){
            this.$message({
              type:'warning',
              message:'请填写到款日期'
            })
            return false
          }
          if(this.form2.paymentLastAmount==null||this.form2.paymentLastAmount==''){
            this.$message({
              type:'warning',
              message:'打款单位不能为空'
            })
            return false
          }
          if(this.form2.gatheringLastAmount==null||this.form2.gatheringLastAmount==''){
            this.$message({
              type:'warning',
              message:'收款单位不能为空'
            })
            return false
          }
        }
        return true
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
      formtoflow2(){
          this.flow.paidFirstAmount=this.form2.paidFirstAmount
          this.flow.paidFirstAmountDate=this.form2.paidFirstAmountDate
          this.flow.paymentFirstAmount=this.form2.paymentFirstAmount
          this.flow.gatheringFirstAmount=this.form2.gatheringFirstAmount
          this.flow.paidLastAmount=this.form2.paidLastAmount
          this.flow.paidLastAmountDate=this.form2.paidLastAmountDate
          this.flow.paymentLastAmount=this.form2.paymentLastAmount
          this.flow.gatheringLastAmount=this.form2.gatheringLastAmount
      },
      upsub(){
        this.$refs.form2.validate(valid => {
          if (valid) {
            if(this.SpecialVerify2()){
              this.flow=this.list[this.index]
              if(this.verifyu()|this.isfileupdate){
                this.flow.agentId=this.agentId2
                this.msg(this.flow.cid,1,this.schedu)
                this.flow.schedules=this.schedu
                if(this.fileList.length!=0){
                  this.flow.inventory=JSON.stringify(this.fileList)
                }
                this.formtoflow2()
                flow.updateFlow(this.flow)
                .then(res=>{
                    this.$message({
                        type:'success',
                        message:'提交成功'
                    })
                    this.historys(this.flow.schedules,1)
                    this.getList()
                    this.isfileupdate=false
                    this.updateVisible = false
                })
              }
            }
          }
        })
      },
      historys(schedules,isUpdate){
        let historys=[]
        if(isUpdate==0){
          if(this.list[this.index].schedules==2){
            let account={}
            account.isUpdate=isUpdate
            account.uid=this.roles.uid
            account.fid=this.list[this.index].fid
            account.schedules=1
            account.describes=this.form.a_desc
            historys.push(account)
          }
          if(this.list[this.index].schedules==3){
            let division={}
            division.isUpdate=isUpdate
            division.uid=this.roles.uid
            division.fid=this.list[this.index].fid
            division.schedules=8
            division.describes='分案'
            historys.push(division)
          }
          if(this.list[this.index].schedules==4){
            let inven={}
            inven.isUpdate=isUpdate
            inven.uid=this.roles.uid
            inven.fid=this.list[this.index].fid
            inven.schedules=2
            inven.describes=this.form.i_desc
            historys.push(inven)
          }
          if(this.list[this.index].schedules==5){
            let declara={}
            declara.isUpdate=isUpdate
            declara.uid=this.roles.uid
            declara.fid=this.list[this.index].fid
            declara.schedules=3
            declara.describes=this.form.d_desc
            historys.push(declara)
          }
          if(this.list[this.index].schedules==6){
            let declara={}
            declara.isUpdate=isUpdate
            declara.uid=this.roles.uid
            declara.fid=this.list[this.index].fid
            declara.schedules=5
            declara.describes=this.form.d_desc
            historys.push(declara)
          }
          if(this.list[this.index].schedules==7){
            let signature={}
            signature.isUpdate=isUpdate
            signature.uid=this.roles.uid
            signature.fid=this.list[this.index].fid
            signature.schedules=4
            signature.describes=this.form.l_desc
            historys.push(signature)
          }
        }else{
          if((!this.form2.account&&this.list[this.index].schedules==1)||this.form3.a_desc!=this.form2.a_desc){
            let account={}
            account.isUpdate=isUpdate
            account.uid=this.roles.uid
            account.fid=this.list[this.index].fid
            account.schedules=1
            account.describes=this.form2.a_desc
            // if(!this.form2.account){
            //   account.describes="撤回财务审核"
            // }
            historys.push(account)
          }
          if((!this.form.division&&this.list[this.index].schedules==2)||this.form3.agentId!=this.form2.agentId){
            let division={}
            division.isUpdate=isUpdate
            division.uid=this.roles.uid
            division.fid=this.list[this.index].fid
            division.schedules=8
            if(this.form3.agentId!=this.form2.agentId){
              division.describes='修改分案'
            }
            if(!this.form2.division){
               division.describes='撤销分案'
            }
            historys.push(division)
          }
          if((!this.form2.inven&&this.list[this.index].schedules==3)||this.form3.i_desc!=this.form2.i_desc){
            let inven={}
            inven.isUpdate=isUpdate
            inven.uid=this.roles.uid
            inven.fid=this.list[this.index].fid
            inven.schedules=2
            inven.describes=this.form2.i_desc
            historys.push(inven)
          }
          if((!this.form2.declara&&this.list[this.index].schedules==4)||this.form3.d_desc!=this.form2.d_desc){
            let declara={}
            declara.isUpdate=isUpdate
            declara.uid=this.roles.uid
            declara.fid=this.list[this.index].fid
            declara.schedules=3
            declara.describes=this.form2.d_desc
            historys.push(declara)
          }
          if((!this.form2.signature&&this.list[this.index].schedules==6)||this.form3.s_desc!=this.form2.s_desc){
            let signature={}
            signature.isUpdate=isUpdate
            signature.uid=this.roles.uid
            signature.fid=this.list[this.index].fid
            signature.schedules=5
            signature.describes=this.form2.s_desc
            historys.push(signature)
          }
          if((!this.form2.lastamount&&this.list[this.index].schedules==5&&this.form2.lastAmount!=0)||this.form3.l_desc!=this.form2.l_desc){
            let signature={}
            signature.isUpdate=isUpdate
            signature.uid=this.roles.uid
            signature.fid=this.list[this.index].fid
            signature.schedules=4
            signature.describes=this.form2.l_desc
            historys.push(signature)
          }
        }
        if(this.isfileupdate){
          let isfileupdate={}
          isfileupdate.uid=this.roles.uid
          isfileupdate.fid=this.list[this.index].fid
          isfileupdate.schedules=7
          isfileupdate.describes='文件修改'
          historys.push(isfileupdate)
        }
        history.addHistory(historys)
      },
      msg(cid,isupdate,i){
        this.message={}
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
              contract.getContract(cid)
              .then(res=>{
                  if(i.length==19){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已被删除'
                      this.message.categoryId=i
                  }else {
                    this.message.categoryId=this.flow.fid
                  }
                  if(i==2){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过财务审核'
                  }else if(i==3){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过流程分案'
                  }else if(i==4){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过清单上传'
                  }else if(i==5){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过尾款确认'
                  }else if(i==6){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过申报材料提供'
                  }else if(i==7){
                      this.message.msg='您的流程'+res.data.contract.serialNum+'已通过顾问确认,进入交互状态'
                  }
                  this.message.category=1
                  this.message.uid=res.data.contract.uid;
                  message.addMessage(this.message)
              })
            }
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
          getUntreatedCount(this.roles)
        }
      },
      listToform(index){
        this.form.agentId=this.list[index].agentId
        this.form.paidFirstAmount=this.list[index].paidFirstAmount
        this.form.paidFirstAmountDate=this.list[index].paidFirstAmountDate
        this.form.paymentFirstAmount=this.list[index].paymentFirstAmount
        this.form.gatheringFirstAmount=this.list[index].gatheringFirstAmount
        this.form.paidLastAmount=this.list[index].paidLastAmount
        this.form.paidLastAmountDate=this.list[index].paidLastAmountDate
        this.form.paymentLastAmount=this.list[index].paymentLastAmount
        this.form.gatheringLastAmount=this.list[index].gatheringLastAmount
      },
      listToform2(index){
        this.form2.agentId=this.list[index].agentId
        this.form2.paidFirstAmount=this.list[index].paidFirstAmount
        this.form2.paidFirstAmountDate=this.list[index].paidFirstAmountDate
        this.form2.paymentFirstAmount=this.list[index].paymentFirstAmount
        this.form2.gatheringFirstAmount=this.list[index].gatheringFirstAmount
        this.form2.paidLastAmount=this.list[index].paidLastAmount
        this.form2.paidLastAmountDate=this.list[index].paidLastAmountDate
        this.form2.paymentLastAmount=this.list[index].paymentLastAmount
        this.form2.gatheringLastAmount=this.list[index].gatheringLastAmount
      },
      cleanFrom(){
        this.form.account=false
        this.form.agentId=''
        this.form.a_desc=''
        this.form.a_username=''
        this.form.a_date=''
        this.form.inven=false
        this.form.i_desc=''
        this.form.i_username=''
        this.form.i_date=''
        this.form.declara=false
        this.form.d_desc=''
        this.form.d_username=''
        this.form.d_date=''
        this.form.signature=false
        this.form.s_desc=''
        this.form.s_username=''
        this.form.s_date=''
        this.form.lastAmount=0
        this.form.lastamount=''
        this.form.l_desc=''
        this.form.l_username=''
        this.form.l_date=''
        this.form.division=false
        this.form.di_username=''
        this.form.di_date=''
      },
      getHistorys(id){
        history.getHistorys(id)
        .then(res=>{
          let li=res.data.list
          for(let i=0;i<li.length;i++){
            let l=li[i]
            if(l.schedules==1){
              this.form.a_desc=l.describes
              this.form.a_date=l.gmtCreate
              user.getUserInfo(l.uid)
              .then(res=>{
                this.form.a_username= res.data.user.uname
                this.form3=JSON.parse(JSON.stringify(this.form2));
              })
            }
            if(l.schedules==8){
              this.form.di_date=l.gmtCreate
               user.getUserInfo(l.uid)
              .then(res=>{
                this.form.di_username= res.data.user.uname
                this.form3=JSON.parse(JSON.stringify(this.form2));
              })
            }
            if(l.schedules==2){
               this.form.i_desc=l.describes
               this.form.i_date=l.gmtCreate
               user.getUserInfo(l.uid)
              .then(res=>{
                this.form.i_username= res.data.user.uname
                this.form3=JSON.parse(JSON.stringify(this.form2));
              })
            }
            if(l.schedules==3){
               this.form.d_desc=l.describes
               this.form.d_date=l.gmtCreate
                user.getUserInfo(l.uid)
                .then(res=>{
                  this.form.d_username= res.data.user.uname
                  this.form3=JSON.parse(JSON.stringify(this.form2));
                })
            }
            if(l.schedules==5){
               this.form.l_desc=l.describes
               this.form.l_date=l.gmtCreate
               user.getUserInfo(l.uid)
                .then(res=>{
                  this.form.s_username= res.data.user.uname
                  this.form3=JSON.parse(JSON.stringify(this.form2));
                })
            }
            if(l.schedules==4){
               this.form.s_desc=l.describes
               this.form.s_date=l.gmtCreate
               user.getUserInfo(l.uid)
                .then(res=>{
                  this.form.l_username= res.data.user.uname
                  this.form3=JSON.parse(JSON.stringify(this.form2));
                })
            }
          }
          // console.log(this.form)
        })
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
      removeDataById(id,cid){//删除讲师
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
          this.getUntreated(page)
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
        flow.getAwait(this.page,this.limit,this.flowQuery)
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