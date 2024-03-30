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
import AlertContext from 'src/Context/Alert/AlertContext';
import { BaseURL } from 'src/components/DataList';

const ApprovedTransaction = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const [transactions, settransactions] = useState([])

    const FetchService = async () => {
        try {
            const response = await fetch(`${BaseURL}/ApprovedTransaction`, {
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



    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>Last 30 Days Approved Transaction Data</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Transaction ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
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

export default ApprovedTransaction