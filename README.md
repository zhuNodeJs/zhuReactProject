#### 这个目录是用来做react gulp的一些示例, 天佑中华
  项目一 gulp-webpack
  查看es6的浏览器的支持情况：http://kangax.github.io/compat-table/es6/
  1. 创建一个空文件夹，切换到这个文件夹，在终端输入npm init 初始化你的package.json
  2. 运行npm install --save react react-dom ，这将安装react和react-dom到你的node_modules文件夹并保存到package.json中
  3.运行cnpm install --save-dev gulp browserify babelify vinyl-source-stream babel-preset-es2015 babel-preset-react， 这将安装更多的依赖到package.json 中。
  注：http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
  项目二 gulp-webpack-fruit
  这个项目主要是使用es6+gulp,来组成一个页面的展示，功能是通过的是加减按钮的单击事件,来实现的是商品的价格的总额的增加和减少。
  注：运行的项目的语句是：在命令行中输入命令：gulp , 单击回车键即可。
  1. {this.increaseQty.bind(this)},这个语句的意思是将项目的this绑定到this.increaseQty函数上, 如果不是这样绑定的话，则increaseQty函数的内部的this的执行为null.
  2. 在类中添加默认属性和验证的方法：
  方法一：将方法属性写在类中，是作为类的静态属性，需要安装模块babel-preset-stage-0
  将项目中添加插件的方法是：
  .transform('babelify', {presets: ['react', 'es2015', 'stage-0']})
  ```
  static get defaultProps() {
  	return {
  		title:'Undefined Product',
  		price: 100,
  		initialQty: 0
  	}
  }

  static propTypes = {
  	title: React.PropTypes.string.isRequired,
  	price: React.PropTypes.number.isRequired,
  	initialQty: React.PropTypes.number
  }
  ```
  方法二： 写在类的外部，也作为类的属性
  ```
  CartItem.propTypes = {
  	title: React.PropTypes.string.isRequired,
  	price: React.PropTypes.number.isRequired,
  	initialQty: React.PropTypes.number
  }

  CartItem.defaultProps = {
  	title: 'Undefined Product',
  	price: 100,
  	initialQty: 0
  }
  ```
 项目三 第二个项目中的一些理解
 在上面的案例中, React.createClass()所有的方法将会自动绑定对象的实例。而React team 通过ES6来实现对React组件的支持时，没有设置自动绑定是React team的一个决定。
 这个项目来看看你的JSX案例中，使用es6类创建的方法的多种调用方法。
 Method 1 .使用Function.prototype.bind()
 ```
	export default class CartItem extend React.component {
		render() {
			<button onClick={this.increaseQty.bind(this)} className='button success'></button>
		}
	} 
 ```
 当任何的ES6的常规方法在方法原型中进行this绑定时，this指向的是类实例。
 Method 2. 在构造函数中定义函数
 此方法是上一个与类构造函数的用法的混合：
 ```
 export default class CartItem extends React.Component {
 	constructor(props) {
 		super(props);
 		this.increaseQty = this.increaseQty.bind(this);
 	}
 	render() {
 		<button onClick={this.increaseQty} className='button success'></button>
 	}
 }
 ```
 Method 3 . 使用箭头函数和构造函数
 当方法被调用时，ES5 Fat arrow function 会保留上下文, 我们能使用这个特征用下面的方法在构造函数中重定义increaseQty()函数。
 ```
 export default class CartItem extends React.Component {
 	constructor(props) {
 		super(props);
 		this._increaseQty = () => this.increaseQty();
 	}

 	render() {
 		<button onClick={this._increaseQty} className='button success'>+</button>
 	}
 }
 ```
