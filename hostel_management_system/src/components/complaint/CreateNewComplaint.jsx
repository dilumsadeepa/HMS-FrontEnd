import React, {useContext, useEffect, useState} from 'react'
import AdminNavbar from "../Admin/AdminNavbar";
import AdminTopBar from "../Admin/AdminTopBar";
import AdminFooter from "../Admin/AdminFooter";
import { Formik, Form, Field, ErrorMessage } from "formik";  //use for form handling
import Apiurl from '../ApiURL';
import * as Yup from "yup";   //use for validation purposes
import axios from 'axios';  
import { useNavigate } from 'react-router-dom' ;
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useCookies } from 'react-cookie';
import CloudinaryUpload from "../FileUpload/CloudinaryUpload";


const CreateNewComplaint = () => {

    const [cookies] = useCookies(['role']);
    console.log(cookies);
    console.log(cookies.user.id);

    const [scanResult, setScanResult] = useState(null);
    const [resourceNumber, setresourceNumber] = useState('');
    const [resourceData, setResourceData] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [evidenceImage, setEvidenceImage] = useState('');

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;


    // ----------cloudinary image uplaoding ----------
    const handleUploadedUrl = (url) => {
      setUploadedUrl(url);
      setEvidenceImage(url);
      
  };

   
    // ----------QR Scanning Functions Start here ----------
      useEffect(() => {
        if(scanResult){
        const fetchResourceData = async () => {
          try {
            const response = await axios.get(`${Apiurl}/res/find/${scanResult}`);
            setResourceData(response.data);
            console.log('resource data:', response.data);
          } catch (error) {
            console.log('Error in getting resource data:', error);
          }
        };
    
        fetchResourceData();
      }
      }, [scanResult]);


  
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
  
    function handleresourceNumberChange(event) {
      setresourceNumber(event.target.value);
    }

  // ----------QR Scanning Functions End here ----------

    let navigate = useNavigate();
    const initialValues = {
        userId: cookies.user.id,
        userIndex: cookies.user.index_no,
        complaint: '',
        resId: scanResult || '',
        complaintDate: currentDate,
        evidenceImage: uploadedUrl,
        status: 'pending'
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.post(`${Apiurl}/complaint/add`, data)
            .then((response) => { 
            navigate("/complaints");   //return to  root page after creating new post
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
                    <div className="row">
                    <div className="col-sm-7 px-5">
                    {scanResult ? (
                        // <div>
                        // <p>Scan Success: {scanResult}</p>
                        // <p>Resource ID: {scanResult.slice(-16)}</p>
                        // </div>

                        <div className="card">
                        <div class="card-header h6 bg-dark bg-gradient">
                          Resource Details
                        </div>
                        {resourceData ? (
                          <ul className="list-group list-group-flush">
                          <li className="list-group-item">Resource Id: {resourceData.resId}</li>
                          <li className="list-group-item">Resource Name: {resourceData.resName}</li>
                          <li className="list-group-item">Resource Location: {resourceData.roomNo}</li>
                          <li className="list-group-item">Installion Date: {resourceData.installationDate}</li>
                          <li className="list-group-item">Last MaintainDate: {resourceData.lastMaintenanceDate}</li>
                          <li className="list-group-item">Resource Status: {resourceData.status}</li>
                        </ul>
                        ):(
                          <ul className="list-group list-group-flush">
                          <li className="list-group-item text-danger">Nothing Found Yet!. Scan QR Again</li>
                          </ul>
                        )}
                  
                      </div>


                    ) : (
                        <div>
                        <div id="reader"></div>
                        {/* <p className="center-text">Or enter the Resource ID manually:</p>
                        <div className="center-input">
                            <input
                            type="text"
                            value={resourceNumber}
                            onChange={handleresourceNumberChange}
                            />
                            {resourceNumber && (
                            <p>Resource Number: {resourceNumber.slice(-16)}</p>
                            )}
                        </div> */}
                        </div>
                    )}

                    </div>

                    <div className="col-sm-4">
                    <div className="card">
                        <div class="card-header py-2 h6 bg-dark bg-gradient">
                          Resource Details
                        </div>
                        {resourceData ? (
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item text-success">Scan Successfully!</li>
                          </ul>
                        ):(
                          <ul className="list-group list-group-flush">
                              <li className="list-group-item text-danger">Nothing Found Yet!. Scan QR Again</li>
                          </ul>
                        )}
                  
                      </div>
                    </div>
                    </div>
                   
               

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                    <Form className='formContainer'> \

                        {/* <div class="mb-3">
                        <label className="my-2">user Id:</label>
                            <ErrorMessage name='userId' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                            <Field type="hidden" id="inputCreatePost" className={`form-control`} name='userId' placeholder='User Id' autoComplete="off" />
                        </div>


                        <div class="mb-3">
                        <label className="my-2">user Index:</label>
                        <ErrorMessage name='userIndex' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field type="hidden" id="inputCreatePost" className={`form-control`} name='userIndex' placeholder='Index No' autoComplete="off" />
                        </div> */}
                        

                        <div class="mb-3">
                        <label className="my-2">Complaint:</label>
                        <ErrorMessage name='complaint' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field as="textarea" id="complaint" name="complaint"  className={`form-control`}  placeholder="Your complaint"/>
                        </div>

                    <Field type="hidden" id="inputCreatePost" className={`form-control`} name='userId' placeholder='User Id' autoComplete="off" />
                    <Field type="hidden" id="inputCreatePost" className={`form-control`} name='userIndex' placeholder='Index No' autoComplete="off" />
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
                        <CloudinaryUpload handleUploadedUrl={handleUploadedUrl} />
                        <ErrorMessage name='evidenceImage' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field id="evidenceImage" name="evidenceImage" className={`form-control`}  placeholder="Evidence Image"/>
                    </div>

                    <div class="mb-3">
                        <label className="my-2">Status :</label>
                        <ErrorMessage name='status' className="badge rounded-pill text-bg-danger my-3" component='span'  />
                        <Field type="hidden" id="status" name="status" className={`form-control`}  placeholder="Status"/>
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