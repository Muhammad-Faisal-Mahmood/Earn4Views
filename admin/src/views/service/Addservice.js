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
import { BaseURL, ChannelsList } from 'src/components/DataList';


const Addservice = () => {
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [Plans, setPlans] = useState([])
    const [formData, setFormData] = useState({
        Channel: '',
        Servicetaken: '',
        Amount: '',
        URL: '',
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
            const response = await fetch(`${BaseURL}/createService`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json()
            if (data.success) {
                showAlert('Service Added', 'success');
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error, 'danger');
        } finally {
            setIsSubmitting(false);
        }
    };


    const FetchPlans = async () => {
        try {
            const response = await fetch(`${BaseURL}/getPlans`, {
                headers: {
                    'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                }
            });
            const PlansData = await response.json();
            setPlans(PlansData.plan);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        FetchPlans()
    }, [])
    


    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add Service</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="Channel">Channel</CFormLabel>
                                <CFormSelect
                                    name='Channel'
                                    id='Channel'
                                    aria-label="Default select example"
                                    value={formData.Channel}
                                    onChange={handleInputChange}
                                >
                                    <option>Select Channel</option>
                                    {ChannelsList.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="Servicetaken">Service</CFormLabel>
                                <CFormSelect
                                    name='Servicetaken'
                                    id='Servicetaken'
                                    aria-label="Default select example"
                                    value={formData.Servicetaken}
                                    onChange={handleInputChange}
                                >
                                    <option>Select Service</option>
                                    {Plans?.map((item, index) => (
                                        <option value={item.Service} key={index}>{item.Service}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="Amount">Amount</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="Amount"
                                    placeholder="10000"
                                    onChange={handleInputChange}
                                    value={formData.Amount}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <CFormLabel htmlFor="URL">URL</CFormLabel>
                                <CFormInput
                                    id="URL"
                                    placeholder="http://example.com"
                                    onChange={handleInputChange}
                                    value={formData.URL}>
                                </CFormInput>
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

export default Addservice