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
import AlertContext from 'src/Context/Alert/AlertContext';

const AddOption = () => {
    const AletContext = useContext(AlertContext);
    const {showAlert} = AletContext;
    const [formData, setFormData] = useState({
        name: '',
        option_group: '',
    });

    const [OptionGroup, setOptionGroup] = useState([]);
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
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/option/create', {
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
                showAlert('Option added successfully','success');
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Failed to add option','danger');
            }
        } catch (error) {
            showAlert(error,'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchgroup = async () => {
        try {
            const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/products/option_group/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const groupData = await response.json();
            setOptionGroup(groupData);
        } catch (error) {
            showAlert(error,'danger');
        }
    };

    useEffect(() => {
        fetchgroup();
    }, []);

    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add Option</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3">
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
                            <div className="mb-3">
                                <CFormLabel htmlFor="option_group">Group Option</CFormLabel>
                                <CFormSelect
                                    aria-label="Default select example"
                                    id="option_group"
                                    onChange={handleInputChange}
                                >
                                    <option>Select From DropDown</option>
                                    {OptionGroup.map((item) => (
                                        <option key={item.uuid} value={item.uuid}>
                                            {item.name}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding Option...' : 'Add Option'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default AddOption;
