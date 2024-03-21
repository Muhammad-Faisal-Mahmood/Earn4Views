import React, { useContext } from 'react'
import AlertContext from 'src/Context/Alert/AlertContext';
import {
    CAlert,
} from '@coreui/react'

export default function Alert(s) {
    const Context = useContext(AlertContext);
    const { alert } = Context;

    return (
        alert && <CAlert color={alert.type} style={{ position: "fixed", top: "50px", left: "38%", transition: "ease-in-out 5s" , zIndex:"1000000000"}}>{alert.message}</CAlert>
    )
}
