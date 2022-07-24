import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { clearMembers } from "../reducers/boardSlice"
import { useEffect } from "react";
import { clearBoards, getMembersOfWorkspace, loadBoardsInWorkspace, setWorkspace } from "../reducers/workspaceSlice";
import { boardsLoaded } from "../reducers/workspaceSlice";

export const random_rgba = () => {
  const o = Math.round, r = Math.random, s = 255;
  return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',';
}

const BoardList = ({setColor}) => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const boards = useSelector(state => state.workspace.boards)
  const boardsReady = useSelector(state => state.workspace.boardsLoaded);
  const workspaces = useSelector(state => state.home.workspaces);
  const members = useSelector(state => state.workspace.members);
  const workspace = workspaces.find(ws => ws._id === workspaceId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMembers())
    dispatch(clearBoards())
    dispatch(setWorkspace(workspace.name))
    const boards = workspace.boards
    for (let i = 0; i < boards.length; i++) {
      let board = boards[i];
      dispatch(loadBoardsInWorkspace(board)).then((payload) => {
        if (i === boards.length - 1) {
          dispatch(boardsLoaded())
        }
      });
    }
    for (let i = 0; i < workspace.members.length; i++) {
      let member = workspace.members[i];
      dispatch(getMembersOfWorkspace(member))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const renderBoards = () => {
    if (boardsReady) {
        return boards.map((board, i) => {
          const values = random_rgba();
          const color = 'rgba(' + values + '0.4)'
          const style = { backgroundColor: color }
          return (
            <div style={style} className="board-box col" key={i} onClick={handleClick}>{board.title}</div>
          )
        })
    }
  }

  const renderMembers = () => {
    if(members[0]){
      return members.map((member) => {
        const values = random_rgba();
        const randomColor = 'rgba(' + values + '1)'
        const colorStyle = { backgroundColor: randomColor };

        return (
          <div onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
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
    setColor(e.target.style.backgroundColor)

    navigate("/" + workspaceId + "/boards/" + boardId)
  }
  
  return (
    <div className="boards-div">
      <h2 className="ws-boards-title">{workspace.title}</h2>
      <div className="members-dropdown board-members">
        <p>{`Workspace Members (${workspace.members.length}): `}</p>
        {renderMembers()}
      </div>
      <div className="boards-div row d-flex justify-content-center">{renderBoards()}</div>
    </div>
  )
}

export default BoardList;