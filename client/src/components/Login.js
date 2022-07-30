import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, setLogin, setMember } from "../reducers/loginSlice";
import { setWorkspaces, workspacesLoaded } from "../reducers/homeSlice";


const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: ""
  };

  const handleFocus = () => {
    dispatch(reset())
    setError(false)
  }

  const renderErrors = () => {
    if(error){
      return (
        <div id="incorrect-form">Incorrect username or password</div>
      )
    } else {
      return ""
    }
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("^ This field is required"),
    password: Yup.string().required("^ This field is required")
  });

  const handleLogin = (formValue, e) => {
    e.resetForm();
    dispatch(setLogin(formValue))
      .unwrap()
      .then((payload) => {
        if(!payload.message){
          dispatch(setMember(payload))
            .unwrap()
            .then((payload) => {
              const workspaces = payload.workspaces;
              for (let i = 0; i < workspaces.length; i++) {
                let workspace = workspaces[i];
                dispatch(setWorkspaces(workspace)).then((payload) => {
                  if (i === workspaces.length - 1) {
                    dispatch(workspacesLoaded())
                  }
                });
                setLoading(true);
                navigate("/home", { replace: true });
              }
            }).catch((err) => {
              return err
            });
        }
        else {
          setError(true)
        }
      }).catch((err) => err)
  };

  return (
    <div className="container login-div">
      {renderErrors()}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <div className="d-flex justify-content-center align-items-center login-form">
          <Form className="form-control form">
            <div>
              <Field onFocus={handleFocus} className="form-control form-item" name="username" type="text" placeholder="Username" />
              <ErrorMessage className="error-message" name="username" component="div" />
            </div>
            <div>
              <Field className="form-control form-item" name="password" type="password" placeholder="Password" />
              <ErrorMessage className="error-message" name="password" component="div" />
            </div>
            <div>
              <button className="btn btn-outline-secondary form-item" type="submit" disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  )
};

export default Login;