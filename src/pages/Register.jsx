import React from "react";
import { Link } from "react-router-dom";

import rider from "../assets/images/rider.png";
import rideLearner from "../assets/images/learning-ride.png";

const Register = () => {
  return (
    <div className="h-screen pt-14">
      <h1 className="text-center my-10 text-2xl">
        Please select your account type to continue...
      </h1>
      <div className="flex justify-center gap-12">
        <Link
          to="/rider-creator"
          className="shadow hover:shadow-lg py-10 px-14 rounded-lg"
        >
          <img src={rider} alt="" className="h-48 w-48" />
          <h3 className="text-center text-3xl">Rider</h3>
        </Link>
        <Link
          to="/learner-creator"
          className="shadow hover:shadow-lg py-10 px-14 rounded-lg"
        >
          <img src={rideLearner} alt="" className="h-48 w-48" />
          <h3 className="text-center text-3xl">Learner</h3>
        </Link>
      </div>
    </div>
  );
};

export default Register;
