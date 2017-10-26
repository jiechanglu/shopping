<template>
    <div class="car">
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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-button :type="btntype" @click="allsel" v-text="alltext">全选</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch on-text="反选" off-text="全选" v-model="values[index]" @click="changesel"></el-switch>
                                    </td>
                                    <!-- <td align="left" colspan="2" v-text="item.title">商品信息</td> -->
                                    <td align="left" colspan="2"><img :src="item.img_url" style="float:left;display:inline-block;" width="50" alt="">
                                        <p style="float:left;line-height:50px;padding-left:5px;">{{item.title}}</p>
                                    </td>
                                    <td width="84" align="left" v-text="item.sell_price">单价</td>
                                    <td width="124" align="center" >
                                        <!-- 数量 -->
                                        <ul class="ul" style="list-style:none;">
                                            <el-button type="danger" style="padding:5px 0px;width:25px;" @click="item.buycount--" :disabled="item.buycount<=0">-</el-button><el-button type="success" style="width:45px;padding:5px 0px;color:white;" v-text="item.buycount"></el-button ><el-button type="primary" style="width:25px;padding:5px 0px;" @click="item.buycount++">+</el-button>
                                        </ul>

                                        
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}(元)</td>
                                    <td width="54" align="center">
                                        <el-button type="danger" size="mini" @click="delitem">删除</el-button>
                                    </td>
                                </tr>
                                <tr v-if="goodslist.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品 <b class="red" id="totalQuantity" v-text="selectCount"></b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{selletmentAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入 setItem从localStorageKit.js中
    import { getItem,setItem,removeItem } from '../../../kit/localStorageKit.js'
    export default {
        data() {
            return {
                btntype:'success',
                alltext:'全选',
                // disabled:false,
                goodslist: [
                    // {
                    //     id: 102,
                    //     img_url: "http://139.199.192.48:6060/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                    //     title: "Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣",
                    //     sell_price: 800,
                    //     buycount: 0
                    // },
                ],
                values: [],
                selectCount:0,//被选中的商品
                currentid:0
            }
        },
        computed:{
            selletmentAmount(){
                // 获取到所有被选到的购物车商品
                var trueArr = this.values.filter(function(item){
                    return item;
                })
                this.selectCount = trueArr.length;

                var totalAmount = 0;

                var selArr = [];

                this.values.forEach(function(item,index) {
                    var goodsObj = {};
                    this.currentid = this.goodslist[index].id;
                    removeItem(this.goodslist[index].id);
                    setItem({gid:this.goodslist[index].id,bcount:this.goodslist[index].buycount});
                    if(item){
                        selArr.push(this.goodslist[index]);
                        totalAmount += this.goodslist[index].sell_price*this.goodslist[index].buycount;
                    }
                }, this);
                // setItem();
                return totalAmount;

            },
            
        },
        mounted() {
            this.getdata();
            
        },
        methods: {
            delitem(){
                alert('确定要删除');
                var id = this.currentid;
                removeItem(id);
                // this.$router.push({ name: 'car' });
                // window.location.href = 'http://127.0.0.1:7071/#/site/car';
                window.location.reload();
            },
            changesel(){
                Array.prototype.contains = function (obj) {
                    var i = this.length;
                    while (i--) {
                        if (this[i] === obj) {
                            return true;
                        }
                    }
                    return false;
                }
                if(this.values.contains(false)){
                    this.alltext = '全选';
                    this.btntype = 'success';
                }
            },
            // 全选
            allsel() {
                // console.log(this.values);

                Array.prototype.contains = function (obj) {
                    var i = this.length;
                    while (i--) {
                        if (this[i] === obj) {
                            return true;
                        }
                    }
                    return false;
                }

                if (this.values.contains(false)) {
                    console.log(444);
                    for (var i = 0; i < this.values.length; i++) {
                        this.values[i] = true;
                    }
                    this.alltext = '反选';
                    this.btntype = 'warning';
                    // 下面要想即时见到触发变化效果，必须得假装编辑数组，先添加一个再删除才能有即时效果
                    this.values.push(false);
                    this.values.pop();
                }else{
                    for (var i = 0; i < this.values.length; i++) {
                        this.values[i] = false;
                    }
                    // 下面要想即时见到触发变化效果，必须得假装编辑数组，先添加一个再删除才能有即时效果
                    this.values.push(false);
                    this.values.pop();
                    this.alltext = '全选';
                    this.btntype = 'success';
                }
            },
            getdata() {
                // 从localStorage中获取商品id
                var goodsObj = getItem();
                // 遍历goodsObj中的所有链变成一个字符串用逗号分隔开
                var idArr = [];
                for (var key in goodsObj) {
                    idArr.push(key);
                }
                var ids = idArr.join(',');
                console.log(goodsObj);
                this.$http.get('/site/comment/getshopcargoods/' + ids).then(res => {
                    this.goodslist = res.data.message;
                    var couArr = [];
                    for (var key in goodsObj) {
                        couArr.push(goodsObj[key]);
                        this.values.push(false);
                    }
                    this.goodslist.forEach(function (item, index) {
                        item.buycount = couArr[index];
                    }, this);
                    // console.log(this.goodslist)
                    // console.log(couArr);
                    // 2.0 根据返回的数组个数初始化values数组的个数，值 全部是false

                })
            }
        }
    }

</script>
<style scoped>
    /* 导入jquery组件的css样式 */
    /* @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css'); */

    @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
    .ul .el-button+.el-button{
        margin-left: 2px;
    }
</style>