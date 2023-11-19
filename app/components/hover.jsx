import * as React from "react";
import PropTypes from "prop-types";

export default class Hover extends React.Component {
  state = {
    hover: false,
  };

  mouseOver = () => this.setState({ hover: true });
  mouseOut = () => this.setState({ hover: false });

  render() {
    const { hover } = this.state;

    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(hover)}
      </div>
    );
  }
}
