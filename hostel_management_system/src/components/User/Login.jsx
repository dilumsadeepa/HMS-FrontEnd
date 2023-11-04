import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


import Apiurl from '../ApiURL';

const Login = () => {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();


  const [cookies, setCookie] = useCookies(['user']);

  const login = async () => {
    try {
      const responce = await axios.post(`${Apiurl}/users/authenticate`, {
        identifier,
        password,
      })
      if (responce.data) {
        setUser(responce.data);

        if (responce.data.message == "Authentication Successful") {
          setCookie('user',responce.data);
          Swal.fire({
            title: "Login Successful!",
            text: responce.data.message,
            icon: "success",
            button: "OK",
          }).then(() => {
            navigate('/dashboard');

            // if (user.role == "1") {
            //   navigate('/admin');
            // }else if (user.role == 2) {
            //   navigate('/dean')
            // }else if (user.role == 3) {
            //   navigate('/scon');
            // }else if (user.role == 4) {
            //   navigate('/wordan');
            // }else if (user.role == 5) {
            //   navigate('/subwordon');
            // }else if (user.role == 6) {
            //   navigate('/student');
            // }

          });
        } else {
          Swal.fire({
            title: "Error",
            text: responce.data.message,
            icon: "error",
            button: "OK",
          });
        }
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        button: "OK",
      });
    }

  }




  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-12 col-xl-10">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-flex">
                  <div
                    className="flex-grow-1 bg-login-image"
                    style={{
                      backgroundImage: 'url("assets/img/hostels/6.jpg")',
                    }}
                  ></div>
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h4 className="text-dark mb-4">Welcome Back!</h4>
                    </div>
                    <form className="user">
                      <div className="mb-3">

                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email or Index Number or Mobile no"
                          name="email"
                          onChange={(e) => setIdentifier(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <button
                        className="btn btn-primary d-block btn-user w-100"
                        type="button"
                        onClick={login}
                      >
                        Login
                      </button>
                      <hr />

                      <hr />
                    </form>
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="/register">
                        Create an Account!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;