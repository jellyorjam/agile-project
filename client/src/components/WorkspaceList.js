import Workspace from "./Workspace";
import { useSelector } from "react-redux";

const WorkspaceList = () => {

  const workspacesLoaded = useSelector(state => state.home.workspacesLoaded);
  const workspaces = useSelector(state => state.home.workspaces);

  const renderWorkspaces = () => {
    if (workspacesLoaded) {
      return workspaces.map((workspace) => {
        return (
          <div>{workspace.title}</div>
        )
      })
    }
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