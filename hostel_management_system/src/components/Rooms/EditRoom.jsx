import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AdminNavbar from '../Admin/AdminNavbar';
import AdminTopBar from '../Admin/AdminTopBar';
import AdminFooter from '../Admin/AdminFooter';
import Apiurl from '../ApiURL';

const EditRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize form values with the data fetched from the API
  const [initialValues, setInitialValues] = React.useState({
    roomNo: '',
    hostelNo: '',
    floorNo: '',
  });

  useEffect(() => {
    // Fetch data to populate form fields
    axios.get(`${Apiurl}/rooms/${id}`).then((response) => {
      setInitialValues(response.data); 
    });
  }, [id]);

  const onSubmit = (data) => {
    console.log(data);
    // Make a PUT request to update the data
    axios
      .put(`${Apiurl}/rooms/editRoom/${id}`, data)
      .then(() => {
        navigate('/rooms');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const validationSchema = Yup.object().shape({
    roomNo: Yup.number().required('Room ID is required'),
    hostelNo: Yup.number().required('Hostel ID is required'),
    floorNo: Yup.number().required('Floor ID is required'),
  });

  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <AdminTopBar />
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize={true}>
              <Form className="formContainer">
                <div className="mb-3">
                  <label className="my-2">Room ID:</label>
                  <ErrorMessage name="roomNo" className="badge rounded-pill text-danger my-3" component="span" />
                  <Field type="number" id="roomNo" name="roomNo" className="form-control" placeholder="Room ID" />
                </div>

                <div className="mb-3">
                  <label className="my-2">Hostel ID:</label>
                  <ErrorMessage name="hostelNo" className="badge rounded-pill text-danger my-3" component="span" />
                  <Field type="number" id="hostelNo" name="hostelNo" className="form-control" placeholder="Hostel ID" />
                </div>

                <div className="mb-3">
                  <label className="my-2">Floor ID:</label>
                  <ErrorMessage name="floorNo" className="badge rounded-pill text-danger my-3" component="span" />
                  <Field type="number" id="floorNo" name="floorNo" className="form-control" placeholder="Floor ID" />
                </div>

                <button type="submit" className="btn btn-primary mt-5">
                  Save
                </button>
                <Link to="/rooms" className="btn btn-outline-danger ms-2 mt-5">
                  Cancel
                </Link>
              </Form>
            </Formik>
          </div>
          </div>

        <AdminFooter />
      </div>
      <a className="border rounded d-inline scroll-to-top" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  
  );
};

export default EditRoom;
