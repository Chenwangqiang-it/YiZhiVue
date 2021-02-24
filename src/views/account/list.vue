<template>
    <div class="app-container">
        账号列表
         <template>
            <el-form :inline="true" class="demo-form-inline" align="center">
            <el-form-item label="用户">
                <el-input style="width:100px" v-model="userQuery.uname" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-select style="width:130px" v-model="userQuery.identity" placeholder="职位">
                    <el-option
                    v-for="(item,i) in identity"
                    :key="i"
                    :label="item.identityName"
                    :value="item.identity">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门">
                <el-select style="width:120px" v-model="userQuery.dept" placeholder="部门">
                    <el-option
                    v-for="(item,i) in dept"
                    :key="i"
                    :label="item.deptName"
                    :value="item.deptId">
                    </el-option>
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
                width="140">
                <tempate slot-scope="scope">
                    {{(page-1)*limit+scope.$index+1}}
                </tempate>
            </el-table-column>
            <el-table-column prop="uname" label="名称" width="180"></el-table-column>
            <el-table-column prop="identity" label="职位" width="180">
                <template slot-scope="scope">
                    {{scope.row.identityName}}
                </template>
            </el-table-column>
            <el-table-column prop="dept" label="部门">
                <template slot-scope="scope">
                    {{scope.row.deptName}}
                </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="phoneNum" label="电话号码" width="180"></el-table-column>
            <el-table-column prop="upassword" label="密码" width="180"></el-table-column>
            <el-table-column prop="higherAuthorityName" label="上级主管" width="180"></el-table-column>
            <el-table-column width="100" prop="jurisdiction" label="权限级别">
                <template slot-scope="scope">
                    {{scope.row.jurisdictionName}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="change(scope.row.uid)">业务转移</el-button>
                    <router-link :to="'/account/set/'+scope.row.uid">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.uid)">删除</el-button>
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
import contract from '@/api/edu/contract'
import flow from '@/api/edu/flow'
    //核心代码位置
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import identity from '@/api/edu/identity'
import dept from '@/api/edu/dept'
import permitsaccess from '@/api/edu/permitsaccess'
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
            limit:10,//每页记录数
            total:0,//总记录数
            //字段不写也可以，会根据表单自己生成
            userQuery:{},//条件封装
            identity:{},
            dept:{},
            permitsaccess:{}
        }
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      if(this.roles.jurisdiction>1){
        Message.error('你的权限不够')
        this.$router.go(-1)
      }else{
        this.getList()
        identity.getList()
        .then(res=>{
          this.identity=res.data.list
        })
        dept.getList()
        .then(res=>{
          this.dept=res.data.list
        })
        permitsaccess.getList()
        .then(res=>{
          this.permitsaccess=res.data.list
        })
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
                    console.log(res.data.rows)
                    this.list=res.data.rows
                    this.total=res.data.total
                })//请求成功
                .catch(error=>{
                    console.log(error)
                })//请求失败
        },
        change(id){
            let routeData = this.$router.resolve({
                path: '/account/change/'+id
            })
            window.open(routeData.href,"_blank",'width=640px,height=400px,top=500px,left=800px,resizable=yes,scrollbars')
            window['logoClickBtn'] = (url) => {
                // Toast({ message: url, position: 'bottom', duration: 5000 });
                //将init方法公示到window 子页面可以调用该方法
                this.$message({
                    type: 'success',
                    message: '转移成功!'
                });
                this.getList()
            }
        },
        resetData(){//清空表单
            //表单输入项数据清空
            this.userQuery={}
            //查询所有讲师数据
            this.getList()
        },
        removeDataById(id){//删除讲师
           this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {//点击确定，执行
                contract.getContractCount(id)
                .then(res=>{
                    flow.getFlowCount(id)
                    .then(response=>{
                        if(res.data.count==0&&response.data.count==0){
                            user.delteteacherId(id)//调用方法执行删除
                            .then(rest=>{//删除成功
                                this.$message({
                                type: 'success',
                                message: '删除成功!'
                                });
                                this.getList()//刷新列表
                            })
                            .catch(error=>{
                                
                            })
                        }else{
                            this.$message({
                            type: 'warning',
                            message: '该用户还有'+res.data.count+'个合同，'+response.data.count+'个流程未转移，请先转移后再删除!'
                            });
                        }
                    })
                    
                })
                
                
            })
            
        }
    }
}
</script>