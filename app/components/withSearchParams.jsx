import * as React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

export const withSearchParams = (Component) => {
  return function ComponentWithSearchParams(props) {
    const [searchParams] = useSearchParams();
    return <Component {...props} router={{ searchParams }} />;
  };
};

withSearchParams.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default withSearchParams;
