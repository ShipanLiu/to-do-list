/*
    没有redux的坏处， 都需要属性的传递。
*/

import React from 'react'
import './todoItem.scss'

export default function ToDoItem(props) {
  const { data, openCheckModal, openEditModal, completeItem, removeItem} = props

  return (
    <li className="todo-item">
      <div className="check-box">
        <input type="checkbox" checked={data.completed} onChange={() => completeItem(data.id)}/>
      </div>
      <span
        className="content"
        style={{
          textDecoration: data.completed
            ? 'line-through'
            : '',
        }}
      >
        {data.content}
      </span>
      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={() => openCheckModal(data.id)} // 通过这个id， 我可以找到到底点击了谁
        >
          check
        </button>
        <button
         className="btn btn-warning"
         onClick={() => {openEditModal(data.id)}}
         >edit</button>
        <button className="btn btn-danger" onClick={() => removeItem(data.id)}>delete</button>
      </div>
    </li>
  )
}
