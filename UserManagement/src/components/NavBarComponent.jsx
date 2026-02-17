import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../services/AuthService";
const NavBarComponent = () => {
    const navigate = useNavigate();
    const logoutUser = async (e) => {
            e.preventDefault();
            try {
             AuthService.logout();
             navigate("/login");
        }catch (error) {
        setError("Logout is Not Successfull");
    }
};

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link to={'/home'} className="navbar-brand text-white fw-bold" href="#">S G Software Testing Institute</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/home'} className="nav-link active text-white" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/employee'} className="nav-link text-white" href="#">Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/customer'} className="nav-link text-white" href="#">Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/project'} className="nav-link text-white" href="#">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/task'} className="nav-link text-white" href="#">Tasks</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={'/import'} className="nav-link text-white" href="#">Import Employee</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className='btn btn-outline-light' onClick={(e) => logoutUser(e)}>Logout</button>
                                {/* <Link to={'/task'} className="nav-link text-white" href="#">Logout</Link> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBarComponent