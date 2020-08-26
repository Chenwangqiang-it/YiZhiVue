<template>
    <div class="container2">
        <el-form  ref="state" :model="state" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px">
                <div class="li" style="margin-bottom:20px">
                    <h3 style="left:60px">合同签订</h3>
                </div>
                <div style="margin-bottom:10px;color:#fff">上传签订后的合同</div>
                <el-upload
                    class="upload-demo"
                    :action="BASE_API+'/eduservice/state/upcontract'"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="fileUploadSuccess"
                    multiple
                    
                    :limit="5"
                    style="width:300px"
                    :on-exceed="handleExceed"
                    :file-list="fileList2">
                    <el-button size="small" class="upload">点击上传</el-button>
                </el-upload>
                <div style="margin-top:20px;color:#fff">确认：</div>
                 
                 <el-form-item style="margin:0;margin-top:10px" v-if="!disable">
                    <el-button type="primary"  @click.native.prevent="commit">确认</el-button>
                </el-form-item>
                 <el-form-item style="margin:0;margin-top:10px" v-else>
                    <el-button disabled type="primary" style="width:20%;">确认</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import state from '@/api/edu/state'
import record from '@/api/edu/record'
import flow from '@/api/edu/flow'
import contract from '@/api/edu/contract'
import message from '@/api/edu/message'
import user from '@/api/edu/user'
import cookieUtil from '@/utils/cookie'

export default {
    computed: {
        ...mapGetters([
        'name',
        'roles',
        ])
    },
    created(){
        this.init()
    },
    data(){
        return{
            id:"",
            management:{},
            state2:{},
            visible1:false,
            visible2:false,
            loading2:false,
            contract:{},
            contract2:{},
            textarea:'',
            standard:false,
            atypia:false,
            message:{},
            messages:[],
            flow:{},
            disable:true,
            isaudit:'',
            value1:true,
            url:'',
            state:{
                sstate:''
            },
            paymentType:0,
            record:{},
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            fileList: [],
            fileList2: []
        }
            
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
     methods:{
         init(){
            this.id=this.$route.query.id
            this.getManagement()
            this.record.uid=this.roles.uid
                state.getStateList(this.id)
                .then(res=>{
                    this.state2=res.data.state
                    if(JSON.stringify(res.data.state.url).indexOf("[{")>=0){
                        this.fileList=JSON.parse(res.data.state.url)
                    }else{
                        this.fileList.push({
                            name:res.data.state.url.substring(121,res.data.state.url.length),
                            url:res.data.state.url
                        })
                    }
                    console.log(window.opener)
                    this.record.cid=this.state2.cid
                })
        },
        browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(url));
            window.open('http://ow365.cn/?i=22376&ssl=1&furl='+encodeURIComponent(url));
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
        fileUploadSuccess(response, file, fileList){
            this.$message({
                type:'success',
                message:'上传成功'
            })
            this.fileList2.push({
                    name:response.data.url.substring(88,response.data.url.length),
                    url:response.data.url
            })
            this.disable=false
        },
         handleRemove(file, fileList) {
            console.log(file, fileList);
            this.disable=true
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        getManagement(){
            user.getManagement()
            .then(res=>{
                this.management=res.data.Management
            })
        },
        addDate() {
                    let nowDate = new Date();
                    let date = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                    }
                   
                    let systemDate = date.year + '-' + 0 + date.month + '-' + 0 + date.date;
                     console.log(systemDate);
                },
        msg(cid,i){
            let messages=[]
            this.message.msg='您的合同'+this.state2.serialNum+'已通过合同签订，可以进行发起立案'
            this.message.categoryId=cid
            this.message.category=0
            this.message.uid=this.state2.uid
            this.message.send=this.roles.uid
            messages.push(this.message)
            this.messages=messages
        },
        commit(){//签订
            //  console.log(this.$refs.state.validate)
            this.$refs.state.validate(valid => {
            if (valid) {
                this.state.sstate=3
                for(let i=0;i<this.fileList2.length;i++){
                    this.fileList.push(this.fileList2[i]);
                }
                this.state.url=JSON.stringify(this.fileList)
                this.record.sstate=3
                this.record.accessory=JSON.stringify(this.fileList2)
                this.msg(this.record.cid,3)
                this.state.sid=this.id
                if(this.state.url!=''){
                     state.update(this.state)
                    .then(res=>{
                    this.loading=false
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                    record.addRecord(this.record)
                    .then(res=>{
                        message.addMessages(this.messages)
                        .then(res=>{
                            window.opener.logoClickBtn()
                            window.close()
                        })
                    })
                    // this.$router.push({path:'/audit/list'})
                    })
                }
            }
            })
        },
        
    }
}
</script>
<style  >
.container2 .el-input__inner{
    color: aliceblue;
    background-color: transparent;
}
.container2 input{
    color: aliceblue;
    background-color: transparent;
}
.container2 h3{
    margin: 0px;
    color: #ffac02;
    height: 30px;
    position: relative;
    left: 140px;
    top:13px;
}

.container2{
    position: relative;
    width:720px;
    padding: 30px;
}
.container2 .li{
    height: 50px;
    width: 100%;
    position: relative;
    left: -35px;
    background:url('../../../assets/li.png');
    background-size: 100% 100%;
}
.container2 .el-form-item{
    margin-top: 30px;
    margin-left: 30px;
}
.container2 .el-form-item__label{
    color:aliceblue;
}
.container2 .dialog-footer{
     position: relative;
     left: 80px;
     top: 20px;
}
.container2 .el-textarea__inner{
    color: aliceblue;
    background-color: transparent;
}
.container2 .upload{
    color:aliceblue;
    background-color: #ffac02;
}
.container2 .primary{
    color:aliceblue;
    background-color: #91601e;
}
.container2 .el-button--primary{
    width: 200px;
    height: 45px;
    background-color: #ffac02;
}
.link-contrainer{
    background-image:none !important;
    /* height: 100%; */
}
.app-wrapper{
    background:url('../../../assets/bgi.png');
    background-size: 100% 100%;
}
</style>