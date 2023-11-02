import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
import DashboardTables from "./DashboardTables";
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

const Complaint = () => {
    const tableRef = useRef(null);
    const [complaints, setComplaints] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [complaintObject, setComplaintObject] = useState({});
    let navigate = useNavigate();    //useNavigate is a hook to navigate to another page

    const MySwal = withReactContent(Swal) // Create a new instance of SweetAlert with React content

  useEffect(() => {
    // Function to fetch data from the API and initialize the DataTable
    const fetchDataAndInitializeTable = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`${Apiurl}/complaint/all`);
        const data = response.data;
        setComplaints(data);
        console.log(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchDataAndInitializeTable function
    fetchDataAndInitializeTable();
  }, []);

 
  
  useEffect(() => {
    // Fetch your data here, for example:
    const fetchData = async () => {
      const response = await fetch(`${Apiurl}/complaint/all`);
      const data = await response.json();
  
      // Destroy existing DataTable (if any)
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
  
      // Initialize DataTable
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          { title: 'Complaint Id', data: 'complaintId' },
          { title: 'userId', data: 'userId' },
          { title: 'userIndex', data: 'userIndex' },
          { title: 'complaint', data: 'complaint' },
          { title: 'resId', data: 'resId' },
          { title: 'complaintDate', data: 'complaintDate' },
          { title: 'evidenceImage', data: 'evidenceImage' },
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
  }, []);


  const deleteComplaint = async(id) =>{
    console.log(`${Apiurl}/complaint/delete/${id}`);
    try {
      const deleted = await axios.delete(`${Apiurl}/complaint/delete/${id}`);
      console.log(deleted.data);
      // Update the state of the notices array after deleting the notice
      setComplaints(complaints.filter(complaint => complaint.complaintId !== id));
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
                <h3 className="text-dark mb-0">Dashboard</h3>
                <a
                  className="btn btn-primary btn"
                  role="button"
                  href="/complaint/create"
                >
                  <i className="fas fa-download fa-sm text-white-50"></i>
                  &nbsp;New Complaint
                </a>
              </div>


          


              <div className="card shadow">
                    <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Complaints</p>
                    </div>
                    <div className="card-body">

              <table ref={tableRef} className="display" style={{ width: '100%' }}>
                <thead>
                    <tr>
                    <th>Complaint Id</th>
                    <th>user Id</th>
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
                        <td>{complaint.userId}</td>
                        <td>{complaint.userIndex}</td>
                        <td>{complaint.complaint}</td>
                        <td>{complaint.resId}</td>
                        <td>{complaint.complaintDate}</td>
                        <td>{complaint.evidenceImage}</td>
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
                                              <span className="fw-bold">Complaint Id :</span> {complaintObject.complaintId}
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
                                              <h2 className="text-center mb-5" style={{ fontFamily: 'Merriweather', }}>Resource ID : {complaintObject.resId}</h2>
                                              <p className="my-5">Complaint: {complaintObject.complaint}</p>

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
