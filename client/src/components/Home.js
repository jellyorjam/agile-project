import { useSelector } from "react-redux";
import WorkspaceList from "./WorkspaceList";

const Home = () => {
  const user = useSelector(state => state.login)
  return (
    <div className="background">
      <h2 id="welcome">Welcome, {user.name.first}!</h2>
      <h3 className="home-title">Your Workspaces</h3>
      <div className="ws-card container">
        <WorkspaceList />
      </div>
    </div>
  )
}

export default Home;