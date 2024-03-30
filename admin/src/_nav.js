import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  {
    component: CNavGroup,
    name: 'Transaction',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New Transaction',
        to: '/transaction/newtransaction',
      },
      {
        component: CNavItem,
        name: 'Approved Transaction',
        to: '/transaction/approvedtransaction',
      },
      {
        component: CNavItem,
        name: 'Declined Transaction',
        to: '/transaction/declinedtransaction',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Withdraw',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'New Withdraw',
        to: '/withdraw/newwithdraw',
      },
      {
        component: CNavItem,
        name: 'Approved Withdraw',
        to: '/withdraw/approvedwithdraw',
      },
      {
        component: CNavItem,
        name: 'Declined Withdraw',
        to: '/withdraw/declinedwithdraw',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Plans',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Plans',
        to: '/Plan/allPlan',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Earning',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Earning',
        to: '/Earning/allEarnings',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'User Managment',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buyers',
        to: '/users/buyers',
      },
      {
        component: CNavItem,
        name: 'Workers',
        to: '/users/workers',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'service',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Current Services',
        to: '/service/service',
      },
      {
        component: CNavItem,
        name: 'Completed Services',
        to: '/service/completeservice',
      },
      {
        component: CNavItem,
        name: 'Add services',
        to: '/service/addservice',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Admin Bank Account',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bank Account',
        to: '/admin/bankaccount',
      }
    ],
  },
]

export default _nav
