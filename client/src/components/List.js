import Card from "./Card"
import AddCard from "./AddCard"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLists, getCards, listsLoaded } from "../reducers/listSlice";

const List = () => {


  return (
    <div className="comp">
      <h2>List</h2>
      <Card />
      <AddCard />
    </div>
  )
}

export default List;