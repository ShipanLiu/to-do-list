import React from 'react'
import './checkModal.scss'
import Modal from '../ModalBox'

export default function CheckModal(props) {
  const { isShowCheckModal, data, closeModal } = props
  return (
    <Modal isShowModal={isShowCheckModal} modalTitle="details">
      <p className="topic">time： {data.id} </p>
      <p className="topic">content： {data.content} </p>
      <p className="topic">
        data： {data.completed ? 'finished' : 'unfinished'}
      </p>
      <button className="btn btn-primary confirm-btn" onClick={closeModal}>
        confirm
      </button>
    </Modal>
  )
}
