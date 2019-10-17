import * as actionTypes from './actionTypes';
import RequestStates from '../../../utils/request-states';

const INITIAL_STATE = {
  getContactRequestStates: RequestStates.init,
  getContactError: null,
  contactList: [],
  pageNo: 0,
  pageSize: 10,
  total: 0,
  modalShow: false,
  currentContact: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTACT_LIST_LOADING:
      return {
        ...state,
        getContactRequestStates: RequestStates.loading,
        getContactError: null,
      };
    case actionTypes.GET_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        getContactRequestStates: RequestStates.success,
        getContactError: null,
        contactList: action.payload.contactList,
        pageNo: action.payload.page,
        pageSize: action.payload.per_page,
        total: action.payload.total,
      };
    case actionTypes.GET_CONTACT_LIST_ERROR:
      return {
        ...state,
        getContactRequestStates: RequestStates.error,
        getContactError: action.payload,
      };
    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        contactList: [
          {
            id: state.contactList.length + 1,
            ...action.payload,
          },
          ...state.contactList,
        ],
      };
    case actionTypes.DELETE_CONTACT:
      return {
        ...state,
        contactList: state.contactList.filter(contact => contact.id !== action.payload),
      };
    case actionTypes.GET_CONTACT:
      return {
        ...state,
        currentContact: action.payload || {},
      };
    case actionTypes.CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: {},
      };
    case actionTypes.EDIT_CONTACT:
      return {
        ...state,
        contactList: state.contactList
          .map(contact => (contact.id === action.payload.id ? action.payload : contact)),
      };
    case actionTypes.SET_SHOW_MODAL:
      return {
        ...state,
        modalShow: true,
      };
    case actionTypes.SET_HIDE_MODAL:
      return {
        ...state,
        modalShow: false,
      };
    default:
      return state;
  }
};
