import React, { useEffect, useState } from "react";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";

import DataTable from "../DataTable/DataTable";
import axios from "axios";
import Apiurl from "../ApiURL";


const Maintains = () => {

    const [maintaince, setMaintaince] = useState([]);

    const nedata = [];
    const getMaintaince = async () => {
        try {
            const response = await axios.get(`${Apiurl}/maintaince/alldata`);
            setMaintaince(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMaintaince();

    }, []);



    const columns = [
        { label: 'Complaint ID', dataKey: 'complaintComplaintId' },
        { label: 'Res ID', dataKey: 'complaintResId' },
        { label: 'User ID', dataKey: 'complaintUserId' },
        { label: 'Maintenance Complaint ID', dataKey: 'maintainceComplaintId' },
        { label: 'Maintenance Date', dataKey: 'maintainceDate' },
        { label: 'Evidence Image', dataKey: 'maintainceEvidenceImage' },
        { label: 'Handler', dataKey: 'maintainceHandler' },
        { label: 'Inspection Note', dataKey: 'maintainceInspectionNote' },
        { label: 'Solution', dataKey: 'maintainceSolution' },
        { label: 'Status', dataKey: 'maintainceStatus' },
        { label: 'Maintenance ID', dataKey: 'maintenanceId' },
        { label: 'Res ID', dataKey: 'resourceResId' },
        { label: 'Res Name', dataKey: 'resourceResName' },
        { label: 'User Email', dataKey: 'usersEmail' },
        { label: 'User ID', dataKey: 'usersId' },
        { label: 'Username', dataKey: 'usersUsername' },
    ];

    const data = nedata;

    const handleEditRow = (rowData) => {
        // Implement the logic to edit the row data
    };

    const handleViewRow = (rowData) => {
        // Implement the logic to view the row data
    };

    const handleDeleteRow = (rowData) => {
        // Implement the logic to delete the row data
    };


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
                                            <h1>Maintaince</h1>
                                        </div>
                                        <div className="col-sm-2">
                                            <a href="/addmaintaince" className="btn btn-primary">Add Maintaince</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <DataTable
                                                columns={columns}
                                                data={maintaince}
                                                onEditRow={handleEditRow}
                                                onViewRow={handleViewRow}
                                                onDeleteRow={handleDeleteRow}
                                            />
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

export default Maintains;