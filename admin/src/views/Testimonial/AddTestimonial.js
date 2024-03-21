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
    CFormTextarea
} from '@coreui/react';
import React, { useContext, useEffect, useState } from 'react';
import AlertContext from 'src/Context/Alert/AlertContext';


const AddTestimonial = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    
    const [formData, setFormData] = useState({
        display_image: '',
        rating: 0,
        customer_name: '',
        message: '',
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
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/testimonial/create`, {
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
                showAlert('Testimonial Added Successfully','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Add Testimonial','danger');
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
                    <strong>Add Testimonial</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="display_image">Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="display_image"
                                    onChange={handleInputChange}
                                    value={formData.display_image}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="customer_name">Customer Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="customer_name"
                                    placeholder="John Deff"
                                    onChange={handleInputChange}
                                    value={formData.customer_name}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="rating">Rating</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="rating"
                                    placeholder="2.5"
                                    onChange={handleInputChange}
                                    value={formData.rating}
                                />
                            </div>
                        </div>
                        <div className="row">
                        <div className="mb-3">
                                <CFormLabel htmlFor="message">Message</CFormLabel>
                                <CFormTextarea
                                    id="message"
                                    placeholder="e.g Welcoming Message"
                                    onChange={handleInputChange}
                                    value={formData.message} 
                                    rows="3">
                                    </CFormTextarea>
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

export default AddTestimonial