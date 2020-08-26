<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎你:{{ name }} <el-link href="http://www.yizhitexu.com/manual.html" target="_blank" style="float:right" type="primary">操作手册</el-link></div>
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
     
     <h3><span style="margin-left:60px">流程图:</span></h3>
     <div class="contract"></div>
     <div class="flow1"></div>
     <div class="flow2"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.contract{
  position: relative;
  left: 540px;
  // float:left;
  width: 500px;
  height: 520px;
  background:url('../../assets/contract.png')no-repeat;
}
.flow1{
  position: relative;
  // float:left;
  left: 350px;
  width: 1000px;
  height: 800px;
  background:url('../../assets/flow1.png')no-repeat;
}
.flow2{
  position: relative;
  top: -25px;
  left: 368px;
  width: 1000px;
  height: 500px;
  background:url('../../assets/flow2.png')no-repeat;
}
</style>
