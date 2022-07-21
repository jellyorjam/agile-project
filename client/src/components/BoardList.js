import { useSelector, useDispatch } from "react-redux";
import { getBoard } from "../reducers/boardSlice";
import { useNavigate } from "react-router"

export const random_rgba = () => {
  const o = Math.round, r = Math.random, s = 255;
  return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',';
}

const BoardList = () => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.workspace.boards)
  const boardsLoaded = useSelector(state => state.workspace.boardsLoaded);
  const navigate = useNavigate();

  const renderBoards = () => {
    if (boardsLoaded) {
        return boards.map((board, i) => {
          const values = random_rgba();
          const color = 'rgba(' + values + '0.6)'
          const style = { backgroundColor: color }
          return (
            <div style={style} className="board-box col" key={i} onClick={handleClick}>{board.title}</div>
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

    dispatch(getBoard(boardId)).then(() => {
      navigate("/boards/" + boardId);
    })
  }
  
  return (
    <div className="boards-div">
      <h2 className="ws-boards-title">Workspace Name Here</h2>
      <div className="boards-div row d-flex justify-content-center">{renderBoards()}</div>
    </div>
  )
}

export default BoardList;