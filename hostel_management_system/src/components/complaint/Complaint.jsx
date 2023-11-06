import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import AdminFooter from "../Admin/AdminFooter";
import { useNavigate } from 'react-router-dom';
import Apiurl from "../ApiURL";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import $ from 'jquery';
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables.js";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "pdfmake/build/pdfmake.js";
import "pdfmake/build/vfs_fonts.js";
import { useCookies } from 'react-cookie';

const Complaint = () => {

  const [cookies] = useCookies(['role']);
  console.log('cookies.user.role: ' + cookies.user.role);
  console.log(cookies.user.id);
  
  let complaintapi; // Declare complaintapi in the outer scope
  
  useEffect(() => {
    // Function to set the API URL based on cookies.user.role
    if (cookies.user.role === 6) {
      complaintapi = `${Apiurl}/complaint/user/${cookies.user.id}`;
    } else {
      complaintapi = `${Apiurl}/complaint/all`;
    }
  
    // Now you can use complaintapi in the rest of your code
  }, [cookies.user.role]);


    const tableRef = useRef(null);
    const [complaints, setComplaints] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [complaintObject, setComplaintObject] = useState({});
    const [deleteObject, setDeleteObject] = useState(null);
    let navigate = useNavigate();    //useNavigate is a hook to navigate to another page

    const MySwal = withReactContent(Swal) // Create a new instance of SweetAlert with React content

  useEffect(() => {
    // Function to fetch data from the API and initialize the DataTable
    const fetchDataAndInitializeTable = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`${complaintapi}`);
        const data = response.data;
        setComplaints(data);
        console.log(data);

      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
    };

    // Call the fetchDataAndInitializeTable function
    fetchDataAndInitializeTable();
  }, []);

 
  
  useEffect(() => {
    // Fetch your data here, for example:
 
      const fetchData = async () => {
        const response = await fetch(`${complaintapi}`);
        const data = await response.json();
    
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
    
  
      // Initialize DataTable
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          { title: 'Complaint Id', data: 'complaintId' },
          // { title: 'userId', data: 'userId' },
          { title: 'userIndex', data: 'userIndex' },
          {
            title: 'complaint',
            data: 'complaint',
            render: (data, type, row) => {
              if (type === 'display') {
                if (data && data.length) {
                  if (data.length > 20) {
                    return `${data.slice(0, 20)}...`;
                  } else {
                    return data;
                  }
                } else {
                  return ''; // Handle null values by returning an empty string
                }
              }
              return data; // For sorting and other purposes, return the full data
            },
          },
          { title: 'resId', data: 'resId' },
          { title: 'complaintDate', data: 'complaintDate' },
          {
            title: 'evidenceImage',
            data: 'evidenceImage',
            render: (data, type, row) => {
              if (type === 'display') {
                if (data && data.length) {
                  if (data.length > 20) {
                    return `${data.slice(0, 20)}...`;
                  } else {
                    return data;
                  }
                } else {
                  return ''; // Handle null values by returning an empty string
                }
              }
              return data; // For sorting and other purposes, return the full data
            },
          },
          { title: 'status', data: 'status' },
          {
            title: 'Action',
            data: 'complaintId',
      
            render: (complaintId) => {
              let buttons = '';
  
            
                buttons += `<button class="btn btn-sm btn-secondary me-1 view-btn" data-id="${complaintId}"><i class="fas fa-eye"></i></button>` +
                `<button class="btn btn-sm btn-secondary me-1 edit-btn" data-id="${complaintId}"><i class="fas fa-pen"></i></button>` +
                  `<button class="btn btn-sm btn-danger me-1 delete-btn" data-id="${complaintId}"><i class="fas fa-trash"></i></button>`;
         
  
              return buttons;
            },
          }
        ],
        dom: 'Bfrtip', // Add the required buttons
        buttons: [
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5',
          'print'
        ],
      });
  
    // Event listeners for action buttons
      $(tableRef.current).on('click', '.view-btn', function() {
        const id = $(this).data('id');
        handleShowModal(id);
      });
  
      $(tableRef.current).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        navigate(`/complaint/edit/${id}`);
      });
  
      $(tableRef.current).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        handleDeleteComplaint(id);
      });
    };
  
    fetchData();
  }, [deleteObject]);


  // const deleteComplaint = async(id) =>{
  //   console.log(`${Apiurl}/complaint/delete/${id}`);
  //   try {
  //     const deleted = await axios.delete(`${Apiurl}/complaint/delete/${id}`);
  //     console.log(deleted.data);
  //     // Update the state of the notices array after deleting the notice
  //     setComplaints(complaints.filter(complaint => complaint.complaintId !== id));
  //   } catch (error) {
  //     console.log("error on deleting" + error);
  //   }
  // }


  const deleteComplaint = async(id) =>{
    console.log(`${Apiurl}/complaint/markAsDeleted/${id}`);
    try {
      const deleted = await axios.put(`${Apiurl}/complaint/markAsDeleted/${id}`);
      console.log(deleted.data);
      setDeleteObject(deleted.data);
      // Update the state of the notices array after deleting the notice
      // setComplaints(complaints.filter(complaint => complaint.is_deleted !== 1));
    } catch (error) {
      console.log("error on deleting" + error);
    }
  }


const handleDeleteComplaint = (noticeId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Complaint.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComplaint(noticeId)
        MySwal.fire(
          'Deleted!',
          'The Complaint has been deleted.',
          'success'
        )
      }
    })
  }


  const viewComplaint = async(id) =>{  
    try {
        const complaint = await axios.get(`${Apiurl}/complaint/find/${id}`);
        console.log("dataaaaaaa",complaint.data);


    } catch (error) {
        console.log("error on viewing" + error);
    }
}


