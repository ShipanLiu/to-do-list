/*
    这个MOdalBox 相当于一个小内核。

*/

import React from 'react'
import './modalBox.scss'

export default function ModalBox(props) {
  const { isShowModal, modalTitle, children } = props  // children本身就在props里面，
  return (
    <>
      {isShowModal ? (
        <div className="modal">
          <div className="inner">
            <div className="m-header">{modalTitle}</div>
            <div className="content-wrapper">{children}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
