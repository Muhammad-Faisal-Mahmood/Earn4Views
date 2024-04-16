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
    // const [BulkAmount, setBulkAmount] = useState(0);
    const [Bulkentry, setBulkentry] = useState(false)
    const [BulkURL, setBulkURL] = useState('')



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

    const BulkFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const linkArray = BulkURL.split('\n').filter(BulkURL => BulkURL.trim() !== '');
            const requests = linkArray.map(async (item) => {
                const response = await fetch(`${BaseURL}/createService`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
                    },
                    body: JSON.stringify({
                        Channel: formData.Channel,
                        Servicetaken: formData.Servicetaken,
                        Amount: formData.Amount,
                        URL: item,
                    }),
                });
                const data = await response.json();
                if (!data.success) {
                    showAlert(data.message, 'danger');
                }
                return data.success;
            });
    
            await Promise.all(requests);
    
            showAlert('Services Added', 'success');
    
        } catch (error) {
            showAlert(error.message, 'danger');
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
                    <div className='d-flex justify-content-between align-item-center'>
                        <strong>Add Service</strong>
                        <div className="d-flex">
                            <CFormLabel htmlFor="Bulk" style={{ marginRight: "10px" }}>Bulk Select</CFormLabel>
                            <input
                                type="checkbox"
                                id="Bulk"
                                onChange={() => { setBulkentry(!Bulkentry) }}
                            />
                        </div>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CForm className="bgForm" onSubmit={(e) => {
                        e.preventDefault()
                        Bulkentry ? BulkFormSubmit(e) : handleFormSubmit(e)
                    }}>
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
                        {/* {Bulkentry && <div className="row">
                            <div className="mb-3 col-md-4">
                                <CFormLabel htmlFor="BulkAmount">How Much Entries You want to do</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="BulkAmount"
                                    placeholder="10"
                                    onChange={(e) => { setBulkAmount(e.target.value) }}
                                    value={BulkAmount}
                                />
                                <p>Max 10 at 1 Time</p>
                            </div>
                        </div>} */}
                        {Bulkentry ? (
                            <>
                                <div className="row" >
                                    <div className="mb-3">
                                        <CFormLabel htmlFor={`BulkURL`}>URL</CFormLabel>
                                        <CFormTextarea
                                            rows={5}
                                            id={`BulkURL`}
                                            placeholder="http://example.com"
                                            onChange={(e) => {
                                                setBulkURL(e.target.value);
                                            }}
                                            value={BulkURL}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="row">
                                <div className="mb-3">
                                    <CFormLabel htmlFor="URL">URL</CFormLabel>
                                    <CFormInput
                                        id="URL"
                                        placeholder="http://example.com"
                                        onChange={handleInputChange}
                                        value={formData.URL}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mb-3">
                            <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody >
            </CCard >
        </CCol >
    )
}

export default Addservice