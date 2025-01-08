import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
//components
import Loader from "../../components/loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase.js"; // Firebase auth and Firestore

//schema
import { LoginSchema } from "./AuthSchema";

//redux
import { useLoginMutation } from "../../redux/services/AuthService";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleLoginFormSubmit = async (values) => {
    const firebaseUrl = import.meta.env.VITE_FIRE_ACTION;
    if (firebaseUrl === "true") {
      try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values?.email,
          values?.password
        );
        const user = userCredential.user;
        console.log("Login successful!", user.accessToken);
        const expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 1000);
        Cookies.set("clickup", `Bearer ${user.accessToken}`, {
          expires: expiresDate,
        });
        // Redirect user to a protected route or dashboard
        // Example: history.push("/dashboard"); or using useNavigate in React Router v6
      } catch (err) {
        // Handle errors (invalid credentials, etc.)
        if (err.code === "auth/user-not-found") {
          console.log("No user found with this email.");
          toast.error("No user found with this email.");
          return false;
        } else if (err.code === "auth/wrong-password") {
          console.log("Incorrect password.");
          toast.error("Incorrect password.");
          return false;
        } else if (err.code === "auth/invalid-email") {
          console.log("The email address is not valid.");
          toast.error("The email address is not valid.");
          return false;
        } else {
          toast.error(err.message);
          console.log(err.message);
          return false;
        }
      }

      navigate("/task");

      toast.success(`Welcome`);
    } else {
      let response = await login({
        email: values?.email,
        password: values?.password,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
        return;
      }

      const expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + 24 * 60 * 1000);
      Cookies.set("clickup", `Bearer ${response?.data?.data?.access_token}`, {
        expires: expiresDate,
      });

      navigate("/task");

      toast.success(`Welcome`);
    }
  };

  return (
    <div className="w-full h-screen  flex items-center justify-center bg-contain">
      {/* Login Container */}
      <div className="w-[400px] bg-white rounded-md shadow-lg px-16 pt-12 pb-14 z-10">
        {/* LOGO */}
        <h1 className="font-bold text-[24px] mb-8 text-center">clickup</h1>

        <div className="text-center">
          <h2 className="text-[20px] font-[500] mb-3">Welcome</h2>
          <h2 className="font-[500] text-gray-500">
            Please login to continue to your dashboard
          </h2>
        </div>

        {/* Login Input */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleLoginFormSubmit(values, setSubmitting)
          }
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ touched, errors }) => (
            <Form className="flex flex-col gap-8 mt-8">
              <div className="flex flex-col gap-3">
                <Field
                  name="email"
                  className={`w-full border border-gray-300 px-8 py-5 rounded-md  ${
                    touched.email && errors.email ? "border-red-600" : ""
                  }`}
                  placeholder="Email"
                ></Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Field
                  type="password"
                  name="password"
                  className={`w-full border border-gray-300 px-8 py-5 rounded-md ${
                    touched.password && errors.password ? "border-red-600" : ""
                  }`}
                  placeholder="Password"
                ></Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white py-5 rounded-md mt-3 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader color={"white"} /> : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <h3 className="mt-8">
          SIGNUP{" "}
          <span className="text-blue-600">
            <Link to="/signup">Signup</Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Login;
