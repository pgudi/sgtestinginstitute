import React, { useEffect, useState } from 'react'
import NavBarComponent from './NavBarComponent'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeServices from '../services/EmployeeServices';

const CreateEmployee = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [jobName, setJobName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [age, setAge] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [salary, setSalary] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const [cityName, setCityName] = useState('')
    const [address, setAddress] = useState('')

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    const { id } = useParams()

    const validate = () => {
        let tempErrors = {};

        // Required checks + max 15 char validation
        if (!firstName.trim()) tempErrors.firstName = "First Name should not be blank";
        else if (firstName.length > 15) tempErrors.firstName = "First Name cannot exceed 15 characters";

        if (!lastName.trim()) tempErrors.lastName = "Last Name should not be blank";
        else if (lastName.length > 15) tempErrors.lastName = "Last Name cannot exceed 15 characters";

        if (!jobName.trim()) tempErrors.jobName = "Job Name should not be blank";
        else if (jobName.length > 15) tempErrors.jobName = "Job Name cannot exceed 15 characters";

        if (!departmentName.trim()) tempErrors.departmentName = "Department Name should not be blank";
        else if (departmentName.length > 15) tempErrors.departmentName = "Department Name cannot exceed 15 characters";

        if (!cityName.trim()) tempErrors.cityName = "City Name should not be blank";
        else if (cityName.length > 15) tempErrors.cityName = "City Name cannot exceed 15 characters";

        if (!address.trim()) tempErrors.address = "Address should not be blank";

        // Email format validation
        if (!emailId.trim()) {
            tempErrors.emailId = "Email ID should not be blank";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailId)) {
                tempErrors.emailId = "Invalid Email ID";
            }
        }

        // Age validation
        if (!age.trim()) tempErrors.age = "Age should not be blank";
        else if (!/^\d+$/.test(age)) tempErrors.age = "Age should be a number";
        else if (Number(age) < 18 || Number(age) > 60)
            tempErrors.age = "Age must be between 18 and 60";

        // Contact Number validation
        if (!contactNumber.trim()) tempErrors.contactNumber = "Contact Number should not be blank";
        else if (!/^\d+$/.test(contactNumber))
            tempErrors.contactNumber = "Contact Number must be numeric";
        else if (contactNumber.length > 10)
            tempErrors.contactNumber = "Contact Number should not exceed 10 digits";


        // Salary validation
        if (!salary.trim()) tempErrors.salary = "Salary should not be blank";
        else if (!/^\d+$/.test(salary))
            tempErrors.salary = "Salary must be numeric";
        else if (parseInt(salary) < 18000 || parseInt(salary) > 100000)
            tempErrors.salary = "Salary should be between 18000 and 100000";


        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSaveAndEditEmployee = (e) => {
        e.preventDefault()
        if (!validate()) {
            return;
        }
        const employee = { firstName, lastName, jobName, emailId, age, contactNumber, salary, departmentName, cityName, address }
        console.log(employee)
        if (id) {
            EmployeeServices.modifyEmployee(id, employee).then((response) => {
                console.log(response.data)
                navigate('/employee')
            })
        } else {
            EmployeeServices.createEmployee(employee).then((response) => {
                console.log(response.data)
                navigate('/employee')
            }).catch(error => {
                console.log(error)
            })
        }
    }

    function navigateEmployee() {
        navigate('/employee')
    }
    function showTitle() {
        if (id) {
            return <h3 className='text-center'>Edit Employee</h3>
        }
        else {
            return <h3 className='text-center'>Add Employee</h3>
        }
    }

    useEffect(() => {
        EmployeeServices.getEmployeeById(id).then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setJobName(response.data.jobName)
            setEmailId(response.data.emailId)
            setAge(response.data.age)
            setContactNumber(response.data.contactNumber)
            setSalary(response.data.salary)
            setDepartmentName(response.data.departmentName)
            setCityName(response.data.cityName)
            setAddress(response.data.address)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

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
                                <form >
                                    <div className='form-group'>
                                        <label className='form-label'>First Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter First Name'
                                                value={firstName}
                                                name={firstName}
                                                className='form-control'
                                                onChange={(e) => setFirstName(e.target.value)}
                                            ></input>
                                            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Last Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Last Name'
                                                value={lastName}
                                                name={lastName}
                                                className='form-control'
                                                onChange={(e) => setLastName(e.target.value)}
                                            ></input>
                                            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Job Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Job Name'
                                                value={jobName}
                                                name={jobName}
                                                className='form-control'
                                                onChange={(e) => setJobName(e.target.value)}
                                            ></input>
                                            {errors.jobName && <p style={{ color: "red" }}>{errors.jobName}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>EmailId</label>
                                        <div>
                                            <input
                                                type='email'
                                                placeholder='Enter Email Id'
                                                value={emailId}
                                                name={emailId}
                                                className='form-control'
                                                onChange={(e) => setEmailId(e.target.value)}
                                            ></input>
                                            {errors.emailId && <p style={{ color: "red" }}>{errors.emailId}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Age</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Age'
                                                value={age}
                                                name={age}
                                                className='form-control'
                                                onChange={(e) => setAge(e.target.value)}
                                            ></input>
                                            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Contact Number</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Contact Number'
                                                value={contactNumber}
                                                name={contactNumber}
                                                className='form-control'
                                                onChange={(e) => setContactNumber(e.target.value)}
                                            ></input>
                                            {errors.contactNumber && <p style={{ color: "red" }}>{errors.contactNumber}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Salary</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Salary'
                                                value={salary}
                                                name={salary}
                                                className='form-control'
                                                onChange={(e) => setSalary(e.target.value)}
                                            ></input>
                                            {errors.salary && <p style={{ color: "red" }}>{errors.salary}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Department Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Department Name'
                                                value={departmentName}
                                                name={departmentName}
                                                className='form-control'
                                                onChange={(e) => setDepartmentName(e.target.value)}
                                            ></input>
                                            {errors.departmentName && <p style={{ color: "red" }}>{errors.departmentName}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>City Name</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter City Name'
                                                value={cityName}
                                                name={cityName}
                                                className='form-control'
                                                onChange={(e) => setCityName(e.target.value)}
                                            ></input>
                                            {errors.cityName && <p style={{ color: "red" }}>{errors.cityName}</p>}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Address</label>
                                        <div>
                                            <input
                                                type='text'
                                                placeholder='Enter Address'
                                                value={address}
                                                name={address}
                                                className='form-control'
                                                onChange={(e) => setAddress(e.target.value)}
                                            ></input>
                                            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <button type='submit' className='btn btn-success' onClick={handleSaveAndEditEmployee} >Save</button>
                                        <button type='button' className='btn btn-danger ms-2' onClick={navigateEmployee} >Cancel</button>
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

export default CreateEmployee