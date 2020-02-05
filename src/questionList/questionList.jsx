import React from 'react';
import questionCards from '../questionCards/questionCards';

function Qlist() {
  return (

        <section className="contact-section bg-black">
      <div className="container">
  
        <div className="row">
  
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fa fa-map-marked-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Address</h4>
                <hr className="my-4"/>
                <div className="small text-black-50">4923 Market Street, Orlando FL</div>
              </div>
            </div>
          </div>
  
        <questionCards></questionCards>
  
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fa fa-mobile-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4"/>
                <div className="small text-black-50">+1 (555) 902-8832</div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="social d-flex justify-content-center">
          <a href="http://kellyhancox.com" className="mx-2">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="http://kellyhancox.com" className="mx-2">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a href="http://kellyhancox.com" className="mx-2">
            <i className="fa fa-github"></i>
          </a>
        </div>
  
      </div>
    </section>


    );
    }

  export default Qlist;