import List from "./List"
import AddList from "./AddList"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMembersOfBoard, getBoard } from "../reducers/boardSlice"
import { useParams } from "react-router"

const Board = () => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board.boardInfo)
  const members = useSelector(state => state.board.members)

  let {boardId} = useParams();


  useEffect(() => {
    dispatch(getBoard(boardId)).then((response) => {
      const members = response.payload.members
      members.map((member) => {
        return dispatch(getMembersOfBoard(member))
       })
     }
    )
  }, [])


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