import React from 'react';
import { IntervalEnhance } from './intervalEnhance';
//修饰符是对类的行为进行修改
@IntervalEnhance
class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: props.initialQty,
      total: 0
    }
  }
  
  static get defaultProps() {
    return {
      title: 'Undefined Product',
      price: 100,
      initialQty: 0
    }
  }
  componentWillMount() {
    this.recalculateTotal();
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
  render() {
    return (
      <article className='row large-4'>
        <figure className='text-center'>
          <p>
              <img src={this.props.image} />
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
        <p className='large-12 column'>
           <strong>Time elapsed for interval: </strong>
           {this.props.seconds} ms
        </p>
      </article>
    )
  }
}

CartItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  price: React.PropTypes.number.isRequired,
  initialQty: React.PropTypes.number
}

//export default IntervalEnhance(CartItem)
//此方法中用decorators的写法
export default CartItem
