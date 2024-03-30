import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CAvatar,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody
} from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from 'src/Context/Alert/AlertContext';
import { BaseURL } from 'src/components/DataList';

const Worker = () => {

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;
  const [Workers, setWorkers] = useState([])

  const FetchWorkers = async () => {
      try {
          const response = await fetch(`${BaseURL}/WorkerList`, {
              headers: {
                  'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
              }
          });
          const WorkerData = await response.json();
          setWorkers(WorkerData.worker);
      } catch (error) {
          showAlert(error.message, 'danger');
      }
  };

  useEffect(() => {
    FetchWorkers()
  }, [])


  const DeleteWorkers = async (id) => {
      try {
          const response = await fetch(`${BaseURL}/deleteWorker/${id}/`, {
              method: 'DELETE',
              headers: {
                  'AdminODSToken': sessionStorage.getItem('AdminODSToken'),
              }
          });
          const data = await response.json()
          if (data.success) {
              showAlert('Worker Deleted', 'success');
              FetchWorkers()
          } else {
              showAlert(data.message, 'danger');
          }
      } catch (error) {
          showAlert('network Error Occured', 'danger')
      }
  }


  return (
      <CRow>
          <CCol xs>
              <CCard className="mb-4">
                  <CCardHeader>Workers List</CCardHeader>
                  <CCardBody>
                      <CTable align="middle" className="mb-0 border" hover responsive>
                          <CTableHead color="light">
                              <CTableRow>
                                  <CTableHeaderCell>ProfilePhoto</CTableHeaderCell>
                                  <CTableHeaderCell>Name</CTableHeaderCell>
                                  <CTableHeaderCell>Email</CTableHeaderCell>
                                  <CTableHeaderCell>Phone</CTableHeaderCell>
                                  <CTableHeaderCell>Funds</CTableHeaderCell>
                                  <CTableHeaderCell>Date</CTableHeaderCell>
                                  <CTableHeaderCell>Actions</CTableHeaderCell>
                              </CTableRow>
                          </CTableHead>
                          <CTableBody>
                              {Workers?.map((item, index) => (
                                  <>
                                      <CTableRow v-for="item in tableItems" key={index} style={{ cursor: "pointer" }}>
                                      <CTableDataCell>
                                              <div>{item?.User_id?.Name}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div>{item?.User_id?.Name}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div>{item?.User_id?.Email}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div>{item?.User_id?.Phone}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div>{item?.Funds}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div>{item?.User_id?.Date}</div>
                                          </CTableDataCell>
                                          <CTableDataCell>
                                              <div className="col">
                                                  <CButton 
                                                      color="danger mx-2" 
                                                      onClick={() => { DeleteWorkers(item?._id) }} 
                                                      style={{ color: "white" }}
                                                  >
                                                      Delete Worker
                                                  </CButton>
                                              </div>
                                          </CTableDataCell>
                                      </CTableRow>
                                  </>
                              ))}
                          </CTableBody>
                      </CTable>
                  </CCardBody>
              </CCard>
          </CCol>
      </CRow>
  )
}

export default Worker