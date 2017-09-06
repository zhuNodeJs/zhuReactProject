import React from 'react';

export var IntervalEnhance = ComposedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    }
  }
  static displayName = 'ComponentEnhancedWithIntervalHOC';
  
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  
  tick() {
    this.setState({
      seconds: this.state.seconds + 1000
    })
  }
  
  render() {
    return <ComposedComponent {...this.props} {...this.state}/>
  }
}

/**
 * 代码解释：
 * Line 3. ComposedComponent => class extends React.Component 部分的代码等价于定义一个返回class的方法。
 * ComposedComponent是我们希望增强的组件(在这个案例中，他是CartItem),通过使用export var IntervalEnhance,
 * 我们可以把整个方法作为IntervalEnhance(指向上面的代码中的CartItem)导出。
 * Line 5. 帮助调试。在RectTools中，这个组件将被命名为ComponentEnhancedWithIntervalHOC.
 * Line 6 - 12. 初始化一个值为0. 名字为seconds的状态机变量。
 * Line 11-23. 为这个组件提供启动和停止的生命周期函数。
 * Line 26. 在这里有很多感兴趣的东西。这一行将给我的组件增加所有的state和props并且转换成CartItem组件。同时，通过这行代码的设置，在CartItem中我们将
 * 可以正常的访问this.state.seconds属性。
 * 最后一步需要改变CartItem component的render方法。我们将在这个视图上直接输出this.state.seconds。
 * 
 */