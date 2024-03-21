import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect
} from '@coreui/react';
import DatePicker from "react-datepicker";
import React, { useContext, useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import AlertContext from 'src/Context/Alert/AlertContext';


const AddVoucher = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    
    const [formData, setFormData] = useState({
        code: '',
        discount: 0,
        user: 0,
        expiry_date: new Date()
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState([]);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        // date parameter is the selected date from DatePicker
        setFormData({
          ...formData,
          expiry_date: date,
        });
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/voucher/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Voucher Added Successfully','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Add Voucher','danger');
            }
        } catch (error) {
            showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const FetchUser = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/',{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzMTk5Njg2LCJpYXQiOjE3MDMxOTc4ODYsImp0aSI6ImQyZDFkZTRiOGU4ODQ4NWE4N2VhZTMwZjMwOTNiZWYyIiwidXNlcl9pZCI6IjI1MzFhZjNmLTM4MDAtNDczYS1iYjZiLWZkZTc3MWU4MTdhOSJ9.cuW2-mJtaa0dexES2-u5fqZtI-YZoE3VACOJoYpbXrk',
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const UsersData = await response.json();
            setUser(UsersData);
        } catch (error) {
            showAlert('Network Error Occured', 'danger' );
        }
    };


    useEffect(() => {
        FetchUser()
    }, [])

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Edit Voucher</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="code">Code</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="code"
                                    placeholder="9S1G"
                                    onChange={handleInputChange}
                                    value={formData.code}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="discount">Discount</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="discount"
                                    placeholder="2.5"
                                    onChange={handleInputChange}
                                    value={formData.discount}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6" style={{display:"flex", flexDirection:'column'}}>
                                <CFormLabel htmlFor="expiry_date">Expiry Date</CFormLabel>
                                <DatePicker 
                                    id="expiry_date"
                                    onChange={(date) => handleDateChange(date)} 
                                    selected={formData.expiry_date} />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="user">User Type</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="user"
                                    onChange={handleInputChange}
                                >
                                    <option>Select From DropDown</option>
                                    {user.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.first_name + ' ' + item.last_name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default AddVoucher