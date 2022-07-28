import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Card = ({trigger, toggle}) => {
  const navigate = useNavigate();
  const {cardId} = useParams();
  const {boardId} = useParams();
  const {workspaceId} = useParams();
  const lists = useSelector(state => state.list);

  
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

  
  return (trigger) ? (
    <div className="card list-card" id="card-component">
      <div className="list-card-inner">
        <img onClick={() => {
          toggle(false);
          navigate(-1);
          }} className="close-card" src="https://cdn0.iconfinder.com/data/icons/octicons/1024/x-512.png" alt="close card"/>
        <h1>{currentCard.title}</h1>
      </div>
    </div>
  ) : ""
}

export default Card;