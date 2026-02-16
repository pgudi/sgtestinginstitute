import React from 'react'
import NavBarComponent from './../components/NavBarComponent';
import ListCustomers from '../components/ListCustomers';
const CustomerPage = () => {
  return (
    <div>
        <NavBarComponent/>
        <ListCustomers />
    </div>
  )
}

export default CustomerPage