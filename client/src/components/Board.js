import List from "./List"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getMembersOfBoard, getBoard } from "../reducers/boardSlice"
import { useParams } from "react-router";

const Board = ({color}) => {
  const dispatch = useDispatch();
  const board = useSelector(state => state.board.boardInfo)
  const [isLoading, setIsLoading] = useState(true)
  let {boardId} = useParams();

  useEffect(() => {
    dispatch(getBoard(boardId)).then((response) => {
      const members = response.payload.members;
      if (members.length === 0) {
        setIsLoading(false)
      }
      if (members) {
        for (let i = 0; i < members.length; i++) {
          let member = members[i];
          dispatch(getMembersOfBoard(member)).then(() => {
            if (i === members.length - 1) {
              setIsLoading(false)
              
            }

          })
        }  
      }
    }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const backgroundStyle = { backgroundColor: color}

  const renderTitle = () => {
    if (board) {
      return (
        <div className="board-title">{board.title.toUpperCase()}</div>
      )
    }
  }

  // const renderMembers = () => {
  //   if (membersOfBoard) {
  //     return membersOfBoard.map((member) => {
  //       return (
  //         <div className="test">{member.name.first}</div>
  //       )
  //     })
  //   }
  // }
  const renderLists = () => {
    if (!isLoading) {
      return (
        <div><List/></div> 
      )
    }
  }

  return (
    <div className="board-background" style={backgroundStyle}>
      <h1>{renderTitle()}</h1>
      {/* <div>{renderMembers()}</div> */}
      <div>{renderLists()}</div>
    </div>
  )
}

export default Board;