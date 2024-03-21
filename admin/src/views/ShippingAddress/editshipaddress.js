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
} from '@coreui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AlertContext from 'src/Context/Alert/AlertContext';

const Editshipaddress = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;

    const location = useLocation();
    const item = location.state;
    const [formData, setFormData] = useState({
        name: item.name,
        address: item.address,
        address2: item.address2,
        city: item.city,
        state: item.state,
        zip: item.zip,
        country: item.country,
        phone: item.phone,
        fax: item.fax,
        user: item.user.uuid
    });

    const [user, setUser] = useState([]);
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
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_address/${ID}/update`, {
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
                showAlert('Address Updated successfully','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to Update Address','danger');
            }
        } catch (error) {
           showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchUserTypes = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const usersData = await response.json();
            setUser(usersData);
        } catch (error) {
            showAlert(error, 'danger');
        }
    };

    useEffect(() => {
        fetchUserTypes();
    }, []);

    return (
        <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Update Shipping Address</strong>
            </CCardHeader>
            <CCardBody>
                <CForm className="bgForm" onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <CFormLabel htmlFor="name">Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="name"
                                placeholder="John Wick"
                                onChange={handleInputChange}
                                value={formData.name}
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <CFormLabel htmlFor="country">Country</CFormLabel>
                            <CFormInput
                                type="text"
                                id="country"
                                placeholder="e.g United State"
                                onChange={handleInputChange}
                                value={formData.country}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <CFormLabel htmlFor="address">Address</CFormLabel>
                            <CFormInput
                                type="text"
                                id="address"
                                placeholder="e.g.85 Street 14 William Road"
                                onChange={handleInputChange}
                                value={formData.address}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="mb-3">
                            <CFormLabel htmlFor="address2">Address 2</CFormLabel>
                            <CFormInput
                                type="text"
                                id="address2"
                                placeholder="e.g.85 Street 14 William Road"
                                onChange={handleInputChange}
                                value={formData.address2}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <CFormLabel htmlFor="city">City</CFormLabel>
                            <CFormInput
                                type="text"
                                id="city"
                                placeholder="Oregon"
                                onChange={handleInputChange}
                                value={formData.city}
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <CFormLabel htmlFor="state">State</CFormLabel>
                            <CFormInput
                                type="text"
                                id="state"
                                placeholder="New York"
                                onChange={handleInputChange}
                                value={formData.state}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <CFormLabel htmlFor="zip">Zip Code</CFormLabel>
                            <CFormInput
                                type="text"
                                id="zip"
                                placeholder="94356"
                                onChange={handleInputChange}
                                value={formData.zip}
                            />
                        </div>
                        <div className="mb-3 col-md-4">
                            <CFormLabel htmlFor="phone">Phone</CFormLabel>
                            <CFormInput
                                type="text"
                                id="phone"
                                placeholder="+1 123 456 7890"
                                onChange={handleInputChange}
                                value={formData.phone}
                            />
                        </div>
                        <div className="mb-3 col-md-4">
                            <CFormLabel htmlFor="fax">Fax</CFormLabel>
                            <CFormInput
                                type="text"
                                id="fax"
                                placeholder="(123)-456-7890"
                                onChange={handleInputChange}
                                value={formData.fax}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                            <CFormLabel htmlFor="user">User</CFormLabel>
                            <CFormSelect
                                aria-label="Default select example"
                                id="user"
                                onChange={handleInputChange}
                                value={formData.user}
                            >
                                <option>Select From DropDown</option>
                                {user.map((item) => (
                                    <option key={item.uuid} value={item.uuid}>
                                        {item.first_name + " " + item.last_name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </div>
                    </div>
                    <div className="mb-3">
                        <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating Address...' : 'Update Shipping Address'}
                        </CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    </CCol>
    );
}

export default Editshipaddress