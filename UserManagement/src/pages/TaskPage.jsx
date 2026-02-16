import React from 'react'
import NavBarComponent from './../components/NavBarComponent';
import ListTasks from '../components/ListTasks';
const TaskPage = () => {
  return (
    <div>
        <NavBarComponent/>
        <ListTasks />
    </div>
  )
}

export default TaskPage