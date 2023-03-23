import React, { useContext, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loaders/Loading";
import { AuthContext } from "../context/AuthProvider";
import axiosInstance from "../utils/axiosInstance";
import getImgUrl from "../utils/imgToUrl";

const LearnerCreator = () => {
  const { user, setUser } = useContext(AuthContext);
  const { handleSubmit, register, reset, control } = useForm();
  const term = useWatch({ control, name: "term" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset({ email: user?.email });
  }, [user, reset]);

  useEffect(() => {
    if (!loading && user?.role) {
      navigate("/dashboard");
    }
  }, [loading, user?.role, navigate]);

  if (loading) return <Loading />;

  const handleLearnerCreate = async (data) => {
    setLoading(true); // learner creation started
    const {
      fullName,
      // email,
      age,
      phone,
      address,
      vehicleType,
      nid,
      profile,
    } = data;
    const newLearner = {
      displayName: fullName,
      email: user.email,
      age: +age,
      phoneNumber: phone,
      address,
      vehicleType,
      role: "learner",
      nid: await getImgUrl(nid[0]),
      photoURL: await getImgUrl(profile[0]),
    };
    // console.log("new Learner", newLearner);
    axiosInstance
      .post("users", newLearner)
      .then((response) => {
        toast.success("Learner Registration Successful");
        // console.log(response.data);
        setUser({ ...newLearner, _id: response.data.insertedId });
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Oops Learner Registration Failed");
        console.log("post error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <form
        className="shadow py-10 px-12 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
        onSubmit={handleSubmit(handleLearnerCreate)}
      >
        <h1 className="w-full text-2xl text-primary mb-5">Learner</h1>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input type="text" id="fullName" {...register("fullName")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="cursor-not-allowed"
            id="email"
            disabled
            {...register("email")}
          />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="age">
            Age
          </label>
          <input type="number" id="age" {...register("age")} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="phone">
            Phone
          </label>
          <input type="text" id="phone" {...register("phone")} />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="address">
            Address
          </label>
          <input type="text" {...register("address")} id="address" />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="nid">
            NID Picture
          </label>
          <input type="file" {...register("nid")} id="nid" />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="vehicleType">
            Vehicle Type
          </label>
          <select {...register("vehicleType")} id="vehicleType">
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="profile">
            Profile Picture
          </label>
          <input type="file" {...register("profile")} id="profile" />
        </div>
        <div className="flex justify-between items-center w-full mt-3">
          <div className="flex  w-full max-w-xs">
            <input
              className="mr-3"
              type="checkbox"
              {...register("term")}
              id="terms"
            />
            <label htmlFor="terms">I agree to terms and conditions</label>
          </div>
          <button disabled={!term} className="btn" type="submit">
            Register as a Learner
          </button>
        </div>
      </form>
    </div>
  );
};

export default LearnerCreator;
