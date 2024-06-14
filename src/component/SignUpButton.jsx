import React from "react";
import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <div className="w-11/12 flex mt-[20%] justify-center mx-auto">
      <Link
        className=" md:block min-w-[84px] p-[12px] bg-blue-500 border-none rounded-[10px] text-white text-[16px] font-bold cursor-pointer hover:scale-90 transition-all duration-200 hidden"
        to={"http://localhost:4000/auth/google"}
      >
        Sign Up here
      </Link>
    </div>
  );
};

export default SignUpButton;
