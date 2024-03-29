import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { clearMembers } from "../reducers/boardSlice"
import { useEffect } from "react";
import { clearBoards, getMembersOfWorkspace, loadBoardsInWorkspace, setWorkspace } from "../reducers/workspaceSlice";
import { setWorkspaces } from "../reducers/homeSlice";

export const random_rgba = () => {
  const o = Math.round, r = Math.random, s = 255;
  return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',';
}

const BoardList = ({setColor}) => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const workspaces = useSelector(state => state.home.workspaces);
  const members = useSelector(state => state.workspace.members);
  const boards = useSelector(state => state.workspace.boards)
  const workspace = workspaces.find(ws => ws._id === workspaceId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMembers());
    dispatch(clearBoards());

    if(!workspace){
      dispatch(setWorkspaces(workspaceId))
    }
    
    if(workspace){
      dispatch(setWorkspace(workspace.name))
      const boards = workspace.boards
  
      for (let i = 0; i < boards.length; i++) {
        let board = boards[i];
        dispatch(loadBoardsInWorkspace(board))
      }
  
      for (let i = 0; i < workspace.members.length; i++) {
        let member = workspace.members[i];
        dispatch(getMembersOfWorkspace(member))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace])


  const renderBoards = () => {
    if (boards[0]) {
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
      return members.map((member, i) => {
        const values = random_rgba();
        const randomColor = 'rgba(' + values + '1)'
        const colorStyle = { backgroundColor: randomColor };

        return (
          <div key={i} onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
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
  
  if(workspace?.title){
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
}

export default BoardList;