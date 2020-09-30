<template>
    <div class="app-container-change">
        <template>
            <div  class="selectBox">
                <h3 style="text-align: center;width:200px;float:left;margin:0px;height:40px;line-height:40px">业务转移</h3>
                <div class="select">
                    <el-select @change="selectChange" v-model="values" placeholder="请选择转移对象">
                        <el-option
                        v-for="item in options"
                        :key="item.uid"
                        :label="item.uname"
                        :value="item.uid">
                        </el-option>
                    </el-select>
                </div>
                <div class="el-transfer" style="margin:0px">
                    <div class="el-transfer-panel">
                        <div class="el-transfer-panel__header">
                            <el-checkbox style="font-weight:border;padding:0px" :disabled="disabled1" @change="changeBox(1)" v-model="checked1">{{user1.uname}}</el-checkbox>
                        </div>
                        <div class="el-transfer-panel__body">
                            <ul class="infinite-list" style="overflow:auto">
                                <el-checkbox v-for="(item,i) in data" :key="item.cid" v-if="item!=undefined" @change="changeBox(2)" v-model="checked2[i]">{{item.label}}</el-checkbox>
                            </ul>
                        </div>
                    </div>
                    <div class="el-transfer__buttons">
                        <el-button :disabled="disabled2" type="primary" icon="el-icon-arrow-left" @click="DataToLeft()"></el-button>
                        <el-button :disabled="disabled1" type="primary" icon="el-icon-arrow-right" @click="DataToRight()"></el-button>
                    </div>
                    <div class="el-transfer-panel">
                        <div class="el-transfer-panel__header">
                            <el-checkbox style="font-weight:border;padding:0px" :disabled="disabled2" v-model="checked3" @change="changeBox(3)">{{options[index].uname}}</el-checkbox>
                        </div>
                        <div class="el-transfer-panel__body">
                            <ul class="infinite-list" style="overflow:auto">
                                <el-checkbox v-for="(item,i) in rightData" :key="item.cid" v-if="item!=undefined" @change="changeBox(4)" v-model="checked4[i]">{{item.label}}</el-checkbox>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style="width:100%;text-align: center;padding-right:10px"><el-button @click="sumject()" style="position: relative;top:-100px" type="primary">转移业务</el-button></div>
            </div>
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

