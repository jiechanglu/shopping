var path = require('path');

// 导入html-webpack-plugin包，获取到插件对象
var htmlwp = require('html-webpack-plugin');

var webpack = require('webpack');

//此配置文件在控制台上使用 webpack 的时候后面如果 不加任何参数，则默认会查找  webpack.config.js的配置文件去执行
module.exports = {
    entry: './src/main.js', //表示打包的时候自动查找 当前目录下的src下面的main.js作为入口文件

    // 2 配置打包时的文件
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'build.js'
    },
    resolve:{
        alias: {
            // webpack 使用 jQuery，如果是自行下载的
            // 'jquery': path.join(__dirname, 'jquery所在的目录/jquery.min'),
            // 如果使用NPM安装的jQuery
            'jquery': 'jquery'       
        }
    },
    // 3.0 配置相关的loader
    module: {
        loaders: [{
                // 打包的时候碰到.css文件则被这下正则匹配
                test: /\.css$/,
                // 交给'style-loader','css-loader'去进行打包
                // 编写的顺序一定是：先'style-loader'然后再是'css-loader'
                // webpack的顺序，先使用css-loader再使用style-loader
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            // {
            //     test: /\.scss$/,
            //     loader: ['style-loader', 'css-loader', 'sass-loader']
            // },
            {
                // 打包url()请求的资源文件
                test: /\.(jpg|png|gif|ttf|woff|eot|svg)$/,
                // 如果图片很大的话，那么会造成build.js比较大,加载的时候效率低
                loader: ['url-loader?limit=10240']
                    //限制图片的大小如果<10k则把它当做base64字符串存储到build.js中，如果>10k，则单独将图片存储到磁盘上，将路径打包进去build.js
            },
            { test: /iview.src.*?js$/, loader: 'babel-loader' },
            
            {
                // 配置 .vue文件的打包正则
                // 匹配一个vue的组件页面
                test: /\.vue$/,
                loader: ['vue-loader']
            }
            , {
            // es6语法通常是写 .js文件中
            test: /\.js$/,
            loader: ['babel-loader'], //负责将es6转换成es5
            // 排除node_modules下面的所有js文件
            exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            // title: '首页',
            filename: 'index.html',
            template: 'index1.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"         
        })

    ]

};