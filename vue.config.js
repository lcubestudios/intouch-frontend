module.exports = 
{
  publicPath: process.env.VUE_APP_ROOT,
	chainWebpack: config => {
		config
		.plugin('html')
		.tap(args => {
			args[0].title = process.env.VUE_APP_TITLE;
			return args;
		})
	}
};