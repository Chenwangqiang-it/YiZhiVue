<template>
    <div class="app-container">
         <div class="block" style="padding:10px;width:600px">
            <el-timeline>
                <el-timeline-item 
                placement="top"
                color="#0bbd87">
                    <el-card @click.native="info(0)">
                        <h4>发起立案<span style="float:right;color:#0bbd87">成功</span></h4>
                        <p>立案时间:{{gmtCreate}}<span style="float:right">立案人:{{fname}}</span></p>
                        描述:<pre>{{describes}}</pre>
                    </el-card>
                </el-timeline-item>
                
                <el-timeline-item 
                v-for="(lists,index) in list"
                :key="index"
                :timestamp="lists.gmtCreate"
                placement="top"
                color="#0bbd87"
                v-if="lists.schedules!=0"
                >
                    <el-card @click.native="info(index)">
                        <i v-if="lists.schedules==20&&(roles.jurisdiction==4||roles.jurisdiction==0)" class="el-icon-edit update" @click.stop="update(index)"></i>
                        <h4 v-if="lists.schedules==1">财务审核<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==2">流程分案<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==3">清单上传<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==4">申报材料提供<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==5&& lists.result==8">材料制作<span style="float:right;color:#0bbd87">已报送商务局</span></h4>
                        <h4 v-if="lists.schedules==5&& lists.result==7">材料制作<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==5&& lists.result==6">材料制作<span style="float:right;color:#0bbd87">已制作</span></h4>
                        <h4 v-else-if="lists.schedules==5 && lists.result==4">材料制作<span style="float:right;color:#ec2303">撤回</span></h4>

                        <h4 v-if="lists.schedules==6&& lists.result==7">盖章材料提供<span style="float:right;color:#0bbd87">已提供</span></h4>
                        <h4 v-else-if="lists.schedules==6 && lists.result==5">盖章材料提供<span style="float:right;color:#ec2303">撤回</span></h4>

                        <h4 v-if="lists.schedules==7 && lists.result==8 &&list[0].type!=1">盖章材料审核<span style="float:right;color:#0bbd87">已报送商务局</span></h4>
                        <h4 v-else-if="lists.schedules==7 && lists.result==6 &&list[0].type!=1">盖章材料审核<span style="float:right;color:#ec2303">撤回</span></h4>

                        <h4 v-else-if="lists.schedules==7 && lists.result==5 &&list[0].type==1">管理部门审核<span style="float:right;color:#ec2303">撤回</span></h4>
                        <h4 v-else-if="lists.schedules==7 && lists.result==8 &&list[0].type==1">管理部门审核<span style="float:right;color:#0bbd87">审核通过</span></h4>

                        <h4 v-if="lists.schedules==8 &&list[0].type!=1">已报送商务局
                            <span style="float:right;color:#0bbd87" v-if="lists.result==9">已公示</span>
                            <span style="float:right;color:#ec2303" v-else>驳回</span>
                        </h4>
                        <h4 v-if="lists.schedules==8&&list[0].type==1">材料审核
                            <span style="float:right;color:#0bbd87" v-if="lists.result==9">已公示</span>
                            <span style="float:right;color:#ec2303" v-else>驳回</span>
                        </h4>
                        <h4 v-if="lists.schedules==13">中期到款<span style="float:right;color:#0bbd87">已确认</span></h4>
                        <h4 v-if="lists.schedules==11">尾款确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                        <h4 v-if="lists.schedules==9">流程确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                        <h4 v-if="lists.schedules==10">顾问确认<span style="float:right;color:#0bbd87">已公示</span></h4>
                        <h4 v-if="lists.schedules==12">交付<span style="float:right;color:#0bbd87">已公示</span></h4>
                        <h4 v-if="lists.schedules==40">发起撤案<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==41&&lists.result==42">撤案材料审核<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==41&&lists.result!=42">撤案材料审核<span style="float:right;color:#ec2303">撤回</span></h4>
                        <h4 v-if="lists.schedules==42&&lists.result==43">管理审核<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==42&&lists.result!=43">管理审核<span style="float:right;color:#ec2303">撤回</span></h4>
                        <h4 v-if="lists.schedules==43&&lists.result==44">流程审核<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==43&&lists.result!=44">流程审核<span style="float:right;color:#ec2303">撤回</span></h4>
                        <h4 v-if="lists.schedules==44&&lists.result==45">退款审核<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==44&&lists.result!=45">退款审核<span style="float:right;color:#ec2303">撤回</span></h4>
                        <h4 v-if="lists.schedules==45">已撤案<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==20&&lists.result==20">{{lists.title}}<span style="float:right;color:#0bbd87">成功</span></h4>
                        <h4 v-if="lists.schedules==20&&lists.result==21">{{lists.title}}<span style="float:right;color:#ec2303">失败</span></h4>
                        <h4 v-if="lists.schedules==19">文件上传<span style="float:right;color:#0bbd87">成功</span></h4>
                        <p>操作者:{{lists.uname}}</p>
                        <p v-if="lists.schedules==2">代理人:{{lists.agentName}}</p>
                        描述:<pre v-if="lists.schedules!=19">{{lists.describes}}</pre>
                        <p v-else>上传文件:
                            <el-link :href="li.url" target="_blank" v-for="(li,index2) in lists.describes" :key="index2">{{li.name}}</el-link>
                        </p>
                        <!-- <p v-if="lists.schedules==6&&lists.result!=7">
                            处理人:<span v-if="lists.result==5">{{lists.agentName}}(代理人)</span>
                                <span v-else>{{lists.uname}}(顾问)</span>
                        </p> -->
                        <el-collapse @click.native.stop="doSomething()" v-if="lists.schedules==1">
                            <el-collapse-item title="更多" name="1">
                                <p>付款金额:{{lists.paidFirstAmount}}</p>
                                <p>付款日期:{{lists.paidFirstAmountDate}}</p>
                                <p>付款方:{{lists.paymentFirstAmount}}</p>
                                <p>收款方:{{lists.gatheringFirstAmount}}</p>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @click.native.stop="doSomething()" v-if="lists.schedules==13">
                            <el-collapse-item title="更多" name="1">
                                <p>付款金额:{{lists.paidInterimAmount}}</p>
                                <p>付款日期:{{lists.paidInterimAmountDate}}</p>
                                <p>付款方:{{lists.paymentInterimAmount}}</p>
                                <p>收款方:{{lists.gatheringInterimAmount}}</p>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @click.native.stop="doSomething()" v-if="lists.schedules==40">
                            <el-collapse-item title="更多" name="1">
                                <p>退款金额:{{lists.reAmount}}</p>
                                <p>退款方:{{lists.reCompany}}</p>
                                <p>收款方:{{lists.reReceive}}</p>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @click.native.stop="doSomething()" v-if="lists.schedules==44">
                            <el-collapse-item title="更多" name="1">
                                <p>退款日期:{{lists.reDate}}</p>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @click.native.stop="doSomething()" v-if="lists.schedules==11">
                            <el-collapse-item title="更多" name="1">
                                <p>付款金额:{{lists.paidLastAmount}}</p>
                                <p>付款日期:{{lists.paidLastAmountDate}}</p>
                                <p>付款方:{{lists.paymentLastAmount}}</p>
                                <p>收款方:{{lists.gatheringLastAmount}}</p>
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item 
                v-if="roles.jurisdiction==4||roles.jurisdiction==0"
                placement="top"
                color="#0bbd87">
                    <el-card @click.native="dialogVisible=true;history={}">
                        <h4 style="margin:0px">添加流程<span class="addHistory"><i class="el-icon-plus" @click="dialogVisible=true;history={}"></i></span></h4>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item 
                placement="top"
                color="#0bbd87">
                    <el-card>
                        <h4 v-if="result==null">财务审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==2">流程分案<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==3">清单上传<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==4">申报材料提供<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==5">材料制作<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==6">盖章材料提供<span style="float:right;color:#909399">待提供</span></h4>
                        <h4 v-if="result==7&&list[0].type!=1">盖章材料审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==7&&list[0].type==1">管理部门审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==8&&list[0].type!=1">已报送商务局<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==8&&list[0].type==1">材料审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==9">流程确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==10">顾问确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==11">尾款确认<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==12">已交付<span style="float:right;color:#0bbd87">完成交付</span></h4>
                        <h4 v-if="result==40">发起撤案<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==41">撤案资料审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==42">管理审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==43">流程审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==44">退款审核<span style="float:right;color:#909399">待审查</span></h4>
                        <h4 v-if="result==45">已撤案<span style="float:right;color:#0bbd87">完成撤案</span></h4>
                        <p></p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-dialog
            title="修改记录"
            :visible.sync="dialogVisible2"
            width="500px"
            >
            <el-form ref="history" :model="history" label-width="80px">
                <el-form-item label="记录状态">
                    <el-switch
                    v-model="value1"
                    active-text="成功"
                    inactive-text="失败">
                    </el-switch>
                </el-form-item>
                <el-form-item label="记录标题">
                    <el-input v-model="history.title"></el-input>
                </el-form-item>
                <el-form-item label="记录描述">
                    <el-input type="textarea" v-model="history.describes"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary"  @click="onUpdate(hid)">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog
            title="记录信息"
            :visible.sync="dialogVisible3"
            width="500px"
            >
            <el-form ref="history" :model="history" label-width="80px">
                <el-form-item label="记录状态">
                    <el-switch
                    disabled
                    v-model="value1"
                    active-text="成功"
                    inactive-text="失败">
                    </el-switch>
                </el-form-item>
                <el-form-item label="记录标题">
                    <el-input disabled v-model="history.title"></el-input>
                </el-form-item>
                <el-form-item label="记录描述">
                    <el-input type="textarea" disabled v-model="history.describes"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">确定</el-button>
            </span>
            </el-dialog>
            <el-dialog
            title="自定义记录"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <el-form ref="history" :model="history" label-width="80px">
                <el-form-item label="记录状态">
                    <el-switch
                    v-model="value1"
                    active-text="成功"
                    inactive-text="失败">
                    </el-switch>
                </el-form-item>
                <el-form-item label="记录标题">
                    <el-input v-model="history.title"></el-input>
                </el-form-item>
                <el-form-item label="记录描述">
                    <el-input type="textarea" v-model="history.describes"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="onSubmit()">确 定</el-button>
            </span>
            </el-dialog>
        </div>
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
        return{
            hid:'',
            value1:true,
            list:{},
            result:'',
            gmtCreate:'',
            fname:'',
            describes:'',
            dialogVisible:false,
            dialogVisible2:false,
            dialogVisible3:false,
            history: {
                hid:'',
                uid:'',
                fid:'',
                schedules:'',
                describes:'',
                result:'',
                title:''
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
        doSomething(){
            console.log("ssss")
        },
        info(i){
            let l=this.list[i];
            if(l.schedules==0){
                this.history.title="发起立案"
                this.value1=true
            }else if(l.schedules==1){
                this.history.title="财务审核"
                this.value1=true
            }else if(l.schedules==2){
                this.history.title="流程分案"
                this.value1=true
            }else if(l.schedules==3){
                this.history.title="清单上传"
                this.value1=true
            }else if(l.schedules==4){
                this.history.title="申报材料提供"
                this.value1=true
            }else if(l.schedules==5&&l.result!=4){
                this.history.title="材料制作"
                this.value1=true
            }else if(l.schedules==5&&l.result==4){
                this.history.title="材料制作"
                this.value1=false
            }else if(l.schedules==6&&l.result==7){
                this.history.title="盖章材料提供"
                this.value1=true
            }else if(l.schedules==6&&l.result==5){
                this.history.title="盖章材料提供"
                this.value1=false
            }else if(l.schedules==7&&l.result==8&&list[0].type!=1){
                this.history.title="盖章材料审核"
                this.value1=true
            }else if(l.schedules==7&&l.result==6&&list[0].type!=1){
                this.history.title="盖章材料审核"
                this.value1=false
            }else if(l.schedules==7&&l.result==5&&list[0].type==1){
                this.history.title="盖章材料审核"
                this.value1=false
            }else if(l.schedules==7&&l.result==8&&list[0].type==1){
                this.history.title="盖章材料审核"
                this.value1=true
            }else if(l.schedules==8&&list[0].type!=1){
                this.history.title="已报送商务局"
                this.value1=true
            }else if(l.schedules==8&&list[0].type==1){
                this.history.title="材料审核"
                this.value1=true
            }else if(l.schedules==9&&list[0].type==1){
                this.history.title="流程确认"
                this.value1=true
            }else if(l.schedules==10&&list[0].type==1){
                this.history.title="顾问确认"
                this.value1=true
            }else if(l.schedules==11&&list[0].type==1){
                this.history.title="尾款确认"
                this.value1=true
            }else if(l.schedules==13&&list[0].type==1){
                this.history.title="中期付款"
                this.value1=true
            }else if(l.schedules==12&&list[0].type==1){
                this.history.title="交付"
                this.value1=true
            }else if(l.schedules==20){
                this.history.title=this.list[i].title
                if(this.list[i].result==20){
                    this.value1=true
                }else if(this.list[i].result==21){
                    this.value1=false
                }
            }else if(l.schedules==41&&l.result==42){
                this.history.title="撤案材料审核"
                this.value1=true
            }else if(l.schedules==41&&list[0].type!=42){
                this.history.title="撤案材料审核"
                this.value1=false
            }else if(l.schedules==42&&l.result==43){
                this.history.title="管理审核"
                this.value1=true
            }else if(l.schedules==42&&list[0].type!=43){
                this.history.title="管理审核"
                this.value1=false
            }else if(l.schedules==43&&l.result==44){
                this.history.title="流程审核"
                this.value1=true
            }else if(l.schedules==44&&list[0].type!=44){
                this.history.title="流程审核"
                this.value1=false
            }else if(l.schedules==44&&l.result==45){
                this.history.title="退款审核"
                this.value1=true
            }else if(l.schedules==43&&list[0].type!=45){
                this.history.title="退款审核"
                this.value1=false
            }else if(l.schedules==45){
                this.history.title="已撤案"
                this.value1=false
            }
            this.history.describes=this.list[i].describes
            this.dialogVisible3=true
            
        },
        update(i){
            this.history.describes=this.list[i].describes
            this.history.title=this.list[i].title
            this.history.fid=this.list[i].fid
            if(this.list[i].result==20){
                this.value1=true
            }else if(this.list[i].result==21){
                this.value1=false
            }
            this.dialogVisible2=true;
            this.hid=this.list[i].hid
        },
        onSubmit() {
            let historys=[];
            // this.history.describes = (this.history.describes).replace(/\n|\r\n/g, "\\n");
            this.history.uid=this.roles.uid
            this.history.fid=this.list[0].fid
            this.history.hid=null
            this.history.schedules=20
            if(this.value1){
                this.history.result=20
            }else{
                this.history.result=21
            }
            historys.push(this.history)
            history.addHistory(historys)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'添加成功'
                })
                this.getList(this.history.fid)
                this.dialogVisible = false
            })
        },
        onUpdate(hid){
            this.history.uid=this.roles.uid
            this.history.hid=hid
            if(this.value1){
                this.history.result=20
            }else{
                this.history.result=21
            }
            history.updateHistory(this.history)
            .then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.getList(this.history.fid)
                this.dialogVisible2 = false
            })
        },
        init(){
            let fid=this.$route.params.id
            this.getList(fid)
        },
        getList(id){
            history.getHistorysByfid(id)
            .then(res=>{
                this.list=res.data.list
                console.log(this.list)
                for(let i=this.list.length-1;i>-1;i--){
                    if(this.list[i].schedules!=20){
                        this.result=this.list[i].result
                        break;
                    }
                }
                // console.log(this.list[0].result==1)
                // console.log(this.list[0].gmtCreate)
                this.gmtCreate=this.list[0].gmtCreate
                this.fname=this.list[0].fname
                this.describes=this.list[0].describes
                for(let i=0;i<this.list.length;i++){
                    if(this.list[i].schedules==19){
                        this.list[i].describes=JSON.parse(this.list[i].describes)
                    }
                    
                }
            })
        }
    }

}
</script>
<style>
    pre{
       font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
       /* width: 470px; */
       /* display:inline; */
        white-space: pre-wrap;       /* CSS-3 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        Word-wrap: break-word;
    }
    p {
         word-wrap:break-word; 
    }
    .el-dialog__body{
        padding-bottom:0px;
        padding-top:0px
    }
    .el-textarea textarea{
        height:80px;
    }
    .addHistory{
        float:right;
        color:#909399;
        cursor: pointer;
    }
    .app-container{
        padding: 0%;
    }
    i:hover{
        color:#409EFF
    }
    .el-input.is-disabled .el-input__inner{
        cursor: text;
    }
    .el-textarea.is-disabled .el-textarea__inner{
        cursor: text;
    }
    .update{
        cursor: pointer;
        position: relative;
        top: -10px;
        left: 5px;
        float:right
    }
    .el-card{
        cursor: pointer;
        transition: all 0.2s ease-in;
    }
    .el-card:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
    }
</style>