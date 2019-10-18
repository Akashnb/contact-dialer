import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = ({ handleChange }) => (
  <div className="appheader-section d-flex justify-content-between p-2">
    <div className="d-flex align-items-center">
      <p className="mb-0">Contact Dialer</p>
    </div>
    <div>
      <input
        className="form-control py-2 border"
        type="search"
        placeholder="search"
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </div>
);

AppHeader.propTypes = {
  handleChange: PropTypes.func,
};

AppHeader.defaultProps = {
  handleChange: () => {},
};

export default AppHeader;
