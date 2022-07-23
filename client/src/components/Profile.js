import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { clearViewedMember, findMember, memberLoaded, memberWSLoaded, setViewedMemberWorkspace } from "../reducers/viewedMemberSlice";
import { random_rgba } from "./BoardList";
import { randomColorGenerator } from "./WorkspaceList";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const viewedMember = useSelector(state => state.viewedMember.member[0]);
  const memberIsLoaded = useSelector(state => state.viewedMember.memberLoaded);
  const memberWSReady = useSelector(state => state.viewedMember.memberWSLoaded);
  const workspaces = useSelector(state => state.viewedMember.workspaces);
  const color = randomColorGenerator();
  const colorStyle = { backgroundColor: "#" + color }

  useEffect(() => {
    dispatch(clearViewedMember())
    dispatch(findMember(userId)).then(dispatch(memberLoaded()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchWorkspaces = (workspace) => {
      dispatch(setViewedMemberWorkspace(workspace))
    }

    if(memberIsLoaded){
      workspaces.forEach(workspace => {
        if(workspaces[0].boards === undefined && workspaces[workspaces.length - 1] !== undefined){
          fetchWorkspaces(workspace);
          setTimeout(() => {
            dispatch(memberWSLoaded())
          }, 1000)
          
        }
        fetchWorkspaces(workspace)
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberIsLoaded]);

  const renderWorkspaces = () => {
    if(memberWSReady) {
      return workspaces.map((workspace, i) => {
        const initial = workspace.title[0];
        const random = random_rgba();
        const pfpStyle = {backgroundColor: "rgba(" + random + "0.9)"}

        return (
          <div className="workspace-div col" key={i}>
            <div className="row main">
              <div className="col-2"></div>
              <div className="ws-initial col-1" style={pfpStyle}>{initial}</div>
              <div className="ws-title col">{workspace.title}</div>
            </div>
          </div>
        )
      })
    }
  }


  
  if(memberIsLoaded){
    return (
      <div className="container profile-page">
        <img className="full-cover-pic" src={viewedMember.picture} alt={viewedMember.name.first} />
        <div style={colorStyle} className="full-pfp">{viewedMember.name.first[0]}{viewedMember.name.last[0]}</div>
        <h1>{viewedMember.name.first} {viewedMember.name.last}</h1>
        <h3 className="email-profile col">{viewedMember.email}</h3>
        <h2>Workspaces</h2>
        <div className="row card">
          {renderWorkspaces()}
        </div>
      </div>
  
    )
  }

}

export default Profile;