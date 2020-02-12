import React from 'react';

function questionCards() {
  return (
            <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
            <div className="card-body text-center">
                <i className="fa fa-envelope text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4"/>
                <div className="small text-black-50">
                <a href="http://kellyhancox.com">hello@yourdomain.com</a>
                </div>
            </div>
            </div>
        </div>
  );
}

export default questionCards;
