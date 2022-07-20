import WorkspaceList from "./WorkspaceList";

const Home = () => {
  return (
    <div className="comp">
      <h3 className="home-title">Your Workspaces</h3>
      <div className="card ws-card container">
        <WorkspaceList />
      </div>
    </div>
  )
}

export default Home;