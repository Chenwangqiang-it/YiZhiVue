<template>
    <div class="container2">
            <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px" v-if="isaudit==1">
                <!-- :inline="true" -->
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    合同审核
                </div>
                 <div class="libox">
                    <div class="li">
                        <h3 >特许人基本信息
                            <div class="show" @click="isShow(0)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.info">
                            <el-form-item label="公司全称"  prop="companyName" >
                                <el-input  name="companyName" v-model="contract.companyName" placeholder="公司全称"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" prop="respName" >
                                <el-input  name="respName" v-model="contract.respName" placeholder="经办人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone" >
                                <el-input   name="phone" v-model="contract.phone" placeholder="联系电话"></el-input>
                            </el-form-item>
                            <el-form-item label="公司地址"  prop="companyAddrss" >
                                <el-input  name="companyAddrss" v-model="contract.companyAddrss" placeholder="公司地址"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮件"  >
                                <el-input  name="email" v-model="contract.email" placeholder="电子邮件"></el-input>
                            </el-form-item>
                            <el-form-item label="经办人职位" >
                                <el-input  name="respPost" v-model="contract.respPost" placeholder="经办人职位"></el-input>
                            </el-form-item>
                            <el-form-item label="公司座机" >
                                <el-input  name="speialPlane" v-model="contract.speialPlane" placeholder="公司座机"></el-input>
                            </el-form-item>
                            <el-form-item label="公司网址" >
                                <el-input  name="url" v-model="contract.url" placeholder="公司网址"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                        <h3>时间
                            <div class="show" @click="isShow(1)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.time">
                            <el-form-item label="预计月数" prop="anticMonths">
                            <el-input-number  name="anticMonths"  v-model="contract.anticMonths" :min="1" :max="100" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li" >
                    <h3 style="margin-bottom:15px">备案项目
                         <div class="show" @click="isShow(2)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.right">
                            <div class="add">
                                <el-popover
                                placement="bottom"
                                width="160"
                                height="150"
                                v-model="vis">
                                请填写项目数量:<el-input-number v-model="num" style="width:135px;height:40px" controls-position="right" :min="1" :max="10"></el-input-number>
                                <div style="text-align: right;margin-top:10px">
                                    <el-button size="mini" type="text" @click="vis = false;num=1">取消</el-button>
                                    <el-button type="primary" size="mini" @click="addProject()">确定</el-button>
                                </div>
                               <el-link slot="reference" type="primary" >添加项目+</el-link>
                               </el-popover>
                            </div>
                            <el-form v-for="(list,i) in contract.project" :key="list.value" :model="list" :rules="saveRules" ref="project">
                                <h4 style="margin-bottom:0px;height:40px;line-height:40px">项目{{i+1}}:
                                    <div style="float:right" v-if="i!=0">
                                         <el-link type="danger" @click="removeProject(i)" style="height:20px">删除项目-</el-link>
                                    </div>
                                </h4>
                                <el-form v-for="(item,j) in list" :key="item.value" :model="item" :rules="saveRules" ref="project[j]">
                                    <h5 style="margin-bottom:0px;line-height:40px" v-if="j==0">
                                        <el-form-item style="margin-top:0px" label="付款方式" prop="paymentType">
                                            <el-select  v-model="paymentType" placeholder="请选择付款方式">
                                                <el-option label="全额付款" :value="1"></el-option>
                                                <el-option label="分期付款" :value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px" label="单价金额" prop="price">
                                            <el-input oninput="value=value.replace(/[^\d]/g,'')" name="fullAmount" v-model="item.price" placeholder="单件价格"></el-input>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px"  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                            <el-input name="firstAmount" v-model="item.firstAmount" placeholder="首款金额"></el-input>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px" label="尾款金额" v-if="paymentType==2" prop="lastAmount">
                                            <el-input  name="lastAmount" v-model="item.lastAmount" placeholder="尾款金额"></el-input>
                                        </el-form-item>
                                    </h5>
                                    <h5 style="margin:0px;height:20px;margin-bottom:0px;margin-left:10px">
                                        <div style="float:left">类型{{j+1}}:</div>
                                        <div style="float:right;margin-right:20px" v-if="j!=0">
                                            <el-link type="danger" @click="removeType(i,j)" style="height:20px">删除类型-</el-link>
                                        </div>
                                    </h5>
                                    <el-form-item  label="权利类型" prop="ptype">
                                        <el-select v-model="item.ptype" filterable placeholder="请选择">
                                            <el-option label="商标权" value="商标权"></el-option>
                                            <el-option label="著作权" value="著作权"></el-option>
                                            <el-option label="专利权" value="专利权"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="项目名称" prop="pname">
                                        <el-input v-model="item.pname" placeholder="项目名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="权利号" prop="pnumber">
                                        <!-- oninput="value=value.replace(/[^\d]/g,'')" -->
                                        <el-input 
                                            name="brand"
                                            v-model="item.pnumber"
                                            placeholder="商标号">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="权利性质" prop="pproperty">
                                        <el-select v-model="item.pproperty" filterable placeholder="请选择">
                                            <el-option label="所有权" value="所有权"></el-option>
                                            <el-option label="使用权" value="使用权"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="权利期限" v-if="item.ptype=='著作权'">
                                        <el-date-picker
                                        v-model="item.pbegin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择开始日期">
                                        </el-date-picker>
                                        --
                                        <el-date-picker
                                        v-model="item.pend"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="权利期限" prop="pbegin" v-else>
                                        <el-date-picker
                                        v-model="item.pbegin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择开始日期">
                                        </el-date-picker>
                                        --
                                        <el-date-picker
                                        v-model="item.pend"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item v-if="j==contract.project[i].length-1" style="float:right;margin-right:20px" >
                                        <el-link @click="addType(i)" type="primary" style="height:20px" >添加类型+</el-link>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-upload
                                        style="float:left"
                                        class="upload-demo"
                                        :action="BASE_API+'/eduservice/state/upcontract'"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="function (res,file,fileList){return fileUploadSuccess(res, file, fileList,i,j)}"
                                        :before-upload="function (res,file){return fileUpload(file,i,j)}"
                                        multiple
                                        :limit="3"
                                        :show-file-list=false
                                        :on-exceed="handleExceed"
                                        :file-list="contract.project[i][j].materia">
                                            <el-button size="small" @click="setProjectIndex(i)" style="background-color:#409EFF;color:#fff;margin-bottom:20px">资料上传</el-button>
                                        </el-upload>
                                        <div style="float:left;margin-left:5px" v-if="contract.project[i][j].fileUploading">
                                            <i class="el-icon-loading"></i>    
                                        </div>
                                        <div style="float:left;margin-left:20px" v-if="contract.project[i][j].materia.length!=0">
                                            <el-dropdown trigger="click">
                                                <span class="el-dropdown-link">
                                                    资料列表<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="(filelist,i) in contract.project[i][j].materia" :key="filelist.value">
                                                        <el-link @click="dowload(filelist.response.data.url[i])" type="primary">{{filelist.name}}</el-link>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-form-item>
                               
                                    <el-divider></el-divider>
                                </el-form>
                                    
                            </el-form>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                    <h3>金额
                        <div class="show" @click="isShow(3)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.money">
                            
                            <!-- <div></div> -->
                            <!-- <el-form-item label="付款方式" >
                            <el-select   v-model="paymentType" placeholder="请选择付款方式">
                                <el-option label="全额付款" :value="1"></el-option>
                                <el-option label="分期付款" :value="2"></el-option>
                            </el-select> -->
                            <!-- </el-form-item> -->
                            <el-form-item label="全款金额" prop="fullAmount">
                                <el-input  name="fullAmount" v-model="contract.fullAmount" placeholder="全款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                <el-input  name="firstAmount" v-model="contract.firstAmount" placeholder="首款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="尾款金额" v-if="paymentType==2" prop="lastAmount">
                                <el-input  name="lastAmount" v-model="contract.lastAmount" placeholder="尾款金额"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                        <div class="li"> 
                            <h3 style="margin-bottom:15px;">合同原件
                                <span v-if="isStandard"> (标准合同) </span>
                                <span v-else> (非标合同) </span>
                                <div class="show" @click="isShow(5)">
                                    <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                                </div>
                            </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.contract">
                                <el-form-item >
                                    <el-button type="warning" round @click="browse(state2.url)">浏览<i class="el-icon-view"></i></el-button>
                                </el-form-item>
                                <el-form-item >
                                    <el-link :href="state2.url" type="primary" :underline="false">点击下载<i class="el-icon-download"></i></el-link>
                                </el-form-item>
                                <el-form-item>
                                    <h4 style="margin:0px">非标合同描述:</h4>
                                    <el-input
                                    disabled
                                    style="width:320px"
                                    type="textarea"
                                    :rows="2"
                                    placeholder="描述信息"
                                    v-model="state2.notStandardMsg">
                                    </el-input>
                                    <!-- <pre>非标合同描述:{{state2.notStandardMsg}}</pre> -->
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                </div>
                <div class="libox">
                        <div class="li"> 
                            <h3 style="margin-bottom:15px">审核
                                <div class="show" @click="isShow(4)">
                                    <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                                </div>
                            </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.commit">
                                <h4 style="margin-bottom:15px">描述信息</h4>
                                <el-form-item style="margin:0px;margin-left:32px">
                                    <el-input
                                    style="width:300px"
                                    type="textarea"
                                    placeholder="请输入描述信息"
                                    v-model="contract.msg">
                                    </el-input>
                                </el-form-item>
                                <div></div>
                                <el-form-item >
                                    <el-button type="primary" style="width:75px" @click.native.prevent="commit3" v-if="!loading2">同意</el-button>
                                    <el-button type="primary" style="width:75px" disabled  v-if="loading2">同意</el-button>
                                    <el-button type="danger"  @click.native.prevent="open" v-if="!loading2">驳回</el-button>
                                    <el-button disabled  v-if="loading2">驳回</el-button>
                                </el-form-item>
                                <div></div>
                                <el-form-item v-if="loading2" style="color:#fff">
                                    正在上传
                                    <i class="el-icon-loading2" style="color:#fff"></i>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
            </el-form>
            <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" v-if="isaudit==2" style="padding-left:30px" >
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    增加品牌信息修改
                </div>
                <div class="libox">
                    <div class="li">
                        <h3 >特许人基本信息
                            <div class="show" @click="isShow(0)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.info">
                            <el-form-item label="公司全称"  prop="companyName" >
                                <el-input  name="companyName" v-model="contract.companyName" placeholder="公司全称"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" prop="respName" >
                                <el-input  name="respName" v-model="contract.respName" placeholder="经办人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone" >
                                <el-input   name="phone" v-model="contract.phone" placeholder="联系电话"></el-input>
                            </el-form-item>
                            <el-form-item label="公司地址"  prop="companyAddrss" >
                                <el-input  name="companyAddrss" v-model="contract.companyAddrss" placeholder="公司地址"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮件" >
                                <el-input  name="email" v-model="contract.email" placeholder="电子邮件"></el-input>
                            </el-form-item>
                            <el-form-item label="经办人职位" >
                                <el-input  name="respPost" v-model="contract.respPost" placeholder="经办人职位"></el-input>
                            </el-form-item>
                            <el-form-item label="公司座机" >
                                <el-input  name="speialPlane" v-model="contract.speialPlane" placeholder="公司座机"></el-input>
                            </el-form-item>
                            <el-form-item label="公司网址" >
                                <el-input  name="url" v-model="contract.url" placeholder="公司网址"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                        <h3>时间
                            <div class="show" @click="isShow(1)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.time">
                            <el-form-item label="预计月数" prop="anticMonths">
                            <el-input-number  name="anticMonths"  v-model="contract.anticMonths" :min="1" :max="100" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li" >
                    <h3 style="margin-bottom:15px">备案项目
                         <div class="show" @click="isShow(2)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.right">
                            <div class="add">
                                <el-popover
                                placement="bottom"
                                width="160"
                                height="150"
                                v-model="vis">
                                请填写项目数量:<el-input-number v-model="num" style="width:135px;height:40px" controls-position="right" :min="1" :max="10"></el-input-number>
                                <div style="text-align: right;margin-top:10px">
                                    <el-button size="mini" type="text" @click="vis = false;num=1">取消</el-button>
                                    <el-button type="primary" size="mini" @click="addProject()">确定</el-button>
                                </div>
                               <el-link slot="reference" type="primary" >添加项目+</el-link>
                               </el-popover>
                            </div>
                            <el-form v-for="(list,i) in contract.project" :key="list.value" :model="list" :rules="saveRules" ref="project">
                                <h4 style="margin-bottom:0px;height:40px;line-height:40px">项目{{i+1}}:
                                    <div style="float:right" v-if="i!=0">
                                         <el-link type="danger" @click="removeProject(i)" style="height:20px">删除项目-</el-link>
                                    </div>
                                </h4>
                                <el-form v-for="(item,j) in list" :key="item.value" :model="item" :rules="saveRules" ref="project[j]">
                                    <h5 style="margin-bottom:0px;line-height:40px" v-if="j==0">
                                        <el-form-item style="margin-top:0px" label="付款方式" prop="paymentType">
                                            <el-select  v-model="paymentType" placeholder="请选择付款方式">
                                                <el-option label="全额付款" :value="1"></el-option>
                                                <el-option label="分期付款" :value="2"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px" label="单价金额" prop="price">
                                            <el-input oninput="value=value.replace(/[^\d]/g,'')" name="fullAmount" v-model="item.price" placeholder="单件价格"></el-input>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px"  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                            <el-input name="firstAmount" v-model="item.firstAmount" placeholder="首款金额"></el-input>
                                        </el-form-item>
                                        <el-form-item style="margin-top:0px" label="尾款金额" v-if="paymentType==2" prop="lastAmount">
                                            <el-input  name="lastAmount" v-model="item.lastAmount" placeholder="尾款金额"></el-input>
                                        </el-form-item>
                                    </h5>
                                    <h5 style="margin:0px;height:20px;margin-bottom:0px;margin-left:10px">
                                        <div style="float:left">类型{{j+1}}:</div>
                                        <div style="float:right;margin-right:20px" v-if="j!=0">
                                            <el-link type="danger" @click="removeType(i,j)" style="height:20px">删除类型-</el-link>
                                        </div>
                                    </h5>
                                    <el-form-item  label="权利类型" prop="ptype">
                                        <el-select v-model="item.ptype" filterable placeholder="请选择">
                                            <el-option label="商标权" value="商标权"></el-option>
                                            <el-option label="著作权" value="著作权"></el-option>
                                            <el-option label="专利权" value="专利权"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="项目名称" prop="pname">
                                        <el-input v-model="item.pname" placeholder="项目名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="权利号" prop="pnumber">
                                        <!-- oninput="value=value.replace(/[^\d]/g,'')" -->
                                        <el-input 
                                            name="brand"
                                            v-model="item.pnumber"
                                            placeholder="商标号">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="权利性质" prop="pproperty">
                                        <el-select v-model="item.pproperty" filterable placeholder="请选择">
                                            <el-option label="所有权" value="所有权"></el-option>
                                            <el-option label="使用权" value="使用权"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="权利期限" v-if="item.ptype=='著作权'">
                                        <el-date-picker
                                        v-model="item.pbegin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择开始日期">
                                        </el-date-picker>
                                        --
                                        <el-date-picker
                                        v-model="item.pend"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="权利期限" prop="pbegin" v-else>
                                        <el-date-picker
                                        v-model="item.pbegin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择开始日期">
                                        </el-date-picker>
                                        --
                                        <el-date-picker
                                        v-model="item.pend"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="请选择结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item v-if="j==contract.project[i].length-1" style="float:right;margin-right:20px" >
                                        <el-link @click="addType(i)" type="primary" style="height:20px" >添加类型+</el-link>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-upload
                                        style="float:left"
                                        class="upload-demo"
                                        :action="BASE_API+'/eduservice/state/upcontract'"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :on-success="function (res,file,fileList){return fileUploadSuccess(res, file, fileList,i,j)}"
                                        :before-upload="function (res,file){return fileUpload(file,i,j)}"
                                        multiple
                                        :limit="3"
                                        :show-file-list=false
                                        :on-exceed="handleExceed"
                                        :file-list="contract.project[i][j].materia">
                                            <el-button size="small" @click="setProjectIndex(i)" style="background-color:#409EFF;color:#fff;margin-bottom:20px">资料上传</el-button>
                                        </el-upload>
                                        <div style="float:left;margin-left:5px" v-if="contract.project[i][j].fileUploading">
                                            <i class="el-icon-loading"></i>    
                                        </div>
                                        <div style="float:left;margin-left:20px" v-if="contract.project[i][j].materia.length!=0">
                                            <el-dropdown trigger="click">
                                                <span class="el-dropdown-link">
                                                    资料列表<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item v-for="(filelist,i) in contract.project[i][j].materia" :key="filelist.value">
                                                        <el-link @click="dowload(filelist.response.data.url[i])" type="primary">{{filelist.name}}</el-link>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </div>
                                    </el-form-item>
                               
                                    <el-divider></el-divider>
                                </el-form>
                                    
                            </el-form>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                    <h3>金额
                        <div class="show" @click="isShow(3)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                        <div class="lifroms" v-show="show.money">
                            
                            <!-- <div></div> -->
                            <!-- <el-form-item label="付款方式" >
                            <el-select   v-model="paymentType" placeholder="请选择付款方式">
                                <el-option label="全额付款" :value="1"></el-option>
                                <el-option label="分期付款" :value="2"></el-option>
                            </el-select> -->
                            <!-- </el-form-item> -->
                            <el-form-item label="全款金额" prop="fullAmount">
                                <el-input  name="fullAmount" v-model="contract.fullAmount" placeholder="全款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="首款金额" v-if="paymentType==2" prop="firstAmount">
                                <el-input  name="firstAmount" v-model="contract.firstAmount" placeholder="首款金额"></el-input>
                            </el-form-item>
                            <el-form-item  label="尾款金额" v-if="paymentType==2" prop="lastAmount">
                                <el-input  name="lastAmount" v-model="contract.lastAmount" placeholder="尾款金额"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
                <div class="libox">
                    <div class="li">
                    <h3 style="margin-bottom:15px">提交信息
                        <div class="show" @click="isShow(4)">
                            <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                        </div>
                    </h3>
                    </div>
                    <el-collapse-transition>
                    <div class="lifroms" v-show="show.commit">
                        <h4 style="margin-bottom:15px">描述信息</h4>
                        <el-form-item style="margin:0px;margin-left:32px">
                            <el-input
                            
                            style="width:300px"
                            type="textarea"
                            placeholder="请输入描述信息"
                            v-model="contract.msg">
                            </el-input>
                        </el-form-item>
                        <div></div>
                        <el-form-item >
                            <el-button type="primary"  @click.native.prevent="commit2" v-if="!loading">提交</el-button>
                            <el-button disabled type="primary"  v-if="loading">提交</el-button>
                        </el-form-item>
                        <div></div>
                        <el-form-item style="color:aliceblue" v-if="loading">
                            正在上传
                            <i class="el-icon-loading"></i>
                        </el-form-item>
                    </div>
                    </el-collapse-transition>
                </div>
            </el-form>
    </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import state from '@/api/edu/state'
