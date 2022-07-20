import { useSelector, useDispatch } from "react-redux";
import { getBoard } from "../reducers/boardSlice";
import { useNavigate } from "react-router"


const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.workspace.boards)
  const boardsLoaded = useSelector(state => state.workspace.boardsLoaded);
  const navigate = useNavigate();

  const renderBoards = () => {
    if (boardsLoaded) {
        return boards.map((board, i) => {
          return (
            <div key={i} onClick={handleClick}>{board.title}</div>
          )
        })
    }
  }

  const handleClick = (e) => {
    const titleClicked = e.target.innerHTML;

    const boardClicked = boards.find((board) => {
      return board.title === titleClicked
    })

    const boardId = boardClicked._id;
    dispatch(getBoard(boardId));


    navigate("/boards/" + boardId)
  }
  
  return (
    <div className="comp">
      <h3>BoardList</h3>
      <div>{renderBoards()}</div>
    </div>
  )
}

export default BoardList;