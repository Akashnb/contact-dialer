import React from "react";
import PropTypes from "prop-types";

import AppHeader from "../../components/AppHeader/AppHeaderContainer";

const MainTemplate = ({ children }) => (
  <>
    <AppHeader />
    {children}
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

MainTemplate.defaultProps = {
  children: <div />
};

export default MainTemplate;
