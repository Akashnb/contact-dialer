import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContactForm from './ContactForm';
import {
  required, matchRegEx, email as emailEx, phone, isEqual,
} from '../../../../utils/validators';
import * as actions from '../../redux/actions';

const ContactFormContainer = ({
  addContact, showModal, hideModal, modalShow, currentContact, editContact, clearCurrentContact,
}) => {
  const onSubmit = (values) => {
    if (values.id) {
      editContact(values);
    } else {
      addContact(values);
    }
    hideModal();
  };

  const DialogClick = () => {
    clearCurrentContact();
    showModal();
  };

  const validateForm = (values) => {
    const errors = {};
    errors.firstname = required(values.firstname) && 'firstname is required';
    errors.lastname = required(values.lastname) && 'lastname is required';
    errors.address = required(values.address) && 'address is required';
    errors.city = required(values.city) && 'city is required';
    errors.email = required(values.email) && 'email is required';
    if (!errors.email) {
      errors.email = !matchRegEx(values.email, emailEx) && 'email is invalid';
    }
    errors.phone = required(values.phone) && 'phoneNo is required';
    if (!errors.phone) {
      errors.phone = isEqual(values.phone, phone) && 'number must be 10 digit only';
      // errors.phone = !matchRegEx(values.phone, numeric) && 'numeric digit only';
    }
    errors.dob = required(values.dob) && 'dob is required';
    return errors;
  };
  return (
    <ContactForm
      initialValues={currentContact || {}}
      validate={validateForm}
      onSubmit={onSubmit}
      showModal={showModal}
      hideModal={hideModal}
      modalShow={modalShow}
      DialogClick={DialogClick}
    />
  );
};

ContactFormContainer.propTypes = {
  addContact: PropTypes.func,
  editContact: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalShow: PropTypes.bool,
  currentContact: PropTypes.instanceOf(Object),
  clearCurrentContact: PropTypes.instanceOf(Object),
};

ContactFormContainer.defaultProps = {
  addContact: () => {},
  editContact: () => {},
  showModal: () => {},
  hideModal: () => {},
  modalShow: false,
  currentContact: {},
  clearCurrentContact: {},
};

const mapStateToProps = state => ({
  modalShow: state.contact.modalShow,
  currentContact: state.contact.currentContact,
});

const mapDispatchToProps = dispatch => ({
  addContact: data => dispatch(actions.addContact(data)),
  editContact: data => dispatch(actions.editContact(data)),
  clearCurrentContact: () => dispatch(actions.clearCurrentContact()),
  showModal: () => dispatch(actions.showModal()),
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer);
