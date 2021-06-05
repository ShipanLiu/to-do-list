/*
  edit: check if was empty or not
*/

import React, { useRef } from 'react'
import './editModal.scss'
import Modal from '../ModalBox'
import { timestamp } from '../../../libs/utils'

export default function EditModal(props) {

  const { isShowEditModal, data, submitEdit} = props
  const inputRef = useRef()  //  因为要定位索取 input 的值， 使用ref
  const checkRef = useRef()

  const formatNewData = () => {
    const value = inputRef.current.value.trim()
    const valueLen = value.length
    if (valueLen === 0){// 提交的时候， 发现为空， 把原来的值放进去
      inputRef.current.value = data.content
      return
    }
    // 成功修改之后, newData 出来之后如何传给父组件呢？ 通过props传一个函数。
    const newData = {
      id: timestamp(),
      content: value,
      completed: checkRef.current.checked
    }
    submitEdit(newData, data.id) // 把老的id 也传过去， 知道到底修改了谁
    console.log(newData);
  }

  return (
    <Modal
       isShowModal={isShowEditModal}
       modalTitle='edit item'
    >
      <p className='topic'>time: {data.id}</p>
      <p className='topic'>
        <textarea
         ref={inputRef}
         defaultValue={ data.content }
         className='text-area'
         >
         </textarea>
      </p>
      <p className='topic'>
        status:
        <input
         type="checkbox"
         defaultChecked={data.completed ? true : false}
         ref={checkRef}
         />
      </p>
      <button
        className='btn btn-primary confirm-btn'
        onClick={formatNewData}
      >
        update
      </button>

    </Modal>
  )
}
