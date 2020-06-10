
module.exports={

	publicPath:"./",
	css:{
		loaderOptions:{
			sass:{
				prependData: `@import "~@/style/setting.scss";`
			}
		}
	},
	lintOnSave:false,
    devServer:{
        host:'0.0.0.0',
        port:8080,
    },
  
    chainWebpack: config=>{
      config.resolve.symlinks(true)
    }





}