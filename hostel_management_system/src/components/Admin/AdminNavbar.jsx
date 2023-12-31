import React from 'react';

import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';



const AdminNavbar = () => {

  const [cookies, setCookie] = useCookies(['user']);

  const userRole = cookies.user ? cookies.user.role : null;
  const userID = cookies.user ? cookies.user.id : null;

  const renderLinksBasedOnRole = (role) => {
    switch (role) {
      case 1:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">
                <i className="fas fa-table"></i>
                <span>Complaints</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/asset">
                <i className="fas fa-home"></i>
                <span>Asset</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/rooms">
                <i className="fas fa-home"></i>
                <span>Room</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/maintains">
                <i className="fas fa-table"></i>
                <span>Maintains</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                <i className="fas fa-table"></i>
                <span>Reports</span>
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/register">
                <i className="fas fa-user-circle"></i>
                <span>Register</span>
              </a>
            </li>
          </>
        );
      case 2:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/maintains">
                <i className="fas fa-table"></i>
                <span>Maintains</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">
                <i className="fas fa-table"></i>
                <span>Complaints</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/asset">
                <i className="fas fa-home"></i>
                <span>Asset</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                <i className="fas fa-table"></i>
                <span>Reports</span>
              </a>
            </li>
          </>
        );
      case 3:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/maintains">
                <i className="fas fa-table"></i>
                <span>Maintains</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">
                <i className="fas fa-table"></i>
                <span>Complaints</span>
              </a>
            </li>
            </>
        );
      case 4:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/rooms">
                <i className="fas fa-home"></i>
                <span>Room</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/maintains">
                <i className="fas fa-table"></i>
                <span>Maintains</span>
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
            </>
        );
      case 5:
        return (
          <>  
            <li className="nav-item">
            <a className="nav-link" href="/rooms">
              <i className="fas fa-home"></i>
              <span>Room</span>
            </a>
          </li>
            <li className="nav-item">
              <a className="nav-link" href="/maintains">
                <i className="fas fa-table"></i>
                <span>Maintains</span>
              </a>
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
            </li>
           
          </>
        );
      case 6:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">
                <i className="fas fa-table"></i>
                <span>Complaints</span>
              </a>
            </li>
          </>
        );

      default:
        return null; // No links for unknown roles
    }
  };

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
            <a className="nav-link active" href="/dashboard">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          {userRole && renderLinksBasedOnRole(userRole)}
          <li className="nav-item">
            <Link to={`/profile/${userID}`} className='nav-link'><i class="bi bi-person-square"></i> Profile</Link>
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