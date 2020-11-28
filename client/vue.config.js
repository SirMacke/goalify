module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/sass/base.sass";@import "@/sass/variables.sass";@import "@/sass/mixins.sass";@import "@/sass/functions.sass";`
			}
		}
	},
	configureWebpack: {
    devServer: {
			proxy: {
				'/api/*': {
					target: 'http://localhost:' + process.env.PORT
				}
			}
    }
	}
}