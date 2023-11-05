import React, { useState } from "react";

import "./reportstyle.css";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
// import AdminFooter from "../Admin/AdminFooter";

export default function Report() {
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

    // const apiUrl = `http://localhost:8080/report-mp/generateReportmp?startComplaintDate=${formattedStartDate}&endComplaintDate=${formattedEndDate}`;

    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setReportData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  //generate PDF

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

  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />

            {/* content white block */}

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  <b>Complaints Reports</b>
                </h5>
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
                  View Reports
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
                <button className="btn btn-primary" onClick={generatePDF}>
                  Generate PDF
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
