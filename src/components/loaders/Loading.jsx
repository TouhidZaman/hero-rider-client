import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="w-full flex justify-center mt-24 lg:mt-40">
      <div className={`${classes.ldsFacebook} [&>*]:bg-primary`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
