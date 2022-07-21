import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, getCards, listsLoaded } from "../reducers/listSlice";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.boardInfo.lists)
  const loadedLists = useSelector(state => state.list.lists)
  const listsAreLoaded = useSelector(state => state.list.listsLoaded)
  

  useEffect(() => {
    if (lists) {
      for (let i = 0; i < lists.length; i++) {
        const list = lists[i]
        dispatch(getLists(list)).then(() => {
          if (i === lists.length - 1) {
            dispatch(listsLoaded())
          }
        })
      }
    }
  }, [lists, dispatch])

  useEffect(() => {

    if (listsAreLoaded) {
      for (let i = 0; i < loadedLists.length; i++) {
        let cards = loadedLists[i].cards;
        for (let i = 0; i < cards.length; i++) {
          let card = cards[i];
          dispatch(getCards(card))
        }
      }  
    }  
  }, [dispatch, listsAreLoaded])


  return (
    <div className="comp">
      <h2>List</h2>
      <Card />
      <AddCard />
    </div>
  )
}

export default List;