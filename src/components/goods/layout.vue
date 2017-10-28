<template>
    <div class="tmpl">
        <!-- 1.0 页面头，菜单导航代码 -->
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <router-link to="/site/login">登录</router-link>
                        <a href="/register.html">注册</a>
                        <strong>|</strong>
                        <!-- <a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                                       <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a> -->
                                       <!-- <a href="/#/site/car"><i class="iconfont icon-cart"></i>购物车({{buycount}})</a> 这里是通过vm.js方式来改变layout中购物车的数量 -->
                                       <!-- <a href="/#/site/car"><i class="iconfont icon-cart"></i>购物车({{this.$store.state.buyCount}})</a> 这种方式是通过vuex setItem的方式来获取-->
                                       <!-- 以下是通过vuex 与 localStorage的set/getItem的方式来实现刷新后也不改变数据 -->
                                       <!-- <a href="/#/site/car"><i class="iconfont icon-cart"></i>购物车({{this.$store.getters.getCount}})</a> -->
                                       <router-link to="/site/car">
                                        <i class="iconfont icon-cart"></i>
                                         购物车(<span id="shoppingCartCount">{{this.$store.getters.getCount}}</span>)
                                    </router-link>
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                                       <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                                   </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                               <router-link to="/site/goodslist">
                                    购物商城
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2.0 路由的占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
// 引入vm.js中定义的vm对象
import {vm,key} from '../../kit/vm.js';


// 实现菜单的翻滚
$(function(){
	$("#menu2 li a").wrapInner( '<span class="out"></span>' );
	$("#menu2 li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
		$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
	});

});
// 引入 setItem从localStorageKit.js中
import {getItem} from '../../kit/localStorageKit.js'

  export default{
      data(){
          return {
            // buyCount:0
          }
      },

    mounted(){
        // vm.$on(key,(buycount)=>{
        //     // 修改购物车中的数值,
        //     this.buycount += buycount;
        // });
        // this.buyCount = this.$store.getters.getCount;
    }
  }

</script>

<style>
    /* 为了解决统一导入elemenui的样式,所以要放到layout.vue */
    /* 导入样式的格式  @import url() */
    /* @import url('../../../statics/elementuiCss/index.css'); */
    @import url('../../../statics/elementuiCss/index.css');

</style>