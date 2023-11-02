import React from "react";
import './reportstyle.css';

export default function Report() {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Asset Reports</h5>
          <p className="card-text">common types of assets you might find in a hostel</p>
          <a href="/add-users" className="btn ">
            View Report
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Maintenance Reports</h5>
          <p className="card-text">broken assets you might find in a hostel</p>
          <a href="/add-users" className="btn ">
            View Report
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Complaint</h5>
          <p className="card-text">Conplaints about assets in the hostel</p>
          <a href="/add-users" className="btn ">
            View Report
          </a>
        </div>
      </div>
    </div>
  );
}
