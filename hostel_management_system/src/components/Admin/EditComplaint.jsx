import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Apiurl from '../ApiURL';
import * as Yup from 'yup';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import AdminTopBar from './AdminTopBar';
import AdminFooter from './AdminFooter';
import { Html5QrcodeScanner } from 'html5-qrcode';

const EditComplaint = () => {
  const { id } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [resourceNumber, setresourceNumber] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false;
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  function handleresourceNumberChange(event) {
    setresourceNumber(event.target.value);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${Apiurl}/complaint/all`);
        setComplaints(response.data);
        console.log('Complaints:', response.data);
      } catch (error) {
        console.log('Error in getting data:', error);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(`${Apiurl}/complaint/find/${id}`);
        setInitialData(response.data);
        console.log('complaint:', response.data);
      } catch (error) {
        console.log('Error in getting complaint data:', error);
      }
    };

    fetchComplaintData();
  }, [id]);

  let initialValues = {
    complaintId:'',
    userId: '',
    userIndex: '',
    complaint: '',
    resId: '',
    complaintDate: '',
    evidenceImage: '',
    status: '',
  };

  if (initialData) {
    initialValues = {
      complaintId: initialData.complaintId,
      userId: initialData.userId,
      userIndex: initialData.userIndex,
      complaint: initialData.complaint,
      resId: initialData.resId,
      complaintDate: initialData.complaintDate,
      evidenceImage: initialData.evidenceImage,
      status: initialData.status,
    };

    console.log("Intialcomplaint : ", initialData.complaint);
  }

  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(`${Apiurl}/complaint/update`, data)
      .then((response) => {
        navigate('/complaints');
      });
  };

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('User ID is required'),
    userIndex: Yup.string().required('User Index is required'),
    complaint: Yup.string().required('Complaint is required'),
    resId: Yup.number().required('Resource ID is required'),
    complaintDate: Yup.date().required('Complaint Date is required'),
    evidenceImage: Yup.string().required('Evidence Image is required'),
    status: Yup.string().required('Status is required'),
  });

  return (
    <div id="page-top">
      <div id="wrapper">
        <AdminNavbar />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <AdminTopBar />
            <div className="container-fluid">
              <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>

              <div className="d-flex justify-content-center">
                <div className="col-sm-10 debox px-5">
                  <div className="col-sm-8 px-5">
                    {scanResult ? (
                      <div>
                        <p>
                          Success: <a href={scanResult}>{scanResult}</a>
                        </p>
                        <p>Serial Number: {scanResult.slice(-16)}</p>
                      </div>
                    ) : (
                      <div>
                        <div id="reader"></div>
                        <p className="center-text">
                          Or enter the serial number manually:
                        </p>
                        <div className="center-input">
                          <input
                            type="text"
                            value={resourceNumber}
                            onChange={handleresourceNumberChange}
                          />
                          {resourceNumber && (
                            <p>Serial Number: {resourceNumber.slice(-16)}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                  >
                    <Form className="formContainer">
                    <Field
                          id="inputCreatePost"
                          type="hidden"
                          name="complaintId"
                          autoComplete="off"
                        />


                      {/* <div class="mb-3">
                        <label className="my-2">user Id:</label>
                        <ErrorMessage
                          name="userId"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          id="inputCreatePost"
                          className={`form-control`}
                          name="userId"
                          placeholder="User Id"
                          autoComplete="off"
                        />
                      </div>

                      <div class="mb-3">
                        <label className="my-2">user Index:</label>
                        <ErrorMessage
                          name="userIndex"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          id="inputCreatePost"
                          className={`form-control`}
                          name="userIndex"
                          placeholder="Index No"
                          autoComplete="off"
                        />
                      </div> */}


                      <Field
                          id="inputCreatePost"
                          className={`form-control`}
                          name="userId"
                          placeholder="User Id"
                          autoComplete="off"
                        />

                      <Field
                          id="inputCreatePost"
                          className={`form-control`}
                          name="userIndex"
                          placeholder="Index No"
                          autoComplete="off"
                        />

                      <div class="mb-3">
                        <label className="my-2">Complaint:</label>
                        <ErrorMessage
                          name="complaint"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          as="textarea"
                          id="complaint"
                          name="complaint"
                          className={`form-control`}
                          placeholder="complaint"
                        />
                      </div>

                      <div class="mb-3">
                        <label className="my-2">Resource Id:</label>
                        <ErrorMessage
                          name="resId"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          id="resId"
                          name="resId"
                          className={`form-control`}
                          placeholder="Your complaint"
                        />
                      </div>

                      <div class="mb-3">
                        <label className="my-2">Complaint Date:</label>
                        <ErrorMessage
                          name="complaintDate"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          type="date"
                          id="complaintDate"
                          name="complaintDate"
                          className={`form-control`}
                          placeholder="Your complaint"
                        />
                      </div>

                      <div class="mb-3">
                        <label className="my-2">Evidence Image</label>
                        <ErrorMessage
                          name="evidenceImage"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                        <Field
                          id="evidenceImage"
                          name="evidenceImage"
                          className={`form-control`}
                          placeholder="Evidence Image"
                        />
                      </div>

                      <div class="mb-3">
                        <label className="my-2">Status :</label>
                        <ErrorMessage
                          name="status"
                          className="badge rounded-pill text-bg-danger my-3"
                          component="span"
                        />
                       <Field
                                as="select" // Use <select> element
                                id="status"
                                name="status"
                                className="form-select" // Use form-select class for styling
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In-Progress</option>
                                <option value="resolve">Resolve</option>
                            </Field>
                      </div>

                      <button type="submit" className="btn btn-primary mt-5">
                        Save
                      </button>
                      <a className="btn btn-outline-danger ms-2 mt-5" href="/complaints">
                        Cancel
                      </a>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
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

export default EditComplaint;
