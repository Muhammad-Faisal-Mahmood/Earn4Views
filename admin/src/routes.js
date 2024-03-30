import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))


//Orders
const NewTransaction = React.lazy(() => import('./views/Transactions/Transactions'))
const ApprovedTransaction = React.lazy(() => import('./views/Transactions/ApprovedTransaction'))
const DeclinedTransaction = React.lazy(() => import('./views/Transactions/DeclinedTransaction'))


const NewWithdraw = React.lazy(() => import('./views/Withdraws/Withdraw'))
const ApprovedWithdraw = React.lazy(() => import('./views/Withdraws/ApprovedWithdraw'))
const DeclinedWithdraw = React.lazy(() => import('./views/Withdraws/DeclinedWithdraw'))



//Users
const Buyer = React.lazy(() => import('./views/Users/Buyers'))
const Worker = React.lazy(() => import('./views/Users/Workers'))

//Shpping Price
const BankAccount = React.lazy(() => import('./views/AdminAccount/BankAccount'))


//Testimoinia
const service = React.lazy(() => import('./views/service/service'))
const completeservice = React.lazy(() => import('./views/service/Completed'))
const Addservice = React.lazy(() => import('./views/service/Addservice'))
const EditTestimonal = React.lazy(() => import('./views/service/Editservice'))



//Planss
const Plans = React.lazy(() => import('./views/Plans/Plan'))

const Earning = React.lazy(() => import('./views/Earning/Earning'))






const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },


  //Orders Section Routes
  { path: '/transaction/newtransaction', name: 'New Transaction', element: NewTransaction, exact: true },
  { path: '/transaction/declinedtransaction', name: 'Declined Transaction', element: DeclinedTransaction, exact: true },
  { path: '/transaction/approvedtransaction', name: 'Approved Transaction', element: ApprovedTransaction, exact: true },


  { path: '/withdraw/newwithdraw', name: 'New Withdraw', element: NewWithdraw, exact: true },
  { path: '/withdraw/declinedwithdraw', name: 'Declined Withdraw', element: DeclinedWithdraw, exact: true },
  { path: '/withdraw/approvedwithdraw', name: 'Approved Withdraw', element: ApprovedWithdraw, exact: true },





  //Plans Section Routes
  { path: '/Plan/allPlan', name: 'Plan', element: Plans, exact: true },

  { path: '/Earning/allEarnings', name: 'Earning', element: Earning, exact: true },


  { path: '/widgets', name: 'Widgets', element: Widgets },


  //User Routes
  { path: '/users/buyers', name: 'Buyers', element: Buyer },
  { path: '/users/workers', name: 'Workers', element: Worker },

  { path: '/admin/bankaccount', name: 'BankAccount', element: BankAccount },

  { path: '/service/service', name: 'All service', element: service },
  { path: '/service/completeservice', name: 'Completed service', element: completeservice },
  { path: '/service/addservice', name: 'Add service', element: Addservice },
  { path: '/service/editservice', name: 'Edit service', element: EditTestimonal },


]

export default routes
