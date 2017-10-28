
// 步骤1：导入 vue这个包
import Vue from 'vue';
// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
import App from './App.vue';

// 导入vuex这个包
import vuex from 'vuex';
//将vuex绑定到Vue对象中
Vue.use(vuex); 

// 3.0 使用elementUI这个ui框架的步骤
// 3.1 导包
import elementUI from 'element-ui';
// 3.2 忖入elementui的css控制样式
import 'element-ui/lib/theme-default/index.css';

// 路由包：
// 导入路由包
import vueRouter from 'vue-router';
// 将vueRouter和vue绑定起来
Vue.use(vueRouter);
// 定义路由规则
// 导入layout.vue组件对象
import layout from './components/goods/layout.vue'
import goodslist from './components/goods/goods/goodslist.vue'
import goodsinfo from './components/goods/goods/goodsinfo.vue'
import car from './components/goods/goods/car.vue'
import login from './components/goods/goods/login.vue'
import shopping from './components/goods/goods/shopping.vue'
import pay from './components/goods/goods/pay.vue'
import paysuccess from './components/goods/goods/paysuccess.vue'
import payamount from './components/goods/goods/payamount.vue'

var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'shopping', path: 'shopping', component: shopping,meta:{islogin:true}},
                { name: 'goodsinfo', path:'goodsinfo/:goodsid', component: goodsinfo},
                { name: 'car', path:'car', component: car,},
                { name: 'login', path: 'login', component: login },
                { name: 'pay', path: 'pay', component: pay },
                { name: 'paysuccess', path: 'paysuccess', component: paysuccess },
                { name: 'payamount', path: 'payamount/:orderid/:amount', component: payamount },
            ]
        },
    ]
});


// 全局守卫beforeEach函数，来判断是否需要登录
router.beforeEach((to,from,next)=>{
    // 从路由规则中to 是否存在meta对象，并且 islogin为true时，需要登录验证
    if(to.name != 'login'){
        localStorage.setItem('oldPath',to.name);
    }
    if(to.meta.islogin){
        axios.get('/site/account/islogin').then(res=>{
            if(res.data.code == 'logined'){
                console.log(222);
                next();
            }else{
                router.push({name:'login'});
            }
        })
    }else{
        next();
    }
})



// 2.axios的使用
// 2.1导入axios包
import axios from 'axios';
// 2.2设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
// 2.3想要在将来的每个 子组件 中的方法中均可以使用this.$http去调用其它方法执行ajax请求
// 就要将axios对象持载到vue 的原型属性$http上
Vue.prototype.$http = axios;

// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.4 绑定到vue上
Vue.use(axios);




// 从site.css中导入css文件
require('../statics/site/css/css/style.css');

// 从site.less中导入less文件
// require('../statics/site/css/site.less');

// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt',(input,fmtstring)=>{
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if(fmtstring == 'YYYY-MM-DD'){
        return y + '-' + m + '-' + d;
    }
    if(fmtstring == 'YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d + ' ' + h + ':'+ mi + ':' + s;
    }

});

// 3.3 绑定
Vue.use(elementUI);

// 定义vuex实现购物车数量的改变业务
// 1.0 数据对象
// 特点：当state的值 一旦发生改变，那么通过this.$store.state.buyCount地方就会自动发生改变
var state = {
    // 购物车中的购买数量 
    buyCount:0
}
// 2.0 action (购物车按钮点击的时候触发action,代码：this.$store.dispatch('changeButCount')，购买数量)
var actions = {
    changeButCountmapActions({commit},paramsBuyCount){
        commit('changeButCountmapActions',paramsBuyCount);
    }
};
// 3.0 mutations
var mutations = {
    changeButCountmapActions(state,paramsBuyCount){
        // 
        state.buyCount += paramsBuyCount;
    }
}
// getters
var getters = {
    // 如果想要在组件 中使用this.$store.getters.getCount的地方能够state.buyCount的值的改变而自动刷新，
    // 就一定要在这个方法中依赖state.buyCount,否则不会自动触发刷新 
    // 判断如果 state中的buyCount的值》0
    getCount(state){
        // if(state.buyCount > 0){
        //     return state.buyCount;
        // }
        // 读取localStorage中的数据 统计商品的各类个数返回
        var goodsObj = getItem();
        var count = 0;
        for(var key in goodsObj){
            count++;
        }
        // console.log(count)
        state.buyCount = count;
        return state.buyCount;
        // return count;
    }
};

// 由于目前不需要对state中的buyCount进行逻辑封装，所以留空
import {getItem} from './kit/localStorageKit.js'

// 4.0 实例化一个Store对象
var store = new vuex.Store({
    state,actions,mutations,getters
});

new Vue({
    el: '#app',
    router: router,
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    store,//引用store
    render: create => create(App),
});