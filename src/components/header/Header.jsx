import React from 'react'
import './header.scss'

function Header(props) {
  const { openInput } = props
  return (
    <div className="header">
      <h1>to-do-list</h1>
      <span className="icon" onClick={openInput}>
        &#43;
      </span>
    </div>
  )
}

export default Header
