import { useState } from "react"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../reducers/listSlice";
import {url} from "../config/keys";
import axios from "axios";



const AddCard = ({list}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [clicked, setIsClicked] = useState(false)
  const {boardId} = useParams();
  const lists = useSelector(state => state.list)
  const baseUrl = url;

  const randomNum = Math.floor(Math.random() * (100 - 1 + 1)) + 1

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
      postCard(cardObj)
    };
    setInput("")
  }

  const postCard = async (cardObj) => {
    try {
      await axios.post(baseUrl + "/boards/" + cardObj.boardId + "/lists/" + cardObj.listId + "/cards", {
        title: cardObj.title
      }).then((response) => {
        const responseObj = {
          title: JSON.parse(response.config.data),
          index: cardObj.index,
          _id: randomNum
        }
        dispatch(addCard(responseObj))
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