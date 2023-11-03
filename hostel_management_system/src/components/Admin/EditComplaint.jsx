import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Apiurl from '../ApiURL';
import * as Yup from 'yup';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditComplaint = () => {
    const { id } = useParams();
    const [complaints, setComplaints] = useState([]);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
          try {
            const response = await axios.get(`${Apiurl}/complaint/all`);
            setComplaints(response.data);
            console.log('Courses:', response.data);
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
            setInitialData(response.data[0]);
            console.log('complaint:', response.data);
          } catch (error) {
            console.log('Error in getting complaint data:', error);
          }
        };
    
        fetchComplaintData();
      }, []);

  
      console.log('initialData:', initialData);
    
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
        axios.put(`${Apiurl}/complaint/update`, data)
            .then((response) => { 
            navigate("/complaints");   //return to  root page after creating new post
        });
    };


    return (
        <div>
            
        </div>
    );
};

export default EditComplaint;