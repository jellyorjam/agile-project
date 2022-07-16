import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

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
    navigate("../home", { replace: true });
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
            <button className="btn btn-primary form-item" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  )
};

export default Login;