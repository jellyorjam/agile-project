import WorkspaceList from "./WorkspaceList";

const Home = () => {
  return (
    <div className="background">
      <h3 className="home-title">Your Workspaces</h3>
      <div className="ws-card container">
        <WorkspaceList />
      </div>
    </div>
  )
}

export default Home;