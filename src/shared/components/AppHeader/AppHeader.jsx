import React from 'react';

const AppHeader = () => (
  <div className="appheader-section d-flex justify-content-between p-2">
    <div className="d-flex align-items-center">
      <p className="mb-0">Contact Dialer</p>
    </div>
    <div>
      <input className="form-control py-2 border" type="search" placeholder="search" />
    </div>
  </div>
);

export default AppHeader;
