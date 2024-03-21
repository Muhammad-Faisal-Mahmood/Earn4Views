import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// // Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))


//Orders
const Order = React.lazy(() => import('./views/Orders/Order'))
const EditOrder = React.lazy(() => import('./views/Orders/EditOrder'))

//Order Payment
const OrderPayment = React.lazy(() => import('./views/OrderPayment/OrderPayment'))
const EditOrderPayment = React.lazy(() => import('./views/OrderPayment/EditOrderPayment'))

//Order Details
const OrderDetail = React.lazy(() => import('./views/OrderDetails/OrderDetail'))
const EditOrderDetail = React.lazy(() => import('./views/OrderDetails/EditOrderDetail'))



//Users
const AllUsers = React.lazy(() => import('./views/Users/AllUsers/AllUsers'))
const AddUser = React.lazy(() => import('./views/Users/AddUser/AddUser'))
const EditUser = React.lazy(() => import('./views/Users/AddUser/EditUser'))

//Payment Method
const AllUserPaymet = React.lazy(() => import('./views/UserPayment/UserPayment'))
const EditUserPayment = React.lazy(() => import('./views/UserPayment/EditUserPayment'))

//Shpping Price
const ShippingPrice = React.lazy(() => import('./views/ShippingPrice/ShippingPrice'))
const AddShippingPrice = React.lazy(() => import('./views/ShippingPrice/CreateShppingPrice'))
const EditShippingPrice = React.lazy(() => import('./views/ShippingPrice/EditShippingPrice'))

//Shpping Address
const Shippingaddress = React.lazy(() => import('./views/ShippingAddress/shippingaddress'))
const Editshipaddress = React.lazy(() => import('./views/ShippingAddress/editshipaddress'))

//User Type
const AllUserType = React.lazy(() => import('./views/Users/UserTypes/AllUserType'))
const CreateUserType = React.lazy(() => import('./views/Users/UserTypes/CreateUserType'))
const EditUserType = React.lazy(() => import('./views/Users/UserTypes/EditUserType'))

//Vouchers
const Vouchers = React.lazy(() => import('./views/Voucher/Vouchers'))
const AddVoucher = React.lazy(() => import('./views/Voucher/AddVoucher'))
const EditVoucher = React.lazy(() => import('./views/Voucher/EditVoucher'))

//Testimoinia
const Testimonal = React.lazy(() => import('./views/Testimonial/Testimonial'))
const AddTestimonial = React.lazy(() => import('./views/Testimonial/AddTestimonial'))
const EditTestimonal = React.lazy(() => import('./views/Testimonial/EditTestimonial'))



//Products
const Products = React.lazy(() => import('./views/Products/Product'))
const AddProduct = React.lazy(() => import('./views/Products/AddProduct'))
const EditProduct = React.lazy(() => import('./views/Products/EditProduct'))

//Brand
const Brand = React.lazy(() => import('./views/Brands/Brand'))
const AddBrand = React.lazy(() => import('./views/Brands/AddBrand'))
const EditBrand = React.lazy(() => import('./views/Brands/EditBrand'))

//Option
const Option = React.lazy(() => import('./views/Options/Option'))
const AddOption = React.lazy(() => import('./views/Options/AddOption'))
const EditOption = React.lazy(() => import('./views/Options/EditOption'))

//Group Option
const GroupOption = React.lazy(() => import('./views/Options/GroupOption'))
const AddGroupOption = React.lazy(() => import('./views/Options/AddGroupOption'))
const EditGroupOption = React.lazy(() => import('./views/Options/EditGroupOption'))

//Product Option
const ProductOption = React.lazy(() => import('./views/Products/ProductOption'))
const AddProductOption = React.lazy(() => import('./views/Products/AddProductOption'))
const EditProductOption = React.lazy(() => import('./views/Products/EditProductOption'))

//Variant
const Variant = React.lazy(() => import('./views/Variants/Variant'))
const AddVariants = React.lazy(() => import('./views/Variants/AddVariant'))
const EditVariants = React.lazy(() => import('./views/Variants/EditVariant'))

//Images
const Images = React.lazy(() => import('./views/Image/Image'))
const AddImages = React.lazy(() => import('./views/Image/AddImage'))
const EditImages = React.lazy(() => import('./views/Image/EditImage'))





