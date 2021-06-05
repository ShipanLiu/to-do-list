import React, { useCallback, useRef } from 'react'

import './addInput.scss'

function AddInput(props) {
  const { isShow, addItem } = props,
    inputRef = useRef()

  const submitValue = useCallback(() => {
    // trim() 前后去空。 假如有空格的话。
    const inputValue = inputRef.current.value.trim()
    // 假如开始就是空： 直接return， 什么也不做。
    if (inputValue.length === 0) {
      return
    }
    // 把输入的内容弄进去
    addItem(inputValue)
    // 再次清空
    inputRef.current.value = ''
  }, [addItem])

  return (
    <>
      {isShow && (
        <div className="input-wrapper">
          <input type="text" ref={inputRef} placeholder="add an item" />
          <button className="btn btn-primary" onClick={submitValue}>
            add
          </button>
        </div>
      )}
    </>
  )
}

export default AddInput
