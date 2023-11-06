import React, { useEffect, useState, useRef } from "react";
import Apiurl from "../ApiURL";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import AdminFooter from "../Admin/AdminFooter";
import { useNavigate } from 'react-router-dom';
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



const RoomList = () => {



    const tableRef = useRef(null);
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [roomObject, setRoomObject] = useState({});
    const [deleteObject, setDeleteObject] = useState(null);
    const [complaintMaintenanceRecord, setComplaintMaintenanceRecord] = useState([]);
    const [complaintId, setComplaintId] = useState(null);
    let navigate = useNavigate();    //useNavigate is a hook to navigate to another page

    const MySwal = withReactContent(Swal) // Create a new instance of SweetAlert with React content

  useEffect(() => {
    // Function to fetch data from the API and initialize the DataTable
    const fetchDataAndInitializeTable = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`${Apiurl}/rooms/all`);
        const data = response.data;
        setRooms(data);
        console.log(data);

      } catch (error) {
        console.error('Error fetching Rooms data:', error);
      }
    };

    // Call the fetchDataAndInitializeTable function
    fetchDataAndInitializeTable();
  }, []);



  const findComplaintMaintenanceRecordByComplaintId = async (complaintId) => {
    try {
      const response = await axios.get(`${Apiurl}/res/resources?roomNumber=${complaintId}`);
      setComplaintMaintenanceRecord(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching complaint maintenance record by complaintId:', error);
    }
  };


  useEffect(() => {
    console.log('complaintId : '+ complaintId);
    if (complaintId) {
      findComplaintMaintenanceRecordByComplaintId(complaintId);
      console.log('complaintMaintenanceRecord');
      console.log(complaintMaintenanceRecord);
    }
  }, [complaintId]);

 
  
  useEffect(() => {
    // Fetch your data here, for example:
 
      const fetchData = async () => {
        const response = await fetch(`${Apiurl}/rooms/all`);
        const data = await response.json();
    
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
    
  
      // Initialize DataTable
      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          { title: 'Room', data: 'roomNo' },
          { title: 'Hostel No', data: 'hostelNo' },
          { title: 'floor No', data: 'floorNo' },
          
          {
            title: 'Action',
            data: 'roomNo',
      
            render: (id) => {
              let buttons = '';
  
            
                buttons += `<button class="btn btn-sm btn-secondary me-1 view-btn" data-id="${id}"><i class="fas fa-eye"></i></button>` +
                `<button class="btn btn-sm btn-secondary me-1 edit-btn" data-id="${id}"><i class="fas fa-pen"></i></button>` +
                  `<button class="btn btn-sm btn-danger me-1 delete-btn" data-id="${id}"><i class="fas fa-trash"></i></button>`;
         
  
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
        navigate(`/room/edit/${id}`);
      });
  
      $(tableRef.current).on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        handleDeleteRoom(id);
      });
    };
  
    fetchData();
  }, [deleteObject]);




  const deleteRoom = async(id) =>{
    console.log(`${Apiurl}/rooms/${id}`);
    try {
      const deleted = await axios.delete(`${Apiurl}/rooms/${id}`);
      console.log(deleted.data);
      setDeleteObject(deleted.data);
    } catch (error) {
      console.log("error on deleting" + error);
    }
  }


    const handleDeleteRoom = (noticeId) => {
        MySwal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this Room.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            deleteRoom(noticeId)
            MySwal.fire(
            'Deleted!',
            'The Room has been deleted.',
            'success'
            )
        }
        })
    }


  const viewRoom = async(id) =>{  
    try {
        const complaint = await axios.get(`${Apiurl}/rooms/${id}`);
        console.log("dataaaaaaa",complaint.data);


    } catch (error) {
        console.log("error on viewing" + error);
    }
}


    const handleShowModal = (roomId) => {
        setComplaintId(roomId);
        axios.get(`${Apiurl}/rooms/${roomId}`).then((response) => {
        setRoomObject(response.data);
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
                  <h3 className="text-dark mb-0">Rooms</h3>
                  <a
                    className="btn btn-primary btn"
                    role="button"
                    href="/room/create"
                  >
                    <i class="fa-solid fa-file-circle-exclamation text-white"></i>
                    &nbsp;New Room
                  </a>
                </div>
  
  
            
  
  
                <div className="card shadow">
                      <div className="card-header py-3">
                      <p className="text-primary m-0 fw-bold">Rooms</p>
                      </div>
                      <div className="card-body bg-light">
  
                      <table ref={tableRef} className="table table-striped">
                        <thead>
                            <tr>
                            <th>Room Id</th>
                            <th>Hostel Id</th>
                            <th>Floor Id</th>
                            <th>Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={rooms.roomNo}>
                                <td>{room.roomNo}</td>
                                <td>{room.hostelNo}</td>
                                <td>{room.floorNo}</td>
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
                                                <span className="fw-bold">Room Id :</span> {roomObject.roomNo}
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
                                                <h2 className="text-center mb-5" style={{ fontFamily: 'Merriweather', fontWeight:700, }}>Room Details</h2>
                                                <p className="my-1" style={{fontWeight:700, }}>Room No: {roomObject.roomNo}</p>
                                                <p className="my-1" style={{fontWeight:700, }}>Hostel No: {roomObject.hostelNo}</p>
                                                <p className="mb-5" style={{fontWeight:700, }}>Floor No: {roomObject.floorNo}</p>
                                               
  
                                                <ul className="list-group">
                                                {complaintMaintenanceRecord.map((item, index) => (
                                                  <li key={index} className="list-group-item">
                                                    Resource ID: {item[0]}<br />
                                                    Resource Name: {item[2]}<br />
                                                    Status: {item[4]}<br />
                                                  </li>
                                                ))}
                                              </ul>
  
  
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

export default RoomList;