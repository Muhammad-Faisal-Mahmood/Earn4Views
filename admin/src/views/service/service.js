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

const service = () => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const navigate = useNavigate()
    const [Service, setService] = useState([])

    const FetchService = async () => {
        try {
            const response = await fetch(`${BaseURL}/GoingOnServices`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const ServiceData = await response.json();
            setService(ServiceData.service);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchService()
    }, [])

    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/deleteService/${id}/`, {
                method: 'DELETE',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Service Deleted', 'success');
                FetchEarning()
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
                    <CCardHeader>New Servcies Data</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Channel</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Completed Till Now</CTableHeaderCell>
                                    <CTableHeaderCell>URL</CTableHeaderCell>
                                    <CTableHeaderCell>Total</CTableHeaderCell>
                                    <CTableHeaderCell>Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {Service?.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell>
                                            <div>{item.Channel}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.Service}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.Amount}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item?.workerTrackCount}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.URL}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div>{item.Total?item.Total:'Admin Service'}</div>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="col">
                                                <CButton color="primary mx-2"
                                                    onClick={() => {
                                                        navigate("/service/editservice", { state: item });
                                                    }}>
                                                    Edit
                                                </CButton>
                                                <CButton color="danger mx-2" onClick={() => { DeleteFunction(item._id) }} style={{ color: "white" }}>Deactivate</CButton>
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

export default service