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

const EditProduct = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        sku: item.sku,
        name: item.name,
        price: item.price,
        rating: item.rating,
        short_description: item.short_description,
        long_description: item.long_description,
        thumbnail: item.thumbnail,
        stock_count: item.stock_count,
        live: item.live,
        cover: item.cover,
        popular: item.popular,
        brand: item.brand.uuid,
    });

    const [Brands, setBrands] = useState([]);
    const [ID, setID] = useState(item.uuid)
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.checked,
        });
    };

    const handleFormSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();

        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/product/${ID}/update`, {
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
                showAlert('Data Update Success','success')
            } else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured','danger')
            }
        } catch (error) {
           showAlert('Network Error','danger')
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchbrand = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/brand/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const brandData = await response.json();
            setBrands(brandData);
        } catch (error) {
            showAlert('Network Error','danger')
        }
    };

    useEffect(() => {
        fetchbrand();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Update Products</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="sku">Sku</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="sku"
                                    placeholder="1M98"
                                    onChange={handleInputChange}
                                    value={formData.sku}
                                />
                            </div>
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
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="price">Price</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="price"
                                    placeholder="9453"
                                    onChange={handleInputChange}
                                    value={formData.price}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="rating">Rating</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="rating"
                                    placeholder="4.5"
                                    onChange={handleInputChange}
                                    value={formData.rating}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="thumbnail">Thumbnail Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="thumbnail"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="brand">Brand</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="brand"
                                    onChange={handleInputChange}
                                    value={formData.brand}
                                >
                                    <option>Select From DropDown</option>
                                    {Brands.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="stock_count">Stock Count</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="stock_count"
                                    placeholder="200"
                                    onChange={handleInputChange}
                                    value={formData.stock_count}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="Selection">Select</CFormLabel>
                                <div className="row">
                                    <CFormCheck
                                        id="live"
                                        label="Live"
                                        className="col-2 mx-2"
                                        onChange={handleCheckboxChange}
                                        checked={formData.live}
                                    />
                                    <CFormCheck
                                        id="cover"
                                        label="Cover"
                                        className="col-3"
                                        onChange={handleCheckboxChange}
                                        checked={formData.cover}
                                    />
                                    <CFormCheck
                                        id="popular"
                                        label="Popular"
                                        className="col-3"
                                        onChange={handleCheckboxChange}
                                        checked={formData.popular}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="short_description">Short Description</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="short_description"
                                    placeholder="e.g Explain Shortly"
                                    onChange={handleInputChange}
                                    value={formData.short_description}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="long_description">Long Description</CFormLabel>
                                <CFormTextarea
                                    id="long_description"
                                    placeholder="e.g Product Description"
                                    onChange={handleInputChange}
                                    value={formData.long_description}
                                    rows="3">
                                </CFormTextarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating Product...' : 'Update'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default EditProduct;
