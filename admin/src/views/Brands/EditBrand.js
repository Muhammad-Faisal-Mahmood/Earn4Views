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
    CFormTextarea,
} from '@coreui/react';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import AlertContext from 'src/Context/Alert/AlertContext';


const EditBrand = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        name: item.name,
        small_logo: item.small_logo,
        large_logo: item.large_logo,
        short_description: item.short_description,
        long_description: item.long_description,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ID, setID] = useState(item.uuid)



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
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/brand/${ID}/update`, {
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
                showAlert('Brand Updated', 'success');
            } else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Update Brand','danger');
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
                    <strong>Edit Brand</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="name">Brand Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    placeholder="Yezzy"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="short_description">Short Description</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="short_description"
                                    placeholder="Brand Give best leather products"
                                    onChange={handleInputChange}
                                    value={formData.short_description}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="small_logo">Small Logo</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="small_logo"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="large_logo">Large Logo</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="large_logo"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="long_description">Long Description</CFormLabel>
                                <CFormTextarea
                                    id="long_description"
                                    placeholder="e.g About Brand Details"
                                    onChange={handleInputChange}
                                    value={formData.long_description}
                                    rows="3">
                                </CFormTextarea>
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

export default EditBrand