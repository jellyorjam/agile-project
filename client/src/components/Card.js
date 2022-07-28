import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
import { random_rgba } from "./BoardList";

const Card = ({trigger, toggle}) => {
  const navigate = useNavigate();
  const {cardId} = useParams();
  const {boardId} = useParams();
  const {workspaceId} = useParams();
  const lists = useSelector(state => state.list);
  const members = useSelector(state => state.card.members)
  const [descriptionInput, setDescriptionInput] = useState("");


  const newCards = [];
  if(lists[0]){
    lists.forEach(list => {
      list.cards.forEach(cards => {
        cards.forEach(card => {
          newCards.push(card)
        })
      })
    });
  }

  const currentCard = newCards.find(card => card._id === cardId)

  const clickOnDescription = () => {
    console.log("click")
  }

  const handleChange = (e) => {
    setDescriptionInput(e.target.value)
    console.log(descriptionInput)
  }

  const renderMembers = () => {
      if(members){
        return members.map((member, i) => {
          const values = random_rgba();
          const randomColor = 'rgba(' + values + '1)'
          const colorStyle = { backgroundColor: randomColor };
  
          return (
            <div key={i} onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
          )
        })
    }
    
  }

  const renderForm = () => {
    return (
      <form>
      <div className="form-row description-form">
          <label for="description" className="description-label">Description</label>
          <textarea class="form-control" id="description" rows="3" placeholder="Enter a more detailed description here" onClick={clickOnDescription} onChange={handleChange}></textarea>
          <button type="button" className="btn btn-outline-secondary add-description">Save</button>
      </div>
    </form>
    )
  }

  const renderActivity = () => {
    return (
      <div className="activity">
        <div className="activity-label">Activity</div>
        <textarea class="form-control" id="description" rows="1" placeholder="Add comment"/>
      </div>
    )
  }

  
  return (trigger) ? (
    <div className="card list-card" id="card-component">
      <div className="list-card-inner">
        <img onClick={() => {
          toggle(false);
          navigate(-1);
          }} className="close-card" src="https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png" alt="close card"/>
        <h1>{currentCard.title}</h1>
        <div className="members-dropdown board-members">
          <p>Members: </p>
          {renderMembers()}
        </div>
        <div>{renderForm()}</div>
        <div>{renderActivity()}</div>
      </div>
    </div>
  ) : ""
}

export default Card;