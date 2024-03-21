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
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Order',
  },
  {
    component: CNavGroup,
    name: 'Orders',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/order/allorder',
      },
      {
        component: CNavItem,
        name: 'Detailed Order',
        to: '/order/orderDetail',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders Payment',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders Payment',
        to: '/order/orderPayment',
      }
    ],
  },
  {
    component: CNavTitle,
    name: 'Product',
  },
  {
    component: CNavGroup,
    name: 'Brands',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Brand',
        to: '/product/brand',
      },
      {
        component: CNavItem,
        name: 'Add Brand',
        to: '/product/addbrand',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Products',
        to: '/product/allproduct',
      },
      {
        component: CNavItem,
        name: 'Add Products',
        to: '/product/addproduct',
      },
      {
        component: CNavItem,
        name: ' All Products Option',
        to: '/product/allproductoption',
      },
      {
        component: CNavItem,
        name: 'Add Product Option',
        to: '/product/addproductoption',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Variants',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Variants',
        to: '/product/allvariants',
      },
      {
        component: CNavItem,
        name: 'Add Variant',
        to: '/product/addvariant',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Images',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Images',
        to: '/product/images',
      },
      {
        component: CNavItem,
        name: 'Add Images',
        to: '/product/addimages',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Options',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Options',
        to: '/product/option',
      },
      {
        component: CNavItem,
        name: 'Add Option',
        to: '/product/addoption',
      },
      {
        component: CNavItem,
        name: ' All Group Option',
        to: '/product/groupoption',
      },
      {
        component: CNavItem,
        name: 'Add Group Option',
        to: '/product/addgroupoption',
      }
    ],
  },



  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavGroup,
    name: 'User Managment',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Users',
        to: '/users/alluser',
      },
      {
        component: CNavItem,
        name: 'Add Users',
        to: '/users/adduser',
      },
      {
        component: CNavItem,
        name: 'User Types',
        to: '/users/usertype',
      },
      {
        component: CNavItem,
        name: 'Add User Type',
        to: '/users/addtype',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Vouchers',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Voucher',
        to: '/users/vouchers',
      },
      {
        component: CNavItem,
        name: 'Add Voucher',
        to: '/users/addvoucher',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Testimonial',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Testimonials',
        to: '/users/testimonial',
      },
      {
        component: CNavItem,
        name: 'Add Testimonials',
        to: '/users/addtestimonial',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'User Paymet',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User Payment',
        to: '/users/userPayment',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Shipping Prices',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Shipping Prices',
        to: '/users/allshipprice',
      },
      {
        component: CNavItem,
        name: 'Add Shipping Price',
        to: '/users/addshipprice',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Shipping Address',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Shipping Address',
        to: '/users/allshipaddress',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  }
]

export default _nav
