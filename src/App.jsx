import { useState } from "react"
import List from "./components/List"
import Alert from "./components/Alert"
import { useEffect } from "react"

const getList = () => {
  let list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  }
  return []
}

const App = () => {
  const [task, setTask] = useState("")
  const [list, setList] = useState(getList())
  const [editing, isEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  })

  const callAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message })
  }

  const setListOnStorage = () => {
    localStorage.setItem("list", JSON.stringify(list))
  }

  useEffect(() => {
    setListOnStorage()
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task) {
      callAlert(true, "danger", "no item to add")
    } else if (task && editing) {
      const updatedList = list.map((listItem) => {
        if (listItem.id === editId) {
          return { id: listItem.id, task: task }
        } else {
          return listItem
        }
      })
      setList(updatedList)
      setEditId(null)
      setTask("")
      isEditing(false)
      callAlert(true, "success", "item edited successfully")
    } else {
      setList([...list, { id: Date.now(), task: task }])
      setTask("")
      callAlert(true, "success", "item added")
    }
  }

  const removeItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id)
    setList(updatedList)
    callAlert(true, "danger", "item deleted")
  }

  return (
    <>
      {" "}
      <section className="form-section">
        <h1 className="title">To Do App</h1>
        {alert.show && (
          <Alert alert={alert} list={list} callAlert={callAlert} />
        )}
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            className="task-input"
            type="text"
            name="task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
            }}
          />
          <button className="task-btn">
            {editing ? "Edit item" : "add item"}
          </button>
        </form>

        <div className="list-container">
          {list.map((listItem) => {
            const { id, task } = listItem
            return (
              <List
                id={id}
                task={task}
                key={id}
                removeItem={removeItem}
                isEditing={isEditing}
                setTask={setTask}
                setEditId={setEditId}
              />
            )
          })}
        </div>
        <button
          onClick={() => {
            setList([])
            callAlert(true, "danger", "empty list")
            localStorage.clear()
          }}
          className="clear-btn"
        >
          clear all
        </button>
      </section>
    </>
  )
}
export default App
