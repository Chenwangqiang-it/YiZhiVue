<template>
    <div class="app-container">
        账号列表
         <template>
            <el-form :inline="true" class="demo-form-inline" align="center">
            <el-form-item label="用户">
                <el-input v-model="userQuery.uname" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userQuery.identity" placeholder="职位">
                    <el-option label="经理" value="1"></el-option>
                    <el-option label="总经理" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="userQuery.dept" placeholder="部门">
                    <el-option label="财务部" value="1"></el-option>
                    <el-option label="市场理" value="2"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="添加时间">
               <el-date-picker
               v-model="userQuery.begin"
               type="datetime"
               placeholder="选择开始时间"
               value-format="yyyy-MM-dd HH:mm:ss"
               default-time="00:00:00"
               />
            </el-form-item>
             <el-form-item>
               <el-date-picker
               v-model="userQuery.end"
               type="datetime"
               placeholder="选择截至时间"
               value-format="yyyy-MM-dd HH:mm:ss"
               default-time="00:00:00"
               />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
                <el-button type="default" @click="resetData()">重置</el-button>
            </el-form-item>
            </el-form>
            <el-table
            v-loading="listLoding"
            :data="list"
            element-loading-text="数据加载中"
            style="width: 100%">
            <el-table-column
                label="序号"
                align="center"
                width="180">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
            <el-table-column prop="uname" label="名称" width="180"></el-table-column>
            <el-table-column prop="identity" label="职位" width="180">
                <template slot-scope="scope">
                    {{scope.row.identity==1?'经理':'总经理'}}
                </template>
            </el-table-column>
            <el-table-column prop="dept" label="部门">
                <template slot-scope="scope">
                    {{scope.row.dept==1?'市场部':'财务部'}}
                </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="phoneNum" label="电话号码" width="180"></el-table-column>
            <el-table-column prop="upassword" label="密码" width="180"></el-table-column>
            <el-table-column prop="higherAuthority" label="上级主管" width="180"></el-table-column>
            <el-table-column prop="jurisdiction" label="权限级别">
                <template slot-scope="scope">
                    {{scope.row.jurisdiction==0?'root':(scope.row.jurisdiction==1?'管理者':(scope.row.jurisdiction==2?'流程管理者':(scope.row.jurisdiction==3?'顾问':(scope.row.jurisdiction==4?'代理':'财务'))))}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/account/set/'+scope.row.uid">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="pading: 30px 0;text-align:center;"
                layout="total,prev,pager,next,jumper"
                @current-change="getList"
            />
         </template>
    </div>
</template>
<script>
import user from '@/api/edu/user'
    //核心代码位置
import { mapGetters } from 'vuex'
 import { Message } from 'element-ui'

export default {//定义变量和初始值
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    data(){
        return{
            list:null,//查询之后接口返回集合
            page:1,//当前页
            limit:3,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            userQuery:{}//条件封装
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      if(this.roles.jurisdiction!=0){
        Message.error('你的权限不够')
        this.$router.go(-1)
      }else{
        this.getList()
      }
    },
    methods:{//创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        //意思是如果不传page的值默认就是1，如果传了就是传了的
        getList(page =1){
            this.page=page
            user.getUserListPage(this.page,this.limit,this.userQuery)
                .then(res=>{
                    //res返回的数据
                    this.list=res.data.rows
                    this.total=res.data.total
                    console.log(this.list)
                    console.log(this.total)
                })//请求成功
                .catch(error=>{
                    console.log(error)
                })//请求失败
        },
        resetData(){//清空表单
            //表单输入项数据清空
            this.userQuery={}
            //查询所有讲师数据
            this.getList()
        },
        removeDataById(id){//删除讲师
           this.$confirm('此操作将永久删除该讲师记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {//点击确定，执行
                teacher.delteteacherId(id)//调用方法执行删除
                .then(res=>{//删除成功
                   
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                    this.getList()//刷新列表
                })
                .catch(error=>{

                })
                
            })
            
        }
    }
}
</script>