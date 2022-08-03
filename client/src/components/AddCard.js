import { useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../reducers/listSlice";
import { cardAdded } from "../reducers/cardSlice";
import {url} from "../config/keys";
import axios from "axios";



const AddCard = ({list, setLoading}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [clicked, setIsClicked] = useState(false)
  const {boardId} = useParams();
  const lists = useSelector(state => state.list)
  const baseUrl = url;

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const inputBox = e.target.parentElement.childNodes[0].childNodes[0].childNodes[0];
    setIsClicked(!clicked)

    const index = lists.findIndex(listObj => listObj.list._id === list);
    
    const cardObj = {
      boardId: boardId,
      listId: list,
      index: index,
      title: inputBox.value
    }

    if (input) {
      dispatch(cardAdded(false))
      postCard(cardObj).then(() => dispatch(cardAdded(true)))
    };
    setInput("")
  }

  const postCard = async (cardObj) => {
    setLoading(true)
    try {
      await axios.post(baseUrl + "/boards/" + cardObj.boardId + "/lists/" + cardObj.listId + "/cards", {
        title: cardObj.title
      }).then((response) => {
        dispatch(addCard({
          _id: response.data._id,
          title: response.data.title,
          board: response.data.board,
          index: cardObj.index
        }))
        setLoading(false)
      })
    }
    catch (err) {
      return err
    }
  }

  const setFormShow = `form-control ${clicked ? "" : "hide-form"}`

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="form-group">
         <input value={input} onChange={handleChange} type="text" className={setFormShow} aria-describedby="add-card" placeholder="Enter card title" autoFocus></input>
        </div>
      </form>
      <button type="button" onClick={handleClick} className="btn btn-outline-secondary add-card">{clicked ? `Save` : `+ Add Card`}</button>
    </div>
  )
}

export default AddCard;