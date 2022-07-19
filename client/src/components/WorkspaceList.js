import { useSelector, useDispatch } from "react-redux";
import { loadBoardsInWorkspace, boardsLoaded } from "../reducers/workspaceSlice";
import { useNavigate } from "react-router";

const WorkspaceList = () => {
  const dispatch = useDispatch();

  const workspacesLoaded = useSelector(state => state.home.workspacesLoaded);
  const workspaces = useSelector(state => state.home.workspaces);
  const navigate = useNavigate();

  const renderWorkspaces = () => {
    if (workspacesLoaded) {
      return workspaces.map((workspace, i) => {
        return (
          <div className="workspace-box col" key={i} onClick={handleClick}>{workspace.title}</div>
        )
      })
    }
  }

  const handleClick = (e) => {
    const titleClicked = e.target.innerHTML;

    const workspaceClicked = workspaces.find((workspace) => {
      return workspace.title === titleClicked
    })

    const workspaceId = workspaceClicked._id;
    console.log(workspaceId)

    const boards = workspaceClicked.boards
    for (let i = 0; i < boards.length; i++) {
      let board = boards[i];
      dispatch(loadBoardsInWorkspace(board)).then((payload) => {
        if (i === boards.length - 1) {
          dispatch(boardsLoaded())
        }
      });
    }

    navigate("/" + workspaceId + "/boards")
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="row ws-div container">{renderWorkspaces()}</div>
    </div>
  )
}

export default WorkspaceList;