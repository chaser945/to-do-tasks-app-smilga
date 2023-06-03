import { FaRegEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"

const List = ({ task, removeItem, id, isEditing, setTask, setEditId }) => {
  const handleEdit = () => {
    isEditing(true)
    setTask(task)
    setEditId(id)
  }
  return (
    <article className="list-article">
      <p className="list-item">{task}</p>
      <span className="list-icon-container">
        {" "}
        <button className="btn" onClick={handleEdit}>
          {" "}
          <FaRegEdit className="edit-icon" />
        </button>
        <button className="btn" onClick={() => removeItem(id)}>
          {" "}
          <FaTrash className="trash-icon" />
        </button>
      </span>
    </article>
  )
}
export default List
