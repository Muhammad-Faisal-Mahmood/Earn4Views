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

const EditOrder = () => {
  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const location = useLocation();
  const item = location.state;

  const [formData, setFormData] = useState({
    quantity: item.quantity,
      product_variant:item.product_variant.uuid,
      order:item.order.uuid
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
      setIsSubmitting(true);
      e.preventDefault();

      try {
          const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/order_detail/${ID}/update`, {
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
              showAlert('Data Updated successfully', 'success')
          }else if (response.status === 401) {
            showAlert('Your Session Expired. Login Again', 'danger');
            // Assuming `navigate` is defined somewhere in your code
            navigate('/login');
        } else {
              // Handle errors, e.g., show an error message
              showAlert('Error Occured', 'danger')
          }
      } catch (error) {
          showAlert('Network Error', 'danger')
      } finally {
          setIsSubmitting(false);
      }
  };



  return (
      <CCol xs={12}>
          <CCard className="mb-4">
              <CCardHeader>
                  <strong>Edit Products</strong>
              </CCardHeader>
              <CCardBody>
                  <CForm className="bgForm" onSubmit={handleFormSubmit}>
                      <div className="row">
                          <div className="mb-3 col-md-6">
                              <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
                              <CFormInput
                                  type="number"
                                  id="quantity"
                                  placeholder="300"
                                  onChange={handleInputChange}
                                  value={formData.quantity}
                              />
                          </div>
                      </div>
                      <div className="mb-3">
                          <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                              {isSubmitting ? 'Updating Order Details...' : 'Update Order Detail'}
                          </CButton>
                      </div>
                  </CForm>
              </CCardBody>
          </CCard>
      </CCol>
  );
};

export default EditOrder;
