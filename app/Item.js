import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

class Item extends React.PureComponent {
  static propTypes = {
    style: PropTypes.array,
    children: PropTypes.element
  };

  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}

export default Item;
