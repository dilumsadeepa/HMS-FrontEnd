import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Apiurl from '../ApiURL';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [indexNo, setIndexNo] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [role, setRole] = useState("");

  const [aroles, setARoles] = useState([]);

  const navigate = useNavigate();


  const getRoles = async () => {
    try {
      const response = await axios.get(`${Apiurl}/roles`);
      setARoles(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    if (indexNo === null || name === null || email === null || mobileNo === null || password === null || role == null) {

        Swal.fire({
          title: "Error",
          text: "All the filds are requred",
          icon: "error",
          button: "OK",
        });


    } else {


      try {
        if (password === cpassword) {
          const newUser = await axios.post(`${Apiurl}/users/createWithEncryptedPassword`, {
            'indexNo': indexNo,
            'name': name,
            'email': email,
            'mobileNo': mobileNo,
            'password': password,
            'role': parseInt(role),
          });

          if (newUser.data == "success") {
            Swal.fire({
              title: "Register Successful!",
              text: newUser.data,
              icon: "success",
              button: "OK",
            }).then(() => {
              navigate('/');

            });
          }

        } else {
          Swal.fire({
            title: "Error",
            text: "Passwords are does not Match",
            icon: "error",
            button: "OK",
          });

        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          button: "OK",
        });

      }
      
    }
  };


  useEffect(() => {
    getRoles();

  }, []);



  return (
    <div className="container">
      <div className="card shadow-lg o-hidden border-0 my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-flex">
              <div
                className="flex-grow-1 bg-register-image"
                style={{
                  backgroundImage: 'url("assets/img/hostels/1.jpg")',
                }}
              ></div>
            </div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h4 className="text-dark mb-4">Create an Account!</h4>
                </div>
                <form className="user">
                  <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        className="form-control form-control-user"
                        type="text"
                        placeholder="Index Number"
                        onChange={(e) => setIndexNo(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control form-control-user"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control form-control-user"
                      type="email"
                      aria-describedby="emailHelp"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        className="form-control form-control-user"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control form-control-user"
                        type="password"
                        placeholder="Repeat Password"
                        onChange={(e) => setcPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="number"
                          placeholder="Mobile Number"
                          onChange={(e) => setMobileNo(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <select class="form-select form-control-user"
                          style={{ color: 'black' }}
                          onChange={(e) => setRole(e.target.value)}
                          required>
                          <option>
                            Select The Role
                          </option>
                          {aroles.map((ro) => (
                            <option key={ro.id} value={ro.id}>
                              {ro.roleName}
                            </option>
                          ))}
                          {/* <option></option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary d-block btn-user w-100"
                    type="button"
                    onClick={addUser}
                  >
                    Register Account
                  </button>
                  <hr />

                  <hr />
                </form>
                <div className="text-center">
                  <a className="small" href="/">
                    Already have an account? Login!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;