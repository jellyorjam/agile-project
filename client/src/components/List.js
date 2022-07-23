import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, getCards, listsLoaded, setListsAndCards} from "../reducers/listSlice";
import axios from "axios";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.boardInfo.lists);


  useEffect(() => {
    getLists().then(() => getCards()).then(() => dispatch(setListsAndCards(returnedLists)));
  }, [])

 const returnedLists = [];
 

  const getLists = async () => {
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      const response = await axios.get("http://localhost:8000/lists/" + list)
      returnedLists.push({
        list: response.data,
        cards: []
      })
    }
  }

  const getCards = async () => {
    for (let i = 0; i < returnedLists.length; i++) {
    let cards = returnedLists[i].list.cards
    let returnedCards = []
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i]
        const response = await axios.get("http://localhost:8000/cards/" + card)
        returnedCards.push(response.data)
      }
      returnedLists[i].cards.push(returnedCards)
    }
  }

 


  return (
    <div className="comp">
      <h2>Test</h2>
      <Card />
      <AddCard />
    </div>
  )
}

export default List;