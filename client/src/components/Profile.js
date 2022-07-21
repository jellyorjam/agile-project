import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { findMember } from "../reducers/homeSlice";

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

  
  if(viewedMember.name){
    return (
      <div className="container profile-page">
        <img className="full-pfp" src={viewedMember.picture} alt={viewedMember.name.first} />
        <h1>{viewedMember.name.first} {viewedMember.name.last}</h1>
        <h3 className="email-profile">{`(@${viewedMember.login.username})`}</h3>
        <h3 className="email-profile col">{viewedMember.email}</h3>
      </div>
  
    )
  }

}

export default Profile;