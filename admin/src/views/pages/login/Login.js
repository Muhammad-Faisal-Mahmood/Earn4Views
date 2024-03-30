import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AlertContext from 'src/Context/Alert/AlertContext'
import { BaseURL } from 'src/components/DataList'

const Login = () => {

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      // Make the API call to your login endpoint
      const response = await fetch(`${BaseURL}/loginAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      if(data.success){
        const AdminODSToken = data.AdminODSToken;
        sessionStorage.setItem('AdminODSToken', AdminODSToken);
        showAlert('Login Success', 'success')
        setIsSubmitting(false);
        navigate("/dashboard");
      }else{
        showAlert(data.Message, 'danger')
        setIsSubmitting(false);
      }
    } catch (error) {
      showAlert('Error Occured', 'danger')
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="Email"
                        placeholder="Email"
                        autoComplete="Email"
                        value={credentials.Email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="Password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={credentials.Password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin} disabled={isSubmitting}>
                          {isSubmitting ? "Logining" : "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
