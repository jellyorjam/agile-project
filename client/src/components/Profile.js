import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { findMember, memberLoaded, memberWSLoaded, setViewedMemberWorkspace } from "../reducers/homeSlice";
import { random_rgba } from "./BoardList";
import { randomColorGenerator } from "./WorkspaceList";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const viewedMember = useSelector(state => state.home.viewedMember);
  const memberIsLoaded = useSelector(state => state.home.memberLoaded);
  const memberWSReady = useSelector(state => state.home.memberWSLoaded);
  const workspaces = useSelector(state => state.home.viewedMember.workspaces);
  const color = randomColorGenerator();
  const colorStyle = { backgroundColor: "#" + color }

  useEffect(() => {
    dispatch(findMember(userId)).catch((err) => {
      return err;
    })
    if(viewedMember._id){
      dispatch(memberLoaded())
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewedMember._id]);

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
          <div className="workspace-div" key={i}>
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


  
  if(viewedMember.name){
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