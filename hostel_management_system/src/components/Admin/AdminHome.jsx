import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminTopBar from './AdminTopBar';
import AdminFooter from './AdminFooter';

const AdminHome = () => {
    return (
        <div id="page-top">
        <div id="wrapper">

        <AdminNavbar />


        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />
            <div className="container-fluid">
              <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Dashboard</h3>
                <a className="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" href="/reports">
                  <i className="fas fa-download fa-sm text-white-50"></i>&nbsp;Generate Report
                </a>
              </div>
              <div className="row">
                <div className="col-md-6 col-xl-3 mb-4">
                  <div className="card shadow border-start-primary py-2">
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Earnings (monthly)</span></div>
                          <div className="text-dark fw-bold h5 mb-0"><span>$40,000</span></div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 mb-4">
                  <div className="card shadow border-start-info py-2">
                    <div className="card-body">
                      <div className="row align-items-center no-gutters">
                        <div className="col me-2">
                          <div className="text-uppercase text-info fw-bold text-xs mb-1"><span>Tasks</span></div>
                          <div className="row g-0 align-items-center">
                            <div className="col-auto">
                              <div className="text-dark fw-bold h5 mb-0 me-3"><span>50%</span></div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm">
                                <div
                                  className="progress-bar bg-info"
                                  aria-valuenow="50"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '50%' }}
                                >
                                  <span className="visually-hidden">50%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary fw-bold m-0">Projects</h6>
                    </div>
                    <div className="card-body">
                      <h4 className="small fw-bold">Server migration</h4>
                      <span className="float-end">20%</span>
                      <div className="progress mb-4">
                        <div
                          className="progress-bar bg-danger"
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: '20%' }}
                        >
                          <span className="visually-hidden">20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary fw-bold m-0">Todo List</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <h6 className="mb-0">
                              <strong>Lunch meeting</strong>
                            </h6>
                            <span className="text-xs">10:30 AM</span>
                          </div>
                          <div className="col-auto">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="formCheck-1" />
                              <label className="form-check-label" htmlFor="formCheck-1"></label>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card text-white bg-primary shadow">
                        <div className="card-body">
                          <p>Primary</p>
                          <p className="text-white-50 small">#4e73df</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card text-white bg-secondary shadow">
                        <div className="card-body">
                          <p>Secondary</p>
                          <p className="text-white-50 small">#858796</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <AdminFooter />
        </div>
          <a className="border rounded d-inline scroll-to-top" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
    </div>
    </div>
    );
};

export default AdminHome;