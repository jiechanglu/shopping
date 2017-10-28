<template>
    <div class="shopping">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="form" :inline="true" :rules="rules" ref="ruleform" label-width="100px" class="demo-ruleForm">

                            <div style="padding-top:20px;" class="address-info">
                                <el-row>
                                    <!-- 收货人 -->
                                    <el-col :span="9">
                                        <el-form-item class="three" required label="收货人：" prop="accept_name">
                                            <el-input v-model="form.accept_name"></el-input>
                                            <!-- <el-tip>*收货人姓名</el-tip> -->
                                        </el-form-item>
                                    </el-col>
                                    <!-- 三级联动 -->
                                    <el-col :span="15">
                                        <div style="padding-left:0px;margin-bottom:20px;" class="el-form-item">
                                            <el-form-item required label="所属地区：" prop="area">
                                                <!-- 当选择好后会触发下面的selected方法，然后在方法中给form表单赋值 -->
                                                <v-distpicker @selected="getarea"></v-distpicker>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <!-- 收货人 -->
                                <el-col :span="20">
                                        <el-form-item class="four" required label="地址：" prop="address">
                                            <el-input v-model="form.address"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <!-- <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <select id="province" name="province" class="select"><option value="">所属省份</option><option value="北京市">北京市</option><option value="天津市">天津市</option><option value="河北省">河北省</option><option value="山西省">山西省</option><option value="内蒙古自治区">内蒙古自治区</option><option value="辽宁省">辽宁省</option><option value="吉林省">吉林省</option><option value="黑龙江省">黑龙江省</option><option value="上海市">上海市</option><option value="江苏省">江苏省</option><option value="浙江省">浙江省</option><option value="安徽省">安徽省</option><option value="福建省">福建省</option><option value="江西省">江西省</option><option value="山东省">山东省</option><option value="河南省">河南省</option><option value="湖北省">湖北省</option><option value="湖南省">湖南省</option><option value="广东省">广东省</option><option value="广西壮族自治区">广西壮族自治区</option><option value="海南省">海南省</option><option value="重庆市">重庆市</option><option value="四川省">四川省</option><option value="贵州省">贵州省</option><option value="云南省">云南省</option><option value="西藏自治区">西藏自治区</option><option value="陕西省">陕西省</option><option value="甘肃省">甘肃省</option><option value="青海省">青海省</option><option value="宁夏回族自治区">宁夏回族自治区</option><option value="新疆维吾尔自治区">新疆维吾尔自治区</option><option value="香港特别行政区">香港特别行政区</option><option value="澳门特别行政区">澳门特别行政区</option><option value="台湾省">台湾省</option><option value="其它">其它</option></select>
                                        <select id="city" name="city" class="select"><option value="">所属城市</option></select>
                                        <select id="area" name="area" class="select" datatype="*" sucmsg=" "><option value="">所属地区</option></select>
                                        <span class="Validform_checktip">*请选择您所在的地区</span>
                                    </dd>
                                </dl> -->
                                <!-- 手机号码 -->
                                <el-form-item required label="手机：" prop="mobile">
                                    <el-input v-model="form.mobile"></el-input>
                                </el-form-item>
                                <!-- 邮箱 -->
                                <el-form-item required label="邮箱：" prop="email">
                                    <el-input v-model="form.email"></el-input>
                                </el-form-item>
                                <!-- 邮箱 -->
                                <el-form-item required label="邮编：" prop="post_code">
                                    <el-input v-model="form.post_code"></el-input>
                                </el-form-item>

                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <div class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <el-radio class="radio" v-model="form.payment_id" label="6">在线支付</el-radio>
                            </div>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <el-radio-group  class="item-box clearfix" v-model="form.express_id" @change="expressChange">
                                <el-radio v-for="item in expresslist" :key="item.id" :label="item.id">{{item.title}} ( 运费：{{item.express_fee}} 元 )</el-radio>
                            </el-radio-group>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="(item,index) in goodsinfo">
                                        <td width="50">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url" width="45" alt="">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">{{item.sell_price}}</span>
                                        </td>
                                        <td align="center">{{countlist[index]}}</td>
                                        <td>
                                            <span class="red">{{item.sell_price * countlist[index]}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <!-- <textarea name="message" class="input" style="height:35px;"></textarea> -->
                                            <div class="areaText">
                                                <el-row>
                                                    <el-col :span="24">
                                                        <el-form-item label="内容摘要" prop="message" required>
                                                            <el-input type="textarea" v-model="form.message"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品 <label class="price">{{countlist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price" v-if="goodsinfo" v-text="totalPrice"></label>                                        元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥<label id="expressFee" class="price" v-text="currentFee">0.00</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥<label id="totalAmount" class="price">{{totalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/#/site/car">返回购物车</a>
                                        <input id="btnSubmit" @click="submitForm" type="button" value="确认提交" class="btn submit">
                                    </p>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    // 引入 setItem从localStorageKit.js中
    import { getItem, setItem, removeItem } from '../../../kit/localStorageKit.js'
    export default {
        components: {
            VDistpicker
        },
        data() {
            // 自定义一个方法用来验证手机号的格式
            var checkMobile = (rule, value, callback) => {
                // 定义一个手机号码的正则表达式
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('手机号码格式错误'));
                }
                callback();
            };

            var checkEmail = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('emial格式错误'));
                }
                callback();
            };

            var checkZipCode = (rule, value, callback) => {
                // 定义一个正则表达式
                var reg = /^\d{6}$/;
                // 匹配用户输入的值
                if (!reg.test(value)) {
                    return callback(new Error('邮编格式错误'));
                }
                callback();
            };
            return {
                expresslist: [],
                currentFee:20, //当前的运费
                 // 选中商品的返回信息
                 goodsinfo: [],
                // 选中商品的数量数组
                countlist: [],
                totalPrice: 0,
                ids: "",
                total:0,
                // 表单信息
                form: {
                    "goodsAmount": 0
                    , "expressMoment": 0
                    , "accept_name": ""
                    , "address": ""
                    , "mobile": ""
                    , "email": ""
                    , "post_code": ""
                    , "payment_id": "6"
                    , "express_id": 1
                    , "express_fee": 20
                    , "message": ""
                    , "goodsids": "",   
                    "area":{}
                    ,"cargoodsobj":{}
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收件人', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    message: [
                        { required: true, message: '请输入商品描述', trigger: 'blur' }
                    ],
                    mobile: [
                        // 手机号码一定是格式要正确
                        { validator: checkMobile, trigger: 'blur' }
                    ],
                    email: [
                        // 
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    post_code: [
                        // 
                        { validator: checkZipCode, trigger: 'blur' }
                    ]

                },
               
            }
        },
        computed: {
            totalAmount(){
                //总价格 = 商品的总价 + 运费
                var amount  = this.totalPrice + this.currentFee;
                this.form.goodsAmount = amount;
                this.total = amount;
                return amount;
            }
        },
        mounted() {
            this.getexpresslist();
            this.getdata();
        },
        methods: {
            // 表单提交
            submitForm() {
                this.$refs.ruleform.validate((valid) => {
                if (valid) {
                    // 提交表单数据到服务器完成下单操作
                    // console.log(this.form);
                    // 提交到服务器
                    this.$http.post('/site/validate/order/setorder',this.form)
                    .then(res=>{
                        var obj = res.data.message;
                        obj['amount'] = this.total;
                        localStorage.setItem('orderid',JSON.stringify(obj));
                        // 提醒
                        this.$message.success({
                            message:res.data.message,
                            duration:1000,  //表示提示框是1秒钟以后关闭
                            onClose:()=>{
                             // 跳转
                             this.$router.push({name:'goodslist'});
                            }
                        });
                    });
                } else {
                    console.log('表单验证失败');
                    return false;
                }
                });
            },
            // 配送方式改变时触发的方法
            expressChange(expressid) {
                // alert.log(expressid);
                // 1.0 获取当前选择运送方式的运费
                var newArr = this.expresslist.filter(function (item) { return item.id == expressid });
                this.form.expressMoment = this.currentFee =  this.form.express_fee = newArr[0].express_fee;
            },
            // 获取快递运送方式
            getexpresslist() {
                var url = '/site/validate/order/getexpresslist';
                this.$http.get(url).then(res => {
                    /*expresslist格式：
                        [
                            {
                            id: 1,
                            title: "顺丰快递",
                            express_fee: 20
                            },
                            {
                            id: 2,
                            title: "圆通快递",
                            express_fee: 10
                            },
                            {
                            id: 3,
                            title: "韵达快递",
                            express_fee: 8
                            }
                            ]
                            
                    */
                    this.expresslist = res.data.message;
                });
            },
            getarea(data){
                // data格式：
                /*
                {
                    province:{
                       code: "440000"
                       value:"广东省"
                    }
                    city:{
                         code: "440001"
                       value:"广州"
                    }
                    area:{
                         code: "440002"
                         value:"天河区"
                    }
                }
                */
                // console.log(data);
                this.form.area = data;
            },
            getdata() {
                var selgoodslist = JSON.parse(localStorage.getItem('selgoodsArr'));
                // console.log('----------------------');
                // console.log(selgoodslist);
                var idsArr = [];
                var  selObj = {};
                selgoodslist.forEach(function (item) {
                    for (var key in item) {
                        selObj[key] = item[key];
                        idsArr.push(key);
                        this.countlist.push(item[key]);
                    }
                }, this);
                // console.log(selObj);
                this.form.cargoodsobj = selObj;
                var ids = idsArr.join(',');
                this.form.goodsids = ids;
                // console.log(ids);
                // 获取下单信息
                var _this = this;
                this.$http.get('/site/comment/getshopcargoods/' + ids).then(res => {
                    // console.log(res.data.message);
                    this.goodsinfo = res.data.message;
                    this.goodsinfo.forEach(function (item, index) {
                        // 注意这里是调用数组中的方法，所以this要先在个面保存起来，不然为underfine
                        _this.totalPrice += (item.sell_price * _this.countlist[index]);
                        // console.log("---------------");
                        // console.log(_this.totalPrice);
                    });
                });
            }
        }
    }

</script>
<style>
    /* 导入jquery组件的css样式 */
    /* @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css'); */

    .cart-box .three .el-form-item__content {
        width: 280px;
    }
    .cart-box .four .el-form-item__content {
        width: 750px;
    }
</style>