import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetHome } from "../reducers/homeSlice";
import { reset } from "../reducers/loginSlice";
import { clearBoards } from "../reducers/workspaceSlice";

const Logout = ({trigger, toggle}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
  }

  const handleYesClick = () => {
    eraseCookie("jwt")
    toggle(false)
    dispatch(reset());
    dispatch(clearBoards());
    dispatch(resetHome());
    navigate("../", {replace: true});
  }

  const handleNoClick = () => {
    toggle(false)
    navigate("../home", {relpace: true})
  }

  return trigger ? (
    <div className="logout-outer">
      <div className="logout-inner">
        <p>Are you sure you want to logout?</p>
        <button onClick={handleYesClick} className="btn btn-success">
          Yes
        </button>
        <button onClick={handleNoClick} className="btn btn-danger">
          No
        </button>
      </div>
    </div>
  ) : ""
}

export default Logout;