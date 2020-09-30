<template>
    <div class="app-container">
         <template>
            <div class="box">
                <el-form ref="form" :model="form" style="width:400px" :rules="saveRules2" label-width="80px" v-if="(roles.jurisdiction<1||roles.jurisdiction==6)&&list.schedules==1||((roles.jurisdiction==5||roles.jurisdiction==6)&&list.schedules==1)">
                    <div class="li">
                        <h3>财务审核</h3>
                    </div>
                    <el-form-item label="到款金额"   style="margin-bottom:0px;margin-top:20px;" prop="sumPaidfirstAmount" v-if="list.type==1">
                        <el-input v-model="form.sumPaidfirstAmount" placeholder="请输入到款金额" name="sumPaidfirstAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="到款金额"  style="margin-bottom:0px;margin-top:20px;" prop="paidFirstAmount" v-else>
                        <el-input v-model="form.paidFirstAmount" placeholder="请输入到款金额" name="paidFirstAmount"></el-input>
                    </el-form-item>
                    <span style="font-size:10px;margin-left:245px" v-if="list.lastAmount!=0">到款金额应为:{{list.firstAmount}}</span>
                    <span style="font-size:10px;margin-left:245px" v-if="list.lastAmount==0">到款金额应为:{{list.fullAmount}}</span>
                    <el-form-item label="打款单位"  style="margin-top:10px;" prop="paymentFirstAmount">
                        <el-input v-model="form.paymentFirstAmount" name="paymentFirstAmount" placeholder="请输入打款单位"></el-input>
                    </el-form-item>
                    <el-form-item label="收款单位"  prop="gatheringFirstAmount">
                        <el-select v-model="form.gatheringFirstAmount"  name="gatheringFirstAmount" placeholder="请输入收款单位">
                                <el-option
                                v-for="item in company"
                                :key="item.value"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到款日期" prop="paidFirstAmountDate">
                        <el-date-picker
                        v-model="form.paidFirstAmountDate"
                        type="date"
                        placeholder="选择开始时间"
                        value-format="yyyy-MM-dd"
                        name="paidFirstAmountDate"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-bottom:0px" label="项目到款"  prop="paidFirstAmount" v-if="list.type==1">
                        <el-input v-model="form.paidFirstAmount" name="account" placeholder="请输入项目到款金额"></el-input>
                    </el-form-item>
                    <span style="font-size:10px;margin-left:245px" v-if="list.lastAmount==0&&list.type==1">项目到款应为:{{list.price}}</span>
                    <span style="font-size:10px;margin-left:245px" v-else-if="list.type==1">项目到款应为:{{list.pfirstAmount}}</span>
                    <el-form-item  label="附件上传" style="width:300px;margin:0;margin-top:20px">
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
                </el-form>
                <el-form ref="form" :model="form" :rules="saveRules" label-width="80px" v-else-if="(roles.jurisdiction<1||roles.jurisdiction==6)&&list.schedules==2||((roles.jurisdiction==2||roles.jurisdiction==6)&&list.schedules==2)">
                    <div class="li">
                        <h3 style="left:-20px;top:-10px">流程分案</h3>
                    </div>
                    <el-form-item label="选择代理" prop="agentId">
                        <el-select v-model="form.agentId" style="width:300px" name="agentId" placeholder="请选择代理人">
                                <el-option
                                v-for="item in agent"
                                :key="item.value"
                                :label="item.uname"
                                :value="item.uid">
                                </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form"  :rules="saveRules" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==3||(roles.jurisdiction==4&&list.schedules==3)">
                    <div class="li">
                        <h3 style="left:0px;">清单上传</h3>
                    </div>
                    <el-form-item label="附件上传" >
                        <el-upload
                        style="width:250px"
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
                        <el-button size="small" type="primary"  class="upload">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" style="width:300px" v-model="form.i_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :rules="saveRules" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==4||(roles.jurisdiction==3&&list.schedules==4)">
                    <div class="li" style="height:40px">
                    <h3 v-if="this.list.uporadd!=0">申报材料提供</h3>
                    <h3 v-else>材料补充</h3>
                    </div>
                    <el-form-item style="margin:0px" label="材料确认" prop="lastamount">
                        <el-checkbox-group v-model="form.lastamount">
                            <el-checkbox label="申报材料已移交" name="lastamount"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item style="margin:0px" label="附件上传">
                        <el-upload
                        class="upload-demo"
                        style="width:470px"
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
                        <el-button size="small" type="primary" class="upload">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" style="width:400px" v-model="form.d_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :inline="true" :rules="saveRules2" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==5||(roles.jurisdiction==4&&list.schedules==5)">
                    <div class="li" style="height:40px">
                    <h3 v-if="this.list.uporadd!=1">制作材料</h3>
                    <h3 v-else>材料修改</h3>
                    </div>
                    <el-form-item v-if="this.list.type!=1" style="margin:0px;width:400px" label="材料审核" prop="materials">
                        <el-radio-group fill="#E6A23C" v-model="materials">
                            <el-radio-button  label="通过"></el-radio-button>
                            <el-radio-button  label="撤回"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin:0px;width:400px;margin-top:20px" label="附件上传" >
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
                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input type="textarea" style="width:400px" v-model="form.ia_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :inline="true" :rules="saveRules2" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==6||(roles.jurisdiction==3&&list.schedules==6)">
                    <div class="li" style="height:40px">
                    <h3 >提供盖章材料</h3>
                    </div>
                    <el-form-item style="margin:0px;width:400px" label="材料审核" prop="materials">
                        <el-radio-group fill="#E6A23C" v-model="materials">
                            <el-radio-button  label="通过"></el-radio-button>
                            <el-radio-button  label="撤回"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin:0px;width:400px;margin-top:20px" label="附件上传" >
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
                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input type="textarea" style="width:400px" v-model="form.ia_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :inline="true" :rules="saveRules2" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==7||(roles.jurisdiction==4&&list.schedules==7)">
                    <div class="li" style="height:40px">
                    <h3 v-if="list.type!=1">盖章材料审核</h3>
                    <h3 v-else>管理部门审核</h3>
                    </div>
                    <el-form-item style="margin:0px;width:400px" label="材料审核" prop="materials">
                        <el-radio-group fill="#E6A23C" v-model="materials">
                            <el-radio-button  label="通过"></el-radio-button>
                            <el-radio-button  label="撤回"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin:0px;width:400px;margin-top:20px" label="附件上传" >
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
                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="描述" >
                        <el-input type="textarea" style="width:400px" v-model="form.ia_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :inline="true" :rules="saveRules2" label-width="80px" v-else-if="roles.jurisdiction<1&&list.schedules==8||(roles.jurisdiction==4&&list.schedules==8)">
                    <div class="li">
                    <h3 v-if="list.type!=1">待商务局审查</h3>
                    <h3 v-else>资料审核</h3>
                    </div>
                    <el-form-item  label="审核状态" prop="audit">
                        <el-button type="primary" v-if="form.audit!=-1&&form.audit!=0" @click="form.audit=1" round>审核成功</el-button>
                        <el-button type="info" v-if="form.audit!=1" @click="form.audit=1" round>审核成功</el-button>
                        <el-button type="danger" v-if="form.audit!=-1&&form.audit!=1" @click="form.audit=0" round>审核驳回</el-button>
                        <el-button type="info" v-if="form.audit!=0" @click="form.audit=0" round>审核驳回</el-button>
                    </el-form-item>
                    <el-form-item label="附件上传" style="margin:0px;width:300px" v-if="form.audit==1">
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
                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="附件上传" style="margin:0px;width:300px" v-if="form.audit==0" >
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
                            :file-list="fileList3">
                            <el-button size="small" type="primary" class="upload">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item style="margin-top:10px;margin-bottom:0px;width:500px" label="处理"  v-if="form.audit==0&&this.list.type!=1">
                        <el-select v-model="form.uporadd" name="uporadd" placeholder="请选择处理人">
                                <el-option :label="list.agentName" value="1"></el-option>
                                <el-option :label="list.uname" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-top:10px;margin-bottom:0px;width:500px" label="公告日期"  prop="bulletinTime" v-if="form.audit==1">
                        <el-date-picker
                        style="width:185px"
                        v-model="form.bulletinTime"
                        type="date"
                        placeholder="选择公告日期"
                        value-format="yyyy-MM-dd"
                        name="bulletinTime"
                        >
                        </el-date-picker>
                    </el-form-item>
                    
                    <el-form-item style="margin-top:12px" label="描述" >
                        <el-input type="textarea" style="width:400px" v-model="form.b_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form"  :rules="saveRules" label-width="80px" v-else-if="(roles.jurisdiction==2||roles.jurisdiction<1||roles.jurisdiction==6)&&list.schedules==9">
                    <div class="li">
                    <h3>流程确认</h3>
                    </div>
                    <el-form-item style="margin:0px;margin-top:20px;width:500px" label="信息">
                        <span style="float:left;">代理人:{{list.agentName}}</span>
                        <span style="float:right;">立案时间:{{list.onRecord}}</span>
                    </el-form-item>
                    <el-form-item style="margin:0;margin-top:20px;width:280px" label="浏览">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="click"
                            >
                            <el-table :data="fileList4">
                                <el-table-column width="200"  label="点击选择文件浏览">
                                    <template slot-scope="scop">
                                    <span style="cursor:pointer" @click="browse(scop.row.url[0])" >{{scop.row.name}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="success" size="mini"  >附件浏览</el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item style="margin:0;margin-top:20px;margin-bottom:20px;width:500px" label="确认">
                        <el-checkbox-group v-model="form.end">
                            <el-checkbox label="确认结案" name="end"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" :rules="saveRules" label-width="80px" v-else-if="roles.jurisdiction==3&&list.schedules==10||(roles.jurisdiction<1&&list.schedules==10)">
                    <div class="li">
                    <h3>顾问确认</h3>
                    </div>
                    <el-form-item style="margin:0px;margin-top:20px" label="确认">
                        <el-checkbox-group  v-model="form.signature">
                            <el-checkbox label="已公示" name="signature"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item style="margin:0;margin-top:10px;width:280px" label="浏览">
                        <el-popover
                            placement="right"
                            width="200"
                            trigger="click"
                            >
                            <el-table :data="fileList4">
                                <el-table-column width="200"  label="点击选择文件浏览">
                                    <template slot-scope="scop">
                                    <span style="cursor:pointer" @click="browse(scop.row.url[0])" >{{scop.row.name}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button slot="reference" type="success" class="upload" size="mini"  >附件浏览</el-button>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" style="width:470px" v-model="form.s_desc"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" style="width:400px" :rules="saveRules2" label-width="80px" v-else-if="list.lastAmount!=0&&((roles.jurisdiction<1||roles.jurisdiction==6)&&list.schedules==11||((roles.jurisdiction==5||roles.jurisdiction==6)&&list.schedules==11))">
                    <div class="li">
                    <h3>尾款审核</h3>
                    </div>
                    <el-form-item label="到款金额"   style="margin-bottom:0px;margin-top:20px;" prop="sumPaidLastAmount" v-if="list.type==1">
                        <el-input v-model="form.sumPaidLastAmount" placeholder="请输入到款金额" name="sumPaidLastAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="到款金额"   style="margin-bottom:0px;margin-top:20px;" prop="paidLastAmount" v-else>
                        <el-input v-model="form.paidLastAmount" placeholder="请输入到款金额" name="paidLastAmount"></el-input>
                    </el-form-item>
                    <span style="font-size:10px;margin-left:240px">到款金额应为{{list.lastAmount}}</span>
                    <el-form-item label="打款单位"  style="margin-top:0px" prop="paymentLastAmount">
                        <el-input v-model="form.paymentLastAmount" placeholder="请输入打款单位" name="paymentLastAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="收款单位"  style="margin-top:0px;" prop="gatheringLastAmount">
                        <el-select v-model="form.gatheringLastAmount"  name="gatheringLastAmount" placeholder="请输入收款单位">
                                <el-option
                                v-for="item in company"
                                :key="item.value"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到款日期" style="margin-top:0px;" prop="paidLastAmountDate">
                        <el-date-picker
                        style="width:185px"
                        v-model="form.paidLastAmountDate"
                        type="date"
                        placeholder="选择开始时间"
                        value-format="yyyy-MM-dd"
                        name="paidLastAmountDate"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目到款" style="margin-bottom:0px" prop="paidLastAmount" v-if="list.type==1">
                        <el-input v-model="form.paidLastAmount" placeholder="请输入项目到款金额" name="account"></el-input>
                    </el-form-item>
                    <span style="font-size:10px;margin-left:240px" v-if="list.type==1">项目到款应到{{list.plastAmount}}</span>
                    <el-form-item label="附件上传" style="margin:0;margin-top:0px">
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
                        <el-button size="small" type="primary" class="upload">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item  style="margin-top:20px;margin-bottom:20px" label="描述">
                        <el-input type="textarea" style="width:400px" v-model="form.l_desc"></el-input>
                    </el-form-item>
                </el-form>
                <div class="li" style="margin-bottom:20px" v-else>
                    <h3>无流程需要处理</h3>
                </div>
                <span slot="footer" class="dialog-footer" v-if="list.schedules<12&&no">
                    <el-button type="primary" style="width:200px;height:45px" @click.native.prevent="submit" >提 交</el-button>
                </span>
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
            materials:'通过',
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
                
                
                console.log(this.form.sumPaidlastAmount)
                if(li.inventory==null){
                    this.fileList=[]
                }else{
                    this.list.inventory=JSON.parse(this.list.inventory)
                    this.fileList=this.list.inventory
                }
                this.filesw()
                this.notoper()
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
            if(this.list.schedules==1){
                console.log(this.form.sumPaidLastAmount)
                if((this.form.paidFirstAmount==null||this.form.paidFirstAmount=='')&&this.list.type==1){
                    this.$message({
                    type:'warning',
                    message:'项目到款金额不能为空'
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
                if(this.list.type!=1){
                    if(this.form.paidFirstAmount!=this.list.firstAmount){
                        if(this.list.lastAmount==0){
                            if(this.form.paidFirstAmount!=this.list.fullAmount){
                                this.$message({
                                    type:'warning',
                                    message:'到款金额应该与合同全款金额一致'
                                    })
                                return false
                            }
                        }else{
                            this.$message({
                                type:'warning',
                                message:'到款金额应该与合同首款金额一致'
                                })
                            return false   
                        } 
                    }
                }else{
                    if(this.form.sumPaidfirstAmount!=this.list.firstAmount){                        
                        if(this.list.lastAmount==0){
                            if(this.form.sumPaidfirstAmount!=this.list.fullAmount){
                                this.$message({
                                type:'warning',
                                message:'到款金额应该与合同全款金额一致'
                                })
                            return false
                            }
                        }else{
                             this.$message({
                                type:'warning',
                                message:'到款金额应该与合同首款金额一致'
                                })
                            return false
                        }
                    }
                    
                     if(this.form.paidFirstAmount!=this.list.firstAmount){
                        if(this.list.lastAmount==0){
                            if(this.form.paidFirstAmount!=this.list.price){
                                this.$message({
                                    type:'warning',
                                    message:'项目到款金额应该与合同单价金额一致'
                                    })
                                return false
                            }
                        }else {
                            this.$message({
                                type:'warning',
                                message:'项目到款金额应该与合同首款金额一致'
                                })
                            return false   
                        } 
                    }
                }
                
            }
            if(this.list.schedules==2){
                if(this.form.agentId==''||this.form.agentId==null){
                    this.$message({
                    type:'warning',
                    message:'请选择代理人'
                    })
                    return false
                }
            }
            if(this.list.schedules==3){
                if(!this.isfileupdate){
                    this.$message({
                    type:'warning',
                    message:'必须上传文件'
                    })
                    return false
                }
            }
            if(this.list.schedules==4){
                if(!this.form.lastamount){
                    this.$message({
                    type:'warning',
                    message:'请勾选申报材料已移交'
                    })
                    return false
                }
                
            }
            if(this.list.schedules==5){
                if(this.materials==''){
                    this.$message({
                    type:'warning',
                    message:'选择材料审核情况'
                    })
                    return false
                }
            }
            if(this.list.schedules==6){
                if(this.materials==''){
                    this.$message({
                    type:'warning',
                    message:'选择材料审核情况'
                    })
                    return false
                }
            }
            if(this.list.schedules==7){
                if(this.materials==''){
                    this.$message({
                    type:'warning',
                    message:'选择材料审核情况'
                    })
                    return false
                }
            }
            if(this.list.schedules==8){
                if(this.form.audit<0){
                    this.$message({
                    type:'warning',
                    message:'请选择审核状态'
                    })
                    return false
                }else if(this.form.audit==1){
                    if(this.form.bulletinTime==''){
                        this.$message({
                            type:'warning',
                            message:'请选择公告时间'
                        })
                        return false
                    }
                    if(!this.isfileupdate||(this.fileList2.length==0&&this.form.audit==1)){
                            this.$message({
                            type:'warning',
                            message:'必须上传文件'
                            })
                            return false
                    }
                }else if(this.form.audit==0){
                    if(this.list.type==1){
                        this.form.uporadd=1
                    }else{
                        if(this.form.uporadd==''||this.form.uporadd==null){
                            this.$message({
                                type:'warning',
                                message:'请选择处理人'
                            })
                            return false
                        }
                    }
                    
                }
            }
            if(this.list.schedules==11){
                if(this.form.sumPaidLastAmount==null||this.form.sumPaidLastAmount==''){
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
                if(this.list.type!=1){
                    if(this.form.paidLastAmount!=this.list.lastAmount){
                        this.$message({
                            type:'warning',
                            message:'到款金额应该与合同尾款金额一致'
                            })
                        return false   
                    }
                }else{
                    if(this.form.paidLastAmount!=this.list.plastAmount){
                            this.$message({
                                type:'warning',
                                message:'项目到款金额应该与合同尾款金额一致'
                                })
                            return false   
                    }
                    if(this.form.sumPaidLastAmount!=this.list.lastAmount){
                            this.$message({
                                type:'warning',
                                message:'到款金额应该与合同尾款金额一致'
                                })
                            return false
                    }
                }
            }
            if(this.list.schedules==10){
                if(!this.form.signature){
                    this.$message({
                    type:'warning',
                    message:'请勾选已公示'
                    })
                    return false
                }else{
                    if(this.list.lastAmount==0){
                        this.flow.schedules=this.flow.schedules+1
                    }
                }      
            }
            
            if(this.list.type==1){
                if(this.list.schedules==2){
                    this.flow.schedules=this.flow.schedules+2
                }
                if(this.list.schedules==5){
                    this.flow.schedules=this.flow.schedules+1    
                }
                if(this.list.schedules==7){  
                    if(this.materials=='撤回'){
                        this.flow.schedules=this.flow.schedules-3
                    }
                }
                if(this.list.schedules==8){
                    if(this.form.audit==0){
                        this.flow.schedules=this.flow.schedules-4
                        this.addOrSubtract=1
                    }else{
                        this.addOrSubtract=0
                    }
                }
            }else{
                if(this.list.schedules==6){
                    if(this.materials=='撤回'){
                        this.flow.schedules=this.flow.schedules-2
                    }
                }
                
                if(this.list.schedules==7){
                    if(this.materials=='撤回'){
                        this.flow.schedules=this.flow.schedules-2
                    }
                }else if(this.list.schedules==5){
                    if(this.materials=='撤回'){
                        this.flow.schedules=this.flow.schedules-2
                    }else if(this.list.uporadd==1||this.list.uporadd==0){
                        this.flow.schedules=this.flow.schedules+2
                    }
                }
                if(this.list.schedules==8){
                    if(this.form.audit==0){
                        if(this.form.uporadd==1){
                            this.flow.schedules=this.flow.schedules-4
                        }else{
                            this.flow.schedules=this.flow.schedules-5
                        }
                        this.addOrSubtract=1
                    }else{
                        this.addOrSubtract=0
                    }
                }
                
            }
            
            if(this.list.schedules==9){
                if(!this.form.end){
                    this.$message({
                    type:'warning',
                    message:'请勾选确认结案'
                    })
                    return false
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
                        this.flow.inventory=JSON.stringify(this.fileList)
                    }else {
                        this.flow.inventory='[]'
                    }
                    this.formtoflow()
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
            if(isUpdate==0){
                if(schedules==2){
                    let account={}
                    account.isUpdate=isUpdate
                    account.uid=this.roles.uid
                    account.fid=this.list.fid
                    account.schedules=1
                    account.result=schedules
                    account.describes=this.form.a_desc
                    historys.push(account)
                }
                if(schedules==3){
                    let division={}
                    division.isUpdate=isUpdate
                    division.uid=this.roles.uid
                    division.fid=this.list.fid
                    division.schedules=2
                    division.result=schedules
                    division.describes='分案'
                    historys.push(division)
                }
                if(schedules==4){
                    if(this.materials=="撤回"){
                        let inven={}
                        inven.isUpdate=isUpdate
                        inven.uid=this.roles.uid
                        inven.fid=this.list.fid
                        inven.schedules=5
                        inven.result=schedules
                        inven.describes=this.form.ia_desc
                        historys.push(inven)
                    }else if(this.list.uporadd==0&&this.list.uporadd!=''){
                        let inven={}
                        inven.isUpdate=isUpdate
                        inven.uid=this.roles.uid
                        inven.fid=this.list.fid
                        inven.schedules=8
                        inven.result=schedules
                        inven.describes=this.form.b_desc
                        historys.push(inven)
                    } else{
                        let inven={}
                        inven.isUpdate=isUpdate
                        inven.uid=this.roles.uid
                        inven.fid=this.list.fid
                        inven.schedules=3
                        inven.result=schedules
                        inven.describes=this.form.i_desc
                        historys.push(inven)
                    }
                }
                if(schedules==5){
                    if(this.flow.type!=1){
                        if(this.materials=="撤回"){
                            let inven={}
                            inven.isUpdate=isUpdate
                            inven.uid=this.roles.uid
                            inven.fid=this.list.fid
                            inven.schedules=6
                            inven.result=schedules
                            inven.describes=this.form.ia_desc
                            historys.push(inven)
                        }else if(this.list.uporadd==1){
                            let declara={}
                            declara.isUpdate=isUpdate
                            declara.uid=this.roles.uid
                            declara.fid=this.list.fid
                            declara.schedules=8
                            declara.result=schedules
                            declara.describes=this.form.b_desc
                            historys.push(declara)
                        }else{
                            let declara={}
                            declara.isUpdate=isUpdate
                            declara.uid=this.roles.uid
                            declara.fid=this.list.fid
                            declara.schedules=4
                            declara.result=schedules
                            declara.describes=this.form.d_desc
                            historys.push(declara)
                        }
                    }else{
                        if(this.materials=="撤回"){
                            let inven={}
                            inven.isUpdate=isUpdate
                            inven.uid=this.roles.uid
                            inven.fid=this.list.fid
                            inven.schedules=7
                            inven.result=schedules
                            inven.describes=this.form.ia_desc
                            historys.push(inven)
                        }else if(this.list.uporadd==1){
                            let declara={}
                            declara.isUpdate=isUpdate
                            declara.uid=this.roles.uid
                            declara.fid=this.list.fid
                            declara.schedules=8
                            declara.result=schedules
                            declara.describes=this.form.b_desc
                            historys.push(declara)
                        }else{
                            let declara={}
                            declara.isUpdate=isUpdate
                            declara.uid=this.roles.uid
                            declara.fid=this.list.fid
                            declara.schedules=2
                            declara.result=schedules
                            declara.describes='分案'
                            historys.push(declara)
                        }
                    }
                }
                    
                if(schedules==6){
                    if(this.materials=="撤回"){
                        let inven={}
                        inven.isUpdate=isUpdate
                        inven.uid=this.roles.uid
                        inven.fid=this.list.fid
                        inven.schedules=7
                        inven.result=schedules
                        inven.describes=this.form.ia_desc
                        historys.push(inven)
                    }else{
                        let declara={}
                        declara.isUpdate=isUpdate
                        declara.uid=this.roles.uid
                        declara.fid=this.list.fid
                        declara.schedules=5
                        declara.result=schedules
                        declara.describes=this.form.ia_desc
                        historys.push(declara)
                    }
                }
                if(schedules==7){
                    if(this.list.type!=1){
                        let inven={}
                        inven.isUpdate=isUpdate
                        inven.uid=this.roles.uid
                        inven.fid=this.list.fid
                        inven.schedules=6
                        inven.result=schedules
                        inven.describes=this.form.ia_desc
                        historys.push(inven)
                    }else{
                        let declara={}
                        declara.isUpdate=isUpdate
                        declara.uid=this.roles.uid
                        declara.fid=this.list.fid
                        declara.schedules=5
                        declara.result=schedules
                        declara.describes=this.form.ia_desc
                        historys.push(declara)
                    }
                }
                if(schedules==8){
                    if(this.flow.type!=1){
                         if(this.addOrSubtract==1){
                            if(this.list.uporadd==1){
                                let declara={}
                                declara.isUpdate=isUpdate
                                declara.uid=this.roles.uid
                                declara.fid=this.list.fid
                                declara.schedules=5
                                declara.result=schedules
                                declara.describes=this.form.ia_desc
                                historys.push(declara)
                            }else{
                                let declara={}
                                declara.isUpdate=isUpdate
                                declara.uid=this.roles.uid
                                declara.fid=this.list.fid
                                declara.schedules=4
                                declara.result=schedules
                                declara.describes=this.form.d_desc
                                historys.push(declara)
                            }
                        }else{
                            let declara={}
                            declara.isUpdate=isUpdate
                            declara.uid=this.roles.uid
                            declara.fid=this.list.fid
                            declara.schedules=7
                            declara.result=schedules
                            declara.describes=this.form.ia_desc
                            historys.push(declara)
                        }
                    }else{
                        let declara={}
                        declara.isUpdate=isUpdate
                        declara.uid=this.roles.uid
                        declara.fid=this.list.fid
                        declara.schedules=7
                        declara.result=schedules
                        declara.describes=this.form.ia_desc
                        historys.push(declara)
                    }
                   
                }
                if(schedules==10){
                    let declara={}
                    declara.isUpdate=isUpdate
                    declara.uid=this.roles.uid
                    declara.fid=this.list.fid
                    declara.schedules=9
                    declara.result=schedules
                    declara.describes=''
                    historys.push(declara)
                }
                if(schedules==9){
                    let declara={}
                    declara.isUpdate=isUpdate
                    declara.uid=this.roles.uid
                    declara.fid=this.list.fid
                    declara.schedules=8
                    declara.result=schedules
                    declara.describes=this.form.b_desc
                    historys.push(declara)
                }
                if(schedules==11){
                    let declara={}
                    declara.isUpdate=isUpdate
                    declara.uid=this.roles.uid
                    declara.fid=this.list.fid
                    declara.schedules=10
                    declara.result=schedules
                    declara.describes=this.form.s_desc
                    historys.push(declara)
                }
                if(schedules==12){
                    if(this.list.lastAmount==0){
                        let declara={}
                        declara.isUpdate=isUpdate
                        declara.uid=this.roles.uid
                        declara.fid=this.list.fid
                        declara.schedules=10
                        declara.result=schedules
                        declara.describes=this.form.s_desc
                        historys.push(declara)
                    }else{
                         let declara={}
                        declara.isUpdate=isUpdate
                        declara.uid=this.roles.uid
                        declara.fid=this.list.fid
                        declara.schedules=11
                        declara.result=schedules
                        declara.describes=this.form.l_desc
                        historys.push(declara)
                    }
                }
            }else{
                
            }
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
            if(this.list.lastAmount==0){
                this.form.sumPaidFirstAmount=this.list.fullAmount
            }
            else
            this.form.sumPaidFirstAmount=this.list.firstAmount
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