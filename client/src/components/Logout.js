import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("../login", {replace: true});
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