import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NavBarComponent from './NavBarComponent';
import CustomerServices from '../services/CustomerServices';

const CreateCustomer = () => {
    const [customerName, setCustomerName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [location, setLocation] = useState('');
    const [customerDescription, setCustomerDescription] = useState('');

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    const { id } = useParams()

    const validate = () => {
        let tempErrors = {};

        if (!customerName.trim()) {
            tempErrors.customerName = "Customer Name should not be blank";
        } else if (customerName.length > 15) {
            tempErrors.customerName = "Customer Name cannot exceed 15 characters";
        }
        if (!emailId.trim()) {
            tempErrors.emailId = "Email ID should not be blank";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailId)) {
                tempErrors.emailId = "Invalid Email ID";
            }
        }
        if (!location.trim()) {
            tempErrors.location = "Location should not be blank";
        } else if(location.length > 15) {
            tempErrors.location = "Location cannot exceed 15 characters";
        }
        if (!customerDescription.trim()) tempErrors.customerDescription = "Description should not be blank";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0; // returns true if no errors
    };

    const handleSaveAndEditCustomer = (e) => {
        e.preventDefault()
        if (!validate()) {
            return; // stop submitting if validation fails
        }
        const customer = { customerName, emailId, location, customerDescription }
        console.log(customer);
        if (id) {
            CustomerServices.modifyCustomer(id, customer).then((response) => {
                console.log(response.data)
                navigate('/customer')
            })
        } else {
            CustomerServices.createCustomer(customer).then((response) => {
                console.log(response.data)
                navigate('/customer')
            }).catch(error => {
                console.log(error)
            })
        }
    }
    function navigateCustomer() {
        navigate("/customer")
    }

    function showTitle() {
        if (id) {
            return <h3 className='text-center'>Edit Customer</h3>
        }
        else {
            return <h3 className='text-center'>Add Customer</h3>
        }
    }

    useEffect(() => {
        CustomerServices.getCustomerById(id).then((response) => {
            setCustomerName(response.data.customerName)
            setEmailId(response.data.emailId)
            setLocation(response.data.location)
            setCustomerDescription(response.data.customerDescription)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <div>
            <NavBarComponent />
            <div className='container p-5'>
                <div className="row justify-content-evenly">
                    {
                        showTitle()
                    }
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className='form-group'>
                                        <label className='form-label'>Customer Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Customer Name'
                                                value={customerName}
                                                name={customerName}
                                                className='form-control'
                                                onChange={(e) => setCustomerName(e.target.value)}
                                            ></input>
                                            {errors.customerName && (
                                                <p style={{ color: "red" }}>{errors.customerName}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>EmailId</label>
                                        <div>
                                            <input
                                                type='email'
                                                placeholder='Enter EmailId'
                                                value={emailId}
                                                name={emailId}
                                                className='form-control'
                                                onChange={(e) => setEmailId(e.target.value)}
                                            ></input>
                                            {errors.emailId && (
                                                <p style={{ color: "red" }}>{errors.emailId}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Location</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Location'
                                                value={location}
                                                name={location}
                                                className='form-control'
                                                onChange={(e) => setLocation(e.target.value)}
                                            ></input>
                                            {errors.location && (
                                                <p style={{ color: "red" }}>{errors.location}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Description</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Description'
                                                value={customerDescription}
                                                name={customerDescription}
                                                className='form-control'
                                                onChange={(e) => setCustomerDescription(e.target.value)}
                                            ></input>
                                            {errors.customerDescription && (
                                                <p style={{ color: "red" }}>{errors.customerDescription}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <button type='submit' className='btn btn-success' onClick={handleSaveAndEditCustomer} >Save</button>
                                        <button type='button' className='btn btn-danger ms-2' onClick={navigateCustomer} >Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCustomer