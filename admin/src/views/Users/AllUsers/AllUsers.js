import {
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from 'src/Context/Alert/AlertContext';

const AllUsers = () => {
  const AletContext = useContext(AlertContext);
  const {showAlert} = AletContext;

  const navigate=useNavigate()

  const [Users, setUsers] = useState([])

  const FetchUser = async () => {
    try {
      const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/',{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        }
    });
    if (response.status === 401) {
      showAlert('Your Session Expired. Login Again', 'danger');
      // Assuming `navigate` is defined somewhere in your code
      navigate('/login');
  }
      const UsersData = await response.json();
      setUsers(UsersData);
    } catch (error) {
      showAlert(error,'danger');
    }
  };


  useEffect(() => {
    FetchUser()
  }, [])

  const DeleteFunction = async (id) => {
    try {
        const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/${id}/`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
            }
        });
        if (response.ok) {
            // Handle success, e.g., show a success message or redirect
            showAlert('User Deleted successfully','success');
            FetchUser();
        }else if (response.status === 401) {
          showAlert('Your Session Expired. Login Again', 'danger');
          // Assuming `navigate` is defined somewhere in your code
          navigate('/login');
      } else {
            // Handle errors, e.g., show an error message
            showAlert('Error Occured Try Again Later','danger');
        }
    } catch (error) {
        showAlert(error,'danger');
    }
}

  return (
    <CRow>
    <CCol xs>
      <CCard className="mb-4">
        <CCardHeader>Brands Data</CCardHeader>
        <CCardBody>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>First Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>User Type</CTableHeaderCell>
            <CTableHeaderCell>Current Points</CTableHeaderCell>
            <CTableHeaderCell>Activity</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item.first_name}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.last_name}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.user_type.name!=""?item.user_type.name:'None'}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">
                  <div className="float-start">
                    <strong>50%</strong>
                  </div>
                </div>
                <CProgress thin value={50} />
              </CTableDataCell>
              <CTableDataCell>
                <div className="col">
                  <CButton color="primary mx-2" 
                  onClick={()=>{
                    navigate("/users/edituser", { state: item });
                  }}>
                    Edit
                  </CButton>
                  <CButton color="danger mx-2" onClick={()=>{DeleteFunction(item.uuid)}} style={{color:"white"}}>Delete</CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCardBody>
    </CCard>
    </CCol>
    </CRow>
  )
}

export default AllUsers
