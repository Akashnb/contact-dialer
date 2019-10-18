import * as actionTypes from './actionTypes';
import contactDetails from '../../../data/contactDetails.json';

export const getContactList = (pageNo = 1, pageSize = 20) => ({
  type: actionTypes.GET_CONTACT_LIST,
  payload: new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (pageNo - 1) * pageSize;
      const endIndex = pageNo * pageSize;
      const _contact = contactDetails.slice(startIndex, endIndex);
      resolve({
        contactList: _contact,
        page: pageNo,
        per_page: pageSize,
        total: contactDetails.length,
      });
    }, 2000);
  }),
});

export const getContact = id => ({
  type: actionTypes.GET_CONTACT,
  payload: contactDetails.find(contact => contact.id === `${id}`),
});

export const addContact = data => ({
  type: actionTypes.ADD_CONTACT,
  payload: data,
});

export const editContact = data => ({
  type: actionTypes.EDIT_CONTACT,
  payload: data,
});

export const deleteContact = id => ({
  type: actionTypes.DELETE_CONTACT,
  payload: id,
});

export const searchContact = data => ({
  type: actionTypes.SEARCH_CONTACT,
  payload: data,
});

export const showModal = () => ({
  type: actionTypes.SET_SHOW_MODAL,
  payload: '',
});

export const hideModal = () => ({
  type: actionTypes.SET_HIDE_MODAL,
  payload: '',
});

export const clearCurrentContact = () => ({
  type: actionTypes.CLEAR_CURRENT_CONTACT,
  payload: '',
});
