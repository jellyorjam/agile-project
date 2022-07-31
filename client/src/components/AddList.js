import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../reducers/listSlice";
import { activityAdded } from "../reducers/cardSlice";

const AddList = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const boardId = useSelector(state => state.board.boardInfo._id)

  const randomNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    const newList = {
      boardId: boardId,
      title: input,
      _id: randomNum
    }
    dispatch(addList(newList))
  }

  return (
    <div>
      <form>
        <div className="form-group add-list-form">
         <input onChange={handleChange} type="text" className="form-control" id="add-list-box" aria-describedby="add-list" placeholder="Enter list title"></input>
        </div>
      </form>
      <button className="button-55" onClick={handleClick}>Add Another List</button>
    </div>
  )
}

export default AddList;