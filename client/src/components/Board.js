import List from "./List"
import AddList from "./AddList"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMembersOfBoard } from "../reducers/boardSlice"

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board.boardInfo)
  const members = useSelector(state => state.board.members)




  const renderTitle = () => {
    if (board) {
      return (
        <div>{board.title}</div>
      )
    }
  }

  const renderMembers = () => {
    if (members) {
      return members.map((member) => {
        return (
          <div>{member.name.first}</div>
        )
      })
    }
  }


  return (
    <div className="comp">
      <h1>{renderTitle()}</h1>
      <div>{renderMembers()}</div>
      <List />
      <AddList />
    </div>
  )
}

export default Board;