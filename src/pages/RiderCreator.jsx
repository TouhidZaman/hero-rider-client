import React, { useContext, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AuthContext } from "../context/AuthProvider";

const RiderCreator = () => {
  const { user } = useContext(AuthContext);
  const { handleSubmit, register, reset, control } = useForm();
  const term = useWatch({ control, name: "term" });

  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset({ email: user?.email });
  }, [user, reset]);

  const handleRiderCreate = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      <form
        className="shadow py-10 px-12 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
        onSubmit={handleSubmit(handleRiderCreate)}
      >
        <h1 className="w-full text-2xl text-primary mb-5">Rider</h1>
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
          <h1 className="mb-3">Gender</h1>
          <div className="flex gap-3">
            <div>
              <input type="radio" id="male" {...register("gender")} value="male" />
              <label className="ml-2 text-lg" htmlFor="male">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                {...register("gender")}
                value="female"
              />
              <label className="ml-2 text-lg" htmlFor="female">
                Female
              </label>
            </div>
            <div>
              <input type="radio" id="other" {...register("gender")} value="other" />
              <label className="ml-2 text-lg" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="phone">
            Phone
          </label>
          <input type="number" id="phone" {...register("phone")} />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="address">
            Address
          </label>
          <input type="text" {...register("address")} id="address" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="carName">
            Car Name
          </label>
          <input type="text" {...register("carName")} id="carName" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="area">
            Area
          </label>
          <input type="text" {...register("area")} id="area" />
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
          <label className="mb-3" htmlFor="drivingLicense">
            Driving License Picture
          </label>
          <input type="file" {...register("drivingLicense")} id="drivingLicense" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="carModel">
            Car Model
          </label>
          <input type="text" {...register("carModel")} id="carModel" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="nid">
            NID Picture
          </label>
          <input type="file" {...register("nid")} id="nid" />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-3" htmlFor="carNamePalate">
            Car Name Palate
          </label>
          <input type="text" {...register("carNamePalate")} id="carNamePalate" />
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
            Register as a Rider
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiderCreator;
