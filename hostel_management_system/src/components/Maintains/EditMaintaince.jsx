import React, { useEffect, useState } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import axios from "axios";
import Apiurl from "../ApiURL";
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';



const EditMaintaince = () => {

    const navigate = useNavigate();

    const divStyle = {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        padding: '20px',
        color: 'black',
    };

    const { id } = useParams();


    const [complaintId, setComplaintId] = useState('');
    const [handler, setHandler] = useState('');
    const [status, setStatus] = useState('');
    const [inspectionNote, setInspectionNote] = useState('');
    const [solution, setSolution] = useState('');
    const [evidenceImage, setEvidenceImage] = useState('');
    const [date, setDate] = useState('');

    const [complaints, setComplaints] = useState([]);

    const AddMaint = async () => {

       
        
        try {
            const maintaince = await axios.put(`${Apiurl}/maintaince/update`, {
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
            }).then(() => {
                navigate('/maintains');
  
              });

            


        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                button: "OK",
              });
        }
    }

    const getMaintains = async () => {
        try {
            const response = await axios.get(`${Apiurl}/maintaince/${id}`);
            setComplaints(response.data);
            setComplaintId(response.data.complaintId)
            setHandler(response.data.handler)
            setStatus(response.data.status)
            setInspectionNote(response.data.inspectionNote)
            setSolution(response.data.solution)
            setEvidenceImage(response.data.evidenceImage)
            setDate(response.data.date)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMaintains();
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
                                                        
                                                            <option value={complaintId}>{complaintId}</option>
                                                        

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
                                                        value={handler}
                                                        onChange={(e) => setHandler(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="status" className="form-label">Status:</label>
                                                    <select
                                                        className="form-select"
                                                        id="status"
                                                        name="status"
                                                        value={status}
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
                                                        value={inspectionNote}
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
                                                        value={solution}
                                                        onChange={(e) => setSolution(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="evidenceImage" className="form-label">Evidence Image:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="evidenceImage"
                                                        name="evidenceImage"
                                                        placeholder="Enter Evidence Image"
                                                        value={evidenceImage}
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
                                                        value={date}
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


export default EditMaintaince;