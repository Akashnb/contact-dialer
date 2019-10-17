/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Row, Col, CardText, CardBody, CardTitle, CardSubtitle,
} from 'reactstrap';
import {
  MdDelete, MdPhone, MdEmail, MdDateRange, MdEdit,
} from 'react-icons/md';

import Avatar from '../../assets/images/avatar.png';

const ContactCard = ({
  name, city, phone, email, dob, id, deleteContact, address, editContact,
}) => (
  <Card>
    <CardBody>
      <Row>
        <Col xs={3} md={2} className="pr-0">
          <img src={Avatar} alt="Avatar" className="w-100 rounded-circle" />
        </Col>
        <Col xs={9} md={10} className="d-flex justify-content-center flex-column">
          <CardTitle className="mb-1">{name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">{city}</CardSubtitle>
        </Col>
      </Row>
      <CardText className="mb-2">{address}</CardText>
      <div className="d-flex justify-content-between">
        <CardText className="mb-0">
          <MdPhone />
          {' '}
          {phone}
        </CardText>
        <CardText className="mb-0">
          <MdDateRange />
          {' '}
          {dob}
        </CardText>
      </div>
      <CardText className="mb-0">
        <MdEmail />
        {' '}
        {email}
      </CardText>
      <div className="delete-button">
        <p className="mb-0" onClick={() => deleteContact(id)}>
          <MdDelete />
        </p>
        <p className="mb-0" onClick={() => editContact(id)}>
          <MdEdit />
        </p>
      </div>
    </CardBody>
  </Card>
);

ContactCard.propTypes = {
  name: PropTypes.string,
  city: PropTypes.string,
  phone: PropTypes.number,
  email: PropTypes.string,
  id: PropTypes.string,
  address: PropTypes.string,
  dob: PropTypes.string,
  deleteContact: PropTypes.func,
  editContact: PropTypes.func,
};

ContactCard.defaultProps = {
  name: '',
  city: '',
  phone: 0,
  email: '',
  id: '',
  dob: '',
  address: '',
  deleteContact: () => {},
  editContact: () => {},
};

export default ContactCard;
