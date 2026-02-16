import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CustomerServices from '../services/CustomerServices';

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate()

    useEffect(() =>{
        showAllCustomers()
    },[])

    function showAllCustomers(){
        CustomerServices.getAllCustomers().then((response) => {
            setCustomers(response.data);
            console.log(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    function editCustomerById(id){
        navigate(`/edit-customer/${id}`)
    }

    function deleteCustomerById(id){
        console.log("id value :"+id)
        let status=window.confirm("Do you want to Delete the Customer Record?")
        console.log("Status value :"+status)
        if(status){
            CustomerServices.deleteCustomer(id).then((response) =>{
                console.log(response.data)
                console.log("The Customer with "+id+" has deleted succesfully")
                showAllCustomers()
            }).catch(error =>{
                console.log("Error Message "+error)
            })
        }else{
            navigate("/customer")
        }
    }

  return (
    <div>
        <h4 className='text-center'>Display Customers</h4>
        <Link to={'/create-customer'} className='btn btn-primary'>Add Customer</Link>
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                <tr>
                    <th>Id</th>
                    <th>Customer Name</th>
                    <th>EmailId</th>
                    <th>Location</th>
                    <th>CustomerDescription</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map(
                        customer =>
                            <tr key={customer.customerId}>
                                <td>{customer.customerId}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.emailId}</td>
                                <td>{customer.location}</td>
                                <td>{customer.customerDescription}</td>
                                <td>
                                    <button className='btn btn-success me-2' onClick={() => editCustomerById(customer.customerId)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => deleteCustomerById(customer.customerId)}>Delete</button>
                                </td> 
                            </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListCustomers