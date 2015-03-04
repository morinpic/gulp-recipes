/** @jsx React.DOM */
var React = require('react')

Hello = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

React.render(<Hello name="JSX" />, document.getElementById("app"));
