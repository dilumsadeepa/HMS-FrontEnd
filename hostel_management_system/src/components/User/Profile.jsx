import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apiurl from "../ApiURL";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {


    const { id } = useParams();

    const [data, setData] = useState([]);

    async function getstu(e) {

        try {
            const response = await axios.get(`${Apiurl}/users/${id}`);
            setData(response.data);

        } catch (error) {
            console.log("error in getting data");
        }

    }

    useEffect(() => {
        getstu();


    },[]);

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

                                        <div className="col-lg-4">
                                            <div className="card mb-4">
                                                <div className="card-body text-center">
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                                        className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                                    <h5 className="my-3">{data.name}</h5>
                                                    <p className="text-muted mb-1">{data.email}</p>
                                                    <p className="text-muted mb-4">{data.indexNo}</p>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <Link to={`/editprofile/${id}`} className='btn btn-info'>Edit Profile</Link>
                                                        {/* <button type="button" className="btn btn-outline-primary ms-1">Message</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-4 mb-lg-0">

                                            </div>
                                        </div>
                                        <div className="col-lg-8" >
                                            <div className="card mb-4" style={{color:'black'}}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Full Name</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0" >{data.name}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Email</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0">{data.email}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Phone</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0">{data.mobileNo}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                    
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <p className="mb-0">Index Number</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className="text-muted mb-0">{data.indexNo}</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>



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

export default Profile;