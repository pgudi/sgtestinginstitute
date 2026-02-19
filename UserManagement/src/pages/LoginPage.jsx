import React, { useState } from 'react'
import AuthService from "../services/AuthService";

import Logo from '../assets/images/Logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();
  //  const userdetails = { username, password };

    const loginUser = async (e) => {
        e.preventDefault();
        setError("")
        try {
         const response = await AuthService.login(username, password);
         console.log("Login response: ", response);
         const token = response; 
         localStorage.setItem("token", token);
         navigate("/home")
    }catch (error) {
        console.error("Login error:", error);
        setError("Invalid username or password");
}
};
return (
    <div>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 fw-bold text-white">S G Software Testing Institute</span>
            </div>
        </nav>
        <div className='text-center'>
            <img className='img-fluid rounded-circle mt-3' src={Logo} alt="Logo" style={{ width: "100px", height: "100px" }}></img>
        </div>

        <div className="container-fluid">
            <div className="row justify-content-center p-1">
                <h2 className='text-center'>Login</h2>
                <div className='text-center'>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
                
                <div className="card col-md-6">
                    <div className='card-body'>
                        <form style={{ textAlign: "left", display: "block" }}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">User Name</label>
                                <input type="text" className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input type="password" className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                ></input>
                            </div>

                            <div>
                                <button className="btn btn-info me-1" onClick={(e) => loginUser(e)}>Sign In</button>
                                <button className="btn btn-danger">Cancel</button>
                                <div className='mt-4'>
                                    <span className='fw-bold'>New User, Don't have an account? <br /> Please Register.
                                        <Link to={'/register'}>Sign Up</Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default LoginPage