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

const Order = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;
    const navigate = useNavigate()
    const [Order, setOrders] = useState([])
    const [DetailOpen, setDetailOpen] = useState(false);
    const [DetailId, setDetailId] = useState(null);
    const [DetailData, setDetailData] = useState(null);

    const FetchData = async () => {
        try {
            const response = await fetch('http://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/order/',{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                }
            });
            if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            }
            const ProductData = await response.json();
            setOrders(ProductData);
        } catch (error) {
            showAlert('Network Error Occured', 'danger')
        }
    };

    useEffect(() => {
        FetchData()
    }, [])

    const DeleteFunction = async (id) => {
        try {
            const response = await fetch(`https://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/order//${id}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                    'X-CSRFToken': '4l3k7YjSfNMMn8ZBAyIX3oo27FZFtrdIYN7y1kS97uwh8EdatJ6b8JxJEDh7xgDR',
                }
            });
            if (response.ok) {
                // Handle success, e.g., show a success message or redirect
                showAlert('Dleted Successfully', 'success')
                FetchData();
            }else if (response.status === 401) {
                showAlert('Your Session Expired. Login Again', 'danger');
                // Assuming `navigate` is defined somewhere in your code
                navigate('/login');
            } else {
                // Handle errors, e.g., show an error message
                showAlert('Error Occured', 'danger')
            }
        } catch (error) {
            showAlert('network Error Occured', 'danger')
        }
    }

    const Detail = async (id) => {
        if (DetailId == id) {
            setDetailOpen(false);
            setDetailId(null);
        } else {
            setDetailOpen(true);
            setDetailId(id);
        }


        try {
            const response = await fetch(`http://stealth-ecommerce-12f9ab59b8a8.herokuapp.com/orders/order/${id}`);
            const ProductData = await response.json();
            setDetailData(ProductData);
        } catch (error) {
            showAlert('Network Error Occured', 'danger')
        }


    }


    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4">
                    <CCardHeader>Order Data</CCardHeader>
                    <CCardBody>
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Tracking Number</CTableHeaderCell>
                                    <CTableHeaderCell>User Name</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Order Status</CTableHeaderCell>
                                    <CTableHeaderCell>Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {Order.map((item, index) => (
                                    <>
                                        <CTableRow v-for="item in tableItems" key={index} style={{ cursor: "pointer" }} onClick={() => { Detail(item.uuid) }}>
                                            <CTableDataCell>
                                                <div>{item.tracking_number}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.shipping_address.user.first_name + " " + item.shipping_address.user.last_name}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.amount}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>{item.order_status}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="col">
                                                    <CButton color="primary mx-2"
                                                        onClick={() => {
                                                            navigate("/order/editorder", { state: item });
                                                        }}>
                                                        Edit
                                                    </CButton>
                                                    <CButton color="danger mx-2" onClick={() => { DeleteFunction(item.uuid) }} style={{ color: "white" }}>Delete</CButton>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                        {DetailOpen &&
                                            DetailId == item.uuid &&
                                            DetailData &&
                                            (<>
                                                <CCardBody>
                                                    <p>
                                                        <dt className="col-sm-3">Order Details</dt>
                                                    </p>
                                                    <div className="row">
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Tracking Number</dt>
                                                            <dd>{DetailData.tracking_number}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Order Status</dt>
                                                            <dd>{DetailData.order_status}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Shipping Status</dt>
                                                            <dd>{DetailData.shipping_status ? "Active":"InActive"}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Amount</dt>
                                                            <dd>{DetailData.amount}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Shipping Amount</dt>
                                                            <dd>{DetailData.shipping_amount}</dd>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        <dt className="col-sm-3">User Details</dt>
                                                    </p>
                                                    <div className="row">
                                                        <div className="mb-3 col-md-2">
                                                            <dt>User Name</dt>
                                                            <dd>{DetailData.shipping_address.user.first_name + " " + DetailData.shipping_address.user.last_name}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Email</dt>
                                                            <dd>{DetailData.shipping_address.user.email}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>User Type</dt>
                                                            <dd>{DetailData.shipping_address.user.user_type.name}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Discuont Allowed</dt>
                                                            <dd>{DetailData.shipping_address.user.user_type.discount_allowed}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Percentage Commission</dt>
                                                            <dd>{DetailData.shipping_address.user.user_type.percentage_commission}</dd>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        <dt className="col-sm-3">Shipping Address</dt>
                                                    </p>
                                                    <div className="row">
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Name</dt>
                                                            <dd>{DetailData.shipping_address.name}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-4">
                                                            <dt>Address</dt>
                                                            <dd>{DetailData.shipping_address.address}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>City</dt>
                                                            <dd>{DetailData.shipping_address.city}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>State</dt>
                                                            <dd>{DetailData.shipping_address.state}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-2">
                                                            <dt>Country</dt>
                                                            <dd>{DetailData.shipping_address.Country}</dd>
                                                        </div>
                                                    </div>
                                                    <p>
                                                        <dt className="col-sm-3">Voucher Details</dt>
                                                    </p>
                                                    <div className="row">
                                                        <div className="mb-3 col-md-3">
                                                            <dt>Discount</dt>
                                                            <dd>{DetailData.voucher.discount}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-3">
                                                            <dt>Code</dt>
                                                            <dd>{DetailData.voucher.code}</dd>
                                                        </div>
                                                        <div className="mb-3 col-md-3">
                                                            <dt>Expire</dt>
                                                            <dd>{DetailData.voucher.expiry_date}</dd>
                                                        </div>
                                                    </div>
                                                </CCardBody>
                                            </>

                                            )
                                        }
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

export default Order