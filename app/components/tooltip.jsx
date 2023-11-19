import * as React from "react";
import PropTypes from "prop-types";
import { withHover } from "./withHover";
import Hover from "./hover";

const styles = {
  position: "relative",
  display: "flex",
};

export const Tooltip = ({ children, elem }) => {
  return (
    <Hover>
      {(hovering) => {
        return (
          <div style={styles}>
            {hovering && elem}
            {children}
          </div>
        );
      }}
    </Hover>
  );
};
export default Tooltip;
// class ToolTip extends React.Component {
//   render() {
//     const { children, elem, hovering } = this.props;
//     return (
//       <div style={styles}>
//         {hovering && elem}
//         {children}
//       </div>
//     );
//   }
// }

// ToolTip.propTypes = {
//   children: PropTypes.node.isRequired,
//   element: PropTypes.node.isRequired,
// };

// export default withHover(ToolTip);
