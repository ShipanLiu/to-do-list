/*
  useCallback 的作用存储。 就是不让子组件不必要的render。

  所有的数据和state都定义在app里面， 每个组件都可以取。
*/

import React, {
  useState,
  useCallback,
  useEffect,
} from 'react'
import MyHeader from './components/header/Header'
import AddInput from './components/addInput/Addinput'
import TodoItem from './components/todoItem/ToDoItem'
import CheckModal from './components/modalBox/checkModal/CheckModal'
import EditModal from './components/modalBox/editModal/EditModal'
import { timestamp } from './libs/utils'
import NoDataTip from './components/noDataTip/NoDataTip'

import './App.css'

function App() {


  const [isShow, setIsShow] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [isShowCheckModal, setShowCheckModal] = useState(false)
  const [isShowEditModal, setShowEditModal] = useState(false)

  const [currentData, setCurrentData] = useState({})




  useEffect(() => {
    const todoData = JSON.parse(
      localStorage.getItem('todoData') || '[]'
    ) // 存在window.localStorage 里面的视距是json 格式。 需要解析。
    setTodoList(todoData)
  }, []) // 依赖 【】里面数据的变化， 来执行里面的fn。 【】 代表 执行一次， 就是挂载一次。

  useEffect(() => {
    localStorage.setItem(
      'todoData',
      JSON.stringify(todoList)
    )
  }, [todoList]) // 每当todoList 发生变化的时候，就刷新一下存储。  注意两个useEffect不可以进行调换。




  const addItem = useCallback((value) => {
    // addItem里面本身就有了参数value， 是子组件分享在props里面的。
    const dataItem = {
      id: timestamp(),
      content: value,
      completed: false,
    }
    setTodoList((todoList) => [...todoList, dataItem])
    setIsShow(false)
  }, [])

  // 父组件传给 子组件的props，函数要用callback 包起来。 不然每次创建新的函数 浪费资源。
  const openCheckModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(itemObj => id === itemObj.id)[0]) // filter返回一个数组， 里面只有一项内容
    setShowCheckModal(true)  // open Modal
  }, [todoList])  // 这个函数 需要最新的todolist

  const openEditModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(itemObj => id === itemObj.id)[0])
    // 还要弹出模态框
    setShowEditModal(true)
  }, [todoList])

  const submitEdit = useCallback((newSingleData,oldId) => {// 新的数据把老的数据取代, 如何取代呢？ Map一下， 替换一下就行了。
    setTodoList((todoList) =>  //注意不要写{}
      todoList.map((itemObj) => {  // map完之后， 返回的就是一个新的todoList。
        if (itemObj.id === oldId) {
          itemObj = newSingleData
        }
        return itemObj
      })
    )
    setShowEditModal(false)  // 关闭模态框
  }, [])

  const completeItem = useCallback((oldId) => {
    setTodoList((todoList) => todoList.map((itemObj) => {
      if (itemObj.id === oldId) {
        itemObj.completed = !itemObj.completed
      }
      return itemObj
    }))
  }, [])

  const  removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter((itemObj) =>
      itemObj.id !== id
    ))
  }, [])


  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        data={currentData}
        closeModal={() => setShowCheckModal(false)}
      ></CheckModal>
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData} // currentData又是从哪里来的呢？ 点击按钮的时候
        submitEdit={submitEdit}
      >
      </EditModal>
      <MyHeader
        openInput={() => setIsShow(!isShow)} // 直接关闭。
      ></MyHeader>
      <AddInput
        isShow={isShow}
        addItem={addItem}
      ></AddInput>

      {/* 如果刚开始没有东西：就显示一下 NoDataTip 组件 */}

      {
        !todoList || todoList.length === 0
        ?
        (<NoDataTip/>)
        :
        (
          <ul className="todo-list">
          {todoList.map((todoObj, index) => (
            <TodoItem
              key={todoObj.id}
              data={todoObj}
              openCheckModal={openCheckModal}
              openEditModal={openEditModal}
              completeItem={completeItem}
              removeItem={removeItem}
            ></TodoItem>
           ))}
          </ul>
        )
      }


    </div>
  )
}

export default App
