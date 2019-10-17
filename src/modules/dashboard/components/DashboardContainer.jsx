import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './dashboard.scss';
import Dashboard from './Dashboard';
import * as actions from '../redux/actions';
import RequestStates from '../../../utils/request-states';

const DashboardContainer = ({
  getContactList, contactDetails, pageNo, PageSize, total, deleteContact, contactLoading,
  showModal, getContact,
}) => {
  React.useEffect(() => {
    getContactList();
  }, []);

  const editContact = (id) => {
    getContact(id);
    showModal();
  };

  return (
    <Dashboard
      contactDetails={contactDetails}
      pageNo={pageNo}
      PageSize={PageSize}
      total={total}
      deleteContact={deleteContact}
      editContact={editContact}
      contactLoading={contactLoading}
    />
  );
};

DashboardContainer.propTypes = {
  getContactList: PropTypes.func,
  getContact: PropTypes.func,
  contactDetails: PropTypes.instanceOf(Array),
  pageNo: PropTypes.number,
  PageSize: PropTypes.number,
  total: PropTypes.number,
  deleteContact: PropTypes.func,
  contactLoading: PropTypes.bool,
  showModal: PropTypes.func,
};

DashboardContainer.defaultProps = {
  getContactList: () => {},
  getContact: () => {},
  contactDetails: [],
  pageNo: 0,
  PageSize: 10,
  total: 0,
  deleteContact: () => {},
  contactLoading: false,
  showModal: () => {},
};

const mapStateToProps = state => ({
  contactLoading: state.contact.getContactRequestStates === RequestStates.loading,
  contactDetails: state.contact.contactList,
  pageNo: state.contact.pageNo,
  pageSize: state.contact.pageSize,
  total: state.contact.total,
});

const mapDispatchToProps = dispatch => ({
  getContactList: (pageNo, pageSize) => dispatch(actions.getContactList(pageNo, pageSize)),
  deleteContact: id => dispatch(actions.deleteContact(id)),
  getContact: id => dispatch(actions.getContact(id)),
  showModal: () => dispatch(actions.showModal()),
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
