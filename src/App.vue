<template>
    <!-- 通常编写组件的html结构，注意vue2.0中一定要有一个根元素 -->
    <div class="tmpl">
    <!-- 要使main中引用的路由生效，必须要添加以下router-view标签才能生效 -->
        <router-view></router-view>
    </div>
</template>

<script>

// es6的export default{ 写法等同于 module.exports={
export default{
    // es6的写法 data() 等同于es5的 data:function()
    data(){
        return{
            name:'主页'
        }
    },methods:{

    },
    enablesReturnKeyAutomatically:true
}

</script>

<style scoped>
     .tmpl{
         /* color:skyblue ; */
     }
</style>