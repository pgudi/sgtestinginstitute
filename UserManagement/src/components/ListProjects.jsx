import React, { useEffect, useState } from 'react'
import ProjectServices from '../services/ProjectServices';
import { Link, useNavigate } from 'react-router-dom';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        showAllProjects()
    }, [])

    function showAllProjects() {
        ProjectServices.getAllProjects().then((response) => {
            setProjects(response.data);
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function editProjectById(id) {
        navigate(`/edit-project/${id}`)
    }

    function deleteProjectById(id) {
        console.log("id value :" + id)
        let status = window.confirm("Do you want to Delete the Project Record?")
        console.log("Status value :" + status)
        if(status){
                    ProjectServices.deleteProject(id).then((response) =>{
                        console.log(response.data)
                        console.log("The Project with "+id+" has deleted succesfully")
                        showAllProjects()
                    }).catch(error =>{
                        console.log("Error Message "+error)
                    })
                }else{
                    navigate("/project")
                }
    }
    return (
        <div>
            <h4 className='text-center'>Display Projects</h4>
            <Link to={"/create-project"} className='btn btn-primary'>Add Project</Link>
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>Id</th>
                        <th>Project Title</th>
                        <th>Project Domain</th>
                        <th>Project Description</th>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map(
                            project =>
                                <tr key={project.projectId}>
                                    <td>{project.projectId}</td>
                                    <td>{project.projectTitle}</td>
                                    <td>{project.projectDomain}</td>
                                    <td>{project.projectDescription}</td>
                                    <td>{project.customer.customerId}</td>
                                    <td>{project.customer.customerName}</td>
                                    <td>
                                        <button className='btn btn-success me-2' onClick={() => editProjectById(project.projectId)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteProjectById(project.projectId)}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListProjects