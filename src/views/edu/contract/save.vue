<template>
    <div class="container" >
        <!-- style="background:url('https://yizhitexu.oss-cn-beijing.aliyuncs.com/static/C-_Users_Administrator_Desktop_015d2558a41a52a801219c77beada7.png?Expires=1595581922&OSSAccessKeyId=TMP.3KdxaS95SjhR1H6swiTgEucqwtFyWXiRitrSDbpDdt3iLFKQichwqG9Ww2SBoi2equJ4svaYg1di6L89J9My1ZNv6c3rQf&Signature=mg%2BGmsQ8VHrFqixnT%2Fy8kcthqrQ%3D')" -->
         <template>
            <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px" >
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    合同信息填写
                    <div style="float:right;position: relative;top:-20px">
                        <!-- <el-button type="primary" style="width:70px;height:30px;font-size:12px;text-">主要按钮</el-button> -->
                        <div class="reData" @click="recommit">清空数据</div>
                        <el-switch
                        v-model="value1"
                        inactive-text="保存数据">
                        </el-switch>
                    </div>
                </div>
                <div class="libox">
                    <div class="li">
                        <h3 >特许人基本信息
                            <div class="show" @click="isShow(0)" style="position: relative;left:97px">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.info">
                            <el-form-item label="公司全称"  prop="companyName" >
                                <el-input :disabled="!infoOrAdd" name="companyName" v-model="contract.companyName" placeholder="公司全称"></el-input>
                            </el-form-item>
                            <el-form-item label="经办人姓名" prop="respName" >
                                <el-input :disabled="!infoOrAdd" name="respName" v-model="contract.respName" placeholder="经办人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone" >
                                <el-input :disabled="!infoOrAdd"  name="phone" v-model="contract.phone" placeholder="联系电话"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮件" prop="email" >
                                <el-input :disabled="!infoOrAdd" name="email" v-model="contract.email" placeholder="电子邮件"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称" prop="trade" >
                                <el-input :disabled="!infoOrAdd" name="trade" v-model="contract.trade" placeholder="备案项目名称"></el-input>
                            </el-form-item>
                            <el-form-item label="经办人职位" prop="respPost" >
                                <el-input :disabled="!infoOrAdd" name="respPost" v-model="contract.respPost" placeholder="经办人职位"></el-input>
                            </el-form-item>
                            <el-form-item label="公司地址"  prop="companyAddrss" >
                                <el-input :disabled="!infoOrAdd" name="companyAddrss" v-model="contract.companyAddrss" placeholder="公司地址"></el-input>
                            </el-form-item>
                            <!-- <div></div> -->
                            <el-form-item label="公司座机" >
                                <el-input :disabled="!infoOrAdd" name="speialPlane" v-model="contract.speialPlane" placeholder="公司座机"></el-input>
                            </el-form-item>
                            <el-form-item label="公司网址" >
                                <el-input :disabled="!infoOrAdd" name="url" v-model="contract.url" placeholder="公司网址"></el-input>
                            </el-form-item>
                        <!-- <div></div> -->
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                        <h3>时间
                            <div class="show" @click="isShow(1)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <!-- <el-form-item label="品牌名称" prop="brandName">
                        <el-input  name="brandName" v-model="contract.brandName"  placeholder="品牌名称"></el-input>
                    </el-form-item> -->
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.time">
                            <el-form-item label="预计月数" prop="anticMonths">
                            <el-input-number :disabled="!infoOrAdd" name="anticMonths"  v-model="contract.anticMonths" :min="1" :max="100" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                    <h3>金额
                        <div class="show" @click="isShow(2)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.money">
                            <el-form-item label="付款方式" >
                            <el-select :disabled="!infoOrAdd"  v-model="paymentType" placeholder="请选择付款方式">
                                <el-option label="全额付款" :value="1"></el-option>
                                <el-option label="分期付款" :value="2"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-form-item >
                            <el-select :disabled="!infoOrAdd"  v-model="installmentType"  v-if="paymentType==2" placeholder="请选择付款方式">
                                <el-option label="二期付款" :value="1"></el-option>
                                <el-option label="三期付款" :value="2"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-form-item  v-if="paymentType==2&&installmentType==2">
                                <el-upload
                                v-if="infoOrAdd"
                                style="float:left"
                                class="upload-demo"
                                :action="BASE_API+'/eduservice/state/upcontract'"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="fileUploadSuccess"
                                :before-upload="fileUpload"
                                multiple
                                :limit="1"
                                :show-file-list=false
                                :file-list="filelist">
                                    <el-button size="small" style="background-color:#409EFF;color:#fff;margin-bottom:20px">合同上传</el-button>
                                </el-upload>
                                <div style="float:left;margin-left:5px" v-if="fileUploading">
                                    <i class="el-icon-loading"></i>    
                                </div>
                                <div style="float:left;margin-left:20px" v-if="filelist.length!=0">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            合同列表<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-for="(filelist,i) in filelist" :key="filelist.value">
                                                <el-link @click="dowload(filelist.response.data.url[i])" type="primary">{{filelist.name}}</el-link>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </el-form-item>
                            
                            <div v-if="paymentType==2"></div>
                            <el-form-item label="全款金额" prop="fullAmount">
                                <el-input :disabled="!infoOrAdd" name="fullAmount" v-model="contract.fullAmount" placeholder="全款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                <el-input :disabled="!infoOrAdd" name="firstAmount" v-model="contract.firstAmount" placeholder="首款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="中期金额" v-if="paymentType==2&&installmentType==2" prop="interimAmount">
                                <el-input :disabled="!infoOrAdd" name="interimAmount" v-model="contract.interimAmount" placeholder="首款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="尾款金额" v-if="paymentType==2" prop="lastAmount">
                                <el-input :disabled="!infoOrAdd" name="lastAmount" v-model="contract.lastAmount" placeholder="尾款金额"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                        <h3 style="margin-bottom:15px">直营店情况
                            <div class="show" @click="isShow(3)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.shop">
                            <h4 style="margin-bottom:15px;">直营店1</h4>
                            <el-form-item label="直营店全称" prop="dssOne">
                                <el-input :disabled="!infoOrAdd" name="dssOne" v-model="contract.dssOne" placeholder="直营店全称"></el-input>
                            </el-form-item>
                            <el-form-item label="成立日期" prop="estabDateOne">
                                <el-popover
                                placement="bottom"
                                width="200"
                                trigger="manual"
                                v-model="visible1">
                                <p><i class="el-icon-info"></i>您所选年限距今不满足1年，是否继续？</p>
                                <el-button class="upload" size="mini" @click="visible1=false" style="float:right">确认</el-button>
                                    <el-date-picker
                                        :disabled="!infoOrAdd"
                                        slot="reference"
                                        v-model="contract.estabDateOne"
                                        type="date"
                                        placeholder="选择开始时间"
                                        value-format="yyyy-MM-dd"
                                        name="estabDateOne"
                                        style=" border:1px solid orange;"
                                        @change="vis1()"
                                        v-if="visible1"
                                        >
                                        </el-date-picker>
                                        <el-date-picker
                                        :disabled="!infoOrAdd"
                                        slot="reference"
                                        v-model="contract.estabDateOne"
                                        type="date"
                                        placeholder="选择开始时间"
                                        value-format="yyyy-MM-dd"
                                        name="estabDateOne"
                                        @change="vis1()"
                                        v-else
                                        >
                                        </el-date-picker>
                                </el-popover>
                                                <!-- <el-input v-model="contract.estadateone" placeholder="成立日期"></el-input> -->
                            </el-form-item>
                            <el-form-item label="经营地址" prop="addressOne">
                                <el-input  :disabled="!infoOrAdd" name="addressOne" v-model="contract.addressOne" placeholder="经营地址"></el-input>
                            </el-form-item>
                            <h4 style="margin-bottom:15px;">直营店2</h4>
                            <el-form-item label="直营店全称" prop="dssTwo">
                                <el-input :disabled="!infoOrAdd" name="dssTwo" v-model="contract.dssTwo" placeholder="直营店全称"></el-input>
                            </el-form-item>
                            <el-form-item label="成立日期" prop="estabDateTwo">
                                <el-popover
                                placement="bottom"
                                width="200"
                                trigger="manual"
                                v-model="visible2">
                                <i class="el-icon-info"></i>
                                <p>您所选年限距今不满足1年，是否继续？</p>
                                <el-button class="upload" size="mini" @click="visible2=false" style="float:right">确认</el-button>
                                    <el-date-picker
                                        :disabled="!infoOrAdd"
                                        name="estabDateTwo"
                                        slot="reference"
                                        v-model="contract.estabDateTwo"
                                        type="date"
                                        placeholder="选择开始时间"
                                        value-format="yyyy-MM-dd"
                                        style=" border:1px solid orange;"
                                        v-if="visible2"
                                        @change="vis2()"
                                        />
                                        <el-date-picker
                                        :disabled="!infoOrAdd"
                                        name="estabDateTwo"
                                        slot="reference"
                                        v-model="contract.estabDateTwo"
                                        type="date"
                                        placeholder="选择开始时间"
                                        value-format="yyyy-MM-dd"
                                        @change="vis2()"
                                        v-else
                                        />
                                </el-popover>
                                <!-- <el-input v-model="contract.estadatetwo" placeholder="成立日期"></el-input> -->
                            </el-form-item>
                            <el-form-item label="经营地址" prop="addressTwo">
                                <el-input :disabled="!infoOrAdd" name="addressTwo" v-model="contract.addressTwo" placeholder="经营地址"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li" >
                    <h3 style="margin-bottom:15px">知识产权
                         <div class="show" @click="isShow(4)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms"  style="margin-top:20px" v-show="show.right">
                            <el-form v-for="(item,j) in right" :key="item.index" :model="item" :rules="saveRules">
                                <h5 style="margin:0px;height:20px;margin-bottom:0px;margin-left:10px">
                                    <h4 style="float:left;margin:0px">类型{{j+1}}:</h4>
                                    <div style="float:right;margin-right:20px" v-if="infoOrAdd&&j!=0">
                                        <el-link type="danger" @click="removeLi(j)" style="height:20px">删除类型-</el-link>
                                    </div>
                                </h5>
                                <el-form-item  label="权利类型" prop="type">
                                    <el-select :disabled="!infoOrAdd" v-model="item.type" filterable placeholder="请选择">
                                        <el-option
                                        v-for="item in type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="权利号" prop="value">
                                    <!-- oninput="value=value.replace(/[^\d]/g,'')" -->
                                    <el-input 
                                        :disabled="!infoOrAdd"
                                        name="brand"
                                        v-model="item.value"
                                        placeholder="权利号">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="权利性质" prop="pproperty">
                                    <el-select :disabled="!infoOrAdd" v-model="item.pproperty" filterable placeholder="请选择">
                                        <el-option label="所有权" value="所有权"></el-option>
                                        <el-option label="使用权" value="使用权"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="权利期限" v-if="item.type=='2'&&infoOrAdd">
                                    <el-date-picker
                                    v-model="item.pbegin"
                                    type="date"
                                    format="yyyy.MM.dd"
                                    value-format="yyyy.MM.dd"
                                    placeholder="请选择开始日期">
                                    </el-date-picker>
                                    --
                                    <el-date-picker
                                    v-model="item.pend"
                                    type="date"
                                    format="yyyy.MM.dd"
                                    value-format="yyyy.MM.dd"
                                    placeholder="请选择结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="权利期限" prop="pbegin" v-else-if="infoOrAdd">
                                    <el-date-picker
                                    v-model="item.pbegin"
                                    type="date"
                                    value-format="yyyy.MM.dd"
                                    format="yyyy.MM.dd"
                                    placeholder="请选择开始日期">
                                    </el-date-picker>
                                    --
                                    <el-date-picker
                                    v-model="item.pend"
                                    type="date"
                                    format="yyyy.MM.dd"
                                    value-format="yyyy.MM.dd"
                                    placeholder="请选择结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="权利期限"  v-if="!infoOrAdd">
                                    <span >{{item.pbegin}}-{{item.pend}}</span>
                                </el-form-item>
                                <el-form-item v-if="j==right.length-1" style="float:right;margin-right:20px" >
                                    <el-link @click="addRight()" type="primary" style="height:20px" v-if="infoOrAdd">添加类型+</el-link>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                    <h3 style="margin-bottom:15px">提交信息
                        <div class="show" @click="isShow(5)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                    <div class="lifroms" v-show="show.commit">
                        <h4 style="margin-bottom:15px">描述信息</h4>
                        <el-form-item style="margin:0px;margin-left:32px">
                            <el-input
                            :disabled="!infoOrAdd"
                            style="width:300px"
                            type="textarea"
                            placeholder="请输入描述信息"
                            v-model="contract.msg">
                            </el-input>
                        </el-form-item>
                        <div></div>
                        <el-form-item >
                            <el-button type="primary"  @click.native.prevent="commit()" v-if="!loading&&infoOrAdd">提交</el-button>
                            <el-button disabled type="primary" v-if="loading">提交</el-button>
                        </el-form-item>
                        <div></div>
                        <el-form-item style="color:aliceblue" v-if="loading">
                            正在上传
                            <i class="el-icon-loading"></i>
                        </el-form-item>
                    </div>
                    </el-collapse-transition>
                </div>
            </el-form>
         </template>
    </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/base.css';
