import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import LoginPage from './pages/LoginPage'
import FooterComponent from './components/FooterComponent'
import HomePage from './pages/HomePage'
import EmployeePage from './pages/EmployeePage'
import CustomerPage from './pages/CustomerPage'
import ProjectPage from './pages/ProjectPage'
import TaskPage from './pages/TaskPage'
import CreateEmployee from './components/CreateEmployee'
import ProtectedRoute from './components/ProtectedRoute'
import CreateCustomer from './components/CreateCustomer'
import CreateProject from './components/CreateProject'
import CreateTask from './components/CreateTask'
import ImportEmployee from './pages/ImportEmployee'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/create-employee" element={<CreateEmployee /> } />
          <Route path="/edit-employee/:id" element={<CreateEmployee />}></Route>
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/create-customer" element={<CreateCustomer />}></Route>
          <Route path="/edit-customer/:id" element={<CreateCustomer />}></Route>
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/create-project" element={<CreateProject />}></Route>
          <Route path="/edit-project/:id" element={<CreateProject />}></Route>
          <Route path="/task" element={<TaskPage />} />
          <Route path="/create-task" element={<CreateTask />}></Route>
          <Route path="/edit-task/:id" element={<CreateTask />}></Route>
          <Route path="/import" element={<ImportEmployee />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
