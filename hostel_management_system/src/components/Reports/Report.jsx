import React, { useState } from "react";

import "./reportstyle.css";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
// import AdminFooter from "../Admin/AdminFooter";

export default function Report() {

  // -----------------------------------------------------------------------------------------------
  // Complaints Reports-----------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleViewReports = async () => {
    // Convert the date values to strings
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    // Make an API request

    try {
      const response = await axios.post(
        `http://localhost:8080/report-mp/generateReportmp`,
        {
          startComplaintDate: startDate,
          endComplaintDate: endDate,
        }
      );
      setReportData(response.data);
    } catch (error) {}
  };

  // ------------------------------------------------------------------------------------------------------------------
  //Inspections Reports
  // ------------------------------------------------------------------------------------------------------------------

  const [startIDate, setStartIDate] = useState("");
  const [endIDate, setEndIDate] = useState("");
  const [reportIData, setReportIData] = useState([]);

  const handleStartIDateChange = (e) => {
    setStartIDate(e.target.value);
  };

  const handleEndIDateChange = (e) => {
    setEndIDate(e.target.value);
  };

  const handleViewIReports = async () => {
    // Convert the date values to strings
    const formattedIStartDate = new Date(startIDate).toISOString();
    const formattedIEndDate = new Date(endIDate).toISOString();

    // Make an API request

    try {
      const response = await axios.post(
        `http://localhost:8080/complaint-status/report-status`,
        {
          startDate: startIDate,
          endDate: endIDate,
        }
      );
      setReportIData(response.data);
    } catch (error) {}
  };
//-------------------------------------------------------------------------------------------------------------------------------
  //generate PDF 
//Complaint_Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Maintenance Report", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["User Index", "Complaint", "Complaint Date", "Status"]],
      body: reportData.map((report) => [
        report.userIndex,
        report.complaint,
        report.complaintDate,
        report.status,
      ]),
    });
    doc.save("maintenance_report.pdf");
  };

  //-----------------------------------------------------------

  //generate PDF 
//Inspection Report
const generateIPDF = () => {
  const doc = new jsPDF();
  doc.text("Inspection Report", 10, 10);
  doc.autoTable({
    startY: 20,
    head: [["Complaint ID", "Complaint", "Status", "Inspection_Note"]],
    body: reportIData.map((reportI) => [
      reportI.complaintId,
      reportI.complaint,
      reportI.status,
      reportI.inspectionNote,
    ]),
  });
  doc.save("Inspection_Report.pdf");
};

  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />

            {/* content white block */}

            {/* ------------------------------------------------------------------------------- */}
            {/* generate report two */}
            {/* ------------------------------------------------------------------------------- */}

            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  <b>Complaints Reports</b>
                </h2>
                <p className="card-text">
                  Broken assets you might find in a hostel
                </p>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                <br />
                <button className="btn btn-primary" onClick={handleViewReports}>
                 <b>View Reports</b> 
                </button>

                {reportData.length > 0 && (
                  <div>
                    <h6>Report Data:</h6>
                    <table className="table">
                      <thead>
                        <tr>
                          {/* <th>Complaint ID</th>
                          <th>User ID</th> */}
                          <th>User Index</th>
                          <th>Complaint</th>
                          <th>Complaint Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((report) => (
                          <tr key={report.complaint_id}>
                            {/* <td>{report.complaint_id}</td>
                            <td>{report.user_id}</td> */}
                            <td>{report.userIndex}</td>
                            <td>{report.complaint}</td>
                            <td>{report.complaintDate}</td>
                            <td>{report.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <hr></hr>
                <button className="btn btn-danger" onClick={generatePDF}>
                  <b>Generate PDF</b>
                </button>
              </div>
            </div>
{/* ------------------------------------------------------------------------------- */}
            {/* generate report two */}
            {/* ------------------------------------------------------------------------------- */}

            <br></br>

            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  <b>Inspections Reports</b>
                </h2>
                <p className="card-text"></p>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startIDate}
                    onChange={handleStartIDateChange}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endIDate}
                    onChange={handleEndIDateChange}
                  />
                </div>
                <br />
                <button
                  className="btn btn-primary"
                  onClick={handleViewIReports}
                >
                 <b>View Reports</b> 
                </button>

                {reportIData.length > 0 && (
                  <div>
                    <h6>Report Data:</h6>
                    <table className="table">
                      <thead>
                        <tr>
                          {/* <th>Complaint ID</th>
                          <th>User ID</th> */}
                          <th>Complaint ID</th>
                          <th>Complaint</th>
                          <th>Status</th>
                          <th>Inspection_Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportIData.map((reportI) => (
                          <tr key={reportI.complaint_id}>
                            {/* <td>{report.complaint_id}</td>
                            <td>{report.user_id}</td> */}
                            <td>{reportI.complaintId}</td>
                            <td>{reportI.complaint}</td>
                            <td>{reportI.status}</td>
                            <td>{reportI.inspectionNote}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <hr></hr>
                <button className="btn btn-danger" onClick={generateIPDF}>
                  <b>Generate PDF</b>
                </button>
              </div>
            </div>

            {/* content white block ending */}
          </div>
        </div>
      </div>
    </div>

    // -----------
  );
}
