import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, getCards, listsLoaded } from "../reducers/listSlice";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.boardInfo.lists);
  console.log(lists)

  useEffect(() => {
    lists.map((list) => {
      return dispatch(getLists(list)).then((response) => {
        const cards = response.payload.cards;
        cards.map((card) => {
          dispatch(getCards(card))
        })
      })
    })
  }, [])

  return (
    <div className="comp">
      <h2>Test</h2>
      <Card />
      <AddCard />
    </div>
  )
}

export default List;