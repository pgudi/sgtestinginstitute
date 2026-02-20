import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarComponent from './NavBarComponent'
import ProjectServices from '../services/ProjectServices';
import CustomerServices from '../services/CustomerServices';

const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDomain, setProjectDomain] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  // selected customerId
  const [customerId, setCustomerId] = useState('');

  const navigate = useNavigate()
  const { id } = useParams()

  const validateForm = () => {
    let tempErrors = {};

    // ProjectTitle validations
    if (!projectTitle.trim())
      tempErrors.projectTitle = "Project Title should not be blank";
    else if (projectTitle.length > 15)
      tempErrors.projectTitle = "Project Title should not exceed 15 characters";

    // ProjectDomain validations
    if (!projectDomain.trim())
      tempErrors.projectDomain = "Project Domain should not be blank";
    else if (projectDomain.length > 15)
      tempErrors.projectDomain = "Project Domain should not exceed 15 characters";

    // ProjectDescription validations
    if (!projectDescription.trim())
      tempErrors.projectDescription = "Project Description should not be blank";

    // CustomerId validations
    if (!customerId)
      tempErrors.customerId = "Please select a customer";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveAndEditProject = (e) => {
    e.preventDefault()
    if (!validateForm()) return;
    const project = {
      projectTitle,
      projectDomain,
      projectDescription,
      customer: {
        customerId: Number(customerId)   // backend requires object
      }
    }
    console.log("Sending Project:", project);

    if (id) {
      ProjectServices.modifyProject(id, project).then((response) => {
        console.log(response.data)
        navigate('/project')
      })
    } else {
      ProjectServices.createProject(project).then((response) => {
        console.log(response.data)
        navigate('/project')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  function navigateProject() {
    navigate("/project")
  }

  function showTitle() {
    if (id) {
      return <h3 className='text-center'>Edit Project</h3>
    }
    else {
      return <h3 className='text-center'>Add Project</h3>
    }
  }

  useEffect(() => {
    showAllCustomers()
  }, [])

  function showAllCustomers() {
    CustomerServices.getAllCustomers().then((response) => {
      setCustomers(response.data);
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {

    // Load all customers first
    CustomerServices.getAllCustomers()
      .then(response => {
        setCustomers(response.data);
      })
      .catch(err => console.log(err));

    // If editing load project details
    if (id) {
      ProjectServices.getProjectById(id)
        .then(response => {
          const project = response.data;

          setProjectTitle(project.projectTitle);
          setProjectDomain(project.projectDomain);
          setProjectDescription(project.projectDescription);

          // IMPORTANT: set selected customer
          if (project.customer) {
            setCustomerId(project.customer.customerId);
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
                    <label className='form-label'>Project Title</label>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Project Title'
                        value={projectTitle}
                        name={projectTitle}
                        className='form-control'
                        onChange={(e) => setProjectTitle(e.target.value)}
                      ></input>
                      {errors.projectTitle && (
                        <p className="text-danger">{errors.projectTitle}</p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Project Domain</label>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Project Domain'
                        value={projectDomain}
                        name={projectDomain}
                        className='form-control'
                        onChange={(e) => setProjectDomain(e.target.value)}
                      ></input>
                      {errors.projectDomain && (
                        <p className="text-danger">{errors.projectDomain}</p>
                      )}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Project Description</label>
                    <div>
                      <input
                        type='text'
                        placeholder='Enter Project Description'
                        value={projectDescription}
                        name={projectDescription}
                        className='form-control'
                        onChange={(e) => setProjectDescription(e.target.value)}
                      ></input>
                      {errors.projectDescription && (
                        <p className="text-danger">{errors.projectDescription}</p>
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
                  <div className='mt-3'>
                    <button type='submit' className='btn btn-success' onClick={handleSaveAndEditProject} >Save</button>
                    <button className='btn btn-danger ms-2' onClick={navigateProject} >Cancel</button>
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

export default CreateProject