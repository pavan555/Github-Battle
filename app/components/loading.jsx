import * as React from "react";
import PropTypes from "prop-types";

const LOADING_STYLES = {
  fontSize: "14px",
  position: "absolute",
  left: 0,
  right: 0,
  marginTop: "20px",
  textAlign: "center",
};

export class Delayed extends React.Component {
  state = {
    show: false,
  };
  componentDidMount() {
    this.showInterval = window.setInterval(() => {
      return this.setState({ show: true });
    }, this.props.wait);
  }

  componentWillUnmount() {
    window.clearInterval(this.showInterval);
    this.showInterval = null;
  }

  render() {
    return this.state.show ? this.props.children : null;
  }
}

Delayed.defaultProps = {
  wait: 300,
};

Delayed.propTypes = {
  children: PropTypes.node.isRequired,
  wait: PropTypes.number.isRequired,
};

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };
  componentDidMount() {
    const text = this.props.text;
    this.interval = window.setInterval(() => {
      return this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({
            content: content + ".",
          }));
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    return (
      <Delayed>
        <p style={LOADING_STYLES}>{this.state.content}</p>
      </Delayed>
    );
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
