import React from 'react'
import { NavLink } from 'react-router-dom'

// As this is the demo project, we import our dependencies from the `src` directory.
import { useConfig } from 'payload/components/utilities'

// In your projects, you can import as follows:
// import { useConfig } from 'payload/components/utilities';

const baseClass = 'after-nav-links'

const AfterNavLinks: React.FC = () => {
  const {
    routes: { admin: adminRoute },
  } = useConfig()

  return (
    <div
      className={baseClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--base) / 4)',
      }}
    >
      <h6 className="nav__label" style={{ color: 'var(--theme-elevation-400)', margin: 0 }}>
        Sync Data
      </h6>
      <h6 className="nav__link" style={{ margin: 0 }}>
        <NavLink
          activeClassName="active"
          style={{ textDecoration: 'none' }}
          to={`${adminRoute}/upload-products`}
        >
          Upload Products
        </NavLink>
      </h6>
      <h6 className="nav__link" style={{ margin: 0 }}>
        <NavLink
          activeClassName="active"
          style={{ textDecoration: 'none' }}
          to={`${adminRoute}/sync`}
        >
          Sync To Shopify
        </NavLink>
      </h6>
      {/* <h6 className="nav__link" style={{ margin: 0 }}>
        <NavLink
          activeClassName="active"
          style={{ textDecoration: 'none' }}
          to={`${adminRoute}/revsync`}
        >
          Sync From Shopify
        </NavLink>
      </h6> */}
      <div id="custom-css" />
    </div>
  )
}

export default AfterNavLinks