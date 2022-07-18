import Workspace from "./Workspace";
import { useSelector, useDispatch } from "react-redux";
import { loadBoardsInWorkspace, boardsLoaded, clearBoards } from "../reducers/workspaceSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const WorkspaceList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBoards())
  }, [dispatch]);

  const workspacesLoaded = useSelector(state => state.home.workspacesLoaded);
  const workspaces = useSelector(state => state.home.workspaces);
  const navigate = useNavigate();

  const renderWorkspaces = () => {
    if (workspacesLoaded) {
      return workspaces.map((workspace, i) => {
        return (
          <div key={i} onClick={handleClick}>{workspace.title}</div>
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

    navigate("/boards")
  }

  return (
    <div className="comp">
      <h2>Workspaces</h2>
      <div>{renderWorkspaces()}</div>
      <Workspace />
    </div>
  )
}

export default WorkspaceList;