import { mapGetters } from 'vuex'
import contract from '@/api/edu/contract'
import { Message } from 'element-ui'
import message from '@/api/edu/message'
import user from '@/api/edu/user'
export default {
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    destroyed() {
        window.removeEventListener('beforeunload', this.updateHandler)
    },
    destroyed() {
        this.updateHandler()
    },
    created(){ 
        let id=this.$route.params.id;
        if(id!=undefined&&id.length==19){//查看信息
            this.infoOrAdd=false
            this.getManagement();
            if(id!=null){
                this.getContract(id);
            }
        }else{//制作合同
            let contract={}
            let paymentType=0
            let installmentType=0
            contract=JSON.parse(this.getCookie('contract'))
            paymentType=JSON.parse(this.getCookie('paymentType'))
            installmentType=JSON.parse(this.getCookie('installmentType'))
            if(contract!=null){
                this.contract=contract
                this.paymentType=paymentType
                this.installmentType=installmentType
            }
            this.getManagement();
            this.infoOrAdd=true
            window.addEventListener('beforeunload', this.updateHandler)
        if(this.roles.jurisdiction>3){
            Message.error('你的权限不够')
            this.$router.go(-1)
        }
        }
    },
    data(){
        const valiNotNull = (rule, value, callback) => {
            if (value==''||value==null||value==undefined) {
                callback(new Error('该字段不能为空'))
            } else {
                callback()
            }
        }
        const isNumber = (rule, value, callback) => {
            if (value.length!=11) {
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
        const email = (rule, value, callback) => {
            const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!mailReg.test(value)||value=='') {
                callback(new Error('请输入正确的邮箱格式'))
            }else{
                callback()
            } 
        }
        const type = (rule, value, callback) => {
            // console.log(this.checked1||this.checked2||this.checked3)
            if (!this.checked1&&!this.checked2&&!this.checked3) {
                callback(new Error('至少选择一个权力类别'))
            }else{
                callback()
            } 
        }
        const valiAmount = (rule, value, callback) => {
            if (value==''||value==null) {
                callback(new Error('请选择付款方式'))
            } else {
                callback()
            }
        }
        const valiFirstAmount = (rule, value, callback) => {
            if(value==''||value==null){
                callback(new Error('中期款不能为空'))
            }else if (parseInt(value)>=parseInt(this.contract.fullAmount)) {
                callback(new Error('首款不可能大于或等于全款'))
            } else {
                if(this.installmentType==1)
                this.contract.lastAmount=this.contract.fullAmount-value
                callback()
            }
        }
        const valilastAmount = (rule, value, callback) => {
            if(value==''||value==null){
                callback(new Error('中期款不能为空'))
            }else if(parseInt(value)+parseInt(this.contract.firstAmount)!=this.contract.fullAmount) {
                if(this.installmentType==1)
                callback(new Error('首款加尾款必须等于全款'))
                else if(parseInt(value)+parseInt(this.contract.firstAmount)+parseInt(this.contract.interimAmount)!=this.contract.fullAmount){
                    callback(new Error('首款加尾款加中期款必须等于全款'))
                }else{
                    callback()
                }
            } else {
                callback()
            }
        }
        const valiinterimAmount = (rule, value, callback) => {
            if(value==''||value==null){
                callback(new Error('中期款不能为空'))
            }else if(parseInt(value)+parseInt(this.contract.firstAmount)>this.contract.fullAmount) {
                callback(new Error('收款加中期款必须小于全款'))
            }else {
                this.contract.lastAmount=this.contract.fullAmount-this.contract.firstAmount-value
                callback()
            }
        }
        const valianticMonths = (rule, value, callback) => {
            if (value<1) {
                callback(new Error('月数不能为负数'))
            } else {
                callback()
            }
            }
        const valiDate = (rule, value, callback) => {
            if(value!=''&&value!=null){
                let str = value.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    if(!this.loading){
                        this.visible1=true
                    }
                    callback()
                } else {
                    this.visible1=false
                    callback()
                }
            }else{
                callback(new Error('该字段不能为空'))
            }
            
            }
        const valiDate2 = (rule, value, callback) => {
            if(value!=''&&value!=null){
                let str = value.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    if(!this.loading){
                        this.visible2=true
                    }
                    callback()
                } else {
                    this.visible2=false
                    callback()
                }
            }else{
                callback(new Error('该字段不能为空'))
            }    
        }
        return{
            type:[
                {label:"商标权",value:1},
                {label:"著作权",value:2},
                {label:"专利权",value:3}
            ],
            fileUploading:false,
            filelist:[],
            show:{info:true,time:true,money:true,shop:true,right:true,commit:true},
            value1:true,
            installmentType:1,
            right:[
                {index:0,value:'',type:'',pproperty:'',pbegin:'',pend:''}
            ],
            infoOrAdd:false,
            management:{},
            visible1:false,
            visible2:false,
            message:{},
            contract:{
                uid:'',
                brandName:'',
                fullAmount:'',
                firstAmount:'',
                lastAmount:'',
                interimAmount:'',
                anticMonths:'',
                companyName:'',
                speialPlane:'',
                respName:'',
                respPost:'',
                email:'',
                trade:'',
                tax:'',
                phone:'',
                url:'',
                dssOne:'',
                dssTwo:'',
                estabDateOne:'',
                addressOne:'',
                estabDateTwo:'',
                addressTwo:'',
                src:[],
                rightCategory:'',
                rightNum:''
            },
            saveRules: {
                brandName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                fullAmount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                firstAmount:[{ required: true, trigger: 'blur', validator: valiFirstAmount}],
                lastAmount:[{ required: true, trigger: 'blur', validator: valilastAmount}],
                anticMonths:[{ required: true, trigger: 'blur', validator: valianticMonths}],
                interimAmount:[{ required: true, trigger: 'blur', validator: valiinterimAmount}],
                companyName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                speialPlane:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                respName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                respPost:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                email:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                trade:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                tax:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                phone:[{ required: true, trigger: 'blur', validator: isNumber}],
                url:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                dssOne:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                dssTwo:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                estabDateOne:[{ required: true, trigger: 'blur', validator: valiDate}],
                addressOne:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                estabDateTwo:[{ required: true, trigger: 'blur', validator: valiDate2}],
                addressTwo:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                email:[{ required: true, trigger: 'blur', validator: email}],
                type:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                value:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pproperty:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pbegin:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                companyAddrss:[{ required: true, trigger: 'blur', validator: valiNotNull}],
            },
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            paymentType:1
        }
    },
    // mouted(){
    //     window.onbeforeunload = () =>{//页面刷新或关闭之前执行
    //         alert("sss")
    //         this.setCookie('contract',JSON.stringify(this.contract), 360)
    //         return 'tips';
    //     }
    // },
    methods:{
        fileUploadSuccess(response, file, fileList){
            this.$message({
                type:'success',
                message:'上传成功'
            })
            this.filelist=fileList
            this.fileUploading=false
        },
        fileUpload(){
            this.fileUploading=true
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        updateHandler() {
            if(this.value1){
                if(this.infoOrAdd){
                    this.setCookie('contract',JSON.stringify(this.contract), 360)
                    this.setCookie('paymentType',JSON.stringify(this.paymentType), 360)
                    this.setCookie('installmentType',JSON.stringify(this.installmentType), 360)
                }
                
            }else{
                this.setCookie('contract',null, 360)
                this.setCookie('paymentType',null, 360)
                this.setCookie('installmentType',null, 360)
            }  
        },
        setCookie (name, value, day) {
            if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
                var curDate = new Date();
                var curTamp = curDate.getTime();
                var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
                var passedTamp = curTamp - curWeeHours;
                var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
                var leftTime = new Date();
                leftTime.setTime(leftTamp + curTamp);
                document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();
            } else {
                document.cookie = name + "=" + escape(value);
                console.log(name)
            }
        },
        getCookie(name) {
            var arr;
            var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null; ocument.cookie = name + "=" + escape(value);

        },
        isShow(i){
            // let i=this.show.indexOf(key)
            let show=document.getElementsByClassName("show")[i]
            let container=document.getElementsByClassName("container")[0]
            let pd=false
            if(i==0){
                pd=this.show.info
                this.show.info=!this.show.info
            }else if(i==1){
                pd=this.show.time
                this.show.time=!this.show.time
            }else if(i==2){
                pd=this.show.money
                this.show.money=!this.show.money
            }else if(i==3){
                pd=this.show.shop
                this.show.shop=!this.show.shop
            }else if(i==4){
                pd=this.show.right
                this.show.right=!this.show.right
            }else if(i==5){
                pd=this.show.commit
                this.show.commit=!this.show.commit
            }
            // let libox=document.getElementsByClassName("libox")[i]
            if(pd){
                // libox.style.height="35px"
                show.style="transform:rotate(-90deg)";
            }else{
                // libox.style.height="495px"
                show.style="transform:rotate(0deg)";
            }          
            // console.log(this.show[i])
        },
        addRight(){
             this.right.push({index:this.right.length,value:'',type:'',pproperty:'',pbegin:'',pend:''})
         },
        removeLi(li){
             this.right.splice(li,1)
         },
        vis1(){
             if(this.contract.estabDateOne!=''&&this.contract.estabDateOne!=null){
                let str = this.contract.estabDateOne.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    this.$message({
                        type: 'warning',
                        message: '所选年份不满一年!'
                    });
                    this.visible1=true
                } else {
                    this.visible1=false
                }
             }
         },
        vis2(){
             if(this.contract.estabDateOne!=''&&this.contract.estabDateOne!=null){
                let str = this.contract.estabDateOne.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    this.$message({
                        type: 'warning',
                        message: '所选年份不满一年!'
                    });
                    this.visible2=true
                } else {
                    this.visible2=false
                }
             }
         },
        recommit(){
            this.contract={
                uid:'',
                brandName:'',
                fullAmount:'',
                firstAmount:'',
                lastAmount:'',
                anticMonths:'',
                companyName:'',
                speialPlane:'',
                respName:'',
                respPost:'',
                email:'',
                trade:'',
                tax:'',
                phone:'',
                url:'',
                dssOne:'',
                dssTwo:'',
                estabDateOne:'',
                addressOne:'',
                estabDateTwo:'',
                addressTwo:'',
                src:'',
                rightCategory:'',
                rightNum:''
            },
            this.contract.src=''
        },
        dowload(url){
            window.location.href=url
        },
        vismateria(){
            if(this.paymentType==2&&this.installmentType==2&&this.filelist.length==0){
                this.$message({
                    type: 'warning',
                    message: '暂无三期合同模板，请上传非标合同!'
                });
                return false
            }
            for(let i=0;i<this.right.length;i++){
                if(this.right[i].type==''||this.right[i].type==null||this.right[i].type==undefined){
                    this.$message({
                        type: 'warning',
                        message: '请选择权利类型!'
                    });
                    return false
                }
                if(this.right[i].value==''||this.right[i].value==null||this.right[i].value==undefined){
                    this.$message({
                        type: 'warning',
                        message: '请输入权利号!'
                    });
                    return false
                }
                if(this.right[i].pproperty==''||this.right[i].pproperty==null||this.right[i].pproperty==undefined){
                    this.$message({
                        type: 'warning',
                        message: '请选择权利性质!'
                    });
                    return false
                }
                if(this.right[i].pbegin==''||this.right[i].pbegin==null||this.right[i].pbegin==undefined){
                    if(this.right[i].type!=2){
                        this.$message({
                            type: 'warning',
                            message: '请选择权利期限开始日期!'
                        });
                        return false
                    }
                }
                if(this.right[i].pend==''||this.right[i].pend==null||this.right[i].pend==undefined){
                    if(this.right[i].type!=2){
                        this.$message({
                            type: 'warning',
                            message: '请选择权利期限结束日期!'
                        });
                        return false
                    }
                }
            }
            return true
        },
        commit(){
            this.$refs['contract'].validate(valid => {
                let valid2=this.vismateria()
                if (valid&&valid2) {
                    this.loading=true
                    this.contract.uid=this.roles.uid;
                    this.contract.brandName=this.contract.trade
                    this.contract.rightCategory=JSON.stringify(this.right)
                    if(this.paymentType==1){
                        this.contract.firstAmount=null
                        this.contract.lastAmount=null
                        this.contract.interimAmount=null
                    }
                    if(this.installmentType==1){
                        this.contract.interimAmount=null
                    }
                    const loading = this.$loading({
                        lock: true,
                        text: '正在生成合同',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    if(this.installmentType==2){
                        this.contract.src=JSON.stringify(this.filelist)
                        contract.saveContract(this.contract)
                        .then(res=>{
                            this.loading=false
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            let messages=this.msg(res.data.contract.cid,res.data.contract.serialNum)
                            message.addMessages(messages)
                            .then(res=>{
                                loading.close();
                                this.$router.push({path:'/audit/list'})
                            })
                            .catch(error=>{
                                loading.close();
                                this.loading=false
                                this.$message({
                                    type: 'error',
                                    message: '消息操作失败'
                                });
                            })
                        })
                        .catch(error=>{
                            this.loading=false
                            loading.close();
                            this.$message({
                                type: 'error',
                                message: '提交失败，请重新提交!'
                            });
                        })
                    }else{
                        this.contract.src=''
                        let contractRight={}
                        contractRight.uname=this.roles.uname
                        contractRight.uphone=this.roles.phoneNum
                        contractRight.right=this.right
                        contractRight.contract=this.contract
                        contract.addContract(contractRight)
                        .then(res=>{
                            this.loading=false
                            this.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            let messages=this.msg(res.data.contract.cid,res.data.contract.serialNum)
                            message.addMessages(messages)
                            .then(res=>{
                                loading.close();
                                this.$router.push({path:'/audit/list'})
                            })
                            .catch(error=>{
                                loading.close();
                                this.loading=false
                                this.$message({
                                    type: 'error',
                                    message: '消息操作失败'
                                });
                            })
                        })
                        .catch(error=>{
                            this.loading=false
                            loading.close();
                            this.$message({
                                type: 'error',
                                message: '提交失败，请重新提交!'
                            });
                        })
                    }
                    
                    
                }
            })
        },
        getManagement(){
            user.getManagement()
            .then(res=>{
                this.management=res.data.Management
            })
        },
        getContract(id){
            contract.getContract(id)
            .then(res=>{
                this.contract=res.data.contract
                if(this.contract.lastAmount!=0){
                    this.paymentType=2
                }else{
                    this.paymentType=1
                }
                if(this.contract.interimAmount!=0){
                     this.filelist=JSON.parse(this.contract.src)
                    this.installmentType=2
                }else{
                    this.installmentType=1
                }
                this.dataCombing()
            })
        },
        dataCombing(){
            let rightCategory=JSON.parse(this.contract.rightCategory)
            let list=[]
            for(let i=0;i<rightCategory.length;i++){
               for(let j=0;j<rightCategory[i].length;j++){
                   list.push(rightCategory[i][j])
               } 
            }
            [{"index":0,"value":"132156","type":1,"pproperty":"所有权","pbegin":"2020.10.01","pend":"2020.10.30"}],
            [{"index":0,"value":"1234","type":1,"pproperty":"所有权","pbegin":"2020.10.01","pend":"2020.10.06"}]
            //数据结构发生变化转换之后为空是新的数据结构
            if(list.length!=0)
            this.right=list
            else
            this.right=rightCategory
            for(let i=0;i<this.right.length;i++){
                this.$set(this.right[i],"type",this.right[i].type)
            }
        },
        msg(cid,serialNum){
            let messages=[]
            for(let i=0;i<this.management.length;i++){
                let m={}
                m.category=0
                m.categoryId=cid
                m.send=this.roles.uid
                m.uid=this.management[i].uid
                m.msg='新合同'+serialNum+'已生成，请及时审核'
                messages.push(m);
            }
            return messages
        }
    }
}
</script>
<style >
.reData{
    width: 100px;
    height:30px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #E6A23C;
    padding-top: 6px;
    color: #fff;
    text-align: center;
    position: relative;
    /* top:-20px */
    cursor: pointer;
}
.container .el-input__inner{
    /* color: aliceblue; */
    /* background-color: transparent; */
     background-color: #fff;
     border: 1px solid #DDDCDC;
}
.container .el-input__inner[disabled]{
    /* color: aliceblue; */
    /* background-color: transparent; */
}

