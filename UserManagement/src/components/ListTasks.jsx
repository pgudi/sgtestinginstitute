import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TaskServices from '../services/TaskServices'

const ListTasks = () => {
    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    useEffect(() =>{
        showAllTasks()
    },[])

    function showAllTasks(){
            TaskServices.getAllTasks().then((response) => {
                setTasks(response.data);
                console.log(response.data)
            }).catch(error =>{
                console.log(error)
            })
        }

    function editTaskById(id){
        navigate(`/edit-task/${id}`)
    }

    function deleteTaskById(id){
        console.log("id value :"+id)
        let status=window.confirm("Do you want to Delete the Task Record?")
        console.log("Status value :"+status)
        if(status){
                    TaskServices.deleteTask(id).then((response) =>{
                        console.log(response.data)
                        console.log("The Task with "+id+" has deleted succesfully")
                        showAllTasks()
                    }).catch(error =>{
                        console.log("Error Message "+error)
                    })
                }else{
                    navigate("/task")
                }
    }

  return (
    <div>
        <h4 className='text-center'>Display Tasks</h4>
        <Link to={"/create-task"} className='btn btn-primary'>Create Task</Link>
        <table className="table table-striped table-bordered">
            <thead className="table-primary">
                <tr>
                    <th>Id</th>
                    <th>Task Title</th>
                    <th>Task Description</th>
                    <th>Customer Id</th>
                    <th>Customer Name</th>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(
                        task => 
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.taskTitle}</td>
                            <td>{task.taskDescription}</td>
                            <td>{task.customer.customerId}</td>
                            <td>{task.customer.customerName}</td>
                            <td>{task.project.projectId}</td>
                            <td>{task.project.projectTitle}</td>
                            <td>
                                <button className='btn btn-success me-2' onClick={() => editTaskById(task.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteTaskById(task.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListTasks