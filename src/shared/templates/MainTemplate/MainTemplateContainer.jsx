import React from "react";
import PropTypes from "prop-types";

import MainTemplate from "./MainTemplate";

const MainTemplateContainer = ({ children }) => (
  <MainTemplate>{children}</MainTemplate>
);

MainTemplateContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

MainTemplateContainer.defaultProps = {
  children: <div />
};

export default MainTemplateContainer;
