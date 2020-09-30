<template>
    <div class="container" >
        <!-- style="background:url('https://yizhitexu.oss-cn-beijing.aliyuncs.com/static/C-_Users_Administrator_Desktop_015d2558a41a52a801219c77beada7.png?Expires=1595581922&OSSAccessKeyId=TMP.3KdxaS95SjhR1H6swiTgEucqwtFyWXiRitrSDbpDdt3iLFKQichwqG9Ww2SBoi2equJ4svaYg1di6L89J9My1ZNv6c3rQf&Signature=mg%2BGmsQ8VHrFqixnT%2Fy8kcthqrQ%3D')" -->
         <template>
            <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px" >
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    合同信息填写
                </div>
                <div class="libox">
                    <div class="li">
                        <h3 >特许人基本信息
                            <div class="show" @click="isShow(0)">
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
                            <el-form-item label="公司传真" >
                                <el-input :disabled="!infoOrAdd" name="tax" v-model="contract.tax" placeholder="公司传真"></el-input>
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
                            <el-form-item label="全款金额" prop="fullAmount">
                                <el-input :disabled="!infoOrAdd" name="fullAmount" v-model="contract.fullAmount" placeholder="全款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                <el-input :disabled="!infoOrAdd" name="firstAmount" v-model="contract.firstAmount" placeholder="首款金额"></el-input>
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
                        <div class="lifroms" v-show="show.right">
                            <el-form-item label="权利类别" prop="type">
                                <div>
                                        <el-checkbox :disabled="!infoOrAdd" v-model="checked1" label="商标权" ></el-checkbox>
                                        <div v-if="checked1">
                                            <el-input 
                                                oninput="value=value.replace(/[^\d]/g,'')"
                                                v-for="(city,i) in brand" 
                                                :key="city"
                                                :disabled="!infoOrAdd"
                                                name="brand" 
                                                class="rightNum"
                                                v-model="brand[i].value"
                                                placeholder="商标号">
                                            </el-input>
                                            <el-button @click="removeLi(brand)" size="mini" type="warning" icon="el-icon-minus" circle v-if="infoOrAdd"></el-button>
                                            <el-button @click="addBrand()" size="mini" type="warning" icon="el-icon-plus" circle v-if="infoOrAdd"></el-button>
                                        </div>
                                        <el-checkbox :disabled="!infoOrAdd" v-model="checked2" label="著作权" ></el-checkbox>
                                        <div v-if="checked2">
                                            <el-input 
                                                :disabled="!infoOrAdd"
                                                v-for="(city,i) in work" 
                                                :key="city"
                                                name="work" 
                                                class="rightNum"
                                                v-model="work[i].value"
                                                placeholder="著作号">
                                            </el-input>
                                            <el-button @click="removeLi(work)" size="mini" type="warning" icon="el-icon-minus" circle v-if="infoOrAdd"></el-button>
                                            <el-button @click="addWork()" size="mini" type="warning" icon="el-icon-plus" circle v-if="infoOrAdd"></el-button>
                                        </div>
                                        <el-checkbox :disabled="!infoOrAdd" v-model="checked3" label="专利权" ></el-checkbox>
                                        <div v-if="checked3">

                                            <el-input 
                                                :disabled="!infoOrAdd"
                                                v-for="(city,i) in right" 
                                                :key="city"
                                                name="right" 
                                                class="rightNum"
                                                v-model="right[i].value"
                                                placeholder="权利号">
                                            </el-input>
                                            <el-button @click="removeLi(right)" size="mini" type="warning" icon="el-icon-minus" circle v-if="infoOrAdd"></el-button>
                                            <el-button @click="addRight()" size="mini" type="warning" icon="el-icon-plus" circle v-if="infoOrAdd"></el-button>
                                        
                                        
                                        </div>
                                </div>
                            </el-form-item>
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
                            <el-button type="primary"  @click.native.prevent="commit" v-if="!loading&&infoOrAdd">提交</el-button>
                            <el-button disabled type="primary" @click.native.prevent="commit" v-if="loading">提交</el-button>
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
    created(){ 
        let id=this.$route.params.id;
        if(id!=undefined&&id.length==19){//查看信息
            this.infoOrAdd=false
            this.getManagement();
            if(id!=null){
                this.getContract(id);
            }
        }else{//制作合同
            this.getManagement();
            this.infoOrAdd=true
        if(this.roles.jurisdiction>3){
            Message.error('你的权限不够')
            this.$router.go(-1)
        }
        }
    },
    data(){
        const valiNotNull = (rule, value, callback) => {
            if (value=='') {
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
            if (value=='') {
                callback(new Error('请选择付款方式'))
            } else {
                callback()
            }
        }
        const valiFirstAmount = (rule, value, callback) => {
            if (parseInt(value)>=parseInt(this.contract.fullAmount)) {
                callback(new Error('首款不可能大于或等于全款'))
            } else {
                this.contract.lastAmount=this.contract.fullAmount-value
                callback()
            }
        }
        const valilastAmount = (rule, value, callback) => {
            if (parseInt(value)+parseInt(this.contract.firstAmount)!=this.contract.fullAmount) {
                console.log(value+this.contract.firstAmount)
                callback(new Error('收款加尾款必须等于全款'))
            } else {
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
            show:{info:true,time:true,money:true,shop:true,right:true,commit:true},
            checked1:false,
            checked2:false,
            checked3:false,
            right:[
                {index:0,value:'',type:3}
            ],
            brand:[
                {index:0,value:'',type:1}
            ],
            work:[
                {index:0,value:'',type:2}
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
            saveRules: {
                brandName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                fullAmount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                firstAmount:[{ required: true, trigger: 'blur', validator: valiFirstAmount}],
                lastAmount:[{ required: true, trigger: 'blur', validator: valilastAmount}],
                anticMonths:[{ required: true, trigger: 'blur', validator: valianticMonths}],
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
                type:[{ required: true, trigger: 'blur', validator: type}],
            },
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            paymentType:1
        }
    },
     methods:{
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
             this.right.push({index:this.right.length,value:'',type:3})
         },
         addWork(){
             this.work.push({index:this.work.length,value:'',type:2})
         },
         addBrand(){
             this.brand.push({index:this.brand.length,value:'',type:1})
         },
         removeLi(li){
             li.pop()
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
             this.contract=[]
            this.contract.src=''
        },
        commit(){
            this.$refs.contract.validate(valid => {
            if (valid) {
            this.rightUtils();//把勾选的框转换为字符串，或者去除不勾选的
            this.loading=true
            this.contract.uid=this.roles.uid;
            this.contract.brandName=this.contract.trade
            let ls=[];
            ls.push(this.brand)
            ls.push(this.work)
            ls.push(this.right)
            this.contract.rightCategory=JSON.stringify(ls)
            if(this.paymentType==1){
                    this.contract.firstAmount=null
                    this.contract.lastAmount=null
                }
            const loading = this.$loading({
                lock: true,
                text: '正在生成合同',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            contract.addContract(this.contract)
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
                
                // this.contract.src=res.data.path
            })
            .catch(error=>{
                 this.loading=false
                 this.$message({
                    type: 'error',
                    message: '提交失败，请重新提交!'
                });
            })
            }
            })
        },
        rightUtils(){
            if(this.checked1){
                this.contract.rightNum+='1'
            }
            if(this.checked2){
                this.contract.rightNum+='2'
            }
            if(this.checked3){
                this.contract.rightNum+='3'
            }
            
            if(!this.checked1){
                this.brand=[]
                this.contract.rightNum=this.contract.rightNum.split("1").join("")
            }
            if(!this.checked2){
                this.work=[]
                this.contract.rightNum=this.contract.rightNum.split("2").join("")
            }
            if(!this.checked3){
                this.right=[]
                this.contract.rightNum=this.contract.rightNum.split("3").join("")
            }
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
                this.type();
                if(this.contract.lastAmount!=0){
                    this.paymentType=2
                }else{
                    this.paymentType=1
                }
            })
        },
        type(){
            if(this.contract.rightNum.indexOf("1")>=0){
                this.checked1=true
                let l=JSON.parse(this.contract.rightCategory)
                console.log(l)
                let li=[];
                for(let i=0;i<l[0].length;i++){
                    if(l[0][i].type==1){
                        li.push(l[0][i])
                    }
                }
                this.brand=li;
            }
            if(this.contract.rightNum.indexOf("2")>=0){
                this.checked2=true
                let l=JSON.parse(this.contract.rightCategory)
                let li=[];
                for(let i=0;i<l[1].length;i++){
                    if(l[1][i].type==2){
                        li.push(l[1][i])
                    }
                }
                this.work=li;
            }
            if(this.contract.rightNum.indexOf("3")>=0){
                this.checked3=true
                let l=JSON.parse(this.contract.rightCategory)
                let li=[];
                for(let i=0;i<l[2].length;i++){
                    if(l[2][i].type==3){
                        li.push(l[2][i])
                    }
                }
                this.right=li;
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