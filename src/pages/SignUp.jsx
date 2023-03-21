import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import dirtBike from "../assets/images/dirt-bike.png";
import auth from "../utils/firebase.init";

const SignUp = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/register";

  const handleCreateUser = (data) => {
    const { email, password } = data;
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          toast.success("Account created successfully");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorCode, errorMessage);
          toast.error("Oops! failed to sign-up");
        });
    } else {
      toast.error("Please fill-up registration from first");
    }
  }; //creating new user

  return (
    <div className="flex h-screen items-center pt-14">
      <div className="w-1/2">
        <img src={dirtBike} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="shadow-md rounded-lg grid place-items-center py-10 px-14">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-3">
                  Email
                </label>
                <input type="email" name="email" id="email" {...register("email")} />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-3">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="!mt-8 ">
                <button type="submit" className="btn-hr-primary">
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
