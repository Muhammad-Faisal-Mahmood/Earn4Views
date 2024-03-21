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
      amount: item.amount,
      shipping_amount: item.shipping_amount,
      order_date: item.order_date,
      shipping_status: item.shipping_status,
      tracking_number: item.tracking_number,
      order_status: item.order_status,
      user: item.shipping_address.user.uuid,
      voucher: item.voucher.uuid,
      shipping_address: item.shipping_address.uuid,
  });

  const [user, setuser] = useState([]);
  const [voucher, setvoucher] = useState([]);
  const [address, setaddress] = useState([]);
  const [shipprice, setshipprice] = useState([]);
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
          const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/order/${ID}/update`, {
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

  const fetchuser = async () => {
      try {
          const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/user',{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            }
        });
        if (response.status === 401) {
            showAlert('Your Session Expired. Login Again', 'danger');
            // Assuming `navigate` is defined somewhere in your code
            navigate('/login');
        }
          const userData = await response.json();
          setuser(userData);
      } catch (error) {
          showAlert('Network Error', 'danger')
      }
  };

  const fetchvoucher = async () => {
      try {
          const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/voucher/',{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            }
        });
        if (response.status === 401) {
            showAlert('Your Session Expired. Login Again', 'danger');
            // Assuming `navigate` is defined somewhere in your code
            navigate('/login');
        }
          const voucherData = await response.json();
          setvoucher(voucherData);
      } catch (error) {
          showAlert('Network Error', 'danger')
      }
  };

  const fetchaddress = async () => {
      try {
          const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_address/',{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            }
        });
        if (response.status === 401) {
            showAlert('Your Session Expired. Login Again', 'danger');
            // Assuming `navigate` is defined somewhere in your code
            navigate('/login');
        }
          const addressData = await response.json();
          setaddress(addressData);
      } catch (error) {
          showAlert('Network Error', 'danger')
      }
  };

  const fetchshiprice = async () => {
      try {
          const response = await fetch('https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/users/shipping_price/',{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
            }
        });
        if (response.status === 401) {
            showAlert('Your Session Expired. Login Again', 'danger');
            // Assuming `navigate` is defined somewhere in your code
            navigate('/login');
        }
          const shipData = await response.json();
          setshipprice(shipData);
      } catch (error) {
          showAlert('Network Error', 'danger')
      }
  };

  useEffect(() => {
      fetchshiprice();
      fetchvoucher();
      fetchuser();
      fetchaddress();
  }, []);

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
                              <CFormLabel htmlFor="amount">Amount</CFormLabel>
                              <CFormInput
                                  type="number"
                                  id="amount"
                                  placeholder="300"
                                  onChange={handleInputChange}
                                  value={formData.amount}
                              />
                          </div>
                          <div className="mb-3 col-md-6">
                              <CFormLabel htmlFor="order_status">Status</CFormLabel>
                              <CFormInput
                                  type="text"
                                  id="order_status"
                                  placeholder="300"
                                  onChange={handleInputChange}
                                  value={formData.order_status}
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
                          <div className="mb-3 col-md-6">
                              <CFormLabel htmlFor="voucher">Voucher</CFormLabel>
                              <CFormSelect
                                  aria-label="Default select example"
                                  id="voucher"
                                  onChange={handleInputChange}
                                  value={formData.voucher}
                              >
                                  <option>Select From DropDown</option>
                                  {voucher.map((item) => (
                                      <option key={item.uuid} value={item.uuid}>
                                          {item.code}
                                      </option>
                                  ))}
                              </CFormSelect>
                          </div>
                      </div>
                      <div className="row">
                          <div className="mb-3 col-md-6">
                              <CFormLabel htmlFor="shipping_address">Address</CFormLabel>
                              <CFormSelect
                                  aria-label="Default select example"
                                  id="shipping_address"
                                  onChange={handleInputChange}
                                  value={formData.shipping_address}
                              >
                                  <option>Select From DropDown</option>
                                  {address.map((item) => (
                                      <option key={item.uuid} value={item.uuid}>
                                          {item.address}
                                      </option>
                                  ))}
                              </CFormSelect>
                          </div>
                          <div className="mb-3 col-md-6">
                              <CFormLabel htmlFor="shipping_amount">Shipping Price</CFormLabel>
                              <CFormSelect
                                  aria-label="Default select example"
                                  id="shipping_amount"
                                  onChange={handleInputChange}
                                  value={formData.shipping_amount}
                              >
                                  <option>Select From DropDown</option>
                                  {shipprice.map((item) => (
                                      <option key={item.uuid} value={item.price}>
                                          {item.country}
                                      </option>
                                  ))}
                              </CFormSelect>
                          </div>
                      </div>
                      <div className="mb-3">
                          <CButton type="submit" className="mb-3" disabled={isSubmitting}>
                              {isSubmitting ? 'Updating Order...' : 'Update Order'}
                          </CButton>
                      </div>
                  </CForm>
              </CCardBody>
          </CCard>
      </CCol>
  );
};

export default EditOrder;
