import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './appheader.scss';

import AppHeader from './AppHeader';
import * as actions from '../../../modules/dashboard/redux/actions';

const AppHeaderContainer = ({
  searchContact, getContactList,
}) => {
  const handleChange = (data) => {
    if (data) {
      searchContact(data);
    } else {
      getContactList();
    }
  };

  return (
    <AppHeader
      handleChange={handleChange}
    />
  );
};

AppHeaderContainer.propTypes = {
  searchContact: PropTypes.func,
  getContactList: PropTypes.func,
};

AppHeaderContainer.defaultProps = {
  searchContact: () => {},
  getContactList: () => {},
};

const mapDispatchToProps = dispatch => ({
  getContactList: (pageNo, pageSize) => dispatch(actions.getContactList(pageNo, pageSize)),
  searchContact: data => dispatch(actions.searchContact(data)),
});

export default connect(null, mapDispatchToProps)(AppHeaderContainer);
