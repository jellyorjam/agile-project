const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center login-form">
      <div>
        <form className="form-control">
          <input className="form-control form-item " placeholder="Username"></input>
          <input className="form-control form-item" type="password" placeholder="Password"></input>
          <button className="btn btn-primary form-item" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
};

export default Login;