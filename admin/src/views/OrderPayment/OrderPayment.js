import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CAvatar,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
  import React, { useContext, useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import AlertContext from 'src/Context/Alert/AlertContext';
  
  const OrderPayment = () => {
  
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const navigate = useNavigate()
    const [OrderPayment, setOrdersPayment] = useState([])
    const FetchData = async () => {
        try {
            const response = await fetch('http://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/payment/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const ProductData = await response.json();
            setOrdersPayment(ProductData);
        } catch (error) {
            showAlert('Network Error Occured','danger')
        }
    };
  
    useEffect(() => {
        FetchData()
    }, [])

  
    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/payment/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
                }
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Dleted Successfully','success')
                FetchData();
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured','danger')
            }
        } catch (error) {
            showAlert('network Error Occured','danger')
        }
    }

    
    return (
        <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Order Payment Data</CCardHeader>
            <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell>User Name</CTableHeaderCell>
                        <CTableHeaderCell>State</CTableHeaderCell>
                        <CTableHeaderCell>User Type</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {OrderPayment.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                                <div>{item.order.user.first_name + " " + item.order.user.first_name}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.state}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.order.user.user_type.name}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.is_active?"Active":"Deactive"}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div className="col">
                                    <CButton color="primary mx-2"
                                        onClick={() => {
                                            navigate("/order/editorderPayment", { state: item });
                                        }}>
                                        Edit
                                    </CButton>
                                    <CButton color="danger mx-2" onClick={() => { DeleteFunction(item.uuid) }} style={{ color: "white" }}>Delete</CButton>
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
  
  export default OrderPayment