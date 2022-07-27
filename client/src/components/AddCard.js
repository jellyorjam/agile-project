import { useState } from "react"

const AddCard = () => {
  const [input, setInput] = useState("");
  const [clicked, setIsClicked] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    setIsClicked(!clicked)
  }

  const setFormShow = `form-control ${clicked ? "" : "hide-form"}`

  return (
    <div>
      <form>
        <div className="form-group">
         <input onChange={handleChange} type="text" className={setFormShow} id="add-list-box" aria-describedby="add-list" placeholder="Enter card title"></input>
        </div>
      </form>
      <button onClick={handleClick} type="button" className="btn btn-outline-secondary add-card">+ Add Card</button>
    </div>
  )
}

export default AddCard;