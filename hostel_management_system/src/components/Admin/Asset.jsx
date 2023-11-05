import React, { useEffect, useState, useRef } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
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
import QRCode from 'qrcode.react'; 
import html2canvas from 'html2canvas';

const Complaint = () => {
  const tableRef = useRef(null);
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [complaintObject, setComplaintObject] = useState({});
  const [qrCodeData, setQrCodeData] = useState("");
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const qrCodeRef = useRef(null);

  const downloadQRCode = (resourceId) => {
    if (qrCodeRef.current) {
      setTimeout(() => {
        html2canvas(qrCodeRef.current, { useCORS: true }).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `qrcode_${resourceId}.png`;
          link.click();
        });
      }, 2000); // Increase the delay to 2000 milliseconds (2 seconds) or adjust as needed.
    }
  };
  

  const generateQRCode = (resourceId) => {
    const data = `${resourceId}`;
    setQrCodeData(data);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchDataAndInitializeTable = async () => {
      try {
        const response = await axios.get(`${Apiurl}/complaint/all`);
        const data = response.data;
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndInitializeTable();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${Apiurl}/res/all`);
      const data = await response.json();

      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      const table = $(tableRef.current).DataTable({
        data: data,
        columns: [
          { title: 'Resource Id', data: 'resId' },
          { title: 'Room no', data: 'roomNo' },
          { title: 'Resource Name', data: 'resName' },
          { title: 'Install Date', data: 'installationDate' },
          { title: 'Lastmod date', data: 'lastMaintenanceDate' },
          { title: 'status', data: 'status' },
          {
            title: 'Action',
            data: 'resId',
            render: (resId) => {
              return `
                <button class="btn btn-sm btn-secondary me-1 edit-btn" data-id="${resId}">
                  <i class="fas fa-pen"></i>
                </button>
                <button class="btn btn-sm btn-danger me-1 delete-btn" data-id="${resId}">
                  <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm btn-primary me-1 generate-qr-btn" data-id="${resId}">
                <i class="fa-solid fa-qrcode"></i>
                </button>
                <button class="btn btn-sm btn-primary me-1 download-qr-btn" data-id="${resId}">
                <i class="fa-solid fa-download"></i>
                </button>
              `;
            },
          },
        ],
        dom: 'Bfrtip',
        buttons: [
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5',
          'print',
        ],
      });

      $(tableRef.current).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        navigate(`/updateasset/${id}`);
      });

      $(tableRef.current).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        handleDeleteComplaint(id);
      });

      $(tableRef.current).on('click', '.generate-qr-btn', function () {
        const id = $(this).data('id');
        generateQRCode(id);
      });

      $(tableRef.current).on('click', '.download-qr-btn', function () {
        const id = $(this).data('id');
        downloadQRCode(id);
      });
    };

    fetchData();
  }, []);

  const deleteComplaint = async (id) => {
    try {
      const deleted = await axios.delete(`http://localhost:8080/res/delete/${id}`);
      console.log(deleted.data);
      setComplaints(complaints.filter((complaint) => complaint.complaintId !== id));
      window.location.reload();
    } catch (error) {
      console.log("Error on deleting: " + error);
    }
  };

  const handleDeleteComplaint = (noticeId, confirmationMessage = 'Are you sure?', successMessage = 'The Complaint has been deleted.') => {
    MySwal.fire({
      title: confirmationMessage,
      text: 'You are about to delete this Complaint.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComplaint(noticeId);
        MySwal.fire(
          'Deleted!',
          successMessage,
          'success'
        );
      }
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
              <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Dashboard</h3>
                <a
                  className="btn btn-primary btn-sm d-none d-sm-inline-block"
                  role="button"
                  href="/addasset"
                >
                  <i className="fas fa-download fa-sm text-white-50"></i>
                  &nbsp;Add New Asset
                </a>
              </div>

              <h2>Your Resources Content Goes Here</h2>

              <table ref={tableRef} className="display" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Complaint Id</th>
                    <th>user Id</th>
                    <th>Index No</th>
                    <th>Complaint</th>
                    <th>res_ID</th>
                    <th>Complaint Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.complaintId}>
                      <td>{complaint.userId}</td>
                      <td>{complaint.userIndex}</td>
                      <td>{complaint.complaint}</td>
                      <td>{complaint.resId}</td>
                      <td>{complaint.status}</td>
                      <td>
                        <button
                          className='btn btn-sm btn-secondary me-1 edit-btn'
                          onClick={() => navigate(`/complaint/edit/${complaint.complaintId}`)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className='btn btn-sm btn-danger me-1 delete-btn'>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button
                          className='btn btn-sm btn-primary me-1 generate-qr-btn'
                          onClick={() => generateQRCode(complaint.resId)}
                        >
                          Generate QR Code
                        </button>
                        <button
                          className='btn btn-sm btn-primary me-1 download-qr-btn'
                          onClick={() => downloadQRCode(complaint.resId)}
                        >
                          Download QR Code
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
                <span className="fw-bold">Resource Qr Code :</span> {complaintObject.complaintId}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body" ref={qrCodeRef}>
              <h2 className="text-center mb-5" style={{ fontFamily: 'Merriweather' }}>Resource ID : {complaintObject.resId}</h2>
              <p className="my-5">{complaintObject.complaint}</p>
              {qrCodeData && (
                <div className="text-center">
                  <QRCode value={qrCodeData} size={200} />
                </div>
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
    </div>
  );
};

export default Complaint;
