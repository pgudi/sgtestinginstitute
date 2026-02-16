import React, { useState } from 'react'
import UserServices from '../services/UserServices';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const [username, setUserName] = useState([]);
    const [password, setPassword] = useState([]);

    const navigate = useNavigate();
    const userdetails = { username, password, role: "USER", approved: false };

    const registerNewUser = (e) => {
        e.preventDefault();
        UserServices.registerUser(userdetails).then((response) => {
            console.log(response.data);
            alert("User has Registred successful!");
            navigate("/login")
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 fw-bold text-white">S G Software Testing Institute</span>
                </div>
            </nav>
            
            <div className="container-fluid">
                <div className="row justify-content-center p-1">
                    <h2 className='text-center'>Register</h2>
                    <div className="card col-md-6">
                        <div className='card-body'>
                            <form style={{ textAlign: "left", display: "block" }}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">User Name</label>
                                    <input type="text" className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="text" className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">User Role</label>
                                    <input type="text" className="form-control"
                                        name="role"
                                        value="USER"
                                        readOnly
                                    ></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Approved</label>
                                    <input type="text" className="form-control"
                                        name="approved"
                                        value="false"
                                        readOnly
                                    ></input>
                                </div>
                                <div>
                                    <button className="btn btn-info me-1" onClick={(e) => registerNewUser(e)}>Register</button>
                                    <Link to="/login" className="btn btn-danger">Cancel</Link>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register