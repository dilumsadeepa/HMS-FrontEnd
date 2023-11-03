import React, {useContext, useEffect, useState} from 'react'
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";
import AdminFooter from "./AdminFooter";
import { Formik, Form, Field, ErrorMessage } from "formik";  //use for form handling
import Apiurl from '../ApiURL';
import * as Yup from "yup";   //use for validation purposes
import axios from 'axios';  
import { useNavigate } from 'react-router-dom' ;
import { Html5QrcodeScanner } from 'html5-qrcode';



const CreateNewComplaint = () => {

    const [scanResult, setScanResult] = useState(null);
    const [manualSerialNumber, setManualSerialNumber] = useState('');
  
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
          isScanning = false; // Set isScanning to false to stop further scanning
        }
      }
  
      function error(err) {
        console.warn(err);
      }
    }, []);
  
    function handleManualSerialNumberChange(event) {
      setManualSerialNumber(event.target.value);
    }


    let navigate = useNavigate();
    const initialValues = {
        userId: '',
        userIndex: '',
        complaint: '',
        resId: '',
        complaintDate: '',
        evidenceImage: '',
        status: ''
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.post(`${Apiurl}/complaint/add`, data)
            .then((response) => { 
            navigate("/");   //return to  root page after creating new post
        });
    };

    //validatins form
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
                        <p>Success: <a href={scanResult}>{scanResult}</a></p>
                        <p>Serial Number: {scanResult.slice(-16)}</p>
                        </div>
                    ) : (
                        <div>
                        <div id="reader"></div>
                        <p className="center-text">Or enter the serial number manually:</p>
                        <div className="center-input">
                            <input
                            type="text"
                            value={manualSerialNumber}
                            onChange={handleManualSerialNumberChange}
                            />
                            {manualSerialNumber && (
                            <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
                            )}
                        </div>
                        </div>
                    )}

                    </div>
               

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='formContainer'> 
                    <div class="mb-3">
                    <label className="my-2">user Id:</label>
                        <ErrorMessage name='userId' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="inputCreatePost" className={`form-control`} name='userId' placeholder='User Id' autoComplete="off" />
                    </div>


                        <div class="mb-3">
                        <label className="my-2">user Index:</label>
                        <ErrorMessage name='userIndex' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="inputCreatePost" className={`form-control`} name='userIndex' placeholder='Index No' autoComplete="off" />
                        </div>
                        

                        <div class="mb-3">
                        <label className="my-2">Complaint:</label>
                        <ErrorMessage name='complaint' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field as="textarea" id="complaint" name="complaint"  className={`form-control`}  placeholder="Your complaint"/>
                        </div>
                    

                    <div class="mb-3">
                        <label className="my-2">Resource Id:</label>
                        <ErrorMessage name='resId' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="resId" name="resId" className={`form-control`} placeholder="Your complaint"/>
                    </div>

                    <div class="mb-3">   
                        <label className="my-2">Complaint Date:</label>
                        <ErrorMessage name='complaintDate' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field type="date" id="complaintDate" name="complaintDate" className={`form-control`}  placeholder="Your complaint"/>
                    </div>

                    <div class="mb-3">  
                        <label className="my-2">Evidence Image</label>
                        <ErrorMessage name='evidenceImage' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="evidenceImage" name="evidenceImage" className={`form-control`}  placeholder="Evidence Image"/>
                    </div>

                    <div class="mb-3">
                        <label className="my-2">Status :</label>
                        <ErrorMessage name='status' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="status" name="status" className={`form-control`}  placeholder="Status"/>
                    </div>


                        

                        <button type='submit' className="btn btn-primary mt-5">Save</button>
                        <a  className="btn btn-outline-danger ms-2 mt-5" href='/complaints'>
                        Cancel
                        </a>
                    </Form>
                </Formik>
                </div>
            </div>
        </div>

        <AdminFooter />
            </div>
            <a
              className="border rounded d-inline scroll-to-top"
              href="#page-top"
            >
              <i className="fas fa-angle-up"></i>
            </a>
          </div>
            </div>
            </div>
    
    );
};

export default CreateNewComplaint;