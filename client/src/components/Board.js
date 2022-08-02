import List from "./List"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { getMembersOfBoard, getBoard } from "../reducers/boardSlice"
import { useParams, useNavigate } from "react-router";
import { random_rgba } from "./BoardList";

const Board = ({color}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector(state => state.board.boardInfo)
  const [isLoading, setIsLoading] = useState(true)
  let {boardId} = useParams();
  const membersOfBoard = useSelector(state => state.board.members)

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

  const renderMembers = () => {
    if (!isLoading) {
      if(membersOfBoard[0]){
        return membersOfBoard.map((member, i) => {
          const values = random_rgba();
          const randomColor = 'rgba(' + values + '1)'
          const colorStyle = { backgroundColor: randomColor };
  
          return (
            <div key={i} onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
          )
        })
    }
    
    }
  }

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
      <div className="members-dropdown board-members">
          <p>Members: </p>
          {renderMembers()}
        </div>
      <div className="render-lists">{renderLists()}</div>
    </div>
  )
}

export default Board;