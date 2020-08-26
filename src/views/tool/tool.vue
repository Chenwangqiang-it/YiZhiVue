<template>
  <div class="app-container">
      <div style="background-color:#d7932e" @click="type=0" class="tools" v-if="type==null">
          pdf转word
      </div>
      <div style="background-color:#31affe" @click="type=1" class="tools" v-if="type==null">
          word转pdf
      </div>
      <el-upload
        v-if="type==0"
        style="width:400px"
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
        style="width:400px"
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
        <el-button @click="type=null" style="position: relative;left:280px" round v-if="type!=null">取消</el-button>
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
        type:null,
        BASE_API:process.env.BASE_API,
        fileList:[]
    }
  },
  created() {//页面渲染之前执行，调用methods定义的方法
        this.init()
  },
  methods: {
    init(){
        
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
    fileUploadSuccess(response, file, fileList){
            this.$notify({
                title: '消息提示',
                message: '文件转换成功',
                position: 'bottom-right'
            });
            let size=this.filters(file.size)
            this.fileList.push({
                size:size,
                status:response.message,
                date:new Date().getFullYear() +"-" +(new Date().getMonth() + 1) +"-" +new Date().getDate() +" " +new Date().getHours() +":" +new Date().getMinutes() +": " +new Date().getSeconds(),
                name:response.data.url.substring(120,response.data.url.length),
                url:response.data.url
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
