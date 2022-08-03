import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../reducers/listSlice";

const AddList = ({setLoading}) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const boardId = useSelector(state => state.board.boardInfo._id)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    setLoading(true);
    const newList = {
      boardId: boardId,
      title: input
    }
    dispatch(addList(newList)).then(() => {
      setLoading(false)
    })
  }

  return (
    <div>
      <form>
        <div className="form-group">
         <input onChange={handleChange} type="text" className="form-control" id="add-list-box" aria-describedby="add-list" placeholder="Enter list title"></input>
        </div>
      </form>
      <button className="button-55" onClick={handleClick}>Add Another List</button>
    </div>
  )
}

export default AddList;