export default {//定义变量和初始值
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },
    created() {//页面渲染之前执行，调用methods定义的方法
      this.init();
    },
    watch:{//监听
        $route(to,from){//路由变化的方式，路由一变化就执行
        console.log('watch $route')
        this.init()
        }
    },
    data() {
      return {
        flow:{},
        disabled1:true,
        disabled2:true,
        checked1:[],
        checked2:[],
        checked3:[],
        checked4:[],
        index:0,
        rightData:[],
        options: [],
        values: [],  
        data: [],
        value: [],
        user1:{},
        user2:{},
        contract:[],
        ChangeUser:[],
        data2:[],
      };
    },
    methods:{
        changeBox(l){
            if(l==1){
                for(let i=0;i<this.data.length;i++){
                    this.checked2[i]=this.checked1
                }
            }else if(l==2){
                this.checked1=this.changeBoxAllIsSelect(this.checked2)
            }else if(l==3){
                for(let i=0;i<this.rightData.length;i++){
                    this.checked4[i]=this.checked3
                }
            }else if(l==4){
               this.checked3=this.changeBoxAllIsSelect(this.checked4)
            }
        },
        changeBoxAllIsSelect(check){
            for(let i=0;i<check.length;i++){
                if(!check[i]){
                    return false
                }
            }
            return true
        },
        DataToLeft(){
            if(this.checked4.length>0){
                this.checked3=false
                for(let i=0;i<this.checked4.length;i++){
                    if(this.checked4[i]){
                        // console.log(this.listIndexOf(this.rightData,this.data[i]))
                        // if(this.listIndexOf(this.data,this.rightData[i])<0){
                            let x=this.listIndexOf(this.data2,this.rightData[i])
                            this.$set(this.data,x,this.rightData[i])
                            this.ChangeUser[this.index].cid.splice(this.ChangeUser[this.index].cid.indexOf(this.rightData[i].key),1)
                            delete this.rightData[i]
                            this.disabled1=false
                        // }
                    }
                    this.checked2[i]=false
                    delete this.checked4[i]
                }
                this.checked4[0]=false
                this.removeUndefindOfList(this.checked4)
                this.removeUndefindOfList(this.rightData)
                if(this.rightData.length==0){
                    this.disabled2=true
                }
            }
            
        },
        DataToRight(){
            if(this.checked2.length>0){
                this.checked1=false
                for(let i=0;i<this.checked2.length;i++){
                    if(this.checked2[i]){
                        // console.log(this.listIndexOf(this.rightData,this.data[i]))
                        if(this.listIndexOf(this.rightData,this.data[i])<0){
                            this.rightData.push({
                                key: `${ this.data[i].key }`,
                                label: `${ this.data[i].label }`,
                            })
                            this.disabled2=false
                            if(this.ChangeUser[this.index].cid.indexOf(this.data[i].key)<0){
                                this.ChangeUser[this.index].cid.push(this.data[i].key)
                            }
                            delete this.data[i]
                        }
                        this.checked4[i]=false
                        delete this.checked2[i]
                    }
                }
                this.removeUndefindOfList(this.checked2)
                if(this.listCountUndefind(this.data)==0){
                    this.disabled1=true
                }
            }
        },
        // 统计不为undefind的
        listCountUndefind(list){
            let sum=0
            for(let i=0;i<list.length;i++){
                if(list[i]!=undefined){
                    sum++
                }
            }
            return sum
        },
        //清除集合中的undefind
        removeUndefindOfList(list){
            let un=false;
            for(let i=0;i<list.length;i++){
                if(list[i]==undefined){
                    list.splice(i,1)
                    un=true
                    break;
                }
            }
            if(un)
            this.removeUndefindOfList(list);
        },
        listIndexOf(list,li){
            for(let i=0;i<list.length;i++){
                if(list[i].key==li.key){
                    return i
                }
            }
            return -1;
        },
        selectChange(val){
            for(let i=0;i<this.options.length;i++){
                if(val==this.options[i].uid){
                    this.index=i
                    break
                }
            }
            //清除
            this.rightData=[]
            //重新插入
            for(let i=0;i<this.ChangeUser.length;i++){
                if(this.ChangeUser[i].uid==val){
                    for(let j=0;j<this.ChangeUser[i].cid.length;j++){
                        this.rightData.push({
                            key: this.ChangeUser[i].cid[j],
                            label: this.querySerialNum(this.ChangeUser[i].cid[j])
                        })
                    }
                }
            }
            if(this.rightData.length!=0){
                this.disabled2=false
            }else{
                this.disabled2=true
            }
        },
        querySerialNum(cid){
            for(let i=0;i<this.data2.length;i++){
                if(cid==this.data2[i].key){
                    return this.data2[i].label
                }
            }
        },
        sumject(){
            if(this.user1.jurisdiction==4){
                flow.changeFlowAgentId(this.ChangeUser)
                .then(res=>{
                    this.$message({
                        type: 'success',
                        message: '转移成功!'
                    });
                    window.opener.logoClickBtn();
                    window.close()
                })
            }else if(this.user1.jurisdiction==3){
                contract.changeContract(this.ChangeUser)
                .then(res=>{
                    this.$message({
                        type: 'success',
                        message: '转移成功!'
                    });
                    window.opener.logoClickBtn();
                    window.close()
                })
            }
            
        },
        init(){
            let id=this.$route.params.id;
            user.getUserInfo(id)
            .then(res=>{
                this.user1=res.data.user
                // console.log(this.user1)
                user.ChangeUser(this.user1)
                .then(rest=>{
                    this.options=rest.data.ChangeUser
                    this.values=rest.data.ChangeUser[this.index].uname
                    for(let i=0;i<this.options.length;i++){
                        this.ChangeUser.push({
                            uid:this.options[i].uid,
                            cid:[]
                        })
                    }
                })
                if(this.user1.jurisdiction==3){
                    contract.getChangeContract(this.user1.uid)
                    .then(rest=>{
                        this.contract=rest.data.Contract
                        for(let i=0;i<this.contract.length;i++){
                            // console.log(contract[i])
                            this.data.push({
                                key: `${ this.contract[i].cid }`,
                                label: `${ this.contract[i].companyName }`,
                            })
                            this.data2.push({
                                key: `${ this.contract[i].cid }`,
                                label: `${ this.contract[i].companyName }`,
                            })
                            this.checked2[i]=false
                        }
                        if(this.data.length==0){
                            this.disabled1=true
                        }else{
                            this.disabled1=false
                        }
                        this.disabled2=true
                    })
                }else if(this.user1.jurisdiction==4){
                    flow.changeFlowAgent(this.user1.uid)
                    .then(rest=>{
                        this.flow=rest.data.Flow
                        for(let i=0;i<this.flow.length;i++){
                            // console.log(contract[i])
                            if(this.flow[i].type==1){
                                this.data.push({
                                    key: `${ this.flow[i].fid }`,
                                    label: `${ this.flow[i].companyName }`,
                                })
                                this.data2.push({
                                    key: `${ this.flow[i].fid }`,
                                    label: `${ this.flow[i].companyName }`,
                                })
                            }else{
                                this.data.push({
                                    key: `${ this.flow[i].fid }`,
                                    label: `${ this.flow[i].companyName }`,
                                })
                                this.data2.push({
                                    key: `${ this.flow[i].fid }`,
                                    label: `${ this.flow[i].companyName }`,
                                })
                            }
                            this.checked2[i]=false
                        }
                        if(this.data.length==0){
                            this.disabled1=true
                        }else{
                            this.disabled1=false
                        }
                        this.disabled2=true
                    })
                }
                
            })
        }
    }
}
</script>
<style>
.el-transfer__buttons{
    display: inline-block;
    vertical-align: middle;
    padding: 0 28px;
}
.el-checkbox{
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    display: block!important;
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    margin-right: 30px;
}
.infinite-list{
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 246px;
    overflow: auto;
    box-sizing: border-box;
}
.el-transfer-panel__body{
    height: 246px;
}
.el-transfer-panel__header{
    height: 40px;
    line-height: 40px;
    background: #f5f7fa;
    margin: 0;
    padding-left: 15px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    color: #000;
}
.el-transfer-panel{
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
}
.el-transfer{
    width:590px;
    height:328px;
    text-align: left;
    display: inline-block;
}
.selectBox{
    position: relative;
    /* top: -55px; */
}
.app-container-change{
    padding: 20px;
    background-color: #fafafa;
    width: 640px;
}
.link-contrainer{
    background-image:none !important;
}
.select{
    float:right;
    margin-right: 8px;
}
.app-wrapper{
    background-color: #fafafa;
}
.el-transfer{
    margin-top: 45px;
}
</style>