import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// firebase database

import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth function
import { auth, db } from "./firebase.js"; // Firebase auth and Firestore
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
//components
import Loader from "../../components/loader/Loader";

//schema
import { LoginSchema } from "./AuthSchema";

//redux
import {
  useLoginMutation,
  useSigninMutation,
} from "../../redux/services/AuthService";

const Signup = () => {
  const [signup, { isLoading }] = useSigninMutation();
  // Initialize reCAPTCHA when the component mounts
  // Initialize reCAPTCHA when the component mounts

  const handleSignupFormSubmit = async (values) => {
    const firebaseUrl = import.meta.env.VITE_FIRE_ACTION;
    if (firebaseUrl === "true") {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values?.email,
        values?.password
      );

      // Get the user from userCredential
      const user = userCredential.user;
      // Store the username and other additional data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: values?.email,
        password: values?.password,
        createdAt: new Date(),
      });
      toast.success(`User successfully created`);
    } else {
      let response = await signup({
        email: values?.email,
        password: values?.password,
      });

      if (response?.error) {
        toast.error(response.error.data.message);
        return;
      }
      toast.success(`User successfully created`);
    }
  };

  return (
    <div className="w-full h-screen  flex items-center justify-center bg-contain">
      <div className="w-[400px] bg-white rounded-md shadow-lg px-16 pt-12 pb-14 z-10">
        <h1 className="font-bold text-[24px] mb-8 text-center">Signup</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) =>
            handleSignupFormSubmit(values, setSubmitting)
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
              >
                Signup
              </button>
            </Form>
          )}
        </Formik>
        <h3 className="mt-8">
          LOGIN{" "}
          <span className="text-blue-600">
            <Link to="/LOGIN">LOGIN</Link>
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Signup;
