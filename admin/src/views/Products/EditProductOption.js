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

const EditProductOption = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        name: item.name,
        stock_count: item.stock_count,
        option: item.option.uuid,
        product_variant: item.product_variant
    });

    const [Variant, setVariant] = useState([]);
    const [Option, setOption] = useState([]);
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
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/product_option/${ID}/update`, {
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
                showAlert("Data Updated Successfully","success")
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured',"danger")
            }
        } catch (error) {
           showAlert('Error Occured','danger')
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchvariants = async () => {
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
            const variantData = await response.json();
            setVariant(variantData);
        } catch (error) {
            showAlert('Unable to load Variant','danger')
        }
    };

    const fetchoption = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/option/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const optionData = await response.json();
            setOption(optionData);
        } catch (error) {
            showAlert('Unable to load option','danger')
        }
    };

    useEffect(() => {
        fetchvariants();
        fetchoption();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add Products</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="name">Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    placeholder="Nike Shoes 98"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="stock_count">Stock Count</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="stock_count"
                                    placeholder="9453"
                                    onChange={handleInputChange}
                                    value={formData.stock_count}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="option">Option</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="option"
                                    onChange={handleInputChange}
                                    value={formData.option}
                                >
                                    <option>Select From DropDown</option>
                                    {Option.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="product_variant">Product Variant</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="product_variant"
                                    onChange={handleInputChange}
                                    value={formData.product_variant}
                                >
                                    <option>Select From DropDown</option>
                                    {Variant.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating Product Option...' : 'Update Product Option'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default EditProductOption;
