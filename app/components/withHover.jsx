import * as React from "react";

export const withHover = (Component, propName = "hovering") => {
  return class WithHover extends React.Component {

    state = {
      hover: false,
    };

    mouseOver = () => this.setState({ hover: true });
    mouseOut = () => this.setState({ hover: false });

    render() {
      const { hover } = this.state;
      const props = {
        [propName]: hover,
        ...this.props,
      };

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
};
