import React from 'react';

const AdminTopBar = () => {
    return (
        <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
        <div className="container-fluid">
          <button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
            <i className="fas fa-bars"></i>
          </button>
          <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
              <button className="btn btn-primary py-0" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown d-sm-none no-arrow">
              <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                <i className="fas fa-search"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                <form className="me-auto navbar-search w-100">
                  <div className="input-group">
                    <input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                    <div className="input-group-append">
                      <button className="btn btn-primary py-0" type="button">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                  <span className="badge bg-danger badge-counter">3+</span>
                  <i className="fas fa-bell fa-fw"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="me-3">
                      <div className="bg-primary icon-circle">
                        <i className="fas fa-file-alt text-white"></i>
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">December 12, 2019</span>
                      <p>A new monthly report is ready to download!</p>
                    </div>
                  </a>
                  <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                  <span className="badge bg-danger badge-counter">7</span>
                  <i className="fas fa-envelope fa-fw"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image me-3">
                      <img className="rounded-circle" src="assets/img/avatars/avatar4.jpeg" alt="User Avatar" />
                      <div className="bg-success status-indicator"></div>
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>Hi there! I am wondering if you can help me with a problem I've been having.</span>
                      </div>
                      <p className="small text-gray-500 mb-0">Emily Fowler - 58m</p>
                    </div>
                  </a>
                  <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
              </div>
              <div className="shadow dropdown-list dropdown-menu dropdown-menu-end" aria-labelledby="alertsDropdown"></div>
            </li>
            <div className="d-none d-sm-block topbar-divider"></div>
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                  <span className="d-none d-lg-inline me-2 text-gray-600 small">Admin</span>
                  <img className="border rounded-circle img-profile" src="assets/img/avatars/user.png" alt="User Avatar" />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
};

export default AdminTopBar;