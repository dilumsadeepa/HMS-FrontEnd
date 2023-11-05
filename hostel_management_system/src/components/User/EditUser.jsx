import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Apiurl from "../ApiURL";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = () => {

    const [indexNo, setIndexNo] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${Apiurl}/users/update`, {
                'id': id,
                'indexNo': indexNo,
                'name': name,
                'email': email,
                'mobileNo': mobileNo,
                'password': password,
                'role': parseInt(role),
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Profile updated successfully',
            });

            setIndexNo("");
            setName("")
            setEmail("");
            setMobileNo("");
            setPassword("");
            setRole("");
            navigate(`/profile/${id}`);

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong' + error,
            });
            console.log(error);
        }

    };

    async function getstu(e) {

        try {
            const response = await axios.get(`${Apiurl}/users/${id}`);
            setData(response.data);
            setIndexNo(response.data.indexNo);
            setName(response.data.name)
            setEmail(response.data.email);
            setMobileNo(response.data.mobileNo);
            setPassword(response.data.password);
            setRole(response.data.role);

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
                                    <div className="row mt-5 mb-5">
                                        <div className="col-sm-12">
                                            <h2>Edit Profile</h2>
                                        </div>
                                    </div>

                                    {/* User registration form */}
                                    <div className="row mt-5 mb-5">
                                        <div className="col-sm-2"></div>

                                        <div className="col-sm-8 debox">
                                            <form onSubmit={handleSubmit}>


                                                <div className="mb-3 mt-3">
                                                    <label className="form-label">Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter the username"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                    />

                                                </div>



                                                <div className="mb-3 mt-3">
                                                    <label className="form-label">Email:</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Enter the email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />

                                                </div>


                                                <div className="mb-3 mt-3">
                                                    <label className="form-label">Mobile No:</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="Enter the telephone number"
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
                                                        required
                                                    />

                                                </div>



                                                <button type="submit" className="btn btn-primary">
                                                    Edit Profile
                                                </button>
                                            </form>
                                        </div>

                                        <div className="col-sm-2"></div>
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

export default EditUser;