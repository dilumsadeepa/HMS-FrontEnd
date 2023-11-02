import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
      <div className="container-fluid d-flex flex-column p-0">
        <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
          <div className="sidebar-brand-icon rotate-n-15"><i class="fas fa-school"></i></div>
          <div className="sidebar-brand-text mx-3"><span>HMS</span></div>
        </a>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="profile.html">
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/complaints">
              <i className="fas fa-table"></i>
              <span>Complaints</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reports">
              <i className="fas fa-table"></i>
              <span>Reports</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              <i className="far fa-user-circle"></i>
              <span>Login</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              <i className="fas fa-user-circle"></i>
              <span>Register</span>
            </a>
          </li>
        </ul>
        {/* <div className="text-center d-none d-md-inline">
          <button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
        </div> */}
      </div>
    </nav>
  
  );
};

export default AdminNavbar;