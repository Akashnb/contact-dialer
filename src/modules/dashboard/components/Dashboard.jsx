import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Masonry from 'react-masonry-css';
import BlockUi from 'react-block-ui';

import ContactCard from '../../../shared/components/ContactCard';
import ContactForm from './ContactForm/ContactFormContainer';

const Dashboard = ({
  contactDetails, deleteContact, editContact, contactLoading,
}) => {
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="dashboard-section mt-3">
      <BlockUi
        tag="div"
        blocking={contactLoading}
      >
        <Container fluid>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {contactDetails.map(contact => (
              <div className="mb-3" key={contact.id}>
                <ContactCard
                  name={contact.firstname}
                  city={contact.city}
                  phone={contact.phone}
                  email={contact.email}
                  dob={contact.dob}
                  address={contact.address}
                  id={contact.id}
                  avatar={contact.avatar}
                  deleteContact={deleteContact}
                  editContact={editContact}
                />
              </div>
            ))}
          </Masonry>
          <ContactForm />
        </Container>
      </BlockUi>
    </div>
  );
};

Dashboard.propTypes = {
  contactDetails: PropTypes.instanceOf(Array),
  deleteContact: PropTypes.func,
  editContact: PropTypes.func,
  contactLoading: PropTypes.bool,
};

Dashboard.defaultProps = {
  contactDetails: [],
  deleteContact: () => { },
  editContact: () => { },
  contactLoading: false,
};

export default Dashboard;
