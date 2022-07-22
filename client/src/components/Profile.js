import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { findMember } from "../reducers/homeSlice";
import { randomColorGenerator } from "./WorkspaceList";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(findMember(userId)).catch((err) => {
      return err;
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewedMember = useSelector(state => state.home.viewedMember)
  const color = randomColorGenerator();
  const colorStyle = { backgroundColor: "#" + color }

  
  if(viewedMember.name){
    return (
      <div className="container profile-page">
        <img className="full-cover-pic" src={viewedMember.picture} alt={viewedMember.name.first} />
        <div style={colorStyle} className="full-pfp">{viewedMember.name.first[0]}{viewedMember.name.last[0]}</div>
        <h1>{viewedMember.name.first} {viewedMember.name.last}<h3 className="email-profile">{<viewedMember className="login username"></viewedMember>}</h3></h1>
        <h3 className="email-profile col">{viewedMember.email}</h3>
      </div>
  
    )
  }

}

export default Profile;