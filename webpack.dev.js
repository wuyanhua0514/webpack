const path=require("path");
const htmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const glob=require("glob");//消除未使用的css;
const PurifyCSSPlugin=require("purifycss-webpack");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const webpack=require("webpack");
module.exports={
    mode:'development',
    entry:{
        main:'./src/main.js',
        main2:'./src/main2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),//webpack.dev.js
        filename:'[name].js'//名字与入口名字相同
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'css/app.css',
    //                 test: /\.css$/,
    //                 // chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:"../"
                        }
                    },
                    "css-loader","postcss-loader"

                ]
                // use:[
                //    MiniCssExtractPlugin.loader,
                //    "css-loader","postcss-loader"
                // ]
                // use:[
                //     {loader:'style-loader'},
                //     {loader:'css-loader'},
                // ]
            },
            {
                test: /\.(htm|html)$/i,
                 use:['html-withimg-loader'] 
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        name:'/[name].[ext]',
                        outputPath:"images",
                    }
                }]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:"../"
                        }
                    },
                    "css-loader","less-loader"

                ]
                // use:[
                //     MiniCssExtractPlugin.loader,
                //     "css-loader","less-loader"
                // ]
            //     use:[{
            //         loader:"style-loader"
            //     },
            //     {
            //         loader:"css-loader"
            //     },
            //     {
            //         loader:"less-loader"
            //     }
            // ]
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:"../"
                        }
                    },
                    "css-loader","sass-loader"

                ]
                // use:[
                //     MiniCssExtractPlugin.loader,
                //     "css-loader","sass-loader"
                // ]
            //     use:[{
            //         loader:"style-loader"
            //     },
            //     {
            //         loader:"css-loader"
            //     },
            //     {
            //         loader:"sass-loader"
            //     }
            // ]
            },
            {
                test:/\.(jsx|js)$/,
                use:[
                    {loader:'babel-loader',
                    options:{
                    presets:[
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ]
                    
                }
               }
            ]
             }
           
        ]
    },
    plugins:[
        new CleanWebpackPlugin("dist"),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name].css",
            // chunkFilename:"css/[id].css",
            // publicPath:"../"
        })


        // 必须配合extract-text-webpack-plugin
        // new PurifyCSSPlugin({
        //     paths:glob.sync(path.join(__dirname,"src/*.html"))
        // })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:"localhost",
        compress:true,
        port:8888,
        hot:true,
        inline:true
    },
    // optimization:{
    //     // runtimeChunk:false,
    //     minimize:true,//压缩
    //     splitChunks:{
    //         // chunks: 'async',//all,async,initial三选一
    //         // minSize: 30000,//最小尺寸
    //         // minChunks: 1,最小的chunks
    //         // maxAsyncRequests: 5,最大异步请求chunks
    //         // maxInitialRequests: 3,最大初始化chunks
    //         name:true,//split的chunks name
    //         cacheGroups:{//缓存组
    //             vendor: {
    //                 name: 'vendor',//split出来的chunk的名字
    //                 chunks: 'initial',//只对入口文件处理
    //                 priority: -10,//优先匹配默认拆分规则就设置为负数。
    //                 reuseExistingChunk: false,
    //                 test(m){
    //                     return m.context&&m.context.match(/node_module/)&&!(/^.*\.(css|scss|less)$/).test(m.resource);
    //                 },
    //                 enforce:true 
    //               },
    //               common: {
    //                 name: 'common',
    //                 test(m){
    //                     return m.context&&m.context.match(/src/);
    //                 },
    //                 chunks: 'initial',
    //                 // minChunks: 1,
    //                 reuseExistingChunk: true,
    //                 // enforce: true,
    //                 maxInitialRequests:5,
    //                 priority:-20

    //               }
    //         }
            
    //     }




    // },





}