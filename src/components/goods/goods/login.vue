<template>
    <div class="login">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <form id="loginform" v-model="form" name="loginform" class="login-box" url="/tools/submit_ajax.ashx?action=user_login&amp;site_id=1">
                        <div class="input-box">
                            <input id="txtUserName" v-model="form.user_name" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="form.password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click='login' name="btnSubmit" type="button" value="立即登录">
                        </div>
                        <div id="msgtips" class="tip-box"></div>
                        <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                        <!--记住上一页网址-->
                    </form>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    // 引入 setItem从localStorageKit.js中
    import { getItem, setItem, removeItem } from '../../../kit/localStorageKit.js'
    export default {
        data() {
            return {
                form: {
                    "user_name": "",
                    "password": ""
                }
            }
        },
        computed: {

        },
        mounted() {
        },
        methods: {
            login() {
                this.$http.post('/site/account/login',this.form).then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                    }else{
                        var newPath = localStorage.getItem('oldPath');
                        this.$router.push({name:newPath});
                    }
                })
            }
        }
    }

</script>
<style scoped>
    /* 导入jquery组件的css样式 */
    /* @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css'); */
</style>