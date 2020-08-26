<template>
<el-container style="padding:30px">
    <el-row>
     <el-button  type="success">
         <router-link class="inlineBlock" :to="'/audit/list/'+roles.uid">
            合同事项
         </router-link>
    </el-button>
     <el-button type="primary">
         <router-link class="inlineBlock" :to="'/flow/index/'+roles.uid">
            流程事项
         </router-link>
    </el-button>
    </el-row>
</el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import message from '@/api/edu/message'
export default {
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
}
</script>