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

    const navigate = useNavigate()
    const { id } = useParams()

    const handleSaveAndEditEmployee = (e) => {
        e.preventDefault()
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
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <button type='submit' className='btn btn-success' onClick={handleSaveAndEditEmployee} >Save</button>
                                        <button className='btn btn-danger ms-2' onClick={navigateEmployee} >Cancel</button>
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