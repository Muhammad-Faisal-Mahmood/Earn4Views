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

const Shippingaddress = () => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate = useNavigate()

    const [Address, setAddress] = useState([])

    const FetchAddress = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_address',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const AddressData = await response.json();
            setAddress(AddressData);
        } catch (error) {
            showAlert(error, 'danger');
        }
    };


    useEffect(() => {
        FetchAddress()
    }, [])

    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_address/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
                }
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Address De-Activated successfully', 'success');
                FetchAddress();
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured Try Again Later', 'danger');
            }
        } catch (error) {
            showAlert(error, 'danger');
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
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>City</CTableHeaderCell>
                                    <CTableHeaderCell>Country</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {Address.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell>
                                            <div>{item.name}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.city}</div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <div>{item.country}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.is_active? "Active":'DeActive'}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="col">
                                                <CButton color="primary mx-2"
                                                    onClick={() => {
                                                        navigate("/users/editshipaddress", { state: item });
                                                    }}>
                                                    Edit
                                                </CButton>
                                                <CButton color="danger mx-2" onClick={() => { DeleteFunction(item.uuid) }} style={{ color: "white" }}>De-Activate</CButton>
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

export default Shippingaddress