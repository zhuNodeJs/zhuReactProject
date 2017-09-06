import React from 'react';
import ReactDOM from 'react-dom';
import CartItem from './cartItem';

const order = {
  title: 'Fresh fruits package',
  image:'http://images.all-free-download.com/images/graphiclarge/citrus_fruit_184416.jpg',
  initialQty: 3,
  price: 8
}


ReactDOM.render(
  <CartItem  title={order.title}
             image={order.image}
             initialQty={order.initialQty}
             price = {order.price}
             />,
  document.querySelector('.root')
)


/**
 * Line1-2 我们导入React/ReactDOM库,
 * Line 3 导入我们马上要创建的CartItem组件
 * Line 5-10 给CartItem组件设置相关属性(属性包括item title, image, initialQuality and price)
 * Line 13-18 加载CartItem组建到一个CSS类为root的DOM元素上
 */