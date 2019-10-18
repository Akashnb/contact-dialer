import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import {
  Form, Field, reset, reduxForm,
} from 'redux-form';
import { MdAdd } from 'react-icons/md';

import RenderInput from '../../../../shared/components/RenderInput/renderInput';

const afterSubmit = (result, dispatch) => dispatch(reset('ContactDetails'));

const ContactForm = ({
  handleSubmit, onSubmit, hideModal, modalShow, DialogClick,
}) => (
  <>
    <div className="add-contact-btn">
      <Button color="danger" onClick={() => DialogClick()}><MdAdd /></Button>
    </div>
    <Modal isOpen={modalShow} fade={false} toggle={() => hideModal()}>
      <ModalHeader toggle={() => hideModal()}>Create New Contact</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={12} md={6}>
              <Field
                type="text"
                name="firstname"
                id="firstname"
                placeholder="John"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={6}>
              <Field
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Carter"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={12}>
              <Field
                type="textarea"
                name="address"
                id="address"
                placeholder="Las-Vegas, Nevada-89030"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={6}>
              <Field
                type="text"
                name="city"
                id="city"
                placeholder="Nevada"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={6}>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="John@gmail.com"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={6}>
              <Field
                type="text"
                name="phone"
                id="phone"
                placeholder="+91 8787878787"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col sm={12} md={6}>
              <Field
                type="date"
                name="dob"
                id="dob"
                className="mt-2"
                component={RenderInput}
              />
            </Col>
            <Col>
              <Button name="submit" type="submit" className="mt-3">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  </>
);

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  hideModal: PropTypes.func,
  DialogClick: PropTypes.func,
  modalShow: PropTypes.bool,
};

ContactForm.defaultProps = {
  handleSubmit: () => {},
  onSubmit: () => {},
  hideModal: () => {},
  DialogClick: () => {},
  modalShow: false,
};

export default reduxForm({
  form: 'ContactDetails',
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
})(ContactForm);
