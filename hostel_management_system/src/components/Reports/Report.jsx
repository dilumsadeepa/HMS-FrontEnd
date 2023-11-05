import React from "react";
import "./reportstyle.css";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import AdminFooter from "../Admin/AdminFooter";

export default function Report() {
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
                  &nbsp;Reports
                </a>
              </div>
              <h2>Reports</h2>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Asset Reports</h5>
                  <p className="card-text">
                    common types of assets you might find in a hostel
                  </p>
                  <a href="/add-users" className="btn ">
                    View Report
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Maintenance Reports</h5>
                  <p className="card-text">
                    broken assets you might find in a hostel
                  </p>
                  <a href="/add-users" className="btn ">
                    View Report
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Complaint</h5>
                  <p className="card-text">
                    Conplaints about assets in the hostel
                  </p>
                  <a href="/add-users" className="btn ">
                    View Report
                  </a>
                </div>
              </div>
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
}
