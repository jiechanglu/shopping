<template>
    <div class="pay">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderdata.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderdata.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderdata.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderdata.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderdata.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{orderdata.message}}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    二维码图片
                                    <canvas width="300" height="300"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    // 引入 setItem从localStorageKit.js中
    import  kits from '../../../kit/kit.js'
    // 引入二维码jquery插件
    import '../../../../statics/site/js/jqplugins/qr/jqueryqr.js';
    export default {
        data() {
            return {
                orderid: "",
                interval: null,
                orderdata: {}
            }
        },
        computed: {

        },
        created() {

        },
        mounted() {
            this.getdata();
            var amount = JSON.parse(localStorage.getItem('orderid')).amount;

            // 设置二维码
            $("#container").erweima({
                label: 'MoneyMoney',
                text: kits.payurl + '/' + this.orderid + '/' + amount
            });

            // 开启定时器每隔5秒执行一次
            this.interval = setInterval(this.checkorderStatus, 5000);
        },
        // 当页面离开以后应该清除this.interval
        beforeDestroy() {
            if (this.interval) {
                // 清空
                clearInterval(this.interval);
            }
        },
        methods: {
            // 每隔5秒钟访问接口：/site/validate/order/getorder/:订单号
            // 一直等待这个接口的返回数据中的status为2的时候就跳转到支付成功页面，否则一直停留在支付页面
            checkorderStatus() {
                this.$http.get('/site/validate/order/getorder/' + this.orderid)
                    .then(res => {
                        // 返回数据中的status为2的时候就跳转到支付成功页面，否则一直停留在支付页面
                        if (res.data.message[0].status == 2) {
                            // 支付成功跳转到
                            // this.$router.push({ name: 'paysuccesspc' });
                            this.$router.push({ name: 'car' });
                        }
                    });
            },
            getdata() {
                this.orderid = JSON.parse(localStorage.getItem('orderid')).orderid;
                // 从localStorage中提示订单id
                var url = '/site/validate/order/getorder/' + this.orderid;
                this.$http.get(url).then(res => {
                    // 获取订单信息
                    this.orderdata = res.data.message[0];
                    // console.log(this.orderdata);
                });
            }
        }
    }

</script>
<style scoped>
    /* 导入jquery组件的css样式 */
    /* @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css'); */
</style>