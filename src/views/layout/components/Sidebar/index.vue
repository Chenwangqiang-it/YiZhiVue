<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" v-show="this.$route.meta.show==true">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :background-color=color
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      <el-color-picker v-model="color" style="position: absolute;transform:rotate(-90deg);display: inline-block;right: 65px;bottom:40px;height: 50px;width:50px"></el-color-picker>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data(){
      return{
        color:"#304156",
      }
    },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'roles'
    ]),
    routes() {
      // console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    isCollapse() {
        return !this.sidebar.opened
    }
  }
}
</script>
