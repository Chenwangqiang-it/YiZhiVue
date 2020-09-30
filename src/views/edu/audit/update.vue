<template>
    <div class="container2">
            <el-form  ref="state" :model="state" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px" v-if="isaudit==1">
                <!-- :inline="true" -->
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    合同审核
                </div>
                 <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px" >                  
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
                                <el-form-item label="经办人姓名" prop="respName" >
                                    <el-input  name="respName" v-model="contract.respName" placeholder="经办人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" prop="phone" >
                                    <el-input   name="phone" v-model="contract.phone" placeholder="联系电话"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮件" prop="email" >
                                    <el-input  name="email" v-model="contract.email" placeholder="电子邮件"></el-input>
                                </el-form-item>
                                <el-form-item label="项目名称" prop="trade" >
                                    <el-input  name="trade" v-model="contract.trade" placeholder="备案项目名称"></el-input>
                                </el-form-item>
                                <el-form-item label="经办人职位" prop="respPost" >
                                    <el-input  name="respPost" v-model="contract.respPost" placeholder="经办人职位"></el-input>
                                </el-form-item>
                                <el-form-item label="公司传真" >
                                    <el-input  name="tax" v-model="contract.tax" placeholder="公司传真"></el-input>
                                </el-form-item>
                                <!-- <div></div> -->
                                <el-form-item label="公司座机" >
                                    <el-input  name="speialPlane" v-model="contract.speialPlane" placeholder="公司座机"></el-input>
                                </el-form-item>
                                <el-form-item label="公司网址" >
                                    <el-input  name="url" v-model="contract.url" placeholder="公司网址"></el-input>
                                </el-form-item>
                            <!-- <div></div> -->
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
                        <!-- <el-form-item label="品牌名称" prop="brandName">
                            <el-input  name="brandName" v-model="contract.brandName"  placeholder="品牌名称"></el-input>
                        </el-form-item> -->
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.time">
                                <el-form-item label="预计月数" prop="anticMonths">
                                <el-input-number  name="anticMonths"  v-model="contract.anticMonths" :min="1" :max="100" label="描述文字"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li">
                        <h3>金额
                            <div class="show" @click="isShow(2)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.money">
                                <el-form-item label="付款方式" >
                                <el-select   v-model="paymentType" placeholder="请选择付款方式">
                                    <el-option label="全额付款" :value="1"></el-option>
                                    <el-option label="分期付款" :value="2"></el-option>
                                </el-select>
                                </el-form-item>
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
                            <h3 style="margin-bottom:15px">直营店情况
                                <div class="show" @click="isShow(3)">
                                    <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                                </div>
                            </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.shop">
                                <h4 style="margin-bottom:15px;">直营店1</h4>
                                <el-form-item label="直营店全称" prop="dssOne">
                                    <el-input  name="dssOne" v-model="contract.dssOne" placeholder="直营店全称"></el-input>
                                </el-form-item>
                                <el-form-item label="成立日期" prop="estabDateOne">
                                    <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="manual"
                                    v-model="visible1">
                                    <p><i class="el-icon-info"></i>您所选年限距今不满足1年，是否继续？</p>
                                    <el-button class="upload" size="mini" @click="visible1=false" style="float:right">确认</el-button>
                                        <el-date-picker
                                            
                                            slot="reference"
                                            v-model="contract.estabDateOne"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            name="estabDateOne"
                                            style=" border:1px solid orange;"
                                            @change="vis1()"
                                            v-if="visible1"
                                            >
                                            </el-date-picker>
                                            <el-date-picker
                                            
                                            slot="reference"
                                            v-model="contract.estabDateOne"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            name="estabDateOne"
                                            @change="vis1()"
                                            v-else
                                            >
                                            </el-date-picker>
                                    </el-popover>
                                                    <!-- <el-input v-model="contract.estadateone" placeholder="成立日期"></el-input> -->
                                </el-form-item>
                                <el-form-item label="经营地址" prop="addressOne">
                                    <el-input   name="addressOne" v-model="contract.addressOne" placeholder="经营地址"></el-input>
                                </el-form-item>
                                <h4 style="margin-bottom:15px;">直营店2</h4>
                                <el-form-item label="直营店全称" prop="dssTwo">
                                    <el-input  name="dssTwo" v-model="contract.dssTwo" placeholder="直营店全称"></el-input>
                                </el-form-item>
                                <el-form-item label="成立日期" prop="estabDateTwo">
                                    <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="manual"
                                    v-model="visible2">
                                    <i class="el-icon-info"></i>
                                    <p>您所选年限距今不满足1年，是否继续？</p>
                                    <el-button class="upload" size="mini" @click="visible2=false" style="float:right">确认</el-button>
                                        <el-date-picker
                                            
                                            name="estabDateTwo"
                                            slot="reference"
                                            v-model="contract.estabDateTwo"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            style=" border:1px solid orange;"
                                            v-if="visible2"
                                            @change="vis2()"
                                            />
                                            <el-date-picker
                                            
                                            name="estabDateTwo"
                                            slot="reference"
                                            v-model="contract.estabDateTwo"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="vis2()"
                                            v-else
                                            />
                                    </el-popover>
                                    <!-- <el-input v-model="contract.estadatetwo" placeholder="成立日期"></el-input> -->
                                </el-form-item>
                                <el-form-item label="经营地址" prop="addressTwo">
                                    <el-input  name="addressTwo" v-model="contract.addressTwo" placeholder="经营地址"></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li" >
                        <h3 style="margin-bottom:15px">知识产权
                            <div class="show" @click="isShow(4)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.right">
                                <el-form-item label="权利类别" prop="type">
                                    <div>
                                            <el-checkbox  v-model="checked1" label="商标权" ></el-checkbox>
                                            <div v-if="checked1">
                                                <el-input 
                                                    oninput="value=value.replace(/[^\d]/g,'')"
                                                    v-for="(city,i) in brand" 
                                                    :key="city"
                                                    
                                                    name="brand" 
                                                    class="rightNum"
                                                    v-model="brand[i].value"
                                                    placeholder="商标号">
                                                </el-input>
                                                <el-button @click="removeLi(brand)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addBrand()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            </div>
                                            <el-checkbox  v-model="checked2" label="著作权" ></el-checkbox>
                                            <div v-if="checked2">
                                                <el-input 
                                                    
                                                    v-for="(city,i) in work" 
                                                    :key="city"
                                                    name="work" 
                                                    class="rightNum"
                                                    v-model="work[i].value"
                                                    placeholder="著作号">
                                                </el-input>
                                                <el-button @click="removeLi(work)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addWork()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            </div>
                                            <el-checkbox  v-model="checked3" label="专利权" ></el-checkbox>
                                            <div v-if="checked3">

                                                <el-input 
                                                    
                                                    v-for="(city,i) in right" 
                                                    :key="city"
                                                    name="right" 
                                                    class="rightNum"
                                                    v-model="right[i].value"
                                                    placeholder="权利号">
                                                </el-input>
                                                <el-button @click="removeLi(right)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addRight()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            
                                            
                                            </div>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li"> 
                            <h3 style="margin-bottom:15px;">合同原件
                                <span v-if="isStandard"> (标准合同) </span>
                                <span v-else> (非标合同) </span>
                                <div class="show" @click="isShow(6)">
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
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li"> 
                            <h3 style="margin-bottom:15px">审核
                                <div class="show" @click="isShow(5)">
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
            </el-form>
            <el-row v-if="isaudit==2&&!atypia&&!standard" style="padding-left:30px;height:900px">
                <div class="libox" style="padding-bottom:30px">
                    <div class="li">
                        <h3>修改合同</h3>
                    </div>
                    <el-button style="margin-top:20px;margin-left:20px" type="primary" @click="standar()">标准合同</el-button>
                    <el-button style="margin-top:20px;margin-left:20px" type="primary" @click="atypia=!atypia">非标合同</el-button>
                </div>
            </el-row>
            <el-button style="boder:none" icon="el-icon-back" @click="standard=false;atypia=false" v-if="isaudit==2&&(atypia||standard)"></el-button>
            <!-- <i class="el-icon-back" v-if="isaudit==2&&(atypia||standard)"></i> -->
            <el-form  ref="state"  :model="state" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:60px;height:900px" v-if="isaudit==2&&atypia&&!standard">
                <div class="libox" style="padding-bottom:30px">
                    <div class="li" >
                        <h3>非标合同修改</h3>
                    </div>
                    <!-- <a :href="url" style="margin-bottom:20px;text-decoration:underline;color:#4d90fe" >点击下载合同</a> -->
                    <el-collapse-transition>
                        <div class="lifroms" style="margin-top:20px" v-show="show.commit">
                        <!-- <h4 style="">非标准合同上传</h4> -->
                            <el-form-item label="文件上传" style="margin:0px">
                                <el-upload
                                    ref="upload"
                                    class="upload-demo"
                                    :action="BASE_API+'/eduservice/state/upcontract'"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :on-success="fileUploadSuccess"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    
                                    :file-list="fileList">
                                    <el-button style="width:80px;height:30px" slot="trigger" size="mini" type="primary" >选取文件</el-button>
                                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                                    <div slot="tip" style="margin-left:98px" class="el-upload__tip">文件上传大小，影响上传速度，建议10mb左右</div>
                                </el-upload>
                            </el-form-item>
                            <!-- <h4 style="">描述</h4> -->
                            <el-form-item label="描述信息" style="margin:0px">
                                <el-input
                                style="margin-top:15px;width:250px"
                                type="textarea"
                                :rows="2"
                                placeholder="描述信息"
                                v-model="textarea">
                                </el-input>
                            </el-form-item>
                            <!-- <div style="margin-top:20px;">确认：</div> -->
                            <div style="margin-bottom:10px"></div>
                            <el-form-item style="margin:0px;margin-left:90px" v-if="!disable">
                                <el-button type="primary" style="width:150px" @click.native.prevent="commit4">确认修改</el-button>
                            </el-form-item>
                            <el-form-item style="margin:0px;margin-left:90px;margin-top:30px" v-else>
                                <el-button disabled type="primary" style="width:150px">确认修改</el-button>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </div>
            </el-form>
            <el-form  ref="state"  :model="state" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:60px" v-if="isaudit==2&&!atypia&&standard">
                <div class="top">
                    <img src="../../../assets/icon.png"/>
                    标准合同修改
                </div>
                <el-form :inline="true" ref="contract" :model="contract" :rules="saveRules" auto-complete="on" label-position="left" class="demo-form-inline" style="padding-left:30px">
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
                                <el-form-item label="经办人姓名" prop="respName" >
                                    <el-input  name="respName" v-model="contract.respName" placeholder="经办人姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" prop="phone" >
                                    <el-input   name="phone" v-model="contract.phone" placeholder="联系电话"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮件" prop="email" >
                                    <el-input  name="email" v-model="contract.email" placeholder="电子邮件"></el-input>
                                </el-form-item>
                                <el-form-item label="项目名称" prop="trade" >
                                    <el-input  name="trade" v-model="contract.trade" placeholder="备案项目名称"></el-input>
                                </el-form-item>
                                <el-form-item label="经办人职位" prop="respPost" >
                                    <el-input  name="respPost" v-model="contract.respPost" placeholder="经办人职位"></el-input>
                                </el-form-item>
                                <el-form-item label="公司传真" >
                                    <el-input  name="tax" v-model="contract.tax" placeholder="公司传真"></el-input>
                                </el-form-item>
                                <!-- <div></div> -->
                                <el-form-item label="公司座机" >
                                    <el-input  name="speialPlane" v-model="contract.speialPlane" placeholder="公司座机"></el-input>
                                </el-form-item>
                                <el-form-item label="公司网址" >
                                    <el-input  name="url" v-model="contract.url" placeholder="公司网址"></el-input>
                                </el-form-item>
                            <!-- <div></div> -->
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
                        <!-- <el-form-item label="品牌名称" prop="brandName">
                            <el-input  name="brandName" v-model="contract.brandName"  placeholder="品牌名称"></el-input>
                        </el-form-item> -->
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.time">
                                <el-form-item label="预计月数" prop="anticMonths">
                                <el-input-number  name="anticMonths"  v-model="contract.anticMonths" :min="1" :max="100" label="描述文字"></el-input-number>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li">
                        <h3>金额
                            <div class="show" @click="isShow(2)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.money">
                                <el-form-item label="付款方式" >
                                <el-select   v-model="paymentType" placeholder="请选择付款方式">
                                    <el-option label="全额付款" :value="1"></el-option>
                                    <el-option label="分期付款" :value="2"></el-option>
                                </el-select>
                                </el-form-item>
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
                            <h3 style="margin-bottom:15px">直营店情况
                                <div class="show" @click="isShow(3)">
                                    <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                                </div>
                            </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.shop">
                                <h4 style="margin-bottom:15px;">直营店1</h4>
                                <el-form-item label="直营店全称" prop="dssOne">
                                    <el-input  name="dssOne" v-model="contract.dssOne" placeholder="直营店全称"></el-input>
                                </el-form-item>
                                <el-form-item label="成立日期" prop="estabDateOne">
                                    <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="manual"
                                    v-model="visible1">
                                    <p><i class="el-icon-info"></i>您所选年限距今不满足1年，是否继续？</p>
                                    <el-button class="upload" size="mini" @click="visible1=false" style="float:right">确认</el-button>
                                        <el-date-picker
                                            
                                            slot="reference"
                                            v-model="contract.estabDateOne"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            name="estabDateOne"
                                            style=" border:1px solid orange;"
                                            @change="vis1()"
                                            v-if="visible1"
                                            >
                                            </el-date-picker>
                                            <el-date-picker
                                            
                                            slot="reference"
                                            v-model="contract.estabDateOne"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            name="estabDateOne"
                                            @change="vis1()"
                                            v-else
                                            >
                                            </el-date-picker>
                                    </el-popover>
                                                    <!-- <el-input v-model="contract.estadateone" placeholder="成立日期"></el-input> -->
                                </el-form-item>
                                <el-form-item label="经营地址" prop="addressOne">
                                    <el-input   name="addressOne" v-model="contract.addressOne" placeholder="经营地址"></el-input>
                                </el-form-item>
                                <h4 style="margin-bottom:15px;">直营店2</h4>
                                <el-form-item label="直营店全称" prop="dssTwo">
                                    <el-input  name="dssTwo" v-model="contract.dssTwo" placeholder="直营店全称"></el-input>
                                </el-form-item>
                                <el-form-item label="成立日期" prop="estabDateTwo">
                                    <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="manual"
                                    v-model="visible2">
                                    <i class="el-icon-info"></i>
                                    <p>您所选年限距今不满足1年，是否继续？</p>
                                    <el-button class="upload" size="mini" @click="visible2=false" style="float:right">确认</el-button>
                                        <el-date-picker
                                            
                                            name="estabDateTwo"
                                            slot="reference"
                                            v-model="contract.estabDateTwo"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            style=" border:1px solid orange;"
                                            v-if="visible2"
                                            @change="vis2()"
                                            />
                                            <el-date-picker
                                            
                                            name="estabDateTwo"
                                            slot="reference"
                                            v-model="contract.estabDateTwo"
                                            type="date"
                                            placeholder="选择开始时间"
                                            value-format="yyyy-MM-dd"
                                            @change="vis2()"
                                            v-else
                                            />
                                    </el-popover>
                                    <!-- <el-input v-model="contract.estadatetwo" placeholder="成立日期"></el-input> -->
                                </el-form-item>
                                <el-form-item label="经营地址" prop="addressTwo">
                                    <el-input  name="addressTwo" v-model="contract.addressTwo" placeholder="经营地址"></el-input>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li" >
                        <h3 style="margin-bottom:15px">知识产权
                            <div class="show" @click="isShow(4)">
                                <i style="color:#e6e7e8" class="el-icon-arrow-down"></i>
                            </div>
                        </h3>
                        </div>
                        <el-collapse-transition>
                            <div class="lifroms" v-show="show.right">
                                <el-form-item label="权利类别" prop="type">
                                    <div>
                                            <el-checkbox  v-model="checked1" label="商标权" ></el-checkbox>
                                            <div v-if="checked1">
                                                <el-input 
                                                    oninput="value=value.replace(/[^\d]/g,'')"
                                                    v-for="(city,i) in brand" 
                                                    :key="city"
                                                    
                                                    name="brand" 
                                                    class="rightNum"
                                                    v-model="brand[i].value"
                                                    placeholder="商标号">
                                                </el-input>
                                                <el-button @click="removeLi(brand)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addBrand()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            </div>
                                            <el-checkbox  v-model="checked2" label="著作权" ></el-checkbox>
                                            <div v-if="checked2">
                                                <el-input 
                                                    
                                                    v-for="(city,i) in work" 
                                                    :key="city"
                                                    name="work" 
                                                    class="rightNum"
                                                    v-model="work[i].value"
                                                    placeholder="著作号">
                                                </el-input>
                                                <el-button @click="removeLi(work)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addWork()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            </div>
                                            <el-checkbox  v-model="checked3" label="专利权" ></el-checkbox>
                                            <div v-if="checked3">

                                                <el-input 
                                                    
                                                    v-for="(city,i) in right" 
                                                    :key="city"
                                                    name="right" 
                                                    class="rightNum"
                                                    v-model="right[i].value"
                                                    placeholder="权利号">
                                                </el-input>
                                                <el-button @click="removeLi(right)" size="mini" type="warning" icon="el-icon-minus" circle ></el-button>
                                                <el-button @click="addRight()" size="mini" type="warning" icon="el-icon-plus" circle ></el-button>
                                            
                                            
                                            </div>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <div class="libox">
                        <div class="li">
                        <h3 style="margin-bottom:15px">提交信息
                            <div class="show" @click="isShow(5)">
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
                                <el-button type="primary"  @click.native.prevent="commit2" v-if="!loading2">提交</el-button>
                                <el-button disabled type="primary" @click.native.prevent="commit2" v-if="loading2">提交</el-button>
                            </el-form-item>
                            <div></div>
                            <el-form-item style="color:aliceblue" v-if="loading2">
                                正在上传
                                <i class="el-icon-loading2"></i>
                            </el-form-item>
                        </div>
                        </el-collapse-transition>
                    </div>
                </el-form>
        </el-form>
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import state from '@/api/edu/state'
import record from '@/api/edu/record'
import flow from '@/api/edu/flow'
import contract from '@/api/edu/contract'
import message from '@/api/edu/message'
import user from '@/api/edu/user'
import cookieUtil from '@/utils/cookie'

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
        const valistate = (rule, value, callback) => {
            if(this.isaudit==1){
                if (value!='同意'&&value!='不同意') {
                callback(new Error('请输入同意或不同意'))
                } else {
                    callback()
                }
            }else if(this.isaudit==0){
                if (value!='确认') {
                callback(new Error('请输入‘确认’'))
                } else {
                    callback()
                }
            }
        }
        const valiNotNull = (rule, value, callback) => {
            if (value=='') {
                callback(new Error('该字段不能为空'))
            } else {
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
        const email = (rule, value, callback) => {
            const mailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!mailReg.test(value)||value=='') {
                callback(new Error('请输入正确的邮箱格式'))
            }else{
                callback()
            } 
        }
        const valiFirstAmount = (rule, value, callback) => {
            if (parseInt(value)>=parseInt(this.contract.fullAmount)) {
                callback(new Error('首款不可能大于或等于全款'))
            } else {
                this.contract.lastAmount=this.contract.fullAmount-value
                callback()
            }
        }
        const valilastAmount = (rule, value, callback) => {
            if (parseInt(value)+parseInt(this.contract.firstAmount)!=this.contract.fullAmount) {
                console.log(value+this.contract.firstAmount)
                callback(new Error('首款尾款之和必须等于全款'))
            } else {
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
        const valiDate = (rule, value, callback) => {
            if(value!=''&&value!=null){
                let str = value.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    if(!this.loading2){
                        this.visible1=true
                    }
                    callback()
                } else {
                    this.visible1=false
                    callback()
                }
            }else{
                callback(new Error('该字段不能为空'))
            }
            }
        const valiDate2 = (rule, value, callback) => {
            if(value!=''&&value!=null){
                let str = value.toString();        // toString
                str = str.replace('/-/g', '/')         //去空格字符等
                let oldTime = new Date(str).getTime()
                if (new Date().getTime()-oldTime<31622400000) {
                    if(!this.loading2){
                        this.visible2=true
                    }
                    callback()
                } else {
                    this.visible2=false
                    callback()
                }
            }else{
                callback(new Error('该字段不能为空'))
            }
            
            }
        return{
            show:{info:true,time:true,money:true,shop:true,right:true,commit:true,contract:true},
            checked1:false,
            checked2:false,
            checked3:false,
            right:[
                {index:0,value:'',type:3}
            ],
            brand:[
                {index:0,value:'',type:1}
            ],
            work:[
                {index:0,value:'',type:2}
            ],
            id:"",
            management:{},
            state2:{},
            isStandard:true,
            visible1:false,
            visible2:false,
            loading2:false,
            contract:{},
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
                sstate:''
            },
            paymentType:0,
            record:{},
            saveRules: {
                sstate:[{ required: true, trigger: 'blur', validator: valistate}]
            },
            BASE_API: process.env.BASE_API, // 接口API地址
            // OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
            importBtnDisabled: false, // 按钮是否禁用,
            fileList: [],
            fileList2: [],
            saveRules:{
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
                phone:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                url:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                dssOne:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                dssTwo:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                estabDateOne:[{ required: true, trigger: 'blur', validator: valiDate}],
                addressOne:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                estabDateTwo:[{ required: true, trigger: 'blur', validator: valiDate2}],
                addressTwo:[{ required: true, trigger: 'blur', validator: valiNotNull}],
                email:[{ required: true, trigger: 'blur', validator: email}],
            },
        }
            
    },
    watch: {// 如果路由有变化，会再次执行该方法
	     '$route': 'init'//getOrderInfo为自定义方法
    },
     methods:{
         submitUpload() {
            this.$refs.upload.submit();
        },
        isShow(i){
            // let i=this.show.indexOf(key)
            let show=document.getElementsByClassName("show")[i]
            let container=document.getElementsByClassName("container")[0]
            let pd=false
            if(i==0){
                pd=this.show.info
                this.show.info=!this.show.info
            }else if(i==1){
                pd=this.show.time
                this.show.time=!this.show.time
            }else if(i==2){
                pd=this.show.money
                this.show.money=!this.show.money
            }else if(i==3){
                pd=this.show.shop
                this.show.shop=!this.show.shop
            }else if(i==4){
                pd=this.show.right
                this.show.right=!this.show.right
            }else if(i==5){
                pd=this.show.commit
                this.show.commit=!this.show.commit
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
            this.getManagement()
            this.record.uid=this.roles.uid
            if(this.isaudit==1){
                contract.getContract(this.record.cid)
                .then(res=>{
                    this.contract=res.data.contract
                    this.type();
                    if(this.contract.lastAmount!=0){
                        this.paymentType=2
                    }else{
                        this.paymentType=1
                    }
                    this.contract2=JSON.stringify(res.data.contract)
                })
                state.getStateList(this.id)
                .then(res=>{
                    this.state2=res.data.state
                    if(JSON.stringify(res.data.state.url).indexOf("[{")>=0){
                        this.state2.url=JSON.parse(res.data.state.url)[0].url
                        isStandard=false//非标合同
                    }
                })
            }
            if(this.isaudit==0){
                state.getStateList(this.id)
                .then(res=>{
                    this.state2=res.data.state
                    if(JSON.stringify(res.data.state.url).indexOf("[{")>=0){
                        this.fileList2=JSON.parse(res.data.state.url)
                    }
                    // else{
                    //     this.fileList2.push({
                    //             name:res.data.state.url.substring(88,res.data.state.url.length),
                    //             url:res.data.state.url
                    //     })
                    // }
                })
            }
        },
        type(){
            if(this.contract.rightNum.indexOf("1")>=0){
                this.checked1=true
                let l=JSON.parse(this.contract.rightCategory)
                let li=[];
                for(let i=0;i<l[0].length;i++){
                    if(l[0][i].type==1){
                        li.push(l[0][i])
                    }
                }
                this.brand=li;
            }
            if(this.contract.rightNum.indexOf("2")>=0){
                this.checked2=true
                let l=JSON.parse(this.contract.rightCategory)
                let li=[];
                for(let i=0;i<l[1].length;i++){
                    if(l[1][i].type==2){
                        li.push(l[1][i])
                    }
                }
                this.work=li;
            }
            if(this.contract.rightNum.indexOf("3")>=0){
                this.checked3=true
                let l=JSON.parse(this.contract.rightCategory)
                let li=[];
                for(let i=0;i<l[2].length;i++){
                    if(l[2][i].type==3){
                        li.push(l[2][i])
                    }
                }
                this.right=li;
            }
        },
        addRight(){
             this.right.push({index:this.right.length,value:'',type:3})
         },
         addWork(){
             this.work.push({index:this.work.length,value:'',type:2})
         },
         addBrand(){
             this.brand.push({index:this.brand.length,value:'',type:1})
         },
         removeLi(li){
             li.pop()
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
                console.log(name)
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
        commit2(){//修改
            this.$refs.contract.validate(valid => {
            if (valid) {
            this.rightUtils()
            this.loading2=true
            const loading = this.$loading({
                lock: true,
                text: '正在修改合同',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.contract.brandName=this.contract.trade
            if(this.paymentType==1){
                this.contract.firstAmount=null
                this.contract.lastAmount=null
            }
            let ls=[];
            ls.push(this.brand)
            ls.push(this.work)
            ls.push(this.right)
            this.contract.rightCategory=JSON.stringify(ls)
            contract.updateContract(this.contract)
           .then(res=>{
               this.loading2=false
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.msg2(res.data.contract.cid,res.data.contract.serialNum)
                message.addMessages(this.messages)
                .then(res=>{
                    loading.close();
                    this.$router.push({path:'/audit/list'})
                })
                // this.contract.src=res.data.path
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
             if (valid) {
                this.loading2=true
                const loading = this.$loading({
                    lock: true,
                    text: '正在提交审核',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                if(this.paymentType==1){
                    this.contract.firstAmount=null
                    this.contract.lastAmount=null
                }
                this.state.sstate=2
                this.record.sstate=2
                this.msg(this.record.cid,1)
                this.state.sid=this.id
                state.update(this.state)
                        .then(res=>{
                            record.addRecord(this.record)
                            .then(rest=>{
                                if(JSON.stringify(this.contract)!=this.contract2&&this.isStandard){
                                    this.rightUtils()
                                    this.contract.brandName=this.contract.trade
                                    let ls=[];
                                    ls.push(this.brand)
                                    ls.push(this.work)
                                    ls.push(this.right)
                                    this.contract.rightCategory=JSON.stringify(ls)
                                    contract.updateContract2(this.contract)
                                    .then(res=>{
                                        loading.close();
                                        this.loading2=false
                                            this.$message({
                                                type: 'success',
                                                message: '提交成功!'
                                            });
                                            // this.msg2(res.data.contract.cid,res.data.contract.serialNum)
                                            message.addMessages(this.messages)
                                            .then(res=>{
                                                this.$router.push({path:'/audit/list'})
                                            })
                                            // this.contract.src=res.data.path
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
        standar(){
            contract.getContract(this.record.cid)
            .then(res=>{
                this.contract=res.data.contract
                if(res.data.contract.type==1){
                    this.$router.push({path:'/audit/updatepro',query: {id:this.id,cid:this.record.cid,url:this.url,isaudit:this.isaudit}})
                }else{
                    this.standard=!this.standard
                    this.type();
                }
                
                // this.contract2=res.data.contract
                
                if(this.contract.lastAmount!=0){
                    this.paymentType=2
                }else{
                    this.paymentType=1
                }
            })
         },
        fileUploadSuccess(response, file, fileList){
            this.$message({
                type:'success',
                message:'上传成功'
            })
            this.fileList2.push({
                    name:file.name,
                    url:response.data.url
            })
            this.disable=false
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.disable=true
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
                     console.log(systemDate);
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
                if(i==4){
                    // this.message.msg='您的合同'+res.data.contract.serialNum+'已被修改，请耐心等待主管审核'
                    for(let i=0;i<this.management.length;i++){
                            let m={}
                            m.category=0
                            m.categoryId=cid
                            m.send=this.roles.uid
                            m.uid=this.management[i].uid
                            m.msg='合同'+res.data.contract.serialNum+'已被修改，请及时审核'
                            messages.push(m);
                    }
                }else{
                    this.message.send=this.roles.uid
                    this.message.categoryId=cid
                    this.message.category=0
                    this.message.uid=res.data.contract.uid
                    messages.push(this.message)
                }
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
        commit4(){//修改
            //  console.log(this.$refs.state.validate)
            this.$refs.state.validate(valid => {
            if (valid) {
                this.loading2=true
                    const loading = this.$loading({
                    lock: true,
                    text: '正在修改合同',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.state.sstate=0
                this.state.url=JSON.stringify(this.fileList2)
                this.record.sstate=4
                this.record.accessory=JSON.stringify(this.fileList2)
                this.msg(this.record.cid,4)
                // console.log(this.msg(this.record.cid,4))
                this.state.sid=this.id
                if(this.state.url!=''){
                     state.update(this.state)
                    .then(res=>{
                    this.loading2=false
                    loading.close();
                        this.$message({
                            type: 'success',
                            message: '提交成功!'
                    });
                    record.addRecord(this.record)
                    .then(res=>{
                        message.addMessages(this.messages)
                        .then(res=>{
                            this.$router.push({path:'/audit/list'})
                        })
                    })
                    })
                }
            }
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