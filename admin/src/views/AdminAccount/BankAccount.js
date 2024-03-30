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
    CCardBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormSelect,
    CFormInput,
    CCardTitle,
    CCardSubtitle,
    CCardText
} from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import AlertContext from 'src/Context/Alert/AlertContext';
import { BanksList, BaseURL } from 'src/components/DataList';

const BankAccount = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [Account, setAccount] = useState([])
    const [visible, setVisible] = useState(false)
    const [ModelTitle, setModelTitle] = useState('')
    const [id, setid] = useState('')

    const [form, setform] = useState({
        BankAccount: '',
        Account_No: '',
        Account_Title: ''
    })

    const FetchAccount = async () => {
        try {
            const response = await fetch(`${BaseURL}/adminPayment`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const AccountData = await response.json();
            setAccount(AccountData.adminPayment);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchAccount()
    }, [])

    const CreatePayment = async () => {
        try {
            const response = await fetch(`${BaseURL}/adminPayment`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                },
                body: JSON.stringify(form),
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Admin Pyament Created', 'success');
                FetchAccount()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    const EditPayment = async () => {
        try {
            const response = await fetch(`${BaseURL}/adminPayment/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                },
                body: JSON.stringify(form),
            });
            const data = await response.json()
            if (data.success) {
                showAlert('Admin Pyament Updated', 'success');
                FetchAccount()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    const handleInputChange = (e) => {
        setform({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

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
                            name='BankAccount'
                            id='BankAccount'
                            aria-label="Default select example"
                            value={form.BankAccount}
                            onChange={handleInputChange}
                        >
                            <option>Select Bank</option>
                            {BanksList.map((item, index) => (
                                <option value={item.name} key={index}>{item.name}</option>
                            ))}
                        </CFormSelect>
                        <CFormInput
                            type="text"
                            name='Account_Title'
                            id="Account_Title"
                            placeholder="Account Holder Name"
                            value={form.Account_Title}
                            onChange={handleInputChange}
                        />
                        <CFormInput
                            type="text"
                            name='Account_No'
                            id="Account_No"
                            value={form.Account_No}
                            onChange={handleInputChange}
                            placeholder="0000111122223333"
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
                            if (ModelTitle == 'Create Payment') {
                                CreatePayment();
                            }else{
                                EditPayment()
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
                            Admin Bank Account

                            {Account?.length > 0 ?
                                <CButton
                                    color="primary"
                                    onClick={() => {
                                        setModelTitle("Edit")
                                        setVisible(!visible)
                                        setid(Account[0]?._id)
                                        setform({
                                            BankAccount: Account[0]?.BankAccount,
                                            Account_No: Account[0]?.Account_No,
                                            Account_Title: Account[0]?.Account_Title
                                        })
                                    }}
                                >
                                    Edit
                                </CButton>
                                :
                                <CButton
                                    color="primary"
                                    onClick={() => {
                                        setModelTitle("Create Payment")
                                        setVisible(!visible)
                                    }}
                                >
                                    Create Payment
                                </CButton>
                            }
                        </CCardHeader>
                        <CCardBody>
                            {Account?.length > 0 &&
                                <CCard style={{ width: '18rem' }}>
                                    <CCardBody>
                                        <CCardTitle>{Account[0].BankAccount}</CCardTitle>
                                        <CCardSubtitle className="mb-2 text-medium-emphasis">Account Holder</CCardSubtitle>
                                        <CCardText>{Account[0].Account_No}</CCardText>
                                        <CCardSubtitle className="mb-2 text-medium-emphasis">Account Number</CCardSubtitle>
                                        <CCardText>{Account[0].Account_Title}</CCardText>
                                    </CCardBody>
                                </CCard>
                            }
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default BankAccount