import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import dirtBike from "../assets/images/dirt-bike.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../utils/firebase.init";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { user, isLoading } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/register";

  useEffect(() => {
    if (!isLoading && user) {
      toast.success("Login successful");
      navigate(from, { replace: true });
    }
  }, [isLoading, user, navigate, from]);

  const handleLogin = (data) => {
    const { email, password } = data;
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("Oops! failed to login");
          console.log("error", errorCode, errorMessage);
        });
    } else {
      toast.error("Please insert login credentials first");
    }
  };

  return (
    <div className="flex h-screen items-center">
      <div className="w-1/2">
        <img src={dirtBike} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="shadow-md grid place-items-center rounded-lg py-10 px-14">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-3">
                  Email
                </label>
                <input type="email" {...register("email")} id="email" />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-3">
                  Password
                </label>
                <input type="password" id="password" {...register("password")} />
              </div>
              <div className="relative !mt-8">
                <button type="submit" className="btn-hr-primary">
                  Login
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign up
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

export default Login;
