import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
import DashboardTables from "./DashboardTables";

const AddAsset = () => {
  const [asset, setAsset] = useState({
    roomno: "",
    intdate: "",
    name: "",
    status: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({
      ...asset,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., make an API request to add the asset
    console.log("Form submitted with data:", asset);
    // Reset the form fields if needed
    setAsset({
      roomno: "",
      intdate: "",
      name: "",
      status: "",
      // Reset other fields
    });
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="intdate" className="form-label">
                        Installation Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="intdate"
                        name="intdate"
                        value={asset.intdate}
                        onChange={handleInputChange}
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
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={asset.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={asset.status}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                       Last Maintanance Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={asset.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                </div>
                {/* Add more form fields for other asset details */}
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
