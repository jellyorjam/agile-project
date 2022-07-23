import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, getCards, listsLoaded, setListsAndCards} from "../reducers/listSlice";
import axios from "axios";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.boardInfo.lists);
  const listsDetail = useSelector(state => state.list);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getLists().then(() => getCards()).then(() => dispatch(setListsAndCards(returnedLists))).then(() => setIsLoading(false));
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

  const renderLists = () => {
    if (!isLoading) {
      return listsDetail.map((list, i) => {
        return (
              <div key={i} className="col list">
                <div className="list-title">{list.list.title}</div>
                <div>{list.cards.map((cards) => {
                  return cards.map((card) => {
                    return (
                      <div>{card.title}</div>
                    )
                  })
                })}</div>
              </div>
        )
      })
    }
  }



  return (
    <div className="comp container">
      <div className="row">{renderLists()}</div>
      {/* <Card />
      <AddCard /> */}
    </div>
  )
}

export default List;