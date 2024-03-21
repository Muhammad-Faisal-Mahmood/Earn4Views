import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
} from '@coreui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AlertContext from 'src/Context/Alert/AlertContext';

const EditImages = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        image_path: '',
        product_variant: item.product_variant
    });

    const [ProductsVariant, setProductsVariant] = useState([]);
    const [ID, setID] = useState(item.uuid)
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };


    const handleFormSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();

        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/image/${ID}/update`, {
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
                showAlert('Updated successfully','success');
            } else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Update Image Try Again Later','danger');
            }
        } catch (error) {
           showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchproduct = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/product_variant/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });

            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const VariantData = await response.json();
            setProductsVariant(VariantData);
        } catch (error) {
            showAlert(error,'danger');
        }
    };

    useEffect(() => {
        fetchproduct();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Update Images</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="mb-3 ">
                            <CFormLabel htmlFor="image_path">Image</CFormLabel>
                            <CFormInput
                                type="file"
                                id="image_path"
                                onChange={handleInputChange}
                                value={formData.image_path}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="product_variant">Product Variant</CFormLabel>
                            <CFormSelect
                                aria-label="Default select example"
                                id="product_variant"
                                onChange={handleInputChange}
                                value={formData.product_variant}
                            >
                                <option>Select From DropDown</option>
                                {ProductsVariant.map((item) => (
                                    <option key={item.uuid} value={item.uuid}>
                                        {item.name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating Image...' : 'Update Image'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default EditImages;
