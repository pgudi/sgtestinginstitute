import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarComponent from './NavBarComponent'
import ProjectServices from '../services/ProjectServices';
import CustomerServices from '../services/CustomerServices';
import TaskServices from '../services/TaskServices';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [customers, setCustomers] = useState([]);
  const [projects, setProjects] = useState([])
  // selected customerId
  const [customerId, setCustomerId] = useState('')
  // selected projectId
  const [projectId, setProjectId] = useState('')
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()
  const { id } = useParams()

  // VALIDATION FUNCTION
  const validateForm = () => {
    let tempErrors = {};

    // Task Title validation
    if (!taskTitle.trim())
      tempErrors.taskTitle = "Task Title should not be blank";
    else if (taskTitle.length > 15)
      tempErrors.taskTitle = "Task Title should not exceed 15 characters";

    // Task Description validation
    if (!taskDescription.trim())
      tempErrors.taskDescription = "Task Description should not be blank";

    // Customer validation
    if (!customerId)
      tempErrors.customerId = "Please select a customer";

    // Project validation
    if (!projectId)
      tempErrors.projectId = "Please select a project";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSaveAndEditTask = (e) => {
    e.preventDefault()
    if (!validateForm()) return;
    const task = {
      taskTitle,
      taskDescription,
      customer: {
        customerId: Number(customerId)   // backend requires object
      },
      project: {
        projectId: Number(projectId)   // backend requires object
      }
    }
    console.log("Sending Task:", task);
    if (id) {
      TaskServices.modifyTask(id, task).then((response) => {
        console.log(response.data)
        navigate('/task')
      })
    } else {
      TaskServices.createTask(task).then((response) => {
        console.log(response.data)
        navigate('/task')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  function navigateTask() {
    navigate("/task")
  }
  function showTitle() {
    if (id) {
      return <h3 className='text-center'>Edit Task</h3>
    }
    else {
      return <h3 className='text-center'>Add Task</h3>
    }
  }

  // useEffect(() => {
  //   showAllCustomers()
  // }, [])

  // function showAllCustomers() {
  //   CustomerServices.getAllCustomers().then((response) => {
  //     setCustomers(response.data);
  //     console.log(response.data)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   showAllProjects()
  // }, [])

  // function showAllProjects() {
  //   ProjectServices.getAllProjects().then((response) => {
  //     setProjects(response.data);
  //     console.log(response.data)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  useEffect(() => {

    // Load all customers
    CustomerServices.getAllCustomers()
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err));

    // Load all projects
    ProjectServices.getAllProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));

    // If editing, load task details
    if (id) {
      TaskServices.getTaskById(id)
        .then(response => {
          const taskData = response.data;  // FIXED NAME

          setTaskTitle(taskData.taskTitle);
          setTaskDescription(taskData.taskDescription);

          if (taskData.customer) {
            setCustomerId(taskData.customer.customerId);
          }

          if (taskData.project) {
            setProjectId(taskData.project.projectId);
          }
        })
        .catch(error => console.log(error));
    }

  }, [id]);
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
                    <label className='form-label'>Task title</label>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Task Title'
                        value={taskTitle}
                        name={taskTitle}
                        className='form-control'
                        onChange={(e) => setTaskTitle(e.target.value)}
                      ></input>
                      {errors.taskTitle && (
                        <p className="text-danger">{errors.taskTitle}</p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Task Description</label>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Task Description'
                        value={taskDescription}
                        name={taskDescription}
                        className='form-control'
                        onChange={(e) => setTaskDescription(e.target.value)}
                      ></input>
                      {errors.taskDescription && (
                        <p className="text-danger">{errors.taskDescription}</p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Customer Name</label>
                    <div>
                      <select className='form-select'
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                      >
                        <option defaultValue>Select Customer Name</option>
                        {
                          customers.map(customer => (
                            <option key={customer.customerId} value={customer.customerId}>{customer.customerName}</option>
                          ))
                        }
                      </select>
                      {errors.customerId && (
                        <p className="text-danger">{errors.customerId}</p>
                      )}
                    </div>
                  </div>

                  <div className='form-group'>
                    <label className='form-label'>Project Name</label>
                    <div>
                      <select className='form-select'
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                      >
                        <option defaultValue>Select Project Name</option>
                        {
                          projects.map(project => (
                            <option key={project.projectId} value={project.projectId}>{project.projectTitle}</option>
                          ))
                        }
                      </select>
                      {errors.projectId && (
                        <p className="text-danger">{errors.projectId}</p>
                      )}
                    </div>
                  </div>

                  <div className='mt-3'>
                    <button type='submit' className='btn btn-success' onClick={handleSaveAndEditTask} >Save</button>
                    <button className='btn btn-danger ms-2' onClick={navigateTask} >Cancel</button>
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

export default CreateTask