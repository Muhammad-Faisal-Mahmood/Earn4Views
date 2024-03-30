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

const NewWithdraw = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const [withdraws, setwithdraws] = useState([])

    const FetchWithdraw = async () => {
        try {
            const response = await fetch(`${BaseURL}/getNewWithdraw`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const withdrawData = await response.json();
            setwithdraws(withdrawData.withdraw);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchWithdraw()
    }, [])

    const Approvewithdraw = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/ApproveWithdraw/${id}/`, {
                method: 'PUT',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('withdraw Approved', 'success');
                FetchWithdraw()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert('network Error Occured', 'danger')
        }
    }

    const Declinewithdraw = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/DeclineWithdraw/${id}/`, {
                method: 'PUT',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('withdraw Declined', 'success');
                FetchWithdraw()
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
                    <CCardHeader>New withdraw Request Data</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {withdraws?.map((item, index) => (
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
                                                <div>{item.Date}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="col">
                                                    <CButton 
                                                        color="primary mx-2"
                                                        onClick={()=>{Approvewithdraw(item._id)}}
                                                    >
                                                        Approve
                                                    </CButton>

                                                    <CButton 
                                                        color="danger mx-2" 
                                                        onClick={() => { Declinewithdraw(item._id) }} 
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

export default NewWithdraw