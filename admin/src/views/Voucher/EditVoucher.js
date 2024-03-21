import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
} from '@coreui/react';
import React, { useContext, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import AlertContext from 'src/Context/Alert/AlertContext';


const EditVoucher = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        code: item.code,
        discount: item.discount,
        user: item.user.uuid,
        expiry_date: new Date(item.expiry_date)
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ID, setID] = useState(item.uuid)
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
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/voucher/${ID}/update`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Voucher Updated','success');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Update Voucher','danger');
            }
        } catch (error) {
            showAlert('Network Error Occured','danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const FetchUser = async () => {
        try {
          const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/',{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            }
        });
          const UsersData = await response.json();
          setUser(UsersData);
        } catch (error) {
          showAlert('Network Error Occured','danger')
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
                                <ReactDatePicker 
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
                                    value={formData.user}
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
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default EditVoucher