import React, { useEffect, useState } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import axios from "axios";
import Apiurl from "../ApiURL";
import Swal from 'sweetalert2';
import CloudinaryUpload from "../FileUpload/CloudinaryUpload";





const AddMaintaince = () => {

    const divStyle = {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        padding: '20px',
        color: 'black',
    };

    


    const [complaintId, setComplaintId] = useState('');
    const [handler, setHandler] = useState('');
    const [status, setStatus] = useState('');
    const [inspectionNote, setInspectionNote] = useState('');
    const [solution, setSolution] = useState('');
    const [evidenceImage, setEvidenceImage] = useState('');
    const [date, setDate] = useState('');

    const [complaints, setComplaints] = useState([]);

    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleUploadedUrl = (url) => {
        setUploadedUrl(url);
        setEvidenceImage(url);
        
    };

    const AddMaint = async () => {

       
        
        try {
            const maintaince = await axios.post(`${Apiurl}/maintaince/create`, {
                complaintId,
                handler,
                status,
                inspectionNote,
                solution,
                evidenceImage,
                date,
            })
            Swal.fire({
                title: "Added Successful!",
                text: maintaince.data.maintenanceId,
                icon: "success",
                button: "OK",
            })

            setComplaintId("")
            setHandler("")
            setStatus("")
            setInspectionNote("")
            setSolution("")
            setEvidenceImage("")
            setDate("")


        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                button: "OK",
              });
        }
    }

    const getComplaint = async () => {
        try {
            const response = await axios.get(`${Apiurl}/complaint/all`);
            setComplaints(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getComplaint();
    }, [])




    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <AdminNavbar />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <AdminTopBar />
                            <div className="nclass mx-5">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h1>Add Maintaince</h1>
                                        </div>

                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-sm-6 mx-auto" style={divStyle}>
                                            <img src="https://hitechfm.com/wp-content/uploads/2021/08/slider_10repair-MAINTENANCE.jpg" alt="" className="img-fluid" />
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="complaintId" className="form-label">Complaint ID:</label>
                                                    <select
                                                        className="form-select"
                                                        id="complaintId"
                                                        name="complaintId"
                                                        onChange={(e) => setComplaintId(e.target.value)}
                                                    >
                                                        {complaints.map((co) => (
                                                            <option value={co.complaintId}>{co.complaint}{co.complaintDate}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="handler" className="form-label">Handler:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="handler"
                                                        name="handler"
                                                        placeholder="Enter Handler"
                                                        onChange={(e) => setHandler(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="status" className="form-label">Status:</label>
                                                    <select
                                                        className="form-select"
                                                        id="status"
                                                        name="status"
                                                        onChange={(e) => setStatus(e.target.value)}
                                                    >
                                                        {/* Add options based on your data */}
                                                        <option value="">Select Status</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Completed">Completed</option>
                                                        {/* Add other options */}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="inspectionNote" className="form-label">Inspection Note:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inspectionNote"
                                                        name="inspectionNote"
                                                        placeholder="Enter Inspection Note"
                                                        onChange={(e) => setInspectionNote(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="solution" className="form-label">Solution:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="solution"
                                                        name="solution"
                                                        placeholder="Enter Solution"
                                                        onChange={(e) => setSolution(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="evidenceImage" className="form-label">Evidence Image:</label>
                                                    <CloudinaryUpload handleUploadedUrl={handleUploadedUrl} />
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="evidenceImage"
                                                        name="evidenceImage"
                                                        placeholder="Enter Evidence Image"
                                                        value={uploadedUrl}
                                                        onChange={(e) => setEvidenceImage(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="date" className="form-label">Date:</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="date"
                                                        name="date"
                                                        placeholder="Enter Date"
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                </div>
                                                <button type="button" onClick={AddMaint} className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddMaintaince;