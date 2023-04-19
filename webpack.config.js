const path = require("path");

module.exports={
    mode: "development", 
    entry: "./index.js", 
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js",
        publicPath: "/"
    },
    target: "web",
    devServer: {
        port: "9500",
        static: ["./public"],
        open: true,
        hot: true ,
        liveReload: true,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js','.jsx','.json', '.css'] 
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,    
                exclude: /node_modules/, 
                use:  'babel-loader' 
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    }
}