const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },


  //Orders Section Routes
  { path: '/order/allorder', name: 'Order', element: Order, exact: true },
  { path: '/order/editorder', name: 'Edit Order', element: EditOrder, exact: true },

  { path: '/order/orderPayment', name: 'Order Payment', element: OrderPayment, exact: true },
  { path: '/order/editorderPayment', name: 'Edit Order Payment', element: EditOrderPayment, exact: true },

  { path: '/order/orderDetail', name: 'Order Detail', element: OrderDetail, exact: true },
  { path: '/order/editorderDetail', name: 'Edit Order Detail', element: EditOrderDetail, exact: true },




  //Products Section Routes
  { path: '/product/allproduct', name: 'Product', element: Products, exact: true },
  { path: '/product/addproduct', name: 'Add Product', element: AddProduct, exact: true },
  { path: '/product/editproduct', name: 'Edit Product', element: EditProduct, exact: true },

  { path: '/product/allproductoption', name: 'Product Option', element: ProductOption, exact: true },
  { path: '/product/addproductoption', name: 'Add Product Option', element: AddProductOption, exact: true },
  { path: '/product/editproductoption', name: 'Edit Product Option', element: EditProductOption, exact: true },

  { path: '/product/allvariants', name: 'Variants', element: Variant, exact: true },
  { path: '/product/addvariant', name: 'Add Variants', element: AddVariants, exact: true },
  { path: '/product/editvariant', name: 'Edit Variant', element: EditVariants, exact: true },

  { path: '/product/brand', name: 'Brands', element: Brand, exact: true },
  { path: '/product/addbrand', name: 'Add Brands', element: AddBrand, exact: true },
  { path: '/product/editbrand', name: 'Edit Brands', element: EditBrand, exact: true },

  { path: '/product/groupoption', name: 'Group Option', element: GroupOption, exact: true },
  { path: '/product/addgroupoption', name: 'Add Group Option', element: AddGroupOption, exact: true },
  { path: '/product/editgroupoption', name: 'Edit Group Option', element: EditGroupOption, exact: true },

  { path: '/product/option', name: 'Options', element: Option, exact: true },
  { path: '/product/addoption', name: 'Add Option', element: AddOption, exact: true },
  { path: '/product/editoption', name: 'Edit Options', element: EditOption, exact: true },

  { path: '/product/images', name: 'Images', element: Images, exact: true },
  { path: '/product/addimages', name: 'Add Images', element: AddImages, exact: true },
  { path: '/product/editimages', name: 'Edit Images', element: EditImages, exact: true },



  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },


  //User Routes
  { path: '/users/alluser', name: 'All Users', element: AllUsers },
  { path: '/users/adduser', name: 'Add Users', element: AddUser },
  { path: '/users/edituser', name: 'Edit Users', element: EditUser },

  { path: '/users/allshipprice', name: 'All Shipping Price', element: ShippingPrice },
  { path: '/users/addshipprice', name: 'Add Shipping Price', element: AddShippingPrice },
  { path: '/users/editshipprice', name: 'Edit Shipping Price', element: EditShippingPrice },

  { path: '/users/allshipaddress', name: 'All Shipping Address', element: Shippingaddress },
  { path: '/users/editshipaddress', name: 'Edit Shipping Adsress', element: Editshipaddress },

  { path: '/users/usertype', name: 'User Types', element: AllUserType },
  { path: '/users/addtype', name: 'Add User Types', element: CreateUserType },
  { path: '/users/editusertype', name: 'Edit User Types', element: EditUserType },

  { path: '/users/vouchers', name: 'All vouchers', element: Vouchers },
  { path: '/users/addvoucher', name: 'Add Voucher', element: AddVoucher },
  { path: '/users/editvoucher', name: 'Edit Voucher', element: EditVoucher },

  { path: '/users/testimonial', name: 'All Testimonial', element: Testimonal },
  { path: '/users/addtestimonial', name: 'Add Testimonial', element: AddTestimonial },
  { path: '/users/edittestimonial', name: 'Edit Testimonial', element: EditTestimonal },

  { path: '/users/userPayment', name: 'User Payment', element: AllUserPaymet, exact: true },
  { path: '/users/edituserPayment', name: 'Edit User Payment', element: EditUserPayment, exact: true },
]

export default routes
