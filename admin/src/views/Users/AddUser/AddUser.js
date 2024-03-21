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
import AlertContext from 'src/Context/Alert/AlertContext';

const AddUser = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        user_type: '',
        is_staff: false,
        is_superuser: false,
    });

    const [userTypes, setUserTypes] = useState([]);
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
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user/create', {
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
                showAlert('User added successfully','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to add user','danger');
            }
        } catch (error) {
           showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchUserTypes = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user_type/',{
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
            setUserTypes(usersData);
        } catch (error) {
            showAlert(error,'danger');
        }
    };

    useEffect(() => {
        fetchUserTypes();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add User</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="first_name"
                                    placeholder="John"
                                    onChange={handleInputChange}
                                    value={formData.first_name}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="last_name"
                                    placeholder="Harli"
                                    onChange={handleInputChange}
                                    value={formData.last_name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="username">User Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="username"
                                    placeholder="johnHarli"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="password">Password</CFormLabel>
                                <CFormInput
                                    type="password"
                                    id="password"
                                    placeholder="*******"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="email">Email address</CFormLabel>
                            <CFormInput
                                type="email"
                                id="email"
                                placeholder="name@example.com"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="user_type">User Type</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="user_type"
                                    onChange={handleInputChange}
                                >
                                    <option>Select From DropDown</option>
                                    {userTypes.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                            <div className="mb-3 col-md-6">
                                <CFormLabel htmlFor="Selection">Select</CFormLabel>
                                <div className="row">
                                    <CFormCheck
                                        id="is_staff"
                                        label="Staff"
                                        className="col-2 mx-2"
                                        onChange={handleCheckboxChange}
                                        checked={formData.is_staff}
                                    />
                                    <CFormCheck
                                        id="is_superuser"
                                        label="Super User"
                                        className="col-3"
                                        onChange={handleCheckboxChange}
                                        checked={formData.is_superuser}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding User...' : 'Add User'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default AddUser;
