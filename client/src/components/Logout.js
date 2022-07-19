import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../reducers/loginSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYesClick = () => {
    
    dispatch(reset());
    navigate("../", {replace: true});
  }

  const handleNoClick = () => {
    navigate("../home", {relpace: true})
  }

  return (
    <div className="comp">
      <p>Are you sure you want to logout?</p>
      <button onClick={handleYesClick} className="btn btn-success">
        Yes
      </button>
      <button onClick={handleNoClick} className="btn btn-danger">
        No
      </button>
    </div>
  )
}

export default Logout;