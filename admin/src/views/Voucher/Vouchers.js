import {
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
import { useNavigate } from 'react-router-dom'
import AlertContext from 'src/Context/Alert/AlertContext';

const Vouchers = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const navigate = useNavigate()
    const [Vouchers, setVouchers] = useState([])

    const FetchVoucher = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/voucher',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            const VoucherData = await response.json();
            setVouchers(VoucherData);
        } catch (error) {
            showAlert('Network Error Occured','danger');
        }
    };

    useEffect(() => {
        FetchVoucher()
    }, []);

    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/voucher/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
                }
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Voucher Deleted successfully','success');
                FetchVoucher();
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured Try Again Later','danger');
            }
        } catch (error) {
            showAlert('Network Error Occured','danger');
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
                        <CTableHeaderCell>Code</CTableHeaderCell>
                        <CTableHeaderCell>Discount</CTableHeaderCell>
                        <CTableHeaderCell>Status</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Vouchers.length>0&&Vouchers.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                                <div>{item.code}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.discount}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div>{item.is_active ? 'Active' : 'Deactive'}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                                <div className="col">
                                    <CButton color="primary mx-2"
                                        onClick={() => {
                                            navigate("/users/editvoucher", { state: item });
                                        }}>
                                        Edit
                                    </CButton>
                                    <CButton color="danger mx-2" onClick={() => { DeleteFunction(item.uuid) }} style={{ color: "white" }}>Deactivate</CButton>
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

export default Vouchers