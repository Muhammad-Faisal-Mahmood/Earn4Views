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
    CCardBody,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormSelect,
    CModal,
    CFormInput,
    CModalFooter
} from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from 'src/Context/Alert/AlertContext';
import { BaseURL, ChannelsList } from 'src/components/DataList';

const Plans = () => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    // const navigate = useNavigate()
    const [id, setid] = useState('')
    const [ModelTitle, setModelTitle] = useState('')
    const [Plans, setPlans] = useState([])
    const [visible, setVisible] = useState(false)
    const [form, setform] = useState({
        Channel: '',
        Service: '',
        Price: ''
    })

    const handleInputChange = (e) => {
        setform({
            ...form,
            [e.target.id]: e.target.value,
        });
    };


    const FetchPlans = async () => {
        try {
            const response = await fetch(`${BaseURL}/getPlans`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const PlansData = await response.json();
            setPlans(PlansData.plan);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchPlans()
    }, [])

    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/deletePlan/${id}/`, {
                method: 'DELETE',
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Service Plan Deleted', 'success');
                FetchPlans()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert('network Error Occured', 'danger')
        }
    }

    const CreatePlan = async () => {
        try {
            const response = await fetch(`${BaseURL}/createPlan`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                },
                body: JSON.stringify(form),
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Admin Plan Created', 'success');
                FetchPlans()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    const EditPlan = async () => {
        try {
            const response = await fetch(`${BaseURL}/updatePlan/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                },
                body: JSON.stringify(form),
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Service plan Updated', 'success');
                FetchPlans()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }


    return (
        <>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">{ModelTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="d-flex flex-column gap-2">
                        <CFormSelect
                            name='Channel'
                            id='Channel'
                            aria-label="Default select example"
                            value={form.Channel}
                            onChange={handleInputChange}
                        >
                            <option>Select Channel</option>
                            {ChannelsList.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </CFormSelect>
                        <CFormInput
                            type="text"
                            name='Service'
                            id="Service"
                            placeholder="Sub Service"
                            value={form.Service}
                            onChange={handleInputChange}
                        />
                        <CFormInput
                            type="number"
                            name='Price'
                            id="Price"
                            value={form.Price}
                            onChange={handleInputChange}
                            placeholder="0.06"
                        />
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton
                        color="primary"
                        onClick={() => {
                            if (ModelTitle == 'Add New Plan') {
                                CreatePlan();
                            } else {
                                EditPlan()
                            }
                        }}
                    >
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>

            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader className='d-flex flex-row justify-content-between'>
                            Plans Data
                            <CButton
                                color="primary"
                                onClick={() => {
                                    setModelTitle("Add New Plan")
                                    setVisible(!visible)
                                }}
                            >
                                Add New Plan
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell>Chaneel</CTableHeaderCell>
                                        <CTableHeaderCell>Service</CTableHeaderCell>
                                        <CTableHeaderCell>Price</CTableHeaderCell>
                                        <CTableHeaderCell>Activity</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {Plans?.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell>
                                                <div>{item.Channel}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.Service}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.Price}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="col">
                                                    <CButton color="primary mx-2"
                                                        onClick={() => {
                                                            setModelTitle("EditPlan")
                                                            setVisible(!visible)
                                                            setid(item?._id)
                                                            setform({
                                                                Channel: item.Channel,
                                                                Service: item.Service,
                                                                Price: item.Price
                                                            })
                                                        }}
                                                    >
                                                        Edit
                                                    </CButton>
                                                    <CButton
                                                        color="danger mx-2"
                                                        onClick={() => {
                                                            DeleteFunction(item._id)
                                                        }}
                                                        style={{ color: "white" }}
                                                    >
                                                        Delete
                                                    </CButton>
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
        </>
    )
}

export default Plans