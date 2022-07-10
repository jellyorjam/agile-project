import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("../");
  }

  const handleNoClick = () => {
    navigate("../home")
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