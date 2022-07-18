import { useSelector, useDispatch } from "react-redux";


const BoardList = () => {
  const boards = useSelector(state => state.workspace.boards)
  const boardsLoaded = useSelector(state => state.workspace.boardsLoaded);

  const renderBoards = () => {
    if (boardsLoaded) {
        return boards.map((board, i) => {
          return (
            <div key={i}>{board.title}</div>
          )
        })
    }
  }

  return (
    <div className="comp">
      <h3>BoardList</h3>
      <div>{renderBoards()}</div>
    </div>
  )
}

export default BoardList;