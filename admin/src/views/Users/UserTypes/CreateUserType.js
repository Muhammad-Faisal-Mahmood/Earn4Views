import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
} from '@coreui/react';
import React, { useContext, useState } from 'react';
import AlertContext from 'src/Context/Alert/AlertContext';
const CreateUserType = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const [formData, setFormData] = useState({
        name: '',
        discount_allowed: 0,
        percentage_commission: 0,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user_type/create', {
                method: 'POST',
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
                showAlert('New User Type Success','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to add user','success');
            }
        } catch (error) {
            showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add User</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="name">Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    placeholder="Superior"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="discount_allowed">Discount Allowed</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="discount_allowed"
                                    placeholder="2.5"
                                    onChange={handleInputChange}
                                    value={formData.discount_allowed}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="percentage_commission">Percentage Commission</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="percentage_commission"
                                    placeholder="1.5"
                                    onChange={handleInputChange}
                                    value={formData.percentage_commission}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding User...' : 'Add User Type'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default CreateUserType