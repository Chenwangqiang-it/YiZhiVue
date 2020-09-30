<template>
  <div class="app-container">
      <div style="background-color:#d7932e" @click="type=0" class="tools" v-if="type==null">
          pdf转word
      </div>
      <div style="background-color:#31affe" @click="type=1" class="tools" v-if="type==null">
          word转pdf
      </div>
      <div style="background-color:#fc9ab1" @click="type=5" class="tools" v-if="type==null">
          pdf压缩
      </div>
      <div style="background-color:#78c810" @click="type=2" class="tools" v-if="type==null">
          图片转pdf
      </div>
      <div style="background-color:#f146d7" @click="type=3" class="tools" v-if="type==null">
          pdf转图片(img)
      </div>
      <div style="background-color:#ff4f39" @click="type=4" class="tools" v-if="type==null">
          图片压缩
      </div>
      <el-upload
        v-if="type==0"
        style="width:380px"
        class="upload-demo"
        drag
        :on-success="fileUploadSuccess"
        :action="BASE_API+'/eduservice/tools/pdf2word'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         <div class="el-upload__tip" slot="tip">只能上传pdf文件</div>
        </el-upload>
        <el-upload
        v-if="type==1"
        style="width:380px"
        class="upload-demo"
        drag
        :on-success="fileUploadSuccess"
        :on-progress="fileUploading"
        :action="BASE_API+'/eduservice/tools/word2pdf'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传doc或docx文件</div>
        </el-upload>
        <el-upload
        v-if="type==2"
        style="width:380px"
        class="upload-demo"
        ref="upload"
        drag
        :file-list="fileList2"
        :on-progress="fileUploading"
        :auto-upload="false"
        :http-request="uploadFile"
        :on-change="changeFile"
        :action="BASE_API+'/eduservice/tools/jpgTopdf'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传png或img格式图片
        </div>
        <div class="el-upload__tip" style="height:40px;line-height:30px" slot="tip">选取多个图片点击按钮上传
            <el-button style="float:right;margin-right:20px" size="small" type="primary" @click="submitUpload">点击生成pdf</el-button>
        </div>
        </el-upload>
        <el-upload
        v-if="type==3"
        style="width:380px"
        class="upload-demo"
        drag
        :on-success="fileUploadSuccess"
        :on-progress="fileUploading"
        :action="BASE_API+'/eduservice/tools/pdfTojpg'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf格式文件</div>
        </el-upload>
        <el-upload
        v-if="type==4"
        style="width:380px"
        class="upload-demo"
        drag
        :on-success="fileUploadSuccess"
        :on-progress="fileUploading"
        :action="BASE_API+'/eduservice/tools/optimizeImage'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传png或img格式图片</div>
        </el-upload>
        <el-upload
        v-if="type==5"
        style="width:380px"
        class="upload-demo"
        drag
        :on-success="fileUploadSuccess"
        :on-progress="fileUploading"
        :action="BASE_API+'/eduservice/tools/optimizePdf'"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传pdf格式文件</div>
        </el-upload>
        <el-button @click="type=null" style="position: relative;left:280px;top:20px" round v-if="type!=null">取消</el-button>
         <template >
            <el-table
            :data="fileList"
            style="width: 100%;position: relative;top:300px">
                <el-table-column
                    prop="name"
                    label="文件名"
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="时间"
                >
                </el-table-column>
                <el-table-column
                    prop="size"
                    label="文件大小"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                    label="下载"
                >
                <tempate slot-scope="scope">
                    <el-link :href="scope.row.url" type="primary">点击下载</el-link>
                </tempate>
                <!-- <span @click="openFileIIs('123')">打开</span> -->
                </el-table-column>
                <el-table-column
                    label="浏览"
                >
                <tempate slot-scope="scope">
                    <el-link @click="browse(scope.row.url)" type="primary">点击浏览</el-link>
                </tempate>
                <!-- <span @click="openFileIIs('123')">打开</span> -->
                </el-table-column>
            </el-table>
        </template>
  </div>
</template>

<script>
import tools from '@/api/edu/tools'
export default {
  data() {
    return {
        formData:new FormData(),
        type:null,
        BASE_API:process.env.BASE_API,
        fileList:[],
        fileList2:[]
    }
  },
  created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
  },
  methods: {
    uploadFile(file){
    // console.log(file.file)
    // console.log("uploadFile");
    // this.formData.append('org_files', file.file);
    },
    changeFile(file, fileList){
        this.fileList2=fileList
    },
    submitUpload() {
        if(fileList2.length!=0){
            const loading = this.$loading({
                lock: true,
                text: '正在生成pdf',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.fileList2.forEach(file => {
                this.formData.append('file', file.raw)
            })
            // 调用上传接口
            tools.editEviCard(this.formData).then((res) => {
                //手动上传无法触发成功或失败的钩子函数，因此这里手动调用 
                loading.close();
                this.upSuccess(res)
            }, (err) => {
                loading.close();
                // this.upError(err)
                this.$notify({
                    title: '消息提示',
                    message: '文件转换失败请重试',
                    position: 'bottom-right'
                });
            })
        }
        
        // this.$refs.upload.submit();
    //执行此步骤 相当于执行 http-request 的自定义实现方法
    },
    init(){
        this.fileList2=[]
    },
    browse(url){
            // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
            // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(url));
            window.open('http://ow365.cn/?i=22376&ssl=1&furl='+encodeURIComponent(url));
        },
    fileUploading(event, file, fileLis){
        // var interval=setInterval(function(){
        //     tools.getUploadPercent()
        //     .then(res=>{
        //         console.log(res)
        //     })
        // },1000)
    },
    fileUploadSuccess(res, file, fileList){
            this.$notify({
                title: '消息提示',
                message: '文件转换成功',
                position: 'bottom-right'
            });
            this.fileList.push({
                size:this.filters(res.data.file.fileSize),
                status:res.message,
                date:res.data.file.createDate,
                name:res.data.file.fileName,
                url:res.data.file.fileUrl
            })
        },
    upSuccess(res){

            this.$notify({
                title: '消息提示',
                message: '文件转换成功',
                position: 'bottom-right'
            });
            this.fileList2=[]
            this.fileList.push({
                size:this.filters(res.data.file.fileSize),
                status:res.message,
                date:res.data.file.createDate,
                name:res.data.file.fileName,
                url:res.data.file.fileUrl
            })
    },
    filters(val){
        if(val==0) return "0 B"
        let k=1024
        let sizes=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],
        i=Math.floor(Math.log(val)/Math.log(k));
        return (val/Math.pow(k,i)).toPrecision(3)+""+sizes[i];
    }
  }
}
</script>
<style>
    .tools{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        font-size: 20px;
        color:aliceblue;
        text-align: center;
        padding-top: 45px;
        float:left;
        margin: 20px;
        width:200px;
        height:120px;
        border-radius: 30px;
        transition: all 0.3s ease-in;
        
    }
    .tools:hover{
        cursor: pointer;
        transform: translateY(-3px);
    }
</style>
