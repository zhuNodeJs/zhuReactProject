import React from 'react';

class HelloWorld extends React.Component {
   render() {
     return <h1>Hello from {this.props.phrase}</h1>
   }
}

export default HelloWorld;
/**
 * 在项目的根目录下面，添加一个hello-world.jsx文件，并且在文件中code下面的代码.这是我们用ES6编写的一个非常简单的React组件.
 * line 1 .导入React库并且将他存入变量React中
 * line 3-8 使用ES6创建继承自React.Component的类
 * line 9 使用export default HelloWorld将创建的组件导出以便在其他地方能够正常导入使用, 上面是es6，下面是es5.
 * import React from 'react';
 * var HelloWorld = React.createClass({
 *   render: function() {
 *   return (
 *      <h1>Hello from {this.props.phrase}</h1>
 *   )
 * }
 * })
 * 
 * export default HelloWorld;
 */





























































