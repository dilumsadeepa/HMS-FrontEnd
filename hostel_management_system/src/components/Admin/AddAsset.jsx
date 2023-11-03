import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
import DashboardTables from "./DashboardTables";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAsset = () => {
  const [asset, setAsset] = useState({
    roomno: "",
    intdate: null, // Use null for the date value
    lastMaintDate: null, // Use null for the date value
    name: "chair",
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({
      ...asset,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setAsset({
      ...asset,
      [name]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      roomNo: asset.roomno,
      resName: asset.name,
      installationDate: asset.intdate,
      lastMaintenanceDate: asset.lastMaintDate,
      status: asset.status,
    };

    try {
      const response = await axios.post(
        "http://52.201.92.58:8080/res/add",
        data
      );

      console.log("API Response:", response.data);

      setAsset({
        roomno: "",
        intdate: null,
        lastMaintDate: null,
        name: "chair",
        status: "active",
      });
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />
            <div className="nclass mx-5">
              <div className="container-fluid  ">
                <h2>Add New Asset</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="roomno" className="form-label">
                          Room No
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="roomno"
                          name="roomno"
                          value={asset.roomno}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="intdate" className="form-label">
                          Installation Date
                        </label>
                        <DatePicker
                          className="form-control"
                          selected={asset.intdate}
                          onChange={(date) => handleDateChange("intdate", date)}
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="lastMaintDate" className="form-label">
                          Last Maintenance Date
                        </label>
                        <DatePicker
                          className="form-control"
                          selected={asset.lastMaintDate}
                          onChange={(date) =>
                            handleDateChange("lastMaintDate", date)
                          }
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Asset Name
                        </label>
                        <select
                          className="form-control"
                          id="name"
                          name="name"
                          value={asset.name}
                          onChange={handleInputChange}
                        >
                          <option value="chair">Chair</option>
                          <option value="desk">Desk</option>
                          <option value="lamp">Lamp</option>
                          <option value="fan">Fan</option>
                          <option value="cubard">Cubard</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          id="status"
                          name="status"
                          value={asset.status}
                          onChange={handleInputChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Asset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
