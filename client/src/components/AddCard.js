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

  const handleClick = () => {
    setIsClicked(!clicked)

    const index = lists.findIndex(listObj => listObj.list._id === list);
    
    const cardObj = {
      boardId: boardId,
      listId: list,
      index: index,
      title: input
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

  // const postCard = (cardObj) => {
  //   console.log(cardObj)
  // }

  const setFormShow = `form-control ${clicked ? "" : "hide-form"}`

  return (
    <div>
      <form>
        <div className="form-group">
         <input onChange={handleChange} type="text" className={setFormShow} id="add-card-box" aria-describedby="add-list" placeholder="Enter card title" value={input}></input>
        </div>
      </form>
      <button onClick={handleClick} type="button" className="btn btn-outline-secondary add-card">+ Add Card</button>
    </div>
  )
}

export default AddCard;