import { useSelector, useDispatch } from "react-redux";
import { loadBoardsInWorkspace, getMembersOfWorkspace, boardsLoaded, clearBoards, clearMembers } from "../reducers/workspaceSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const randomColorGenerator = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const WorkspaceList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBoards())
  }, [dispatch]);

  const workspacesLoaded = useSelector(state => state.home.workspacesLoaded);
  const workspaces = useSelector(state => state.home.workspaces);
  const members = useSelector(state => state.workspace.members)
  const navigate = useNavigate();

  const renderWorkspaces = () => {
    if (workspacesLoaded) {
      return workspaces.map((workspace, i) => {
        const initial = workspace.title[0];
        const randomColor = randomColorGenerator();
        const randomColor2 = randomColorGenerator();
        const pfpStyle = {backgroundImage: "linear-gradient(#" + randomColor + ", #" + randomColor2 + ")"}
        return (
          <div className="workspace-div" key={i}>
            <div className="row main">
              <div className="ws-initial col-1" style={pfpStyle}>{initial}</div>
              <div className="ws-title col">{workspace.title}</div>
            </div>
            <div className="row ws-buttons">
              <div 
                className="ws-members col" 
                onClick={handleClickOnMembers}
                
              >
                {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />Members
                
              </div>
              <div className="ws-boards col"  onClick={handleClickOnBoards}>
                {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-25/bulletin-board-4.png"/>Boards</div>
              <div className="members-dropdown">
                {renderMembers()}
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const renderMembers = () => {
    if(members[0]){
      return members.map((member) => {
        const randomColor = randomColorGenerator();
        const colorStyle = { backgroundColor: "#" + randomColor };

        return (
          <div onClick={() => navigate(`../${member._id}`, {replace: true})} style={colorStyle} className="member-style" >{member.name.first[0]}{member.name.last[0]}</div>
        )
      })
    }
  }

  const handleClickOnBoards = (e) => {
    const titleClicked = e.target.parentElement.parentElement.childNodes[0].childNodes[1].innerHTML;

    const workspaceClicked = workspaces.find((workspace) => {
      return workspace.title === titleClicked
    })

    const boards = workspaceClicked.boards
    for (let i = 0; i < boards.length; i++) {
      let board = boards[i];
      dispatch(loadBoardsInWorkspace(board)).then((payload) => {
        if (i === boards.length - 1) {
          dispatch(boardsLoaded())
        }
      });
    }

    navigate("/" + workspaceClicked._id + "/boards")
  }

  const toggleShow = (element) => {
    if(element.classList.contains("show")){
      return element.classList.remove("show");
    }
    if(!element.classList.contains("show")){
      return element.classList.add("show");
    }
  }

  const handleClickOnMembers = (e) => {
    dispatch(clearMembers())
    var elems = document.querySelectorAll(".members-dropdown");

    [].forEach.call(elems, function(el) {
      el.classList.remove("show");
    });
    const titleClicked = e.target.parentElement.parentElement.childNodes[0].childNodes[1].innerHTML;
    const workspaceClicked = workspaces.find((workspace) => {
      return workspace.title === titleClicked
    })

    const dropdown = e.target.parentElement.childNodes[2];
    const members = workspaceClicked.members

    for (let i = 0; i < members.length; i++) {
      let member = members[i];
      dispatch(getMembersOfWorkspace(member))
    }

    toggleShow(dropdown);
  }

  return (
    <div className="d-flex justify-content-center">
      <div>{renderWorkspaces()}</div>
    </div>
  )
}

export default WorkspaceList;