import record from '@/api/edu/record'
import flow from '@/api/edu/flow'
import contract from '@/api/edu/contract'
import message from '@/api/edu/message'
import user from '@/api/edu/user'
import cookieUtil from '@/utils/cookie'
import project from '@/api/edu/project'
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
        const valiNotNull = (rule, value, callback) => {
            if (value=='') {
                callback(new Error('该字段不能为空'))
            } else {
                callback()
            }
        }
        const isNumber = (rule, value, callback) => {
            if (value.length!=11) {
                callback(new Error('联系电话应为11位'))
            }else{
                for(let ilen=0;ilen<value.length;ilen++){
                    if(value.charAt(ilen) < '0' || value.charAt(ilen) > '9' ){
                        if((value.charAt(ilen)!='-'))
                        callback(new Error('联系电只能由数字或"-"组成'))
                    } 
                }
                callback()
            } 
        }
        const email = (rule, value, callback) => {
            const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!mailReg.test(value)||value=='') {
                callback(new Error('请输入正确的邮箱格式'))
            }else{
                callback()
            } 
        }
        const type = (rule, value, callback) => {
            // console.log(this.checked1||this.checked2||this.checked3)
            if (!this.checked1&&!this.checked2&&!this.checked3) {
                callback(new Error('至少选择一个权力类别'))
            }else{
                callback()
            } 
        }
        const valiAmount = (rule, value, callback) => {
            if (value=='') {
                callback(new Error('请选择付款方式'))
            } else {
                callback()
            }
        }
        const price = (rule, value, callback) => {
            if (value==null||value=='') {
                callback(new Error('请输入正确单件价格'))
            } else {
                if(value!=0){
                    let full=0
                    for(let i=0;i<this.contract.project.length;i++){
                        if(this.contract.project[i][0].price!='')
                        full+=parseInt(this.contract.project[i][0].price)
                    }
                    this.contract.fullAmount=full
                }
                
                callback()
            }
        }
        const valiFirstAmount = (rule, value, callback) => {
            if(value==''||value==null){
                callback(new Error('首款不可以为空!'))
            }else{
                if (parseInt(value)>this.contract.project[0][0].price) {
                    if(parseInt(value)==this.contract.firstAmount){
                        callback()
                    }else {
                        callback(new Error('首款不可以超过单价!'))
                    }
                } else {
                    if(value!=0)
                    this.firstAmountSum()
                    callback()
                }
            }
        }
        const valilastAmount = (rule, value, callback) => {
            if(value==''||value==null){
                callback(new Error('尾款不可以为空!'))
            }
            else {
                callback()
            }
        }
        const valianticMonths = (rule, value, callback) => {
            if (value<1) {
                callback(new Error('月数不能为负数'))
            } else {
                callback()
            }
            }
        return{
            paymentType:1,
            projectIndex:-1,
            vis:false,
            num:1,
            show:{info:true,time:true,money:true,shop:true,right:true,commit:true,contract:true},
            id:"",
            management:{},
            state2:{},
            isStandard:true,
            visible1:false,
            visible2:false,
            loading2:false,
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
                sstate:'',
                notStandardMsg:''
            },
            record:{},
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            fileList: [],
            fileList2: [],
            contract:{
                uid:'',
                uname:'',
                uphone:'',
                brandName:'',
                fullAmount:'',
                firstAmount:'',
                lastAmount:'',
                anticMonths:'',
                companyName:'',
                companyAddrss:'',
                speialPlane:'',
                respName:'',
                respPost:'',
                email:'',
                trade:'',
                phone:'',
                url:'',
                src:'',
                rightCategory:'',
                rightNum:'',
                price:0,
                project:[
                    [
                        {
                            lastAmount:null,
                            firstAmount:null,
                            price:'',
                            fileUploading:false,
                            cid:'',
                            pname:'',
                            ptype:'',
                            pnumber:'',
                            pproperty:'',
                            pbegin:'',
                            pend:'',
                            materia:[],
                        }
                    ]
                    
                ]
            },
            saveRules: {
                brandName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                fullAmount:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                firstAmount:[{ required: true, trigger: 'blur', validator: valiFirstAmount}],
                lastAmount:[{ required: true, trigger: 'blur', validator: valilastAmount}],
                anticMonths:[{ required: true, trigger: 'blur', validator: valianticMonths}],
                companyName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                speialPlane:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                respName:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                respPost:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                email:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                trade:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                tax:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                phone:[{ required: true, trigger: 'blur', validator: isNumber}],
                url:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                email:[{ required: true, trigger: 'blur', validator: email}],
                price:[{ required: true, trigger: 'blur', validator: price}],
                companyAddrss:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pname:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                ptype:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pnumber:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pproperty:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                pbegin:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                paymentType:[{ required: true, trigger: 'blur', validator: valiNotNull}]
            },
        }
            
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
     methods:{
        removeProject(i){
            this.contract.project.splice(i,1)
        },
        removeType(i,j){
            this.contract.project[i].splice(j,1)
        },
        firstAmountSum(){
            let firstSum=0
            let lastSum=0
            for(let i=0;i<this.contract.project.length;i++){
                if(this.contract.project[i][0].firstAmount!=''&&this.contract.project[i][0].firstAmount!=null)
                this.contract.project[i][0].firstAmount=parseInt(this.contract.project[i][0].firstAmount)
                if(this.contract.project[i][0].lastAmount!=''&&this.contract.project[i][0].lastAmount!=null)
                this.contract.project[i][0].lastAmount=parseInt(this.contract.project[i][0].lastAmount)
                if(this.contract.project[i][0].price!=0&&this.contract.project[i][0].price!=''){
                    if(this.contract.project[i][0].firstAmount!=''&&this.contract.project[i][0].firstAmount!=null)
                    this.contract.project[i][0].lastAmount=parseInt(this.contract.project[i][0].price)-parseInt(this.contract.project[i][0].firstAmount)
                }
                if(this.contract.project[i][0].firstAmount!=''&&this.contract.project[i][0].firstAmount!=null)
                firstSum+=parseInt(this.contract.project[i][0].firstAmount)
                if(this.contract.project[i][0].lastAmount!=''&&this.contract.project[i][0].lastAmount!=null)
                lastSum+=parseInt(this.contract.project[i][0].lastAmount)
            }
            this.contract.firstAmount=firstSum
            this.contract.lastAmount=lastSum
        },
        setProjectIndex(i){
            this.projectIndex=i
        },//文件点击上传获取点击的地址值
        addProject(){
            this.vis=false
            for(let i=0;i<this.num;i++){
                let project=[{
                        price:'',
                        lastAmount:'',
                        firstAmount:'',
                        paymentType:1,
                        fileUploading:false,
                        cid:this.contract.cid,
                        pname:'',
                        ptype:'',
                        pnumber:'',
                        pproperty:'',
                        pbegin:'',
                        pend:'',
                        materia:[],
                    }]
                this.contract.project.push(project)
            }
        },
        addType(i){
            let project={
                        cid:this.contract.cid,
                        pname:'',
                        ptype:'',
                        pnumber:'',
                        pproperty:'',
                        pbegin:'',
                        pend:'',
                        fileUploading:false,
                        materia:[],
                    }
            this.contract.project[i].push(project)
            this.$forceUpdate();//数据刷新
         },
        submitUpload() {
            this.$refs.upload.submit();
        },
        memoStyleChange(item) {
            if (item == 1) {
                
            } else {
                this.$set(this.input, 'description', 'Landlord could not be reached')
            }
        },
        isShow(i){
            // let i=this.show.indexOf(key)
            let show=document.getElementsByClassName("show")[i]
            if(i==4){
                show=document.getElementsByClassName("show")[5]
            }
            if(i==5){
                show=document.getElementsByClassName("show")[4]
            }//因为审核和修改在一个页面，有不同的元素
            let container=document.getElementsByClassName("container")[0]
            let pd=false
            if(i==0){
                pd=this.show.info
                this.show.info=!this.show.info
            }else if(i==1){
                pd=this.show.time
                this.show.time=!this.show.time
            }else if(i==3){
                pd=this.show.money
                this.show.money=!this.show.money
            }else if(i==2){
                pd=this.show.right
                this.show.right=!this.show.right
            }else if(i==4){
                pd=this.show.commit
                this.show.commit=!this.show.commit
            }else if(i==5){
                pd=this.show.contract
                this.show.contract=!this.show.contract
            }
            // let libox=document.getElementsByClassName("libox")[i]
            if(pd){
                // libox.style.height="35px"
                show.style="transform:rotate(-90deg)";
            }else{
                // libox.style.height="495px"
                show.style="transform:rotate(0deg)";
            }          
            // console.log(this.show[i])
        },
        init(){
            //  console.log(this.$route.query.id==undefined)
            if(this.$route.query.id==undefined){
                let lis={}
                lis=JSON.parse(this.getCookie('lis'))
                this.isaudit=lis.isaudit
                this.url=lis.url
                this.record.cid=lis.cid
                this.id=lis.id
            }else{
                let lis={}
                this.isaudit=this.$route.query.isaudit
                this.url=this.$route.query.url
                this.record.cid=this.$route.query.cid
                this.id=this.$route.query.id
                lis.isaudit=this.$route.query.isaudit
                lis.url=this.$route.query.url
                lis.cid=this.$route.query.cid
                lis.id=this.$route.query.id
                this.setCookie('lis',JSON.stringify(lis), 360)
            }
            this.getContract(this.record.cid)
            if(this.isaudit==1){
                this.contract2=JSON.stringify(this.contract)
                state.getStateList(this.id)
                .then(res=>{
                    this.state2=res.data.state
                    if(JSON.stringify(res.data.state.url).indexOf("[{")>=0){
                        this.state2.url=JSON.parse(res.data.state.url)[0].url
                        this.isStandard=false
                    }
                })
            }
            this.getManagement()
            this.record.uid=this.roles.uid
            
        },
        getContract(id){
            contract.getContract(id)
            .then(res=>{
                this.contract=res.data.contract
                // this.contract.project=JSON.parse(JSON.stringify(res.data.projects))
                this.$set(this.contract, 'project', res.data.projects)
                if(res.data.projects.length!=0){
                    for(let i=0;i<this.contract.project.length;i++){
                        for(let j=0;j<this.contract.project[i].length;j++){
                            this.contract.project[i][j].cid=this.contract.cid
                            // console.log(this.contract.project[i][j].pbegin)
                            this.contract.project[i][j].materia=JSON.parse(this.contract.project[i][j].materia)
                            user.getUserInfo(this.contract.uid)
                            .then(res=>{
                                this.contract.uname=res.data.user.uname
                                this.contract.uphone=res.data.user.phoneNum
                            })
                            
                        }
                    }
                }
                if(this.contract.lastAmount!=0){
                    this.paymentType=2
                }else{
                    this.paymentType=1
                }
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
        vis1(){
             if(this.contract.estabDateOne!=''&&this.contract.estabDateOne!=null){
                let str = this.contract.estabDateOne.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    this.$message({
                        type: 'warning',
                        message: '所选年份不满一年!'
                    });
                    this.visible1=true
                } else {
                    this.visible1=false
                }
             }
         },
        vis2(){
             if(this.contract.estabDateOne!=''&&this.contract.estabDateOne!=null){
                let str = this.contract.estabDateOne.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    this.$message({
                        type: 'warning',
                        message: '所选年份不满一年!'
                    });
                    this.visible2=true
                } else {
                    this.visible2=false
                }
             }
         },
        vismateria(){
            // 验证文件是否上传
            for(let i=0;i<this.contract.project.length;i++){
                for(let j=0;j<this.contract.project[i].length;j++){
                    if(this.contract.project[i][j].materia.length==0){
                        this.$message({
                            type: 'warning',
                            message: '每个项目至少上传一份资料'
                        });
                        return false
                    } 
                }
            }
            return true
        },
        commit2(){//修改
            this.$refs.contract.validate(valid => {
            let valid2=this.vismateria()
            if (valid&&valid2) {
            this.loading2=true
            for(let i=0;i<this.contract.project.length;i++){
                for(let j=0;j<this.contract.project[i].length;j++){
                    // console.log(this.contract.project[i][j].pbegin)
                    if(this.contract.project[i][j].materia[0].name!=undefined)
                        this.contract.project[i][j].materia=JSON.stringify(this.contract.project[i][j].materia)
                    if(this.contract.project[i][j].pbegin!=null){
                        // this.contract.project[i][j].pbegin=moment(this.contract.project[i][j].pbegin).format('YYYY.MM.DD')
                        // this.contract.project[i][j].pend=moment(this.contract.project[i][j].pend).format('YYYY.MM.DD')
                        this.contract.project[i][j].pbegin=moment(this.contract.project[i][j].pbegin).valueOf()
                        this.contract.project[i][j].pend=moment(this.contract.project[i][j].pend).valueOf()
                    }
                    if(this.paymentType==1){
                        this.contract.project[i][j].firstAmount=null
                        this.contract.project[i][j].lastAmount=null
                        this.contract.firstAmount=null
                        this.contract.lastAmount=null
                    }
                }
            }
            const loading = this.$loading({
                lock: true,
                text: '正在修改合同',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            contract.updateProject(this.contract)
           .then(res=>{
               for(let i=0;i<this.contract.project.length;i++){
                    for(let j=0;j<this.contract.project[i].length;j++){
                        this.contract.project[i][j].cid=res.data.contract.cid
                    }
                }
                this.msg2(res.data.contract.cid,res.data.contract.serialNum)
                project.remove(res.data.contract.cid)
                .then(rest=>{
                    project.addProject(this.contract.project)
                    .then(res=>{
                        this.loading2=false
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                        });
                        message.addMessages(this.messages)
                        .then(res=>{
                            loading.close();
                            this.$router.push({path:'/audit/list'})
                        })
                    // this.contract.src=res.data.path
                    })
                    .catch(error=>{
                        loading.close();
                        this.loading=false
                        this.$message({
                            type: 'error',
                            message: '项目修改出错..'
                        });
                    })
                })
                
            })
            .catch(error=>{
                 loading.close();
                 this.loading2=false
                 this.$message({
                    type: 'error',
                    message: '提交失败，请重新提交!'
                });
            })
             
            }
            })
        },
        commit3(){//审核
            this.$refs.contract.validate(valid => {
            let valid2=this.vismateria()
             if (valid&&valid2) {
                this.loading2=true
                const loading = this.$loading({
                    lock: true,
                    text: '正在提交审核',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.state.sstate=2
                this.record.sstate=2
                this.msg(this.record.cid,1)
                this.state.sid=this.id
                state.update(this.state)
                        .then(res=>{
                            record.addRecord(this.record)
                            .then(rest=>{
                                if(JSON.stringify(this.contract)!=this.contract2&&this.isStandard){
                                    for(let i=0;i<this.contract.project.length;i++){
                                        for(let j=0;j<this.contract.project[i].length;j++){
                                            // console.log(this.contract.project[i][j].pbegin)
                                            if(this.contract.project[i][j].materia[0].name!=undefined)
                                            this.contract.project[i][j].materia=JSON.stringify(this.contract.project[i][j].materia)
                                            if(this.contract.project[i][j].pbegin!=null){
                                                // this.contract.project[i][j].pbegin=moment(this.contract.project[i][j].pbegin).format('YYYY.MM.DD')
                                                // this.contract.project[i][j].pend=moment(this.contract.project[i][j].pend).format('YYYY.MM.DD')
                                                this.contract.project[i][j].pbegin=moment(this.contract.project[i][j].pbegin).valueOf()
                                                this.contract.project[i][j].pend=moment(this.contract.project[i][j].pend).valueOf()
                                            }
                                            if(this.paymentType==1){
                                                this.contract.project[i][j].firstAmount=null
                                                this.contract.project[i][j].lastAmount=null
                                                this.contract.firstAmount=null
                                                this.contract.lastAmount=null
                                            }
                                        }
                                    }
                                    contract.auditProject(this.contract)
                                    .then(res=>{
                                        for(let i=0;i<this.contract.project.length;i++){
                                                for(let j=0;j<this.contract.project[i].length;j++){
                                                    this.contract.project[i][j].cid=res.data.contract.cid
                                                }
                                        }
                                        project.updateProject(this.contract.project)
                                        .then(res=>{
                                            this.loading2=false
                                            this.$message({
                                                type: 'success',
                                                message: '提交成功!'
                                            });
                                            message.addMessages(this.messages)
                                            .then(res=>{
                                                loading.close();
                                                this.$router.push({path:'/audit/list'})
                                            })
                                        // this.contract.src=res.data.path
                                        })
                                        .catch(error=>{
                                            loading.close();
                                            this.loading=false
                                            this.$message({
                                                type: 'error',
                                                message: '项目修改出错..'
                                            });
                                        })
                                    })
                                    .catch(error=>{
                                        loading.close();
                                        this.loading2=false
                                        this.$message({
                                            type: 'error',
                                            message: '提交失败，请重新提交!'
                                        });
                                    })
                                }else{
                                    this.$message({
                                        type: 'success',
                                        message: '提交成功!'
                                    });
                                    message.addMessages(this.messages)
                                    .then(res=>{
                                        loading.close();
                                        this.$router.push({path:'/audit/list'})
                                    })
                                }
                            })
                        })
                    
            }
            })

        },
        msg2(cid,serialNum){
            let messages=[]
            // this.message.uid=this.roles.uid;
            // this.message.categoryId=cid
            // this.category=0
            // this.message.msg='您的合同'+serialNum+'已被修改，请等待主管审核'
            // messages.push(this.message)
            for(let i=0;i<this.management.length;i++){
                    let m={}
                    m.category=0
                    m.categoryId=cid
                    m.uid=this.management[i].uid
                    m.send=this.roles.uid
                    m.msg='合同'+serialNum+'已被修改，请及时审核'
                    messages.push(m);
            }
            this.messages=messages
            
        },
        fileUpload(file,i,j){
            this.$set(this.contract.project[i][j], 'fileUploading', true)
        },
        fileUploadSuccess(response, file, fileList,i,j){
            this.$message({
                type:'success',
                message:'上传成功'
            })
            this.contract.project[i][j].fileUploading=false
            this.contract.project[i][j].materia=fileList
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
                },
        msg(cid,i){
            contract.getContract(cid)
            .then(res=>{
                let messages=[]
                if(i==1){
                    this.message.msg='您的合同'+res.data.contract.serialNum+'已通过主管审核,请尽快签订'
                }else if(i==2){
                    this.message.msg='您的合同'+res.data.contract.serialNum+'已被主管驳回，请及时修改合同'
                }else if(i==3){
                    this.message.msg='您的合同'+res.data.contract.serialNum+'已通过合同签订，可以进行发起立案'
                }
                this.message.send=this.roles.uid
                this.message.categoryId=cid
                this.message.category=0
                this.message.uid=res.data.contract.uid
                messages.push(this.message)
                this.messages=messages
            })
        },
        reject(){//驳回
            this.state.sstate=1
            this.record.sstate=1
            this.loading=true
            const loading = this.$loading({
                lock: true,
                text: '正在提交审核',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.msg(this.record.cid,2)
            this.state.sid=this.id
            state.update(this.state)
                .then(res=>{
                    this.loading2=false
                    loading.close();
                    this.$message({
                        type: 'success',
                        message: '提交成功!'
                    });
                    message.addMessages(this.messages)
                    .then(res=>{
                        record.addRecord(this.record)
                        .then(res=>{
                            this.$router.push({path:'/audit/list'})
                        })
                    })
                    .catch(error=>{
                        loading.close();
                        this.loading2=false
                        this.$message({
                            type: 'error',
                            message: '消息发送失败!'
                        });
                    })
                })
        },
        open() {
            this.$prompt('驳回原因:', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
            inputErrorMessage: '不能为空'
            }).then(({ value }) => {
                this.state.cause=value
                this.reject()
            })
        },
        rightUtils(){
            if(this.checked1){
                this.contract.rightNum+='1'
            }
            if(this.checked2){
                this.contract.rightNum+='2'
            }
            if(this.checked3){
                this.contract.rightNum+='3'
            }
            
            if(!this.checked1){
                this.brand=[]
                this.contract.rightNum=this.contract.rightNum.split("1").join("")
            }
            if(!this.checked2){
                this.work=[]
                this.contract.rightNum=this.contract.rightNum.split("2").join("")
            }
            if(!this.checked3){
                this.right=[]
                this.contract.rightNum=this.contract.rightNum.split("3").join("")
            }
        },
    }
}
</script>
<style >
.container2 .add{
    width: 100%;
    position: relative;
    top: 10px;
    text-align: right;
    right:-50px
}
.container2 .el-input__inner{
    /* color: aliceblue; */
    /* background-color: transparent; */
     background-color: #fff;
     border: 1px solid #DDDCDC;
}
.container2 .el-input__inner[disabled]{
    /* color: aliceblue; */
    /* background-color: transparent; */
}

.container2 input{
    /* color: aliceblue; */
    /* background-color: #fff; */
    /* width: 200px; */
    box-shadow: inset 2px 1px 5px #cbc9c9;
}
.container2 .el-form-item{
    margin-top: 30px;
    margin-left: 30px;
    /* width: 300px; */
}
.container2 .el-form-item__label{
    width: 93px;
}
.container2 h3{
    background:url('../../../assets/white-title.png');
    color: #2c2c2c;
    height: 35px;
    position: relative;
    margin: 0px;
    padding: 0px 10px;
    text-shadow: 0px 1px #fff;
    line-height: 34px;
    /* padding-top: 10px; */
    left: 0px;
    /* top:13px; */
}
.container2 .lifroms{
    padding:0px 130px;
}
.container2 .libox{
    /* transition: height 0.3s; */
    /* margin-top:20px ; */
    width: 95%;
    /* border: 1px solid red; */
    margin: 0px auto;
    background-color: #f7f7f7;
    /* padding: 20px; */
    /* box-shadow: -5px -2px 10px rgba(0, 0, 0,.3); */
    box-shadow: 0px 5px 10px #AFAEAE;
    margin-top: 20px;
}
.container2{
    /* overflow:visible; */
    position: relative;
    background:url('../../../assets/bg.png');
    /* background-size: 100% 100%; */
    padding-left: 30px;
    padding-bottom: 20px;
}
.container2 .top{
    margin: 0px auto;
    /* height: 50px; */
    width: 95%;
    font-size: 27px;
    padding-top:35px;
    /* padding-left: 30px; */
    margin-bottom: 20px;
    /* background:url('../../../assets/icon.png') no-repeat; */
}
.container2 .li{
    height: 35px;
    width: 100%;
    position: relative;
    /* left: -35px; */
    /* background:url('../../../assets/li.png'); */
    background-size: 100% 100%;
}
.container2 .show{
    transition: all 0.3s ease-in;
    cursor: pointer;
    padding-left: 3px;
    padding-bottom: 10px;
    margin-top:5px ;
    width: 25px;
    height: 25px;
    background-color: #bfc2c5;
    border-radius: 50%;
    float:right;
}
   

.container2 .show i{
    position: relative;
    bottom: 4px;
}
.container2 .el-form-item__label{
    /* color:aliceblue; */
}
.container2 .dialog-footer{
     position: relative;
     left: 80px;
     top: 20px;
}
.container2 .el-textarea__inner{
    /* color: aliceblue; */
    /* background-color: unset; */
    background-color: #fff;
     border: 1px solid #DDDCDC;
     box-shadow: inset 2px 1px 5px #cbc9c9;
    height: 70px;
}
.container2 .el-textarea__inner[disabled]{
    /* color: aliceblue; */
    /* background-color: unset; */
    height: 70px;
}
.container2 .upload{
    color:aliceblue;
    background-color: #ffac02;
}
.container2 .primary{
    color:aliceblue;
    /* background-color: #91601e; */
    border: none;
}
.container2 .el-button--primary{
    width: 200px;
    height: 45px;
    /* background-color: #ffac02; */
}
.container2 .rightNum{
    width: 200px;
    margin-left: 20px;
    margin-bottom: 20px;
}
.el-textarea.is-disabled .el-textarea__inner{
    cursor: text;
}
.el-checkbox{
    margin: 0px;
    margin-right: 10px ;
}
.container2 .el-upload-list__item-name{

   
}
.container2 .el-upload-list{
     width: 300px;
      margin-left:95px;
}
</style>