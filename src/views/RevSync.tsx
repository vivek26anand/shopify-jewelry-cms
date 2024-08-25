import React from 'react'

import { type AdminViewComponent } from 'payload/config'
import { DefaultTemplate } from 'payload/components/templates'
const CustomView: AdminViewComponent = () => {
  return (
    <DefaultTemplate>
      <div className='gutter--left gutter--right collection-list__wrap'>
        <h1>
          Sync Products From Shopify
        </h1>
        <p>This is a custom view for the admin panel</p>
      </div>
    </DefaultTemplate>
  )
}

export default CustomView