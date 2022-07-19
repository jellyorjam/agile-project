import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMember } from "../reducers/loginSlice";
import { setWorkspaces, workspacesLoaded } from "../reducers/homeSlice";


const Login = ({updateUser}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("* This field is required!"),
    password: Yup.string().required("* This field is required!")
  });

  const handleLogin = (formValue) => {
    // const { username, password } = formValue;
    setLoading(true);
    navigate("/home", { replace: true });

    // const hardCodedUserId = '62d592bb2d475d2ed21bbea9' //emily's hardcoded user
    const hardCodedUserId = '62d4c5f2eb86a718a87a3d22' //natalie's hardcoded user

    dispatch(setMember(hardCodedUserId))
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
        }
      }).catch((err) => {
        setLoading(false);
        return err
      });
    // dispatch(login({ username, password }))
    //   .unwrap()
    //   .then(() => {
    //     props.history.push("/profile");
    //     window.location.reload();
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <div className="container login-div">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <div className="d-flex justify-content-center align-items-center login-form">
          <Form className="form-control">
            <div>
              <Field className="form-control form-item" name="username" type="text" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field className="form-control form-item" name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button className="btn btn-primary form-item" type="submit" disabled={loading}>
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