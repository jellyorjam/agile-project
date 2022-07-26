import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { setWorkspaces } from "../reducers/homeSlice";
import { clearViewedMember, setMember } from "../reducers/viewedMemberSlice";
import { random_rgba } from "./BoardList";
import { randomColorGenerator } from "./WorkspaceList";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const viewedMember = useSelector(state => state.viewedMember[0]?.member);
  const workspaces = useSelector(state => state.viewedMember[0]?.workspaces);
  const color = randomColorGenerator();
  const colorStyle = { backgroundColor: "#" + color }

  useEffect(() => {
    dispatch(clearViewedMember())
    getMember().then(() => getWorkspaces()).then(() => dispatch(setMember(returnedMember)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const returnedMember = [];

  const getMember = async () => {
    const response = await axios.get("http://localhost:8000/members/" + userId)
    returnedMember.push({
      member: response.data,
      workspaces: []
    });
  }

  const getWorkspaces = async () => {
    let workspaces = returnedMember[0].member.workspaces;
    let returnedWorkspaces = [];
    for (let i = 0; i < workspaces.length; i++) {
      let workspace = workspaces[i]
      const response = await axios.get("http://localhost:8000/workspaces/" + workspace)
      returnedWorkspaces.push(response.data)
    }
    returnedMember[0].workspaces.push(returnedWorkspaces)
  }

  const renderWorkspaces = () => {
    if(workspaces[0]) {
      return workspaces[0].map((ws, i) => {
        const initial = ws.title[0];
        const random = random_rgba();
        const pfpStyle = {backgroundColor: "rgba(" + random + "0.9)"}
        
        return (
          <div className="profile-ws col" key={i}>
            <div className="row main">
              <div onClick={() => {
                dispatch(setWorkspaces(ws._id))
                navigate("/" + ws._id + "/boards")
              }} className="ws-initial col-1" style={pfpStyle}>{initial}</div>
              <div onClick={() => {
                dispatch(setWorkspaces(ws._id))
                navigate("/" + ws._id + "/boards")
              }} className="ws-title col">{ws.title}</div>
            </div>
          </div>
        )
      })
    }
  }
  
  if(workspaces){
    return (
      <div className="container profile-page">
        <img className="full-cover-pic" src={viewedMember.picture} alt={viewedMember.name.first} />
        <div style={colorStyle} className="full-pfp">{viewedMember.name.first[0]}{viewedMember.name.last[0]}</div>
        <h1>{viewedMember.name.first} {viewedMember.name.last}</h1>
        <h3 className="email-profile col">{viewedMember.email}</h3>
        <h2>Workspaces</h2>
        <div className="row">
          {renderWorkspaces()}
        </div>
      </div>
  
    )
  }
}


export default Profile;