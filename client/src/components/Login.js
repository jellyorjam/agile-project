import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMember } from "../reducers/loginSlice";


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
    const { username, password } = formValue;
    setLoading(true);
    updateUser({username: username, password: password})
    navigate("/home", { replace: true });
    setLoading(false);

    const hardCodedUserId = '62d17b0f95e97c0aa7d5825b'

    dispatch(setMember(hardCodedUserId));
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
  )
};

export default Login;