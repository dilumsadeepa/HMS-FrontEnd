import React, {useContext, useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import Apiurl from '../ApiURL';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom' ;


import { Link } from 'react-router-dom';
import Logout from '../User/Logout';

const AdminTopBar = () => {

  const [cookies, setCookie] = useCookies(['user']);
  const [complaintNotification, setComplaintNotification] = useState([]);

  console.log(cookies);
  console.log(cookies.user.id);

  useEffect(() => {
    // Function to fetch data from the API and initialize the DataTable
    const fetchComplaintNotificationData= async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`${Apiurl}/api/complaintNotifications/all`);
        const data = response.data;
        setComplaintNotification(data);
        console.log(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchDataAndInitializeTable function
    fetchComplaintNotificationData();
  }, []);




  const username = cookies.user ? cookies.user.name : null;
  const userID = cookies.user ? cookies.user.id : null;



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
                  <span className="badge bg-danger badge-counter">+</span>
                  <i className="fas fa-bell fa-fw"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>

                  {complaintNotification.map((complaintNotify) => (
                      complaintNotify.toWhom === cookies.user.role ? (
                        <a key={complaintNotify.complaintId} className="dropdown-item d-flex align-items-center" href={`/complaint/show/${complaintNotify.complaintId}`}>
                          <div className="me-3">
                            <div className="bg-primary icon-circle">
                              <i className="fas fa-file-alt text-white"></i>
                            </div>
                          </div>
                          <div>
                            <span><span className="badge text-bg-info">Complaint</span></span>
                            <p>{complaintNotify.complaint} <span className="badge text-bg-light ms-3">{complaintNotify.complaint_Date}</span></p>
                          </div>
                        </a>
                      ) : null // Render null if the condition is not met
                    ))}


                  <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
              </div>
            </li>

            <div className="d-none d-sm-block topbar-divider"></div>
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                  <span className="d-none d-lg-inline me-2 text-gray-600 small">{username}</span>
                  <img className="border rounded-circle img-profile" src="assets/img/avatars/user.png" alt="User Avatar" />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <Link to={`/profile/${userID}`} className='dropdown-item'><i class="bi bi-person-square"></i> Profile</Link>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Activity log
                  </a>
                  <div className="dropdown-divider"></div>
                  <Logout />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
};

export default AdminTopBar;