Method 4. 使用箭头函数和ES2015+类属性
另外，你可以使用ES2015+类属性语法和箭头函数
```
export default class CartItem extends React.Component {
	increaseQty = () => this.increaseQty();
	render() {
		<button onClick={this.increaseQty} className='button success'>+</button>
	}
}
```
属性初始化和Method 3中的功能一样。
Method 5 使用ES2015+函数绑定语法
最近，Babel介绍了Function.prototype.bind()中的::的使用。可使用blog 2015 function bind了解更多细节。
下面是ES2015+函数的绑定的使用：
```
export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.increaseQty = ::this.increaseQty;
		<!-- line above is an equivalent to this.increaseQty = this.increaseQty.bind(this) -->
	}
	render() {
		<button onClick={this.increaseQty} className='button success'>+</button>
	}
}
```
强调：这个实验是高强度的实验，使用它你得自己承担风险。
Method 6. 在调用方法的es2015+函数绑定语法。
也可以在非构造函数里面的JSX里面直接使用ES2015+函数绑定。效果如下：
```
export default class CartItem extends React.Component {
	render() {
		<button onClick={::this.increaseQty} className='button success'>+</button>
	}
}
```
非常简洁，但是唯一的缺点是：这个函数将在每个后续的渲染的组件上重新创建。这不适合，更重要的是，如果你使用像PureRenderMixin的东西将会出现。
项目四： 项目名称 Decorators的使用：修饰器的作用是对类进行处理, 用来修改类的行为。需要引入的插件是babel-plugin-transform-decorators-legacy。
在项目中的gulpfile.js添加语句：
```
gulp.task('build', function () {
    return browserify({entries: './app.jsx', extensions: ['.jsx'], debug: true})
      .transform('babelify', {presets: ['react', 'es2015', 'stage-0'] , plugins: ['transform-decorators-legacy']})
      .bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
});
```
在cartItem.jsx中添加贴近类的上方添加@IntervalEnhance
```
@IntervalEnhance
export default class CartItem extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        initialQty: React.PropTypes.number
    };

    static defaultProps = {
        title: 'Undefined Product',
        price: 100,
        initialQty: 0
    };
```
去除cartItem.jsx中的最后语句将
```
export default IntervalEnhance(CartItem);
```
更改为:
```
export default CartItem;
```
项目五 React和ES6之JSPM的使用
· JSPM允许你用不同的形式(ES6, CommonJS, AMD and global)加载Javascript模块。
· 他运行你从npm or github注册安装相关依赖。
· JSPM支持ES6+以上的语法
· 你可以毫无麻烦的加载CSS/图片/字体和其他格式的文件，在一些插件的帮助下，这完全是可能的。
· JSPM让生产研发的使用准备相关文件变得更容易。
JSPM + React项目初始化
首先执行下面的命令：
$npm install jspm -g
jspm被作为一个全局的npm 模块被安装。
下一步，切换到你的项目路径下面执行jspm init命令，一直按enter按钮按照默认值安装即可：
安装必须的依赖包
运行完jspm init 的将要产生的下一个文件是config.js。
安装jspm-loader-jsx:
jspm install npm:jspm-loader-jsx
卸载jspm-loader-jsx:
jspm uninstall jspm-loader-jsx
重命名：
jspm install jsx=npm:jspm-loader-jsx
我的插件将关联到jsx，并且你可以在你的代码中通过import jsx将其导入到你的代码中。
让我们安装其他我们将要使用的依赖包：
$jspm install react react-dom
JSPM有常用包的注册表：https://github.com/jspm/registry/blob/master/registry.json
JSPM中的研究更深：https://github.com/jspm/jspm-cli/blob/master/docs/installing-packages.md
config.js
在config.js文件中找到关键字babelOptions的地方，然后替换成下面的代码：
```
babelOptions: {
    "stage": 0,
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
}
```
这是需要让Babel和类属性一样支持所有的新特性。
创建index.html文件
```
<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
    System.import('app.jsx!');
</script>
```
在第一行，我们导入SystemJS, 在第二行，我们导入config.js， SystemJS和config.js都是通过JSPM创建。通过System.import('app.jsx!')，我么添加入口文件app.jsx，然后再通过这个入口加载其他的所有的东西。
注： ！添加在app.jsx的后面，这是一个JSPM加载非Javascript文件的约定。
https://github.com/jspm/jspm-cli/blob/master/docs/production-workflows.md
注：要运行jspm项目的命令是：
##### browser-sync start --server
在当前目录启动服务器。
其他的JSPM特性
通用的Javascript模块的加载
JSPM支持不同的格式的模块。所以在同一个文件中使用ES6来加载一些require.js模块是绝对合法的。
加载文本文件，CSS和其他资源
执行下面的命令：
jspm install css
导入到某个文件中：
import './some/style.css!';
生产环境的构建
在你的项目中，执行下面的命令：
jspm bundle-sfx app.jsx! app.js --skip-source-maps --minify
你将有一个单一的很小的包含模块和依赖库的文件。
注：
SystemJS Module Loaders : https://github.com/systemjs/systemjs/blob/master/docs/module-formats.md
JSPM的更多的配置：https://github.com/jspm/jspm-cli/blob/master/docs/production-workflows.md
#### 项目六 项目名称 gulp-webpack-react-5
 为什么Webpack这么受欢迎，主要有以下几个原因?
  · Webpack使用npm作为外部的模块资源。如果你想添加React到你的项目，只需要执行npm install react即可。
  ·你可以加载任何的所有的东西，而不只是Javascript。Webpack使用的名字为loaders的装载机来完成加载。
  ·Webpack有一个很强大的开发工具生态系统。像热更新这样的东西将戏剧的改变你的开发流程。
  ·对于各种类型的任务有很多的webpack plugins。在大多数情况下，你可以使用已经存在的解决方案。 
