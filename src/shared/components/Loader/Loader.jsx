import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import './loader.scss';

const Loader = ({ width, height }) => (
  <section className="loader-section">
    <Spinner style={{ width: `${width}rem`, height: `${height}rem` }} />
  </section>
);

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Loader.defaultProps = {
  width: 3,
  height: 3,
};

export default Loader;
