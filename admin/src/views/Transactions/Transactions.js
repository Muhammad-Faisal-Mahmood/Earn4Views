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
import { BaseURL } from 'src/components/DataList';

const NewTransaction = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const [transactions, settransactions] = useState([])

    const FetchService = async () => {
        try {
            const response = await fetch(`${BaseURL}/getNewTransaction`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const transactionData = await response.json();
            settransactions(transactionData.transaction);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchService()
    }, [])

    const ApproveTransaction = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/ApproveTransaction/${id}/`, {
                method: 'PUT',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Transaction Approved', 'success');
                FetchService()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert('network Error Occured', 'danger')
        }
    }

    const DeclineTransaction = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/DeclineTransaction/${id}/`, {
                method: 'PUT',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Transaction Declined', 'success');
                FetchService()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert('network Error Occured', 'danger')
        }
    }


    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>New Transaction Request Data</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Transaction ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {transactions?.map((item, index) => (
                                    <>
                                        <CTableRow v-for="item in tableItems" key={index} style={{ cursor: "pointer" }}>
                                            <CTableDataCell>
                                                <div>{item?.User_id?.Name}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item?.User_id?.Email}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.Amount}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.TID}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.Date}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="col">
                                                    <CButton 
                                                        color="primary mx-2"
                                                        onClick={()=>{ApproveTransaction(item._id)}}
                                                    >
                                                        Approve
                                                    </CButton>

                                                    <CButton 
                                                        color="danger mx-2" 
                                                        onClick={() => { DeclineTransaction(item._id) }} 
                                                        style={{ color: "white" }}
                                                    >
                                                        Decline
                                                    </CButton>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    </>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default NewTransaction