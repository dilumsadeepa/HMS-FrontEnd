import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
import DashboardTables from "./DashboardTables";


const UpdateAsset = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
  const [assetData, setAssetData] = useState({
    resId: 0,
    roomNo: 0,
    resName: "",
    installationDate: "",
    lastMaintenanceDate: "",
    status: ""
  });

  useEffect(() => {
    // Fetch data for the asset with the given assetId
    axios.get(`http://localhost:8080/res/find/${assetId}`)
      .then((response) => {
        setAssetData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching asset data:', error);
      });
  }, [assetId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetData({
      ...assetData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8080/res/update",
        assetData
      );

      console.log("Asset Updated:", response.data);

      // Redirect to a different page after successfully updating the asset
      // You can use react-router-dom's useHistory or useNavigate hook for this.
      // Example:
      // history.push('/assets'); // Assuming '/assets' is the page where you list assets.
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
    
        
      <h2>Update Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roomNo" className="form-label">
            Room No
          </label>
          <input
            type="number"
            className="form-control"
            id="roomNo"
            name="roomNo"
            value={assetData.roomNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resName" className="form-label">
            Resource Name
          </label>
          <input
            type="text"
            className="form-control"
            id="resName"
            name="resName"
            value={assetData.resName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="installationDate" className="form-label">
            Installation Date
          </label>
          <input
            type="date"
            className="form-control"
            id="installationDate"
            name="installationDate"
            value={assetData.installationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastMaintenanceDate" className="form-label">
            Last Maintenance Date
          </label>
          <input
            type="date"
            className="form-control"
            id="lastMaintenanceDate"
            name="lastMaintenanceDate"
            value={assetData.lastMaintenanceDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={assetData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Asset
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mx-2">
        Back
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

export default UpdateAsset;
