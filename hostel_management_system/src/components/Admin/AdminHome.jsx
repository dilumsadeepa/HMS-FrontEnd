import React, {useContext, useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import AdminNavbar from './AdminNavbar';
import AdminTopBar from './AdminTopBar';
import AdminFooter from './AdminFooter';
import Apiurl from '../ApiURL';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom' ;

const AdminHome = () => {

  const [cookies] = useCookies(['role']);
  const [complaintNotification, setComplaintNotification] = useState([]);
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);
  const [pendingComplaintsCount, setPendingComplaintsCount] = useState(0);
  const [resolvedComplaintsCount, setResolvedComplaintsCount] = useState(0);
  const [inProgressComplaintsCount, setInProgressComplaintsCount] = useState(0);

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


  useEffect(() => {
    // Function to fetch data from the API and set count values
    const fetchComplaintCountData = async () => {
      try {
        const totalResponse = await axios.get(`${Apiurl}/complaint/total-count`);
        const pendingResponse = await axios.get(`${Apiurl}/complaint/pending-count`);
        const resolvedResponse = await axios.get(`${Apiurl}/complaint/resolved-count`);
        const inProgressResponse = await axios.get(`${Apiurl}/complaint/in-progress-count`);
  
        setTotalComplaintsCount(totalResponse.data);
        setPendingComplaintsCount(pendingResponse.data);
        setResolvedComplaintsCount(resolvedResponse.data);
        setInProgressComplaintsCount(inProgressResponse.data);
      } catch (error) {
        console.error('Error fetching count data:', error);
      }
    };
  
    // Call the fetchComplaintCountData function
    fetchComplaintCountData();
  }, []);


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

              {cookies.user.role !== 6 ? (
            <>
          <div className="col-md-6 col-xl-3 mb-4">
                          <div className="card shadow border-start-primary py-2">
                            <div className="card-body">
                              <div className="row align-items-center no-gutters">
                                <div className="col me-2">
                                  <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Total Complaints</span></div>
                                  <div className="text-dark fw-bold h5 mb-0"><span>{totalComplaintsCount}</span></div>
                                </div>
                                <div className="col-auto">
                                <i className="fa-solid fa-clipboard fa-2x text-gray-300"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-xl-3 mb-4">
                          <div className="card shadow border-start-success py-2">
                            <div className="card-body">
                              <div className="row align-items-center no-gutters">
                                <div className="col me-2">
                                  <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Resolved Complaints</span></div>
                                  <div className="text-dark fw-bold h5 mb-0"><span>{resolvedComplaintsCount}</span></div>
                                </div>
                                <div className="col-auto">
                                <i className="fa-solid fa-clipboard fa-2x text-gray-300"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>

                          <div className="col-md-6 col-xl-3 mb-4">
                          <div className="card shadow border-start-warning py-2">
                            <div className="card-body">
                              <div className="row align-items-center no-gutters">
                                <div className="col me-2">
                                  <div className="text-uppercase text-danger fw-bold text-xs mb-1"><span>Pending Complaints</span></div>
                                  <div className="text-dark fw-bold h5 mb-0"><span>{pendingComplaintsCount}</span></div>
                                </div>
                                <div className="col-auto">
                                  <i className="fa-solid fa-clipboard fa-2x text-gray-300"></i>
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
                                    <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>In Progress Complaints</span></div>
                                    <div className="text-dark fw-bold h5 mb-0"><span>{inProgressComplaintsCount}</span></div>
                                  </div>
                                  <div className="col-auto">
                                    <i className="fa-solid fa-clipboard fa-2x text-gray-300"></i>
                                  </div>
                                </div>
                              </div>
                              </div>
                              </div>
          </>

          ) : null
          }

              

        
              </div>
              <div className="row">
                <div className="col-lg-6 mb-4">
    
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary fw-bold m-0">Pending Complaints</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                    {complaintNotification.map((complaintNotify) => (
                      complaintNotify.toWhom === cookies.user.role ? (
                      <li className="list-group-item">
                        <div className="row align-items-center justify-content-betwwen  no-gutters">

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

                          </div>
                     
                      </li>
                      ) : null // Render null if the condition is not met
                      ))}
                    </ul>
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