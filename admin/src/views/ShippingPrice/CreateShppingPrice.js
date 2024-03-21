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


const CreateShippingPrice = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const [formData, setFormData] = useState({
        country: '',
        price: 0
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
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_price/create', {
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
                showAlert('New Shipping Price Added','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                const responsedata = await response.json()
                showAlert(responsedata.country,'danger');
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
                    <strong>Add Shipping Price</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="country">Country</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="country"
                                    placeholder="United State"
                                    onChange={handleInputChange}
                                    value={formData.country}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="price">Price</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="price"
                                    placeholder="25"
                                    onChange={handleInputChange}
                                    value={formData.price}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add Shipping Price'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default CreateShippingPrice