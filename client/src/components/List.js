import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists } from "../reducers/listSlice";

const List = () => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.board.boardInfo.lists)
  

  useEffect(() => {
    if (lists) {
      for (let i = 0; i < lists.length; i++) {
        const list = lists[i]
        dispatch(getLists(list))
      }
    }
  }, [lists, dispatch])

  return (
    <div className="comp">
      <h2>List</h2>
      <Card />
      <AddCard />
    </div>
  )
}

export default List;