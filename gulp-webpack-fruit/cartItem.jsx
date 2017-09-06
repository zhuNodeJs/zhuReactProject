import React from 'react';

class CartItem extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         qty: props.initialQty,
         total: 0
       }
    }
    //第一种方法
    //添加静态的默认值
//  static get defaultProps() {
//    return {
//      title: 'Undefined Product',
//      price: 100,
//      initialQty: 0
//    }
//  }
    
    //验证
//  static propTypes = {
//    title: React.PropTypes.string.isRequired,
//    price: React.PropTypes.number.isRequired,
//    initialQty: React.PropTypes.number
//  }
    componentWillMount() {
      this.recalculateTotal();
    }
    render() {
      return (
        <article className='row large-4'>
          <figure className='text-center'>
            <p>
                <img src={this.props.image}/>
            </p>
            <figcaption>
              <h2>{this.props.title}</h2>
            </figcaption>
          </figure>
          <p className='large-4 column'><strong>Quanity: {this.state.qty}</strong></p>
          <p className='large-4 column'>
              <button className='button success' onClick={this.increaseQty.bind(this)}>+</button>
              <button className='button alert' onClick={this.decreaseQty.bind(this)}>-</button>
          </p>
          <p className='large-4 column'><strong>Price per item:</strong>${this.props.price}</p>
          <h3 className='large-12 column text-center'>
            Total: ${this.state.total}
          </h3>
        </article>
      )
    }
    recalculateTotal() {
      this.setState({
        total: this.state.qty * this.props.price
      })
    }
    increaseQty() {
      this.setState({
        qty: this.state.qty + 1
      }, this.recalculateTotal)
    }
    decreaseQty() {      
      let newQty = this.state.qty - 1 > 0 ? this.state.qty - 1 : 0;
      this.setState({
        qty: newQty
      }, this.recalculateTotal)
    }    
}

//第二种方法
//CartItem.propTypes = {
//    title: React.PropTypes.string.isRequired,
//    price: React.PropTypes.number.isRequired,
//    initialQty: React.PropTypes.number
//}
//
//CartItem.defaultProps = {
//  title: 'Undefined Product1111',
//  price: 100,
//  initialQty: 0
//}

export default CartItem


/**
 * 
 * this.setState({
 *       qty: newQty
 *    }, this.recalculateTotal)
 * 设置状态后，执行某个函数
 * 这里我们只是使用JSX+组件, 在加上一些基础的CSS输出漂亮的标签。
 * 不要担心{this.increaseQty.bind(this)}这句代码的使用，下一个小结中我们将会详细讲解，这句代码会调用CartItem类中的increaseQty()方法即可。
 *  Default Props and Prop Types for ES6 React classes
 * 想象我们想要为CartItem组件添加一些验证和默认值
 * 幸运的是，你只需要在CartItem类中添加如下的代码即可。
 * 添加默认属性和验证的方法：
 * 方法一：写在类中,是作为类的静态属性,需要安装babel-preset-stage-0插件
 * ```
 *  static get defaultProps() {
 *   return {
 *    title: 'Undefined Product',
 *    price: 100,
 *    initialQty: 0
 * }
 * }
 * ```
 * ```
 * static propTypes = {
 *   title: React.PropTypes.string.isRequired,
 *   price: React.PropTypes.number.isRequired,
 *   initialQty: React.PropTypes.number
 * }
 * ```
 * 方法二：写在类的外部,也作为类的属性
 * ```
 * CartItem.propTypes = {
 *   title: React.PropTypes.string.isRequired,
 *   price: React.PropTypes.number.isRequired,
 *   initialQty: React.PropTypes.number
 * }
 * ```
 * ```
 * CartItem.defaultProps = {
 *   title: 'Undefined Product',
 *   price: 100,
 *   initialQty: 0
 * }
 * ```
 * Bring ES7 into the project
 * 我们可以开始使用non-breaking, property initializers 和decorators的新特性
 * 首先，我们通过npm install --save-dev babel-preset-stage-0 命名安装确实的node modules
 * 其次，为了在我们项目中能够使用新的语法，我们需要在gulpfile.js文件中的第8行中做一些改变。代码如下：
 * .transform('babelify', {presets:['react', 'es2015','stage-0']})
 * 
 *    
 * 
 * 
 */























































































