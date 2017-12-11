const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');


module.exports = {
    devServer:{
        contentBase:'./dist'
    },
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname,'./dist/'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            // {
            //     test: /vue-preview.src.*?js$/,
            //     use: 'babel-loader'
            // },
            {    test:/\.css$/,use:['style-loader','css-loader']} ,
            {
                test:/\.vue$/, use:['vue-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader'
                   
                }
            }
        ]
    },
    plugins:[
        new CleanWebPackPlugin(['dist']),
        new HtmlWebPackPlugin({
            title:'OutTitle',
            template:'index.html'
        })
    ]
}