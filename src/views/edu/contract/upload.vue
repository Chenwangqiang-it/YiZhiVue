<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">合同模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a href="https://edu-1100.oss-cn-beijing.aliyuncs.com/template/texu.doc">点击下载合同模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择合同">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/state/upcontract'"
          name="file"
          accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
          <el-button slot="trigger" size="small" type="primary">选择合同</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import state from '@/api/edu/state'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    data(){
        return{
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            fileUploadBtnText: '上传审核', // 按钮文字
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false,
            state:{
              url:'',
              uid:''
            }
        }
    },
    created(){

    },
    methods:{
        submitUpload() {
            this.fileUploadBtnText = '正在上传'
            this.importBtnDisabled = true
            this.loading = true
            //$refs.唯一表示.submit()
            this.$refs.upload.submit()
        },
        fileUploadSuccess(response, file, fileList){
            //提示信息
            this.loading=false
            this.fileUploadBtnText='上传审核'
            this.$message({
                type:'success',
                message:'上传成功'
            })
            this.state.url=response.data.url
            this.state.uid=this.roles.uid
            state.save(this.state)
            this.$router.push({path:'/audit/list'})
            //跳转课程分类列表
        },
        fileUploadError(){
            this.loading=false
            this.fileUploadBtnText='上传审核'
            this.$message({
                type:'success',
                message:'提交失败，请重试'
            })
        }
    }
}
</script>
