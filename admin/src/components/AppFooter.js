import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://earn4views.com/" target="_blank" rel="noopener noreferrer">
          Earn4views
        </a>
        <span className="ms-1">&copy; 2023.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">All CopyRight Reserved by</span>
        
          Earn 4 Views &amp; Admin Dashboard
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