const handleShowModal = (complaintId) => {
    axios.get(`${Apiurl}/complaint/find/${complaintId}`).then((response) => {
      setComplaintObject(response.data);
      setShowModal(true);
    
});
  };


  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />
            <div className="container-fluid">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Complaints</h3>
                <a
                  className="btn btn-primary btn"
                  role="button"
                  href="/complaint/create"
                >
                  <i class="fa-solid fa-file-circle-exclamation text-white"></i>
                  &nbsp;New Complaint
                </a>
              </div>


          


              <div className="card shadow">
                    <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Complaints</p>
                    </div>
                    <div className="card-body bg-light">

                    <table ref={tableRef} className="table table-striped">
                      <thead>
                          <tr>
                          <th>Complaint Id</th>
                          {/* <th>user Id</th> */}
                          <th>Index No</th>
                          <th>Complaint</th>
                          <th>res_ID</th>
                          <th>Complaint Date</th>
                          <th>Evidence Image</th>
                          <th>Status</th>
                          <th>Action</th> 
                          </tr>
                      </thead>
                      <tbody>
                          {complaints.map((complaint) => (
                              <tr key={complaint.complaintId}>
                              {/* <td>{complaint.userId}</td> */}
                              <td>{complaint.userIndex}</td>
                              <td>{complaint.complaint}</td>
                              <td>{complaint.resId}</td>
                              <td>{complaint.complaintDate}</td>
                              <td>{complaint.evidenceImage ? (complaint.evidenceImage.length > 20 ? `${complaint.evidenceImage.slice(0, 17)}...` : complaint.evidenceImage) : null}</td>
                              <td>{complaint.status}</td>
                              <td>
                                    <button className='btn btn-sm btn-secondary me-1 view-btn'>
                                      <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button className='btn btn-sm btn-secondary me-1 edit-btn'>
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button className='btn btn-sm btn-danger me-1 delete-btn'>
                                      <i className="fa-solid fa-trash"></i>
                                    </button>
                                  </td>
                        </tr>
                          ))}
                      </tbody>
                </table>

                </div>
                </div>
{/* 
                <DashboardTables /> */}



                                        {/* The modal */}
                                        <div
                                          className={`modal fade ${showModal ? "show" : ""}`}
                                          id="noticeModal"
                                          tabIndex="-1"
                                          aria-labelledby="noticeModalLabel"
                                          aria-hidden={!showModal}
                                          style={{ display: showModal ? "block" : "none" }}
                                      >
                                          <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                          <div className="modal-content">
                                              <div className="modal-header bg-light bg-gradient">
                                              <h5 className="modal-title" id="noticeModalLabel">
                                              <span className="fw-bold">Complaint Id :</span> {complaintObject.complaintId} <span className="fw-bold"> |</span> <span className="fw-bold">Resource Id: </span> {complaintObject.resId}
                                              </h5>
                                              <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                  onClick={() => setShowModal(false)}
                                              ></button>
                                              </div>
                                              <div className="modal-body">
                                              <h2 className="text-center mb-5" style={{ fontFamily: 'Merriweather', fontWeight:700, }}>Complaint</h2>
                                              <p className="mt-5" style={{fontWeight:700, }}>Complaint: {complaintObject.complaint}</p>
                                              <p className="my-1" style={{fontWeight:700, }}>Complaint Date: {complaintObject.complaintDate}</p>
                                             


                                              {complaintObject.resource && (
                                                  <div class="alert alert-info" role="alert">
                                                      <p>Resource Id: {complaintObject.resId}</p>
                                                      <p>Resource Name: {complaintObject.resource.resName}</p>
                                                      <p>Installation Date: {complaintObject.resource.installationDate}</p>
                                                      <p>Last Maintain Date: {complaintObject.resource.lastMaintenanceDate}</p>
                                                      <p>Resource Status: {complaintObject.resource.status}</p>
                                                  </div>
                                              )}

                                              {complaintObject.user && (
                                                  <div class="alert alert-primary" role="alert">
                                                      <p>User Index: {complaintObject.user.indexNo}</p>
                                                      <p>User Name: {complaintObject.user.name}</p>
                                                      <p>User Email: {complaintObject.user.email}</p>
                                                      <p>User mobile: {complaintObject.user.mobileNo}</p>
                                                  </div>
                                              )}

{complaintObject.evidenceImage ? (
                                                <div
                                                  className="mb-3"
                                                  style={{
                                                    width: '100%', 
                                                    height: '320px',
                                                    backgroundImage: `url(${complaintObject.evidenceImage})`, // Correct the URL interpolation
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: 'cover'
                                                  }}
                                                >                                                <a
                                                href={complaintObject.evidenceImage}
                                                download={complaintObject.evidenceImage}
                                              >
                                                <i class="fa-solid fa-download"></i> Download Image
                                              </a></div>


                                              ) : (
                                                <p className="my-1" style={{ fontWeight: 700 }}>
                                                  Complaint Image: Unavailable
                                                </p>
                                              )}


                                              </div>
                                              <div className="modal-footer">
                                              <button
                                                  type="button"
                                                  className="btn btn-danger"
                                                  data-bs-dismiss="modal"
                                                  onClick={() => setShowModal(false)}
                                              >
                                                  Close
                                              </button>
                                              </div>
                                          </div>
                                          </div>
                                      </div>

                                      {/* End of modal */}



              <AdminFooter />
            </div>
            <a
              className="border rounded d-inline scroll-to-top"
              href="#page-top"
            >
              <i className="fas fa-angle-up"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
