import React, { useEffect, useState } from 'react'
import EmployeeServices from '../services/EmployeeServices';
import { Link, useNavigate } from 'react-router-dom';
const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    const navigateCreateEmployee=()=>{
        navigate('/create-employee')
    }

    useEffect(() =>{
        showAllEmployees()
    },[])

    function showAllEmployees(){
        EmployeeServices.getAllEmployees().then((response) => {
            setEmployees(response.data);
            console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    function editEmployeeById(id){
        navigate(`/edit-employee/${id}`)
    }

    function deleteEmployeeById(id) {
        console.log("id value :"+id)
        let status=window.confirm("Do you want to Delete the Employee Record?")
        console.log("Status value :"+status)
         if(status){
            EmployeeServices.deleteEmployee(id).then((response) =>{
                console.log(response.data)
                console.log("The Employee with "+id+" has deleted succesfully")
                showAllEmployees()
            }).catch(error =>{
                console.log("Error Message "+error)
            })
            
        }else{
            navigate('/employee')
        }
    }

  return (
    <div>
        <h4 className='text-center'>Display Employees</h4>
        <Link to={'/create-employee'} className='btn btn-primary' >Add Employee</Link>
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Job Name</th>
                        <th>EmailId</th>
                        <th>Age</th>
                        <th>ContactNo</th>
                        <th>Salary</th>
                        <th>Department Name</th>
                        <th>City Name</th>
                        <th>Address</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.jobName}</td>  
                                <td>{employee.emailId}</td>  
                                <td>{employee.age}</td>  
                                <td>{employee.contactNumber}</td>      
                                <td>{employee.salary}</td>  
                                <td>{employee.departmentName}</td>  
                                <td>{employee.cityName}</td>  
                                <td>{employee.address}</td> 
                                <td>
                                    <button className='btn btn-success me-2' onClick={() => editEmployeeById(employee.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteEmployeeById(employee.id)}>Delete</button>
                                </td> 
                            </tr>
                        )
                    }
                </tbody>
        </table>
    </div>
  )
}

export default ListEmployees