webpack对应的loader清单地址：https://webpack.github.io/docs/list-of-loaders.html
Getting started
首先，我们要安装初始的开发依赖
```
npm install --save-dev webpack
npm install --save-dev babel-core
npm install --save-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
```
自从babel 6后你必须为每一个额外的语言特征安装独立的包,这些包叫做presets。我们安装es2015 preset, react preset, 和 stage-0 preset。对于更多关于babel 6的信息，可以阅读http://egorsmirnov.me/2015/11/03/upgrading-to-babel-6-babelify-and-webpack.html
下一步，安装非开发依赖(react和react-dom包)
npm install --save react react-dom
下面配置webpack, 新建文件webpack.config.dev.js文件。这个文件将用来打包你所有的在一个bundle(或者多个bundle)里面的Javascript(在大多数项目中不只是Javascript), 打包完就可以在用户的浏览器中正式运行。
内容如下：
```
var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './app.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
```
webpack loaders 用webpack几乎可以加载所有的东西到你的代码中(https://webpack.github.io/docs/list-of-loaders.html)。
在项目中，我们将使用babel-loader来将ES2015/ES6 的代码转换成ES5. 首先，我们需要安装npm 依赖包。
这里需要注意的是，我们通过exclude关键字的设置禁止webpack解析node_modules文件夹里面的文件。
接下来我们在项目的根目录下添加.babelrc文件。
```
{
"presets": ["react", "es2015", "stage-0"]
}
```
这个文件是配置babel以便能够使用前面我们添加的react, es2015和stage presets.
现在，无论什么时候webpack遇到，比如：import CartItem from './cartItem.js', 它将加载这个文件并将ES6 转换成ES5.
###### 添加Webpack开发服务器
幸运的是, Webpack生态系统已经提供所需要的东西。你可以使用webpack(https://webpack.github.io/docs/webpack-dev-server.html)或者webpack开发中间件, 比如Express.js(https://github.com/webpack/webpack-dev-middleware).
```
npm install --save-dev webpack-dev-middleware express
```
配置webpack服务器：
```
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);
var port = 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, function onAppListening(err) {
  if(err) {
    console.error(err);
  }else {
    console.info('==> Webpack development server listening on port');
  }
})

```
这是典型的使用Webpack Dev Middleware的express.js服务器。
添加热更新模块
Webpack Dev Middleware已经包含了热更新模块，你的代码发生变化，他都会立即刷新页面。
为了激活Hot Module Reloading, 你首先的安装必须的包。
npm install --save-dev webpack-hot-middleware
然后在webpack.config.dev.js文件中设置entry和plugins:
```
var config = {
    entry: [
        './app.js',
        'webpack-hot-middleware/client'
    ],

    ...

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
```
如果想对React应用更进一步使用模块刷新其实有很多方法。
其中一个简单的方法就是安装babel-preset-react-hmre模块。
npm install --save-dev babel-preset-react-hmre
调整.babelrc文件的内容：
```
{
"presets": ["react", "es2015", "stage-0"],
"env": {
	"development": {
		"presets": ["react-hmre"]
}
}
}
```
到这一步，这个应用就具备热刷新的功能。
注：这种配置是能够更新模块，但是不能FULL reload, 也就是页面无法自动刷新，但是
可以在项目入口文件app.js中添加语句：module.hot.accept();这样就是实现了页面和模块的自动更新。
我们需要的下package.json文件的scripts区域添加一些脚本。
```
{
"name":"awesome-application",
"version":"1.0.0",
...
"script": {
	"start": "node server.js"
}
}
```
###### Webpack生产环境配置
创建webpack.config.prod.js文件，文件内容为：
```
var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry : [
		'./app.js'	
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
		}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
		}
		})
	],
	module: {
	loaders: [
		{
			test:/\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
	}
	]
}
}
```
他和开发模式下的配置文件有点类似，但是有以下不同点：
·热刷新的功能不再有，因为在生产环境中不需要这个功能。
·Javascript bundle被依赖于webpack.optimize.UglifyJSPlugin的UglifyJS压缩
·环境变量NODE_ENV被设置production。这需要屏蔽来自React开发环境中的警告。
下一步，更新package.json文件中的scripts:
```
{
...
"script": {
	"start": "node server.js",
	"clean": "rimraf dist",
	"build:webpack": "NODE_ENV=production webpack --progress --colors --config webpack.config.prod.js",
	"build": "npm run clean && npm run build:webpack"
}
}
```
到现在为止，如果你在控制台运行npm run build, 压缩文件build.js将被创建并且放在dist/路径下面。这个文件准备在生产环境中使用。

