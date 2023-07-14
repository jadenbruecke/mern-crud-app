import React, { useState } from "react"
import Link from "next/link"


function Header(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

  return (
    <div>
      <header>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <nav className="navbar navbar-expand-lg bg-body-tertiary mx-2">

          <Link className="navbar-brand" href="/">MERN</Link>
          <button
            className="custom-toggler navbar-toggler"
            type="button"
            databstoggle="collapse"
            databstarget="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/contracts">Contracts</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/usage">Usage</Link>
              </li>
            </ul>
          </div>

        </nav>
      </header>
    </div>
  )
}

export default Header
