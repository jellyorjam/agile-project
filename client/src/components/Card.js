import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Card = ({trigger, toggle}) => {
  const {cardId} = useParams();
  const lists = useSelector(state => state.list);
  const newCards = [];
  lists.forEach(list => {
    list.cards.forEach(cards => {
      cards.forEach(card => {
        newCards.push(card)
      })
    })
  });

  const currentCard = newCards.find(card => card._id === cardId)
  // const card = cards.find(card => card._id === cardId)
  console.log(currentCard)
  return (trigger) ? (
    <div className="card list-card" id="card-component">
      <div className="list-card-inner">
        <img onClick={() => toggle(false)} className="close-card" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png" alt="close card"/>
        <h1>{currentCard.title}</h1>
      </div>
    </div>
  ) : ""
}

export default Card;