.container input{
    /* color: aliceblue; */
    /* background-color: #fff; */
    /* width: 200px; */
    box-shadow: inset 2px 1px 5px #cbc9c9;
}
.container .el-form-item{
    margin-top: 30px;
    margin-left: 30px;
    /* width: 300px; */
}
.container .el-form-item__label{
    width: 93px;
}
.container h3{
    background:url('../../../assets/white-title.png');
    color: #2c2c2c;
    height: 35px;
    position: relative;
    margin: 0px;
    padding: 0px 10px;
    text-shadow: 0px 1px #fff;
    line-height: 34px;
    /* padding-top: 10px; */
    left: 0px;
    /* top:13px; */
}
.container .lifroms{
    padding:0px 130px;
}
.container .libox{
    /* transition: height 0.3s; */
    /* margin-top:20px ; */
    width: 95%;
    /* border: 1px solid red; */
    margin: 0px auto;
    background-color: #f7f7f7;
    /* padding: 20px; */
    /* box-shadow: -5px -2px 10px rgba(0, 0, 0,.3); */
    box-shadow: 0px 5px 10px #AFAEAE;
    margin-top: 20px;
}
.container{
    overflow:visible;
    position: relative;
    background:url('../../../assets/bg.png');
    /* background-size: 100% 100%; */
    padding-left: 30px;
    padding-bottom: 20px;
}
.container .top{
    margin: 0px auto;
    /* height: 50px; */
    width: 95%;
    font-size: 27px;
    padding-top:35px;
    /* padding-left: 30px; */
    margin-bottom: 20px;
    /* background:url('../../../assets/icon.png') no-repeat; */
}
.container .li{
    height: 35px;
    width: 100%;
    position: relative;
    /* left: -35px; */
    /* background:url('../../../assets/li.png'); */
    background-size: 100% 100%;
}
.container .el-input__inner[disabled]{
    cursor: text;
}
.container .el-textarea__inner[disabled]{
    cursor: text;
}
.container .show{
    transition: all 0.3s ease-in;
    cursor: pointer;
    padding-left: 3px;
    padding-bottom: 10px;
    margin-top:5px ;
    width: 25px;
    height: 25px;
    background-color: #bfc2c5;
    border-radius: 50%;
    float:right;
}
   

.container .show i{
    position: relative;
    bottom: 4px;
}
.container .el-form-item__label{
    /* color:aliceblue; */
}
.container .dialog-footer{
     position: relative;
     left: 80px;
     top: 20px;
}
.container .el-textarea__inner{
    /* color: aliceblue; */
    /* background-color: unset; */
    background-color: #fff;
    border: 1px solid #DDDCDC;
    box-shadow: inset 2px 1px 5px #cbc9c9;
    height: 70px;
}
.container .el-textarea__inner[disabled]{
    /* color: aliceblue; */
    /* background-color: unset; */
    height: 70px;
}
.container .upload{
    color:aliceblue;
    background-color: #ffac02;
}
.container .primary{
    color:aliceblue;
    background-color: #91601e;
    border: none;
}
.container .el-button--primary{
    width: 200px;
    height: 45px;
    /* background-color: #ffac02; */
}
.rightNum{
    width: 200px;
    margin-left: 20px;
    margin-bottom: 20px;
}
.el-checkbox{
    margin: 0px;
    margin-right: 10px ;
}
</style>